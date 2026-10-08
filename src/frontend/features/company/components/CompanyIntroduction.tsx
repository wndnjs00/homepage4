import { ButtonLink } from '@/frontend/components/ui/Button';
import { DetailBody, DetailLayout, DetailSide } from '@/frontend/components/ui/Detail';
import { Figure } from '@/frontend/components/ui/Figure';
import { Section, SectionHead } from '@/frontend/components/ui/Section';
import { COMPANY_INFO } from '@/shared/constants/navigation';
import { ROUTES } from '@/shared/constants/routes';

const VALUES = [
  ['고객 중심', '고객의 사업 목적과 상황에 맞춘 최적화된 운영·구축 서비스를 제공합니다.'],
  ['전문성', '금융 분야에 대한 깊이 있는 이해도와 분야별 전문 인력을 보유하고 있습니다.'],
  ['신뢰', '20년 이상의 업무 수행 경험과 검증된 방법론으로 안정적인 서비스를 보장합니다.'],
  ['지속성', '기존 운영 우수 인력을 중심으로 조직을 구성해 서비스 연속성과 품질을 유지합니다.'],
];

/** 회사소개 01 기업 소개 */
export function CompanyIntroduction() {
  return (
    <Section tone="white">
      <SectionHead eyebrow="01 — Introduction" title="기업 소개" />
      <DetailLayout
        body={
          <DetailBody>
            <h2>(주)미래아이엔텍은</h2>
            <p>
              최고의 기술력과 비즈니스에 대한 깊이 있는 이해를 바탕으로 고객의 Digital transformation을 실현합니다. IT
              인프라부터 사용자 지원을 위한 Help Desk까지 IT 환경 전반을 구축하고 관리하여, 고객의 생산성 및 효율성을
              극대화하기 위한 솔루션을 제공합니다.
            </p>
            <p>
              우리는 2003년부터 다양한 고객들과 디지털 전환 작업을 함께하며 쌓인 노하우와 신뢰를 바탕으로 컨설팅, ITO,
              하드웨어, 네트워크 및 보안 등 고객이 필요로 하는 모든 IT 서비스를 제공하고 있습니다.
            </p>
            <Figure src="/images/company-detail.jpg" alt="유리와 철골로 구성된 현대 건축물의 내부 구조" />
            <h2>핵심 가치와 비전</h2>
            <ul>
              {VALUES.map(([title, text]) => (
                <li key={title}>
                  <b>{title}</b> — {text}
                </li>
              ))}
            </ul>
            <ButtonLink href={ROUTES.team} variant="ink">
              조직 및 팀 소개 보기
            </ButtonLink>
          </DetailBody>
        }
        side={
          <DetailSide
            rows={[
              { label: 'Company', value: '주식회사 미래아이엔텍 (MRINT)' },
              { label: 'Established', value: '2003. 12' },
              { label: 'Business', value: 'IT Outsourcing · System Integration · Infrastructure · Solution' },
              { label: 'Industry', value: '금융권 및 공공기관 IT 시스템 구축 · 운영' },
              { label: 'Representative', value: `${COMPANY_INFO.ceo} (대표이사)` },
              { label: 'Address', value: COMPANY_INFO.address },
              {
                label: 'Contact',
                value: (
                  <>
                    T. {COMPANY_INFO.tel}
                    <br />
                    F. {COMPANY_INFO.fax}
                    <br />
                    E. {COMPANY_INFO.email}
                  </>
                ),
              },
            ]}
          />
        }
      />
    </Section>
  );
}
