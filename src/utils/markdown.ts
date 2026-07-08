// Simple markdown to HTML converter for legal documents
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Code blocks
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const code = match.replace(/```/g, '').trim();
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  });

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Tables
  html = html.replace(/^\|(.+)\|$/gm, (match) => {
    const cells = match.split('|').slice(1, -1).map(cell => `<td>${cell.trim()}</td>`);
    return `<tr>${cells.join('')}</tr>`;
  });

  if (html.includes('<tr>')) {
    html = html.replace(/(<tr>.*?<\/tr>)/s, (match) => {
      return `<table>${match}</table>`;
    });
  }

  // Unordered lists
  html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)/s, (match) => {
    return `<ul>${match}</ul>`;
  });

  // Paragraphs
  html = html.split('\n\n').map(para => {
    if (
      para.trim().startsWith('<') ||
      para.trim().startsWith('|') ||
      para.trim() === ''
    ) {
      return para;
    }
    return `<p>${para}</p>`;
  }).join('\n');

  // Replace multiple newlines with single paragraph break
  html = html.replace(/(<\/p>)\n+(<p>)/g, '$1$2');

  return html;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
