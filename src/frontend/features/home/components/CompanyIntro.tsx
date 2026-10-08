import { ArrowLink } from '@/frontend/components/ui/Button';
import { Figure } from '@/frontend/components/ui/Figure';
import { Section, SectionHead } from '@/frontend/components/ui/Section';
import { ROUTES } from '@/shared/constants/routes';

const VALUES = [
  {
    title: '금융 도메인에 대한 깊이 있는 이해',
    en: 'Financial Domain',
    text: '은행·보험·저축은행·캐피탈 등 금융 전 업권의 시스템 구축과 운영 경험을 바탕으로, 복잡한 금융 업무 요구사항을 정확하게 해석하고 안정적으로 구현합니다.',
  },
  {
    title: '검증된 프로젝트 수행 경험',
    en: 'Proven Delivery',
    text: '2003년 설립 이후 20년 이상의 업무 수행 경험을 보유하고 있으며, 흥국생명·IBK기업은행·현대차증권·SC제일은행·SBI저축은행·애큐온캐피탈 등 금융권 고객과 다양한 사업을 수행해 왔습니다.',
  },
  {
    title: '서비스 연속성과 품질을 보장하는 조직',
    en: 'Continuity',
    text: '기존 운영 우수 인력을 중심으로 조직을 구성해 서비스 연속성과 품질을 보장하고, 인력 관리 프로그램(MIRAE_IN)과 협력업체 관리 시스템을 통해 적기 적소에 전문 인력을 지원합니다.',
  },
];

/** 메인 01 Company: 소개 문단 + 핵심 가치 3개 */
export function CompanyIntro() {
  return (
    <Section tone="white" id="company">
      <SectionHead eyebrow="01 — Company" title={<>금융의 안정성과<br />디지털 혁신을 함께 설계합니다</>} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-[1/6] max-tab:col-span-full">
          <p className="rv text-[clamp(18px,1.45vw,22px)] leading-[1.75] font-medium tracking-[-.025em]">
            (주)미래아이엔텍은 최고의 기술력과 비즈니스에 대한 깊이 있는 이해를 바탕으로 고객의 Digital transformation을
            실현합니다. IT 인프라부터 사용자 지원을 위한 Help Desk까지 IT 환경 전반을 구축하고 관리하여 고객의 생산성과
            효율성을 극대화하기 위한 솔루션을 제공합니다.
          </p>
          <p className="rv d1 mt-5 text-muted">
            2003년부터 다양한 고객과 디지털 전환 작업을 함께하며 쌓은 노하우와 신뢰를 바탕으로 컨설팅, ITO, 하드웨어, 네트워크
            및 보안 등 고객이 필요로 하는 모든 IT 서비스를 제공하고 있습니다.
          </p>
          <Figure className="rv d2" src="/images/company-intro.jpg" alt="현대적인 오피스 빌딩의 유리 외벽 반사 이미지" />
          <ArrowLink className="rv" href={ROUTES.company}>
            회사 소개 자세히 보기
          </ArrowLink>
        </div>
        <ol className="comp-list col-[7/13] max-tab:col-span-full max-tab:mt-10">
          {VALUES.map((v, i) => (
            <li key={v.title} className="comp-item rv">
              <span className="n">0{i + 1}</span>
              <div>
                <h3>
                  {v.title}
                  <small>{v.en}</small>
                </h3>
                <p>{v.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
