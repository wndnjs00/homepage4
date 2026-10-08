// 메인 히어로 캔버스: 원근 격자 위를 이동하는 패킷과 솟은 기둥
import { ACCENT_RGB, prefersReducedMotion } from './scene-utils';

interface Node {
  gx: number;
  gz: number;
  h: number;
  hot: boolean;
  ph: number;
}

interface Packet {
  e: [number, number];
  p: number;
  v: number;
}

interface Point {
  x: number;
  y: number;
  s: number;
  z: number;
}

/** 캔버스 애니메이션을 시작하고 정리 함수를 반환한다 */
export function startHeroScene(cv: HTMLCanvasElement): () => void {
  const cx = cv.getContext('2d');
  if (!cx) return () => {};
  const reduce = prefersReducedMotion();
  const ACC = ACCENT_RGB.join(',');
  const t0 = performance.now();
  let W = 0;
  let H = 0;
  let nodes: Node[] = [];
  let edges: [number, number][] = [];
  let packets: Packet[] = [];
  let mx = 0.7;
  let my = 0.5;
  let tmx = 0.7;
  let tmy = 0.5;

  const newPacket = (): Packet => ({
    e: edges[(Math.random() * edges.length) | 0],
    p: Math.random(),
    // 기존 구현은 루프가 2개 겹쳐 돌아 패킷이 2배속이었다. 루프를 1개로 정리하면서 속도를 2배로 맞춤
    v: (0.004 + Math.random() * 0.01) * 2,
  });

  function build() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth;
    H = cv.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    cx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = [];
    edges = [];
    packets = [];
    const cols = W < 760 ? 9 : 16;
    const rows = W < 760 ? 14 : 10;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const hot = Math.random() < 0.14;
        nodes.push({ gx: i / (cols - 1) - 0.5, gz: j / (rows - 1) - 0.5, h: hot ? 0.04 + Math.random() * 0.22 : 0, hot, ph: Math.random() * 6.28 });
      }
    }
    const idx = (i: number, j: number) => i * rows + j;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (i < cols - 1) edges.push([idx(i, j), idx(i + 1, j)]);
        if (j < rows - 1) edges.push([idx(i, j), idx(i, j + 1)]);
      }
    }
    for (let k = 0; k < (W < 760 ? 10 : 22); k++) packets.push(newPacket());
  }

  function proj(n: Node, t: number): Point {
    const rot = -0.62 + (mx - 0.5) * 0.25 + Math.sin(t * 0.00005) * 0.05;
    const tilt = 0.9 + (my - 0.5) * 0.12;
    const S = Math.max(W, H) * 1.35;
    const x = n.gx * Math.cos(rot) - n.gz * Math.sin(rot);
    const z = n.gx * Math.sin(rot) + n.gz * Math.cos(rot);
    const wave = Math.sin(n.gx * 6 + t * 0.0006) * Math.cos(n.gz * 5 + t * 0.0004) * 0.012;
    const y = -(n.h * (0.85 + 0.15 * Math.sin(t * 0.001 + n.ph))) + wave;
    const persp = 1 / (1.6 + z * 0.9);
    return { x: W * (W < 760 ? 0.5 : 0.66) + x * S * persp, y: H * 0.56 + (z * Math.cos(tilt) * 0.55 + y) * S * persp, s: persp, z };
  }

  function draw(t: number) {
    const c = cx!;
    mx += (tmx - mx) * 0.04;
    my += (tmy - my) * 0.04;
    c.clearRect(0, 0, W, H);
    const P = nodes.map((n) => proj(n, t));
    const B = nodes.map((n) => (n.hot ? proj({ ...n, h: 0 }, t) : null));
    c.lineWidth = 1;
    for (const [a, b] of edges) {
      const pa = P[a];
      const pb = P[b];
      const al = Math.max(0, Math.min(0.16, 0.2 - (pa.z + 0.5) * 0.12));
      c.strokeStyle = `rgba(244,244,241,${al})`;
      c.beginPath();
      c.moveTo(pa.x, pa.y);
      c.lineTo(pb.x, pb.y);
      c.stroke();
    }
    // 기둥
    nodes.forEach((n, k) => {
      const b = B[k];
      if (!n.hot || !b) return;
      const p = P[k];
      const g = c.createLinearGradient(0, b.y, 0, p.y);
      g.addColorStop(0, `rgba(${ACC},0)`);
      g.addColorStop(1, `rgba(${ACC},.55)`);
      c.strokeStyle = g;
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(b.x, b.y);
      c.lineTo(p.x, p.y);
      c.stroke();
      c.fillStyle = `rgba(${ACC},.95)`;
      const r = 2.2 * p.s * 1.6;
      c.fillRect(p.x - r, p.y - r, r * 2, r * 2);
    });
    // 노드
    nodes.forEach((n, k) => {
      if (n.hot) return;
      const p = P[k];
      c.fillStyle = `rgba(244,244,241,${0.18 + p.s * 0.2})`;
      c.fillRect(p.x - 1, p.y - 1, 2, 2);
    });
    // 패킷
    for (const pk of packets) {
      pk.p += reduce ? 0 : pk.v;
      if (pk.p >= 1) Object.assign(pk, newPacket(), { p: 0 });
      const a = P[pk.e[0]];
      const b = P[pk.e[1]];
      const x = a.x + (b.x - a.x) * pk.p;
      const y = a.y + (b.y - a.y) * pk.p;
      const tx = a.x + (b.x - a.x) * Math.max(0, pk.p - 0.35);
      const ty = a.y + (b.y - a.y) * Math.max(0, pk.p - 0.35);
      const g = c.createLinearGradient(tx, ty, x, y);
      g.addColorStop(0, `rgba(${ACC},0)`);
      g.addColorStop(1, `rgba(${ACC},.9)`);
      c.strokeStyle = g;
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(tx, ty);
      c.lineTo(x, y);
      c.stroke();
    }
  }

  let running = false;
  let raf = 0;
  const loop = (t = performance.now()) => {
    draw(reduce ? 0 : t - t0);
    if (running && !reduce) raf = requestAnimationFrame(loop);
  };
  // 화면에 보일 때만 루프 실행
  const io = new IntersectionObserver(([e]) => {
    const was = running;
    running = e.isIntersecting;
    if (running && !was) loop();
  });

  const onMove = (e: MouseEvent) => {
    tmx = e.clientX / innerWidth;
    tmy = e.clientY / innerHeight;
  };
  let resizeTimer: ReturnType<typeof setTimeout> | undefined;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      build();
      if (reduce) draw(0);
    }, 150);
  };

  build();
  draw(0);
  io.observe(cv);
  addEventListener('mousemove', onMove, { passive: true });
  addEventListener('resize', onResize);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    clearTimeout(resizeTimer);
    io.disconnect();
    removeEventListener('mousemove', onMove);
    removeEventListener('resize', onResize);
  };
}
