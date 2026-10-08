import "server-only";

// 사업 영역. features/clients 가 없으면 섹션을 숨기고, 빈 배열이면 placeholder 를 표시한다
// 고객사 logo 파일이 없으면 회사명이 표시된다
export const BUSINESS_LINES = [
  {
    slug: "ito",
    no: "01",
    title: "IT OUTSOURCING",
    enTitle: "IT Outsourcing",
    image: "/images/bl-ito.jpg",
    description: "안정적이고 효율적인 IT 운영 서비스를 제공합니다.",
    points: [
      "어플리케이션 유지보수",
      "진단 / 개선",
      "성능 향상",
      "SLA / SLM"
    ],
    summary: [
      "IT Outsourcing은 고객의 시스템 기능을 외부 사업자에게 위탁하여 지속적으로 관리하고 운영하는 과정입니다.",
      "미래아이엔텍은 고객사의 사업 목적 및 상황에 맞게 안정적이고 효율적인 운영 서비스를 제공하며, IT 업무 프로세스의 선진화/고도화 및 최적화된 유지보수 비용 확보를 통한 효율적 운영을 지원합니다.",
      "미래아이엔텍은 지난 21년 간의 다양한 프로젝트 경험을 토대로 금융 분야에 대한 깊이 있는 이해도와 전문적인 기술력을 갖추고 있으며, 이를 바탕으로 광범위한 산업 영역에서 IT Outsourcing 서비스를 제공하고 있습니다.",
      "또한 각 분야에 특화된 전문 인력을 보유하고 있으며, 이를 통해 고객의 요구 사항을 정확히 파악하고 가장 효율적인 솔루션을 제공하기 위해 최선을 다하여 고객사에 안정적인 전산 시스템 운영을 제공하며 고객의 업무 생산성 향상에 기여하고 있습니다."
    ],
    sections: [
      {
        heading: "어플리케이션 운영 서비스",
        paragraphs: [
          "미래아이엔텍은 금융산업의 시스템 구축 및 운영 경험을 바탕으로 체계적인 방법론, 정형화된 프로세스, 최신 기술로 고품격 어플리케이션 운영 서비스를 제공합니다."
        ],
        items: [
          "어플리케이션 유지보수 — 어플리케이션에 대한 지속적인 관리, 유지보수 서비스",
          "어플리케이션 진단/개선 — 어플리케이션 환경 평가를 통한 최적의 개선 서비스",
          "어플리케이션 성능 향상 — 지속적인 튜닝, 결함 수정 등 성능 향상 서비스"
        ]
      },
      {
        heading: "Mirae I&Tec Application Outsourcing Framework",
        paragraphs: [
          "미래아이엔텍은 풍부한 경험을 토대로 아웃소싱 계획부터, 실제 수행, 종료에 이르기까지 전 영역에 대한 검증된 아웃소싱 방법론을 수립하여 적용하고 있습니다.",
          "또한 서비스 수준 관리 체계를 정착시키고 체계적으로 발전시키기 위한 단계적인 SLA 적용 방안이 수립하여 체계적이고 효율적인 서비스를 제공합니다."
        ],
        items: []
      }
    ],
    features: [
      {
        heading: "프로젝트 수행경험",
        image: "/images/feat-1.jpg",
        paragraphs: [],
        items: [
          "2003년 설립 이후 20년 이상의 업무 수행 경험을 보유",
          "흥국생명, IBK기업은행, 현대차증권, SC제일은행, SBI저축은행, 애큐온캐피탈 등 금융권 고객과의 다양한 사업경험 보유",
          "금융권 경력을 바탕으로 고객별 비즈니스와 IT환경에 최적화된 서비스 제공",
          "기존 운영 우수 인력을 중심으로 한 조직구성으로 서비스 연속성 및 품질을 보장"
        ]
      },
      {
        heading: "분야별 전문 인력 보유",
        image: "/images/feat-2.jpg",
        paragraphs: [],
        items: [
          "인력 관리 프로그램(MIRAE_IN)을 활용하여 풍부한 인력을 적기 적소에 지원",
          "각 분야별 소싱 전담팀을 구성하여 적극적인 업무협조",
          "전문 인력에 의해 발굴되고 검증된 신기술 및 솔루션을 적용한 서비스 제공",
          "협력업체 관리 시스템을 통해 검증된 협력업체의 기술, 솔루션, 인력의 활용"
        ]
      },
      {
        heading: "고객 중심 맞춤 서비스",
        image: "/images/feat-3.jpg",
        paragraphs: [],
        items: [
          "종합 IT 전문서비스 회사로써 인력관리(미래인 솔루션), 프로젝트 관리(SR, 요구사항, SLA, 업무량), KPI 등 솔루션 역량을 동원하여 전사적 지원 체계를 활용한 전방위적 고객 사업 지원 가능",
          "서비스수준협약(SLA)을 통해 IT서비스의 품질수준 보장\n명확한 이행을 위한 서비스 수준 측정, 보고, 개선 활동 등의 서비스 수준관리(SLM) 제공"
        ]
      }
    ],
    clients: [
      {
        name: "IBK기업은행",
        logo: "/images/clients/ibk.png"
      },
      {
        name: "MG새마을금고",
        logo: "/images/clients/mg.png"
      },
      {
        name: "한국은행",
        logo: "/images/clients/bok.png"
      },
      {
        name: "SBI저축은행",
        logo: "/images/clients/sbi.png"
      },
      {
        name: "흥국생명",
        logo: "/images/clients/heungkuk.png"
      },
      {
        name: "현대차증권",
        logo: "/images/clients/hyundai-sec.png"
      },
      {
        name: "애큐온캐피탈",
        logo: "/images/clients/acuon.png"
      },
      {
        name: "한국투자캐피탈",
        logo: "/images/clients/kic.png"
      },
      {
        name: "삼성꿈장학재단",
        logo: "/images/clients/samsung-dream.png"
      },
      {
        name: "현대카드",
        logo: "/images/clients/hyundai-card.png"
      },
      {
        name: "예금보험공사",
        logo: "/images/clients/kdic.png"
      },
      {
        name: "카카오페이",
        logo: "/images/clients/kakaopay.png"
      },
      {
        name: "IBK시스템",
        logo: "/images/clients/ibk-system.png"
      },
      {
        name: "CJ대한통운",
        logo: "/images/clients/cj-logistics.png"
      },
      {
        name: "CJ올리브네트웍스",
        logo: "/images/clients/cj-olivenetworks.png"
      },
      {
        name: "나이키",
        logo: "/images/clients/nike.png"
      },
      {
        name: "산림조합중앙회",
        logo: "/images/clients/nfcf.png"
      }
    ]
  },
  {
    slug: "si",
    no: "02",
    title: "SYSTEM INTEGRATION",
    enTitle: "System Integration",
    image: "/images/bl-si.jpg",
    description: "고객에게 최적화된 정보 시스템과 전문적이고 효율적인 IT 솔루션을 제공합니다.",
    points: [
      "정보화 개발",
      "시스템 통합",
      "인프라 구축",
      "업무 프로세스 개선"
    ],
    summary: [
      "시스템 통합(System Integration, SI)은 다양한 기술 시스템과 비즈니스 프로세스를 통합하여 조직의 효율성을 극대화하는 과정입니다. 미래아이엔텍은 금융부터 제조, 서비스업까지 다양한 산업분야에서 IT 환경의 변화에 늘 발맞추며 고객들의 다양하고 폭넓은 요구사항을 충족시키기 위해 최선을 다하고 있습니다."
    ],
    sections: [
      {
        heading: "산업별 최적화된 시스템 구축",
        paragraphs: [
          "특히 금융 기관을 중심으로 다양한 업종 및 규모의 고객층을 대상으로 정보화 개발 및 인프라 구축 등 IT 솔루션을 제공하고 있습니다. 각 산업의 다양한 요구에 맞춰 솔루션을 개발하고 적용함으로써 고객의 비즈니스 프로세스를 향상시키고 경쟁력을 강화합니다."
        ],
        items: []
      },
      {
        heading: "지속적인 기술 연구와 대응",
        paragraphs: [
          "이를 위해 핵심 기술을 지속적으로 연구 및 개발하고, 업계의 트렌드를 주시하며 고객의 요구에 늘 빠르고 정확하게 대응하여 항상 최상의 서비스를 제공하기 위해 노력하고 있습니다."
        ],
        items: []
      }
    ],
    clients: [
      {
        name: "IBK기업은행",
        logo: "/images/clients/ibk.png"
      },
      {
        name: "MG새마을금고",
        logo: "/images/clients/mg.png"
      },
      {
        name: "한국은행",
        logo: "/images/clients/bok.png"
      },
      {
        name: "SBI저축은행",
        logo: "/images/clients/sbi.png"
      },
      {
        name: "흥국생명",
        logo: "/images/clients/heungkuk.png"
      },
      {
        name: "현대차증권",
        logo: "/images/clients/hyundai-sec.png"
      },
      {
        name: "애큐온캐피탈",
        logo: "/images/clients/acuon.png"
      },
      {
        name: "한국투자캐피탈",
        logo: "/images/clients/kic.png"
      },
      {
        name: "삼성꿈장학재단",
        logo: "/images/clients/samsung-dream.png"
      },
      {
        name: "현대카드",
        logo: "/images/clients/hyundai-card.png"
      },
      {
        name: "예금보험공사",
        logo: "/images/clients/kdic.png"
      },
      {
        name: "카카오페이",
        logo: "/images/clients/kakaopay.png"
      },
      {
        name: "IBK시스템",
        logo: "/images/clients/ibk-system.png"
      },
      {
        name: "CJ대한통운",
        logo: "/images/clients/cj-logistics.png"
      },
      {
        name: "CJ올리브네트웍스",
        logo: "/images/clients/cj-olivenetworks.png"
      },
      {
        name: "나이키",
        logo: "/images/clients/nike.png"
      },
      {
        name: "산림조합중앙회",
        logo: "/images/clients/nfcf.png"
      }
    ]
  },
  {
    slug: "infra",
    no: "03",
    title: "INFRASTRUCTURE",
    enTitle: "Infrastructure",
    image: "/images/bl-infra.avif",
    description: "고객이 필요로 하는 최적의 IT 인프라 서비스를 제공합니다.",
    points: [
      "IT 인프라 구축",
      "IT 인프라 운영관리",
      "Cloud",
      "보안 장비",
      "네트워크"
    ],
    summary: [
      "미래아이엔텍은 IT 인프라 컨설팅, 구축, 운영, 유지보수 서비스를 제공하는 전문가 집단입니다. 국내외 IT 제조 기업들과의 유통 및 기술 협력 관계를 맺고 고객 환경에 적합한 H/W(Server, Storage, Network, PC, 보안 장비, 주변 기기 등)와 S/W(운영체제, 애플리케이션, 관리 도구 등)의 모든 영역을 통합하여 최적의 고객 맞춤형 IT 인프라 제품과 솔루션을 제공합니다."
    ],
    sections: [],
    features: [
      {
        heading: "IT 인프라 구축",
        image: "/images/feat-1.jpg",
        paragraphs: [
          "현대적이고 안정적인 IT 인프라 구축을 위해 최신 기술과 전문 지식을 활용합니다. 비즈니스 요구 사항에 맞춰 설계되며, 확장성과 성능을 극대화하여 업무 효율성을 높입니다. 전문가들로 구성된 팀은 네트워크, 서버, 클라우드, 보안 등 다양한 영역에서 노하우를 보유하고 있습니다."
        ],
        items: []
      },
      {
        heading: "IT 인프라 운영관리",
        image: "/images/feat-2.jpg",
        paragraphs: [
          "다양한 산업 및 규모의 고객을 대상으로 맞춤형 IT 인프라 운영 서비스를 제공합니다."
        ],
        items: [
          "산업에 특화된 솔루션 — 고객의 산업 특성과 규제 사항에 맞춘 인프라 최적화",
          "규모에 맞는 유연성 — 소기업부터 대기업까지 성장과 변화에 유연하게 대응",
          "최신 기술 및 업계 표준 준수 — 최신 기술 동향과 업계 표준을 반영",
          "보안 및 규정 준수 — 데이터 기밀성과 무결성 보장",
          "전문가의 지원과 관리 — 전문 지식과 경험을 보유한 팀의 지속적 관리"
        ]
      },
      {
        heading: "Cloud",
        image: "/images/feat-3.jpg",
        paragraphs: [
          "최적의 클라우드 구축 솔루션을 제공하여 비즈니스의 혁신과 성장을 지원합니다. 고객의 특정 요구와 목표에 맞춘 맞춤형 클라우드 인프라를 제공하며, 효율적인 자원 관리와 비용 절감을 실현합니다. 전문 엔지니어 팀이 초기 설계부터 구축, 운영, 유지보수까지 전 과정을 지원합니다."
        ],
        items: []
      }
    ],
    clients: [
      {
        name: "한국투자저축은행",
        logo: "/images/clients/kis-savings.png"
      },
      {
        name: "한국투자캐피탈",
        logo: "/images/clients/kic.png"
      }
    ]
  },
  {
    slug: "solution",
    no: "04",
    title: "SOLUTION",
    enTitle: "Solution",
    image: "/images/bl-solution.jpg",
    description: "고객이 필요로 하는 사업관리 및 운영 전반을 통합한 전문적인 서비스를 제공합니다.",
    points: [
      "DB 암호화 (CubeOne™)",
      "ERP",
      "IT 자산관리",
      "End-User Device"
    ],
    summary: [
      "미래아이엔텍의 Solution 서비스는 기업 내 IT 인프라와 업무 시스템 전반을 안정적이고 효율적으로 운영할 수 있도록 맞춤형 기술 솔루션과 전문 컨설팅을 제공합니다. 전문 엔지니어와 체계적인 운영 프로세스를 통해 PC, Network, Server, ERP, Software 등 다양한 영역에서 발생하는 기술적 요구 사항에 신속하고 정확하게 대응하도록 설계된 통합 솔루션 서비스를 제공합니다."
    ],
    sections: [],
    features: [
      {
        heading: "CubeOne™ Plug-In",
        image: "/images/feat-1.jpg",
        paragraphs: [],
        items: [
          "Application 독립성\nApplication에서 사용하는 SQL의 수정을 최소한으로 하여 암호화 적용",
          "무중단 구축\n초기 암호화 적용 및 암호화 컬럼 추가 시 무중단 암호화 적용(Oracle Version)",
          "암호화 색인 검색\n암호화 되어 저장된 Index 검색기능, 암호화 적용 후 Application 성능 보장",
          "빠른 암호화 성능\n암/복호화 시 시스템 부하를 최소화 하는 구조 (타 제품 대비 2~3배 성능)"
        ]
      },
      {
        heading: "CubeOne™ API",
        image: "/images/feat-2.jpg",
        paragraphs: [],
        items: [
          "DBMS에 종속적이지 않는 이기종 DBMS간의 암호화 기능 제공",
          "간단한 Daemon-less 서비스 구조로서 무장애 구조 및 고성능 (경쟁제품 대비 약 50% 이상 빠름)",
          "DBMS서버에 Hybrid(Plug-In & API) 방식 적용 시 Local 배치 업무 시 총 수행시간 단축",
          "Docker와 Kubernetes와 같은 컨테이너 기반 가상화 환경에서 CubeOne 관리 데몬 없이 실행 모듈 기반의 Daemonless API 제공으로 컨테이너 가상화 환경에서 최적의 암호화 환경 구성 지원"
        ]
      },
      {
        heading: "CubeOne™ SAP",
        image: "/images/feat-3.jpg",
        paragraphs: [],
        items: [
          "자유로운 SAP 비지니스 솔루션 업그레이드 가능 (Integrity 보장)",
          "SAP Standard 수정 불필요",
          "암호화 데이터 모니터링 기능제공",
          "암호화 설정 및 적용의 모든 자동화 처리로 암호화로 인한 혼란 없이 편리하고 안전하게 SAP 운영 가능"
        ]
      }
    ],
    clients: [
      {
        name: "나비엔",
        logo: "/images/clients/navien.png"
      }
    ]
  }
];
