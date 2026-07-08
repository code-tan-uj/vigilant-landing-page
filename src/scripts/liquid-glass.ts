// Vanilla-JS port of the shuding/liquid-glass displacement-map technique
// (https://github.com/shuding/liquid-glass), adapted for the nav bar only.
// No WebGL/three.js — this just paints a displacement map on an offscreen
// <canvas> per-pixel using a rounded-rect signed-distance-field, then hands
// the resulting data URL to an SVG <feImage>.
//
// This runs the SDF in real pixel space (not the reference's per-axis
// normalized -0.5..0.5 space) deliberately: the reference was tuned for a
// roughly square 270x69 pill button. A nav bar spanning most of the
// viewport at 64px tall has a far more extreme aspect ratio, and
// normalizing x/y independently by width/height respectively distorts the
// corner radius and edge-band thickness differently per axis. Working in
// pixels means "radius" and "edge band" mean the same physical distance on
// both axes, matching the CSS border-radius exactly.

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
  /** Thickness of the refractive rim, in pixels. */
  edgeBandPx?: number;
  /** Corner radius, in pixels — should match the CSS border-radius. */
  radiusPx?: number;
}

/**
 * Returns a displacement vector (in normalized -1..1-ish units, before the
 * SVG filter's own `scale` attribute multiplies it up) for a point at pixel
 * offset (px, py) from the box's center, for a box of size (w, h).
 *
 * distanceToEdge is 0 exactly at the shrunk inner boundary (half-extents
 * minus edgeBandPx) and grows positive moving further out toward/past the
 * real edge. `t` maps that onto a 0→1 ramp across the edgeBandPx-wide
 * transition zone, so displacement is exactly 0 through the whole interior
 * and ramps up to full strength right at the visible border.
 */
function fragment(px: number, py: number, w: number, h: number, opts: Required<NavGlassOptions>): { x: number; y: number } {
  const halfW = w / 2 - opts.edgeBandPx;
  const halfH = h / 2 - opts.edgeBandPx;
  const distanceToEdge = roundedRectSDF(px, py, halfW, halfH, opts.radiusPx);

  const t = smoothStep(0, opts.edgeBandPx, distanceToEdge);

  // Direction: push outward along the vector from center, scaled by t.
  // Using px/py themselves (rather than a fixed unit vector) means the
  // pull is naturally stronger further from center within the band, which
  // reads as a continuous bevel rather than a hard-edged ring.
  const norm = Math.max(1, length(px, py));
  return { x: (px / norm) * t, y: (py / norm) * t };
}

export function generateNavDisplacementMap(width: number, height: number, options: NavGlassOptions = {}): string {
  const opts: Required<NavGlassOptions> = {
    edgeBandPx: options.edgeBandPx ?? 14,
    radiusPx: options.radiusPx ?? 14,
  };

  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  for (let y = 0; y < h; y++) {
    const py = y - h / 2;
    for (let x = 0; x < w; x++) {
      const px = x - w / 2;
      const { x: dx, y: dy } = fragment(px, py, w, h, opts);

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
  return canvas.toDataURL();
}
