import Link from 'next/link';

import { asset } from '@/frontend/lib/asset';
import { COMPANY_INFO, NAV_GROUPS } from '@/shared/constants/navigation';
import { ROUTES } from '@/shared/constants/routes';

const linkClass = 'text-[14px] text-muted-d transition-colors duration-300 hover:text-paper';

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink pt-[72px] pb-9 text-paper">
      <div className="wrap">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[420px]">
            <Link href={ROUTES.home} className="flex shrink-0 items-center gap-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element -- 정적 내보내기(이미지 최적화 미사용) */}
              <img className="block h-6 w-auto max-mob:h-5" src={asset('/images/logo-white.png')} alt="MRINT" />
              <span className="border-l border-current pl-3.5 text-[13px] leading-none font-semibold tracking-[-.02em] opacity-85">
                ㈜미래아이엔텍
              </span>
            </Link>
            <p className="mt-6 text-[14px] leading-[1.8] text-muted-d">
              (주)미래아이엔텍은 2003년 설립 이래 금융 IT에 특화된 전문기업으로 SI·ITO·컨설팅 등 IT 전 분야에 걸쳐 차별화된
              서비스를 제공합니다.
            </p>
          </div>
          <nav className="flex flex-wrap gap-[clamp(32px,5vw,80px)]">
            {NAV_GROUPS.map((g) => (
              <div key={g.key} className="grid content-start gap-2.5">
                <span className="mono mb-1.5 text-[11px] text-accent">{g.label === 'COMPANY' ? 'Company' : 'Business'}</span>
                {g.items.map((item) => (
                  <Link key={item.label} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="grid content-start gap-2.5">
              <span className="mono mb-1.5 text-[11px] text-accent">Contact</span>
              <Link href={ROUTES.contact} className={linkClass}>
                문의하기
              </Link>
              <a href={COMPANY_INFO.telHref} className={linkClass}>
                T. {COMPANY_INFO.tel}
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className={linkClass}>
                {COMPANY_INFO.email}
              </a>
            </div>
          </nav>
        </div>
        <div
          aria-hidden="true"
          className="mt-20 mb-10 text-[clamp(90px,21vw,360px)] leading-[.8] font-black tracking-[-.07em] whitespace-nowrap text-ink-3 select-none"
        >
          mr
          <i className="mr-[.02em] ml-[.04em] inline-block h-[.36em] w-[.14em] -skew-x-[22deg] bg-accent align-[-.02em]" />
          nt
        </div>
        <div className="flex flex-wrap justify-between gap-6 border-t border-line-d pt-6 font-mono text-[11px] tracking-[.04em] text-muted-d">
          <span>© 2026 MIRAE I&amp;TEC CO., LTD. ALL RIGHTS RESERVED.</span>
          <span>
            대표이사 {COMPANY_INFO.ceo} · {COMPANY_INFO.address} · F. {COMPANY_INFO.fax}
          </span>
        </div>
      </div>
    </footer>
  );
}
