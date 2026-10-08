import { CountUp } from '@/frontend/components/ui/CountUp';
import { Eyebrow } from '@/frontend/components/ui/Eyebrow';
import { Facts } from '@/frontend/components/ui/Facts';
import { Section } from '@/frontend/components/ui/Section';
import { SceneCanvas } from '@/frontend/features/canvas/components/SceneCanvas';

/** 메인 Financial IT Partner: 점 구체 캔버스 + 지표 */
export function PartnerSection() {
  return (
    <Section tone="dark" id="partner" className="overflow-hidden">
      <div className="grid grid-cols-12 items-center gap-6">
        <div className="relative z-[1] col-[1/6] max-tab:col-span-full">
          <Eyebrow tone="dark" className="rv">
            Financial IT Partner
          </Eyebrow>
          <h2 className="rv d1 mt-8 text-[clamp(34px,4.2vw,64px)] leading-[1.16] font-bold tracking-[-.04em]">
            금융권의 복잡한
            <br />
            요구사항을 <em className="text-accent not-italic">이해하는</em>
            <br />
            전문 파트너
          </h2>
          <p className="rv d2 mt-7 max-w-[46ch] leading-[1.85] text-muted-d">
            체계적인 방법론, 정형화된 프로세스, 최신 기술로 고품격 IT 서비스를 제공합니다. 서비스 수준 관리 체계를 정착시키기
            위한 단계적인 SLA 적용 방안을 수립하여 체계적이고 효율적인 서비스를 제공합니다.
          </p>
        </div>
        <div className="rv d2 relative col-[6/13] aspect-square max-h-[720px] w-full justify-self-end max-tab:col-span-full max-tab:max-w-[640px] max-tab:justify-self-center">
          <SceneCanvas scene="tech" className="block size-full" />
        </div>
      </div>
      <Facts
        items={[
          { label: 'Established', value: '2003', description: '설립 (금융 IT 전문)' },
          {
            label: 'Experience',
            value: (
              <>
                <CountUp to={20} />
                <small>년+</small>
              </>
            ),
            description: '금융 IT 수행 경험',
          },
          { label: 'Business Lines', value: <CountUp to={4} />, description: '핵심 사업 영역' },
          { label: 'Service Level', value: 'SLA', description: '서비스 수준 관리 체계' },
        ]}
      />
    </Section>
  );
}
