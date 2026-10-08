import Link from 'next/link';

import { Arrow } from '@/frontend/components/ui/Button';
import { Glyph, type GlyphKind } from '@/frontend/components/ui/Glyph';
import { ROUTES } from '@/shared/constants/routes';

interface TeamCard {
  slug: string;
  glyph: GlyphKind;
  title: string;
  enTitle: string;
  text: string;
  tags: string[];
}

const TEAM_CARDS: TeamCard[] = [
  {
    slug: 'ito',
    glyph: 'c',
    title: 'ITO 팀',
    enTitle: 'IT Outsourcing Team',
    text: '고객 시스템의 운영과 유지보수를 전담합니다. 어플리케이션 유지보수, 진단·개선, 성능 향상을 통해 안정적인 전산 시스템 운영을 제공합니다.',
    tags: ['어플리케이션 유지보수', '진단 / 개선', '성능 향상', 'SLA / SLM'],
  },
  {
    slug: 'si',
    glyph: 'b',
    title: 'SI 팀',
    enTitle: 'System Integration Team',
    text: '금융을 비롯한 다양한 산업 분야의 정보화 개발과 시스템 통합을 수행합니다. 고객의 비즈니스 프로세스를 개선하고 경쟁력을 강화합니다.',
    tags: ['정보화 개발', '시스템 통합', '인프라 구축', '업무 프로세스 개선'],
  },
  {
    slug: 'infra',
    glyph: 'f',
    title: '인프라 팀',
    enTitle: 'Infrastructure Maintenance Team',
    text: 'IT 인프라 컨설팅·구축·운영·유지보수 전문 조직입니다. 서버·스토리지·네트워크·보안 장비와 클라우드 영역을 담당합니다.',
    tags: ['IT 인프라 구축', 'IT 인프라 운영관리', 'Cloud', '보안 장비'],
  },
  {
    slug: 'solution',
    glyph: 'e',
    title: '솔루션 팀',
    enTitle: 'Solution Team',
    text: '사업관리 및 운영 전반을 통합한 전문 서비스를 제공합니다. DB암호화 솔루션과 ERP·IT 자산·보안 체계 구축을 담당합니다.',
    tags: ['DB 암호화 (CubeOne™)', 'ERP', 'IT 자산관리', 'End-User Device'],
  },
  {
    slug: 'lab',
    glyph: 'd',
    title: '미래기술연구소',
    enTitle: 'Future Technology Research Center',
    text: '신기술과 솔루션을 발굴·검증하여 서비스에 적용합니다. 검증된 기술을 고객 환경에 맞게 적용해 서비스 경쟁력을 높입니다.',
    tags: ['신기술 발굴', '솔루션 검증', '기술 적용'],
  },
];

/** 팀 페이지 02 조직 구성: 5개 팀 + 문의 카드 */
export function TeamGrid() {
  return (
    <div className="biz-grid">
      {TEAM_CARDS.map((t, i) => (
        <Link key={t.slug} className={`biz-cell rv d${i % 3}`} href={ROUTES.teamDetail(t.slug)}>
          <div className="biz-top">
            <span className="biz-no">0{i + 1}</span>
            <span className="biz-tag">{t.slug.toUpperCase()}</span>
          </div>
          <Glyph kind={t.glyph} />
          <h3>
            <small>{t.enTitle}</small>
            {t.title}
          </h3>
          <p>{t.text}</p>
          <ul className="tags">
            {t.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </Link>
      ))}
      <Link className="biz-cell biz-cta rv d2" href={ROUTES.contact}>
        <div className="biz-top">
          <span className="biz-no">→</span>
          <span className="biz-tag">CONTACT</span>
        </div>
        <h3>
          <small>Work with us</small>함께할 파트너를
          <br />
          기다립니다
        </h3>
        <p>시스템 구축·운영 유지보수·인프라·솔루션 문의를 남겨주시면 담당자가 검토 후 연락드립니다.</p>
        <span className="lnk">
          문의하기 <Arrow />
        </span>
      </Link>
    </div>
  );
}
