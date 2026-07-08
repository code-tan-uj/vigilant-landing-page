// Robust line-based markdown → HTML converter for legal documents.
// Handles: headings (h1-h4, with slug ids for deep-linking/SEO), horizontal
// rules, GFM tables (multi-row, with header-separator detection), ordered
// and unordered lists, paragraphs, and inline bold/italic/code/links.

interface Heading {
  level: number;
  text: string;
  id: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[™""'’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function inline(text: string): string {
  let out = text;
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/__(.+?)__/g, '<strong>$1</strong>');
  out = out.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
  out = out.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  return out;
}

function isHrLine(line: string): boolean {
  return /^-{3,}$/.test(line.trim());
}

function isTableRow(line: string): boolean {
  return /^\|.*\|$/.test(line.trim());
}

function isTableSeparatorRow(line: string): boolean {
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every(c => /^:?-{2,}:?$/.test(c.trim()));
}

function splitTableRow(line: string): string[] {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|');
}

export function markdownToHtml(markdown: string): { html: string; toc: Heading[] } {
  const lines = markdown.split('\n');
  const toc: Heading[] = [];
  const out: string[] = [];

  let paragraphBuf: string[] = [];
  let listBuf: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let tableBuf: string[][] = [];
  let tableHasHeader = false;

  function flushParagraph() {
    if (paragraphBuf.length) {
      out.push(`<p>${inline(paragraphBuf.join(' '))}</p>`);
      paragraphBuf = [];
    }
  }

  function flushList() {
    if (listBuf) {
      const items = listBuf.items.map(i => `<li>${inline(i)}</li>`).join('');
      out.push(`<${listBuf.type}>${items}</${listBuf.type}>`);
      listBuf = null;
    }
  }

  function flushTable() {
    if (tableBuf.length) {
      let html = '<div class="table-wrap"><table>';
      tableBuf.forEach((row, idx) => {
        const tag = idx === 0 && tableHasHeader ? 'th' : 'td';
        const cells = row.map(c => `<${tag}>${inline(c.trim())}</${tag}>`).join('');
        html += `<tr>${cells}</tr>`;
      });
      html += '</table></div>';
      out.push(html);
      tableBuf = [];
      tableHasHeader = false;
    }
  }

  function flushAll() {
    flushParagraph();
    flushList();
    flushTable();
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.replace(/\r$/, '');
    const trimmed = line.trim();

    // Headings
    const headingMatch = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (headingMatch) {
      flushAll();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = slugify(text);
      if (level <= 3) toc.push({ level, text, id });
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      continue;
    }

    // Horizontal rule
    if (isHrLine(trimmed)) {
      flushAll();
      out.push('<hr class="legal-divider" />');
      continue;
    }

    // Table rows
    if (isTableRow(trimmed)) {
      flushParagraph();
      flushList();
      if (tableBuf.length === 0 && isTableSeparatorRowNext(lines, i)) {
        tableHasHeader = true;
      }
      if (isTableSeparatorRow(trimmed)) {
        continue; // skip the |---|---| divider row itself
      }
      tableBuf.push(splitTableRow(trimmed));
      continue;
    } else if (tableBuf.length) {
      flushTable();
    }

    // Ordered list
    const olMatch = /^\d+\.\s+(.*)$/.exec(trimmed);
    if (olMatch) {
      flushParagraph();
      if (!listBuf || listBuf.type !== 'ol') {
        flushList();
        listBuf = { type: 'ol', items: [] };
      }
      listBuf.items.push(olMatch[1]);
      continue;
    }

    // Unordered list
    const ulMatch = /^[-*]\s+(.*)$/.exec(trimmed);
    if (ulMatch) {
      flushParagraph();
      if (!listBuf || listBuf.type !== 'ul') {
        flushList();
        listBuf = { type: 'ul', items: [] };
      }
      listBuf.items.push(ulMatch[1]);
      continue;
    }

    // Blank line = paragraph/list/table break
    if (trimmed === '') {
      flushAll();
      continue;
    }

    // Plain paragraph text
    flushList();
    flushTable();
    paragraphBuf.push(trimmed);
  }

  flushAll();

  return { html: out.join('\n'), toc };
}

function isTableSeparatorRowNext(lines: string[], currentIndex: number): boolean {
  const next = lines[currentIndex + 1];
  return !!next && isTableRow(next.trim()) && isTableSeparatorRow(next.trim());
}
