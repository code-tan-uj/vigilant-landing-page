// Vanilla-JS port of the shuding/liquid-glass displacement-map technique
// (https://github.com/shuding/liquid-glass), adapted for the nav bar only.
// No WebGL/three.js — this just paints a displacement map on an offscreen
// <canvas> per-pixel using a rounded-rect signed-distance-field, then hands
// the resulting URL to an SVG <feImage>.
//
// This runs the SDF in real pixel space (not the reference's per-axis
// normalized -0.5..0.5 space) deliberately: the reference was tuned for a
// roughly square 270x69 pill button. A nav bar spanning most of the
// viewport at 64px tall has a far more extreme aspect ratio, and
// normalizing x/y independently by width vs height distorts the corner
// radius and edge-band thickness differently per axis. Working in pixels
// means "radius" and "edge band" mean the same physical distance on both
// axes, matching the CSS border-radius exactly.
//
// Two deliberate perf choices, found via Lighthouse (a first version of
// this blocked the main thread for ~4.9s — a single long task, almost
// entirely canvas.toDataURL() PNG-encoding a ~120,000px canvas):
//   1. The map is generated at a capped, downscaled resolution — it's a
//      smooth, low-frequency gradient with no fine detail, so it doesn't
//      need one canvas pixel per nav pixel. The SVG feImage stretches it
//      back up (preserveAspectRatio="xMidYMid slice").
//   2. Export via canvas.toBlob() + an object URL instead of
//      canvas.toDataURL(). Chrome moves toBlob's PNG encoding off the main
//      thread; toDataURL's base64 encoding does not have that option.

function smoothStep(a: number, b: number, t: number): number {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function length(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

// Signed distance from (x,y) to the boundary of a rounded rect centered at
// the origin with half-extents (halfW, halfH) and corner radius r. Negative
// = inside, 0 = on the boundary, positive = outside.
function roundedRectSDF(x: number, y: number, halfW: number, halfH: number, r: number): number {
  const qx = Math.abs(x) - halfW + r;
  const qy = Math.abs(y) - halfH + r;
  return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - r;
}

export interface NavGlassOptions {
  /** Thickness of the refractive rim, in pixels (at the real nav size). */
  edgeBandPx?: number;
  /** Corner radius, in pixels — should match the CSS border-radius. */
  radiusPx?: number;
  /** Longest side of the generated map, in pixels. Lower = faster. */
  maxMapDimension?: number;
}

/**
 * Displacement vector (in -1..1-ish units, before the SVG filter's own
 * `scale` attribute multiplies it up) for a point at pixel offset (px, py)
 * from the box's center, for a box of half-extents (halfW, halfH).
 *
 * distanceToEdge is 0 exactly at the shrunk inner boundary (half-extents
 * minus edgeBandPx) and grows positive moving further out toward/past the
 * real edge. `t` maps that onto a 0→1 ramp across the edgeBandPx-wide
 * transition zone, so displacement is exactly 0 through the whole interior
 * and ramps up to full strength right at the visible border.
 */
function fragmentBoxed(
  px: number,
  py: number,
  halfW: number,
  halfH: number,
  opts: { edgeBandPx: number; radiusPx: number }
): { x: number; y: number } {
  const distanceToEdge = roundedRectSDF(px, py, halfW - opts.edgeBandPx, halfH - opts.edgeBandPx, opts.radiusPx);
  const t = smoothStep(0, opts.edgeBandPx, distanceToEdge);
  const norm = Math.max(1, length(px, py));
  return { x: (px / norm) * t, y: (py / norm) * t };
}

function paintMap(canvas: HTMLCanvasElement, w: number, h: number, opts: Required<Pick<NavGlassOptions, "edgeBandPx" | "radiusPx">>): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  for (let y = 0; y < h; y++) {
    const py = y - h / 2;
    for (let x = 0; x < w; x++) {
      const px = x - w / 2;
      const { x: dx, y: dy } = fragmentBoxed(px, py, w / 2, h / 2, opts);

      const r = dx / 2 + 0.5;
      const g = dy / 2 + 0.5;

      const i = (y * w + x) * 4;
      data[i] = Math.max(0, Math.min(255, r * 255));
      data[i + 1] = Math.max(0, Math.min(255, g * 255));
      data[i + 2] = Math.max(0, Math.min(255, g * 255));
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Generates the displacement map and resolves with an object URL. Always
 * async now — even the downscaled canvas can take a couple of milliseconds,
 * and toBlob itself is callback-based.
 */
export function generateNavDisplacementMap(width: number, height: number, options: NavGlassOptions = {}): Promise<string> {
  // A safety-net cap, not the primary fix — the real fix for the ~4.9s main
  // thread block was switching to toBlob() below. Capping too aggressively
  // (e.g. to ~200px) crushes the already-small height dimension of a wide,
  // short bar down to a handful of blocky pixels once width is scaled to
  // match. 640px keeps height comfortably above ~20px for any realistic nav
  // width while still cutting pixel count 5-10x on ultra-wide screens.
  const maxMapDimension = options.maxMapDimension ?? 640;
  const scale = Math.min(1, maxMapDimension / Math.max(width, height));

  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));

  const opts: Required<Pick<NavGlassOptions, "edgeBandPx" | "radiusPx">> = {
    edgeBandPx: (options.edgeBandPx ?? 11) * scale,
    radiusPx: (options.radiusPx ?? 14) * scale,
  };

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  paintMap(canvas, w, h, opts);

  return new Promise((resolve) => {
    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        } else {
          resolve(canvas.toDataURL());
        }
      });
    } else {
      resolve(canvas.toDataURL());
    }
  });
}
