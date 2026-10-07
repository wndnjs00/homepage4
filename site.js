(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ACC = [80, 214, 130]; // approx accent rgb for canvas

/* ── Header ── */
const hdr = $('#hdr');
const topBand = $('.hero, .phero');
let lastY = 0;
const onScroll = () => {
  const y = scrollY;
  hdr.classList.toggle('solid', y > (topBand ? topBand.offsetHeight - hdr.offsetHeight : 0));
  hdr.classList.toggle('hide', y > lastY && y > innerHeight && !document.body.classList.contains('menu-open'));
  lastY = y;
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
$('#burger').onclick = () => document.body.classList.toggle('menu-open');
$$('#mnav a').forEach(a => a.onclick = () => document.body.classList.remove('menu-open'));

/* ── Search overlay ── */
const srch = $('#srch'), srchIn = $('#srchIn'), srchOut = $('#srchOut');
const openSearch = on => {
  document.body.classList.toggle('search-open', on);
  if (on) { document.body.classList.remove('menu-open'); setTimeout(() => srchIn.focus(), 50); }
};
$$('[data-open-search]').forEach(b => b.onclick = () => openSearch(true));
$$('[data-close-search]').forEach(b => b.onclick = () => openSearch(false));
addEventListener('keydown', e => { if (e.key === 'Escape') { openSearch(false); document.body.classList.remove('menu-open'); } });
srchIn.oninput = () => {
  const q = srchIn.value.trim().toLowerCase();
  if (!q) { srchOut.innerHTML = ''; return; }
  const has = s => s.toLowerCase().includes(q), hits = [];
  NEWS.forEach(n => has(n.ttl + ' ' + n.tag) && hits.push(['NEWS', n.date, n.ttl, `news-detail.html?id=${n.id}`]));
  PROJECTS.forEach((p, i) => has([p.t, p.cl, p.c, p.k].join(' ')) && hits.push([p.k, p.d, p.t, `project.html?i=${i}`]));
  BL.forEach(b => has([b.ttl, b.desc, ...b.pts].join(' ')) && hits.push(['BUSINESS', b.k.toUpperCase(), `${b.ttl} — ${b.desc}`, `business-line.html?k=${b.k}`]));
  srchOut.innerHTML = hits.length
    ? hits.slice(0, 12).map(([k, d, t, u]) => `<li><a href="${u}"><span class="mono">${k}</span><span class="mono">${d}</span><span>${t.replace(/</g, '&lt;')}</span></a></li>`).join('')
    : '<li class="none">검색 결과가 없습니다.</li>';
};

/* ── Clock ── */
const clk = $('#clock');
if (clk) {
  const tick = () => { clk.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul', hour12: false }); };
  tick(); setInterval(tick, 1000);
}

/* ── Hero canvas: lattice of nodes with travelling packets ── */
(function hero() {
  const cv = $('#heroCanvas');
  if (!cv) return;
  const cx = cv.getContext('2d');
  let W, H, dpr, nodes = [], edges = [], packets = [], t0 = performance.now();
  let mx = 0.7, my = 0.5, tmx = 0.7, tmy = 0.5;
  function build() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = []; edges = []; packets = [];
    const cols = W < 760 ? 9 : 16, rows = W < 760 ? 14 : 10;
    // isometric-ish grid in 3D space (x,z) with height y
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const hot = Math.random() < 0.14;
      nodes.push({ gx: i / (cols - 1) - 0.5, gz: j / (rows - 1) - 0.5, h: hot ? 0.04 + Math.random() * 0.22 : 0, hot, ph: Math.random() * 6.28, i, j });
    }
    const idx = (i, j) => i * rows + j;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      if (i < cols - 1) edges.push([idx(i, j), idx(i + 1, j)]);
      if (j < rows - 1) edges.push([idx(i, j), idx(i, j + 1)]);
    }
    for (let k = 0; k < (W < 760 ? 10 : 22); k++) packets.push(newPacket());
  }
  function newPacket() {
    const e = edges[(Math.random() * edges.length) | 0];
    return { e, p: Math.random(), v: 0.004 + Math.random() * 0.01 };
  }
  function proj(n, t) {
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
  function draw(t) {
    mx += (tmx - mx) * 0.04; my += (tmy - my) * 0.04;
    cx.clearRect(0, 0, W, H);
    const P = nodes.map(n => proj(n, t));
    const B = nodes.map(n => n.hot ? proj({ ...n, h: 0 }, t) : null);
    cx.lineWidth = 1;
    for (const [a, b] of edges) {
      const pa = P[a], pb = P[b];
      const al = Math.max(0, Math.min(0.16, 0.2 - (pa.z + 0.5) * 0.12));
      cx.strokeStyle = `rgba(244,244,241,${al})`;
      cx.beginPath(); cx.moveTo(pa.x, pa.y); cx.lineTo(pb.x, pb.y); cx.stroke();
    }
    // pillars
    nodes.forEach((n, k) => {
      if (!n.hot) return;
      const p = P[k], b = B[k];
      const g = cx.createLinearGradient(0, b.y, 0, p.y);
      g.addColorStop(0, `rgba(${ACC},0)`); g.addColorStop(1, `rgba(${ACC},.55)`);
      cx.strokeStyle = g; cx.lineWidth = 1;
      cx.beginPath(); cx.moveTo(b.x, b.y); cx.lineTo(p.x, p.y); cx.stroke();
      cx.fillStyle = `rgba(${ACC},.95)`;
      const r = 2.2 * p.s * 1.6;
      cx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
    });
    // nodes
    nodes.forEach((n, k) => {
      if (n.hot) return;
      const p = P[k];
      cx.fillStyle = `rgba(244,244,241,${0.18 + p.s * 0.2})`;
      cx.fillRect(p.x - 1, p.y - 1, 2, 2);
    });
    // packets
    for (const pk of packets) {
      pk.p += reduce ? 0 : pk.v;
      if (pk.p >= 1) { Object.assign(pk, newPacket(), { p: 0 }); }
      const a = P[pk.e[0]], b = P[pk.e[1]];
      const x = a.x + (b.x - a.x) * pk.p, y = a.y + (b.y - a.y) * pk.p;
      const tx = a.x + (b.x - a.x) * Math.max(0, pk.p - 0.35), ty = a.y + (b.y - a.y) * Math.max(0, pk.p - 0.35);
      const g = cx.createLinearGradient(tx, ty, x, y);
      g.addColorStop(0, `rgba(${ACC},0)`); g.addColorStop(1, `rgba(${ACC},.9)`);
      cx.strokeStyle = g; cx.lineWidth = 1.5;
      cx.beginPath(); cx.moveTo(tx, ty); cx.lineTo(x, y); cx.stroke();
    }
  }
  let running = true;
  new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) loop(); }).observe(cv);
  function loop(t = performance.now()) { draw(reduce ? 0 : t - t0); if (running && !reduce) requestAnimationFrame(loop); }
  addEventListener('mousemove', e => { tmx = e.clientX / innerWidth; tmy = e.clientY / innerHeight; }, { passive: true });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { build(); if (reduce) draw(0); }, 150); });
  build(); loop();
  requestAnimationFrame(() => setTimeout(() => $('.hero').classList.add('in'), 120));
})();

/* ── Tech canvas: orbital precision rings ── */
(function tech() {
  const cv = $('#techCanvas');
  if (!cv) return;
  const cx = cv.getContext('2d');
  let W, H, dpr, pts = [];
  function build() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = [];
    const N = 900;
    for (let i = 0; i < N; i++) { // fibonacci sphere
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
  }
  function draw(t) {
    cx.clearRect(0, 0, W, H);
    const R = Math.min(W, H) * 0.34, ox = W / 2, oy = H / 2;
    const a = t * 0.00012, tilt = 0.42;
    // rings
    const rings = [[1.28, 0.2, 1], [1.46, -0.5, 0.6], [1.12, 1.1, 0.45]];
    rings.forEach(([rr, inc, al], ri) => {
      cx.strokeStyle = `rgba(244,244,241,${0.1 * al + 0.04})`; cx.lineWidth = 1;
      cx.beginPath();
      for (let k = 0; k <= 120; k++) {
        const th = k / 120 * Math.PI * 2;
        let x = Math.cos(th) * rr, y = 0, z = Math.sin(th) * rr;
        const y2 = y * Math.cos(inc) - z * Math.sin(inc), z2 = y * Math.sin(inc) + z * Math.cos(inc);
        const px = ox + x * R, py = oy + (y2 * Math.cos(tilt) - z2 * Math.sin(tilt) * 0.35) * R;
        k ? cx.lineTo(px, py) : cx.moveTo(px, py);
      }
      cx.stroke();
      // satellite
      const th = t * 0.0004 * (ri % 2 ? -1 : 1) + ri * 2;
      let x = Math.cos(th) * rr, z = Math.sin(th) * rr;
      const y2 = -z * Math.sin(inc), z2 = z * Math.cos(inc);
      const px = ox + x * R, py = oy + (y2 * Math.cos(tilt) - z2 * Math.sin(tilt) * 0.35) * R;
      cx.fillStyle = ri === 0 ? `rgb(${ACC})` : 'rgba(244,244,241,.9)';
      cx.fillRect(px - 3, py - 3, 6, 6);
    });
    // sphere points
    for (const [x0, y0, z0] of pts) {
      let x = x0 * Math.cos(a) - z0 * Math.sin(a), z = x0 * Math.sin(a) + z0 * Math.cos(a), y = y0;
      const y2 = y * Math.cos(tilt) - z * Math.sin(tilt), z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
      const d = (z2 + 1) / 2; // 0 back .. 1 front
      const band = Math.abs(y0) < 0.05 || Math.abs(Math.atan2(z0, x0) % 0.785) < 0.02;
      if (band && d > 0.3) cx.fillStyle = `rgba(${ACC},${0.3 + d * 0.7})`;
      else cx.fillStyle = `rgba(244,244,241,${0.06 + d * 0.5})`;
      const s = 0.8 + d * 1.4;
      cx.fillRect(ox + x * R - s / 2, oy + y2 * R - s / 2, s, s);
    }
    // crosshair
    cx.strokeStyle = 'rgba(244,244,241,.12)';
    cx.beginPath(); cx.moveTo(ox - R * 1.6, oy); cx.lineTo(ox - R * 1.2, oy); cx.moveTo(ox + R * 1.2, oy); cx.lineTo(ox + R * 1.6, oy);
    cx.moveTo(ox, oy - R * 1.45); cx.lineTo(ox, oy - R * 1.15); cx.moveTo(ox, oy + R * 1.15); cx.lineTo(ox, oy + R * 1.45); cx.stroke();
    cx.font = '10px "JetBrains Mono", monospace'; cx.fillStyle = 'rgba(140,151,146,.9)';
    cx.fillText('LAT ' + (Math.sin(a) * 90).toFixed(3), ox + R * 1.2, oy - 8);
    cx.fillText('SYNC 100.000%', ox - R * 1.6, oy + 16);
  }
  let running = false, t0 = performance.now();
  new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting; if (running && !was) loop(); }).observe(cv);
  function loop(t = performance.now()) { draw(reduce ? 0 : t - t0); if (running && !reduce) requestAnimationFrame(loop); }
  addEventListener('resize', () => { build(); draw(performance.now() - t0); });
  build(); draw(0);
})();

/* ── Content renderers (data.js: NEWS, PROJECTS, BL, TEAMS, MARQUEE) ── */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const qs = new URLSearchParams(location.search);
const PH = '설명이 들어갈 내용입니다.';
const txt = v => v ? esc(v) : `<span class="ph">${PH}</span>`;
const list = arr => `<ul>${arr.map(x => `<li>${esc(x).replace(/\n/g, '<br>')}</li>`).join('')}</ul>`;
const paras = v => [].concat(v).map(x => `<p>${esc(x)}</p>`).join('');
const go = '<span class="go"></span>';
const setHead = (crumb, head) => { $('#crumb').innerHTML = crumb; $('#pheadIn').innerHTML = head; };
const chips = arr => `<div class="chips">${arr.map((c, i) => `<span class="chip${i ? '' : ' acc'}">${esc(c)}</span>`).join('')}</div>`;
const projIdx = t => PROJECTS.findIndex(p => p.t === t);

/* marquee */
const fill = (el, arr) => { const h = arr.map(n => `<span>${esc(n)}</span>`).join(''); el.innerHTML = h + h; };
if ($('#mq1')) { fill($('#mq1'), MARQUEE[0]); fill($('#mq2'), MARQUEE[1]); }

/* news */
const newsRow = n => `<a class="prow nrow" href="news-detail.html?id=${n.id}"><span class="yr">${n.date}</span><span class="tt">${esc(n.ttl)}</span><span class="cat" data-c="${esc(n.tag)}">${esc(n.tag)}</span>${go}</a>`;
if ($('#homeNews')) $('#homeNews').innerHTML = NEWS.slice(0, 4).map(newsRow).join('');
if ($('#newsList')) $('#newsList').innerHTML = NEWS.map(newsRow).join('');

const NEWS_IMG = ['images/feat-2.jpg', 'images/feat-3.jpg', 'images/feat-1.jpg', 'images/bl-ito.jpg', 'images/bl-si.jpg', 'images/bl-infra.avif'];
if ($('#newsDetail')) {
  const i = Math.max(0, NEWS.findIndex(n => n.id === qs.get('id'))), n = NEWS[i];
  setHead(`<a href="index.html">Home</a><i>/</i><a href="news.html">News&amp;Notices</a><i>/</i><span>${esc(n.tag)}</span>`,
    `<h1 class="sm">${esc(n.ttl)}</h1>${chips([n.tag, n.date, '미래아이엔텍'])}`);
  $('#newsDetail').innerHTML = `<div class="dtl-body rv">
    <figure class="fig"><img src="${n.img || NEWS_IMG[i % NEWS_IMG.length]}" alt="${esc(n.ttl)} 관련 이미지"></figure>
    <h2>게시 내용</h2>${paras(n.body)}</div>`;
  $('#newsPager').innerHTML = `<a class="lnk" href="news.html"><span class="arr back"></span>목록으로</a><span class="mono">게시물 ${i + 1} / ${NEWS.length}</span>`;
  document.title = `${n.ttl} | 미래아이엔텍`;
}

/* projects list */
if ($('#projGrid')) {
  const FILTERS = [
    { f: 'k', lbl: 'Type', opts: ['SI', 'ITO', 'Solution', '기타', '인프라'] },
    { f: 'c', lbl: 'Industry', opts: ['공공', '기타', '기타 금융', '미디어/ENT', '보험', '서비스', '은행', '저축은행', '증권'] },
    { f: 's', lbl: 'Status', opts: ['진행중', '완료'] },
  ];
  const sel = { k: 'ALL', c: 'ALL', s: 'ALL' }, PER = 9;
  let page = 1;
  const fwrap = $('#projFilters'), grid = $('#projGrid'), pager = $('#projPager');
  const render = () => {
    fwrap.innerHTML = FILTERS.map(g => `<div class="fgrp"><em>${g.lbl}</em><div class="filters">${['ALL', ...g.opts].map(v => {
      const n = v === 'ALL' ? PROJECTS.length : PROJECTS.filter(p => p[g.f] === v).length;
      return `<button class="${v === sel[g.f] ? 'on' : ''}" data-f="${g.f}" data-v="${esc(v)}">${v === 'ALL' ? '전체' : esc(v)}<sup>${String(n).padStart(2, '0')}</sup></button>`;
    }).join('')}</div></div>`).join('');
    const rows = PROJECTS.map((p, i) => ({ ...p, i })).filter(p => FILTERS.every(g => sel[g.f] === 'ALL' || p[g.f] === sel[g.f]));
    const pages = Math.max(1, Math.ceil(rows.length / PER));
    page = Math.min(page, pages);
    $('#projCount').textContent = `${String(rows.length).padStart(2, '0')} PROJECTS`;
    $('#projEmpty').hidden = rows.length > 0;
    grid.innerHTML = rows.slice((page - 1) * PER, page * PER).map(p =>
      `<a class="pcard" href="project.html?i=${p.i}">
        <div class="pcard-meta"><span class="cat" data-c="${esc(p.k)}">${esc(p.k)}</span><span>${esc(p.c)}</span><span>${p.y}</span><span class="st${p.s === '진행중' ? ' on' : ''}">${esc(p.s)}</span></div>
        <h3>${esc(p.t)}</h3><span class="pcard-cl">${esc(p.cl)}</span>
        <div class="pcard-foot"><time>${esc(p.d)}</time>${go}</div></a>`).join('');
    let nums = '';
    for (let n = 1; n <= pages; n++) nums += `<button data-pg="${n}"${n === page ? ' class="on" aria-current="page"' : ''}>${n}</button>`;
    pager.innerHTML = pages > 1 ? `<button data-pg="${page - 1}" aria-label="이전 페이지"${page === 1 ? ' disabled' : ''}>&lsaquo;</button>${nums}<button data-pg="${page + 1}" aria-label="다음 페이지"${page === pages ? ' disabled' : ''}>&rsaquo;</button>` : '';
  };
  fwrap.onclick = e => { const b = e.target.closest('[data-f]'); if (!b) return; sel[b.dataset.f] = b.dataset.v; page = 1; render(); };
  pager.onclick = e => {
    const b = e.target.closest('[data-pg]'); if (!b || b.disabled) return;
    page = +b.dataset.pg; render();
    scrollTo({ top: fwrap.getBoundingClientRect().top + scrollY - 120, behavior: 'smooth' });
  };
  render();
}

/* project detail (PROJECTS 또는 TEAMS 의 팀 전용 프로젝트) */
const projBody = p => {
  const img = p.img || (p.k === 'SI' ? 'images/feat-3.jpg' : p.k === 'ITO' ? 'images/feat-2.jpg' : 'images/feat-1.jpg');
  return `<div class="dtl-body rv">
    <figure class="fig"><img src="${esc(img)}" alt="${esc(p.t)} 관련 이미지"><figcaption>${esc(p.t)}${p.cl ? ' — ' + esc(p.cl) : ''}</figcaption></figure>
    <h2>Project Overview</h2><p>${txt(p.ov)}</p>
    <h2>Description</h2><p>${txt(p.desc)}</p></div>
  <aside class="dtl-side rv d1"><dl>
    <div><dt>Type</dt><dd>${txt(p.k)}</dd></div>
    <div><dt>Status</dt><dd>${txt(p.s)}</dd></div>
    <div><dt>Name</dt><dd>${esc(p.t)}</dd></div>
    <div><dt>Period</dt><dd>${txt(p.p)}</dd></div>
    <div><dt>Client</dt><dd>${txt(p.cl)}</dd></div>
  </dl></aside>`;
};
if ($('#projDetail')) {
  const team = TEAMS.find(t => t.k === qs.get('team'));
  const p = team ? team.prj[+qs.get('i')] || team.prj[0] : PROJECTS[+qs.get('i')] || PROJECTS[0];
  const crumb = team
    ? `<a href="index.html">Home</a><i>/</i><a href="team.html">Team</a><i>/</i><a href="team-detail.html?k=${team.k}">${esc(team.ttl)}</a><i>/</i><span>Related Projects</span>`
    : `<a href="index.html">Home</a><i>/</i><a href="projects.html">Projects</a><i>/</i><span>${esc(p.k)}</span>`;
  setHead(crumb, `<h1 class="sm">${esc(p.t)}</h1>${chips([p.k, p.s, p.y].filter(Boolean))}`);
  $('#projDetail').innerHTML = projBody(p);
  document.title = `${p.t} | 미래아이엔텍`;
}

/* business line */
const blCard = (b, i) => `<a class="blc rv d${i % 2}" href="business-line.html?k=${b.k}">
  <div class="blc-img"><img src="${b.img}" alt="${esc(b.ttl)} 관련 이미지"></div>
  <div class="blc-in">
    <div class="biz-top"><span class="biz-no">${b.no}</span><span class="biz-tag">${esc(b.en).toUpperCase()}</span></div>
    <h3>${esc(b.ttl)}</h3><p>${esc(b.desc)}</p>
    <ul>${b.pts.slice(0, 4).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <span class="lnk">자세히 보기 <span class="arr"></span></span>
  </div></a>`;
if ($('#blGrid')) $('#blGrid').innerHTML = BL.map(blCard).join('');

if ($('#blDetail')) {
  const b = BL.find(x => x.k === qs.get('k')) || BL[0];
  setHead(`<a href="index.html">Home</a><i>/</i><a href="business.html">Business Line</a><i>/</i><span>${esc(b.en)}</span>`,
    `<h1>${esc(b.ttl)}</h1><p class="lead">${esc(b.desc)}</p>${chips([b.no, ...b.pts.slice(0, 4)])}`);
  const ph = `<p class="ph">${PH}</p>`;
  const feats = !b.feats ? '' : '<h2>Service Features</h2>' + (b.feats.length
    ? `<div class="filters" id="sfTabs">${b.feats.map((f, i) => `<button class="${i ? '' : 'on'}" data-sf="${i}">${esc(f.h)}</button>`).join('')}</div>`
      + b.feats.map((f, i) => `<div class="sfeat" data-sfp="${i}"${i ? ' hidden' : ''}>
          ${f.img ? `<figure class="fig"><img src="${esc(f.img)}" alt="${esc(f.h)} 관련 이미지"><figcaption>${esc(f.h)}</figcaption></figure>` : ''}
          ${f.p ? paras(f.p) : ''}${f.li && f.li.length ? list(f.li) : (f.p ? '' : ph)}</div>`).join('')
    : ph);
  const clients = !b.clients ? '' : '<h2>Main Clients</h2>' + (b.clients.length
    ? `<div class="logos">${b.clients.map(c => `<div title="${esc(c.n)}"><span>${esc(c.n)}</span>${c.img ? `<img src="${esc(c.img)}" alt="${esc(c.n)} 로고" onload="this.previousElementSibling.remove()" onerror="this.remove()">` : ''}</div>`).join('')}</div>`
    : ph);
  $('#blDetail').innerHTML = `<div class="dtl-body wide rv">
    <h2>${esc(b.en)} 개요</h2>${paras(b.sum)}
    ${b.secs.map(s => `<h2>${esc(s.h)}</h2>${paras(s.p)}${s.li && s.li.length ? list(s.li) : ''}`).join('')}
    <figure class="fig"><img src="${b.img}" alt="${esc(b.ttl)} 관련 이미지"><figcaption>${esc(b.ttl)} — ${esc(b.en)}</figcaption></figure>
    ${feats}${clients}</div>`;
  const tabs = $('#sfTabs');
  if (tabs) tabs.onclick = e => {
    const btn = e.target.closest('[data-sf]'); if (!btn) return;
    $$('[data-sf]', tabs).forEach(x => x.classList.toggle('on', x === btn));
    $$('[data-sfp]').forEach(p => p.hidden = p.dataset.sfp !== btn.dataset.sf);
  };
  document.title = `${b.ttl} | 미래아이엔텍`;
}

/* team detail */
if ($('#teamDetail')) {
  const t = TEAMS.find(x => x.k === qs.get('k')) || TEAMS[0];
  const name = t.name ? `${t.name} ${t.ttl}` : t.ttl;
  setHead(`<a href="index.html">Home</a><i>/</i><a href="team.html">Team</a><i>/</i><span>${esc(t.ttl)}</span>`,
    `<h1>${esc(name)}</h1><p class="lead">${esc(t.en)}</p>${chips([t.k === 'ceo' ? 'CEO' : 'Team', '미래아이엔텍'])}`);
  const intro = t.k === 'ceo'
    ? `<div class="ceo"><figure class="ceo-ph rv"><img src="${t.img}" alt="미래아이엔텍 ${esc(name)} 사진"><figcaption>${esc(t.name)} · 대표이사 (CEO)</figcaption></figure>
       <div class="dtl-body rv d1">${t.bio.map(s => `<h2>${esc(s.h)}</h2>${list(s.li)}`).join('')}</div></div>`
    : `<div class="dtl-body wide rv"><h2>Team Introduction</h2>${paras(t.intro)}<h2>Main Functions</h2>${list(t.funcs)}<h2>Key Capabilities</h2>${list(t.caps)}</div>`;
  const LIMIT = 5;
  const rows = t.prj.map((p, i) => {
    const pi = projIdx(p.t);
    return `<a class="prow rp${i >= LIMIT ? ' hid' : ''}" href="${pi >= 0 ? `project.html?i=${pi}` : `project.html?team=${t.k}&i=${i}`}"><span class="yr">${p.y}</span><span class="tt">${esc(p.t)}</span>${go}</a>`;
  }).join('');
  const rp = t.prj.length
    ? `<h2 class="rp-h">Related Projects <sup>${String(t.prj.length).padStart(2, '0')}</sup></h2><div class="plist">${rows}</div>
       ${t.prj.length > LIMIT ? '<div class="more"><button class="btn" id="rpMore">더보기 <span class="arr"></span></button></div>' : ''}`
    : `<h2 class="rp-h">Related Projects</h2><div class="rp-empty"><b>프로젝트 소개를 준비하고 있습니다.</b><p>${esc(t.ttl)}의 다양한 연구 활동과 프로젝트를 소개할 예정입니다. 앞으로 이곳에서 연구소의 새로운 소식과 활동을 만나보실 수 있습니다.</p></div>`;
  $('#teamDetail').innerHTML = `${intro}<div class="rp-wrap rv">${rp}</div>`;
  const more = $('#rpMore');
  if (more) more.onclick = () => { $$('.rp.hid').forEach(r => r.classList.remove('hid')); more.parentElement.remove(); };
  document.title = `${name} | 미래아이엔텍`;
}

/* contact form (시안: 실제 전송 없음) */
const frm = $('#contactForm');
if (frm) frm.onsubmit = e => { e.preventDefault(); $('#frmMsg').textContent = '시안 화면이므로 실제 전송은 되지 않습니다.'; };

/* ── Reveal + counters ── */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('on'); io.unobserve(e.target);
}), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
$$('.rv').forEach(el => io.observe(el));

const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, to = +el.dataset.count, t0 = performance.now(), dur = 1400;
  const step = t => { const k = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - k, 3))); el.textContent = String(v).padStart(2, '0'); if (k < 1) requestAnimationFrame(step); };
  reduce ? el.textContent = String(to).padStart(2, '0') : requestAnimationFrame(step);
  cio.unobserve(el);
}), { threshold: 0.5 });
$$('[data-count]').forEach(el => cio.observe(el));
})();
