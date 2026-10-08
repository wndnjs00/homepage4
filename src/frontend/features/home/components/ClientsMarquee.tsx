import { Eyebrow } from '@/frontend/components/ui/Eyebrow';

/** 메인 Main Clients: 반대 방향으로 흐르는 고객사명 두 줄 */
export function ClientsMarquee({ rows }: { rows: string[][] }) {
  return (
    <section className="bg-paper py-[clamp(40px,5vw,64px)]">
      <div className="wrap grid grid-cols-[minmax(0,3fr)_minmax(0,9fr)] items-center gap-6 max-tab:grid-cols-[minmax(0,1fr)]">
        <div>
          <Eyebrow>Main Clients</Eyebrow>
          <p className="mt-3.5 text-[13px] leading-[1.7] text-muted">금융권 중심의 검증된 고객사</p>
        </div>
        <div>
          {rows.map((names, i) => (
            <div key={i} className="marq marq-row">
              <div className="marq-track">
                {/* 끊김 없이 이어지도록 두 번 반복 */}
                {[...names, ...names].map((n, j) => (
                  <span key={j}>{n}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
