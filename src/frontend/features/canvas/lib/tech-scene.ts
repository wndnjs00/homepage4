// 메인 Financial IT Partner 캔버스: 회전하는 점 구체 + 궤도 링
import { ACCENT_RGB, prefersReducedMotion } from './scene-utils';

const RINGS: [radius: number, incline: number, alpha: number][] = [
  [1.28, 0.2, 1],
  [1.46, -0.5, 0.6],
  [1.12, 1.1, 0.45],
];

/** 캔버스 애니메이션을 시작하고 정리 함수를 반환한다 */
export function startTechScene(cv: HTMLCanvasElement): () => void {
  const cx = cv.getContext('2d');
  if (!cx) return () => {};
  const reduce = prefersReducedMotion();
  const ACC = ACCENT_RGB.join(',');
  const t0 = performance.now();
  let W = 0;
  let H = 0;
  let pts: [number, number, number][] = [];

  function build() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth;
    H = cv.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = [];
    const N = 900;
    // 피보나치 구
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.39996;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
  }

  function draw(t: number) {
    const c = cx!;
    c.clearRect(0, 0, W, H);
    const R = Math.min(W, H) * 0.34;
    const ox = W / 2;
    const oy = H / 2;
    const a = t * 0.00012;
    const tilt = 0.42;
    // 궤도 링 + 위성
    RINGS.forEach(([rr, inc, al], ri) => {
      c.strokeStyle = `rgba(244,244,241,${0.1 * al + 0.04})`;
      c.lineWidth = 1;
      c.beginPath();
      for (let k = 0; k <= 120; k++) {
        const th = (k / 120) * Math.PI * 2;
        const x = Math.cos(th) * rr;
        const z = Math.sin(th) * rr;
        const y2 = -z * Math.sin(inc);
        const z2 = z * Math.cos(inc);
        const px = ox + x * R;
        const py = oy + (y2 * Math.cos(tilt) - z2 * Math.sin(tilt) * 0.35) * R;
        if (k) c.lineTo(px, py);
        else c.moveTo(px, py);
      }
      c.stroke();
      const th = t * 0.0004 * (ri % 2 ? -1 : 1) + ri * 2;
      const x = Math.cos(th) * rr;
      const z = Math.sin(th) * rr;
      const y2 = -z * Math.sin(inc);
      const z2 = z * Math.cos(inc);
      const px = ox + x * R;
      const py = oy + (y2 * Math.cos(tilt) - z2 * Math.sin(tilt) * 0.35) * R;
      c.fillStyle = ri === 0 ? `rgb(${ACC})` : 'rgba(244,244,241,.9)';
      c.fillRect(px - 3, py - 3, 6, 6);
    });
    // 구 표면 점
    for (const [x0, y0, z0] of pts) {
      const x = x0 * Math.cos(a) - z0 * Math.sin(a);
      const z = x0 * Math.sin(a) + z0 * Math.cos(a);
      const y2 = y0 * Math.cos(tilt) - z * Math.sin(tilt);
      const z2 = y0 * Math.sin(tilt) + z * Math.cos(tilt);
      const d = (z2 + 1) / 2; // 0 뒤쪽 .. 1 앞쪽
      const band = Math.abs(y0) < 0.05 || Math.abs(Math.atan2(z0, x0) % 0.785) < 0.02;
      c.fillStyle = band && d > 0.3 ? `rgba(${ACC},${0.3 + d * 0.7})` : `rgba(244,244,241,${0.06 + d * 0.5})`;
      const s = 0.8 + d * 1.4;
      c.fillRect(ox + x * R - s / 2, oy + y2 * R - s / 2, s, s);
    }
    // 십자선 + 수치 표시
    c.strokeStyle = 'rgba(244,244,241,.12)';
    c.beginPath();
    c.moveTo(ox - R * 1.6, oy);
    c.lineTo(ox - R * 1.2, oy);
    c.moveTo(ox + R * 1.2, oy);
    c.lineTo(ox + R * 1.6, oy);
    c.moveTo(ox, oy - R * 1.45);
    c.lineTo(ox, oy - R * 1.15);
    c.moveTo(ox, oy + R * 1.15);
    c.lineTo(ox, oy + R * 1.45);
    c.stroke();
    c.font = '10px "JetBrains Mono", monospace';
    c.fillStyle = 'rgba(140,151,146,.9)';
    c.fillText('LAT ' + (Math.sin(a) * 90).toFixed(3), ox + R * 1.2, oy - 8);
    c.fillText('SYNC 100.000%', ox - R * 1.6, oy + 16);
  }

  let running = false;
  let raf = 0;
  const loop = (t = performance.now()) => {
    draw(reduce ? 0 : t - t0);
    if (running && !reduce) raf = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(([e]) => {
    const was = running;
    running = e.isIntersecting;
    if (running && !was) loop();
  });
  const onResize = () => {
    build();
    draw(performance.now() - t0);
  };

  build();
  draw(0);
  io.observe(cv);
  addEventListener('resize', onResize);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    removeEventListener('resize', onResize);
  };
}
