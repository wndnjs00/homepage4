import "server-only";

// 수행 프로젝트 (자사 공개 프로젝트 목록)
export const PROJECTS = [
  {
    id: 1,
    title: "농협은행 NEO 계정계 차세대 구축 / 외국환 개선",
    noticeDate: "2026.02.11",
    year: 2026,
    industry: "은행",
    type: "SI",
    status: "진행중",
    client: "농협은행",
    period: "2026.02 ~ 진행중"
  },
  {
    id: 2,
    title: "흥국화재 IT 어플리케이션 유지보수",
    noticeDate: "2026.02.11",
    year: 2026,
    industry: "보험",
    type: "ITO",
    status: "진행중",
    client: "흥국화재",
    period: "2026.04 ~ 2026.12",
    overview: "장기보험, 일반보험/보상 등 보험 업무 애플리케이션 유지보수"
  },
  {
    id: 3,
    title: "한국투자저축은행 ‘계정·채널 통합관리’ 정보시스템 유지보수",
    noticeDate: "2025.12.02",
    year: 2026,
    industry: "저축은행",
    type: "ITO",
    status: "진행중",
    client: "한국투자저축은행",
    period: "2026.01 ~ 진행중"
  },
  {
    id: 4,
    title: "SC제일은행 신용대출 신청화면 신설 프로젝트",
    noticeDate: "2025.08.05",
    year: 2025,
    industry: "은행",
    type: "SI",
    status: "진행중",
    client: "SC제일은행",
    period: "2025.08 ~ 진행중"
  },
  {
    id: 5,
    title: "SC제일은행 펀드 프로세스개선_Peer Review Action 이행",
    noticeDate: "2025.08.05",
    year: 2025,
    industry: "은행",
    type: "SI",
    status: "진행중",
    client: "SC제일은행",
    period: "2025.08 ~ 진행중"
  },
  {
    id: 6,
    title: "SC제일은행 집중도 프로세스 도입",
    noticeDate: "2025.08.05",
    year: 2025,
    industry: "은행",
    type: "SI",
    status: "진행중",
    client: "SC제일은행",
    period: "2025.09 ~ 진행중"
  },
  {
    id: 7,
    title: "SC제일은행 햇살론 119 전문 개발 프로젝트",
    noticeDate: "2025.08.05",
    year: 2025,
    industry: "은행",
    type: "SI",
    status: "진행중",
    client: "SC제일은행",
    period: "2025.10 ~ 진행중"
  },
  {
    id: 8,
    title: "SC제일은행 상생 보증부 대출 전문 개발 프로젝트",
    noticeDate: "2025.08.05",
    year: 2025,
    industry: "은행",
    type: "SI",
    status: "진행중",
    client: "SC제일은행",
    period: "2025.10 ~ 진행중"
  },
  {
    id: 9,
    title: "경동나비엔, 영국법인 상담시스템 DB암호화 솔루션 공급",
    noticeDate: "2025.07.14",
    year: 2025,
    industry: "기타",
    type: "Solution",
    status: "진행중",
    client: "경동나비엔",
    period: "2025.07 ~ 진행중"
  },
  {
    id: 10,
    title: "경동나비엔, 파트너포탈 DB암호화 솔루션 공급",
    noticeDate: "2025.07.14",
    year: 2025,
    industry: "기타",
    type: "Solution",
    status: "진행중",
    client: "경동나비엔",
    period: "2025.07 ~ 진행중"
  },
  {
    id: 11,
    title: "경동나비엔, 중국 CIC DB암호화 솔루션 공급",
    noticeDate: "2025.07.14",
    year: 2025,
    industry: "기타",
    type: "Solution",
    status: "진행중",
    client: "경동나비엔",
    period: "2025.07 ~ 진행중"
  },
  {
    id: 12,
    title: "경동나비엔, Next나비엔 DB 암호화",
    noticeDate: "2024.12.19",
    year: 2025,
    industry: "기타",
    type: "Solution",
    status: "진행중",
    client: "경동나비엔",
    period: "2024.12 ~ 진행중"
  },
  {
    id: 13,
    title: "KDB캐피탈 차세대(인프라 구축)",
    noticeDate: "2024.12.15",
    year: 2025,
    industry: "기타 금융",
    type: "SI",
    status: "진행중",
    client: "KDB캐피탈",
    period: "2025.01 ~ 진행중"
  },
  {
    id: 14,
    title: "애큐온저축은행 채널 운영",
    noticeDate: "2025.08.06",
    year: 2024,
    industry: "저축은행",
    type: "ITO",
    status: "진행중",
    client: "애큐온저축은행",
    period: "2024.02 ~ 진행중"
  },
  {
    id: 15,
    title: "티알엔 정보시스템 운영 용역 (TAS)",
    noticeDate: "2024.12.18",
    year: 2024,
    industry: "서비스",
    type: "ITO",
    status: "진행중",
    client: "티알엔",
    period: "2024.01 ~ 진행중",
    overview: "모바일 앱 개발 및 운영 (메인개편/회원등급제)",
    description: "태광그룹 계열사인 티알엔의 모바일 앱 개선 및 유지보수 업무를 수행하고 있습니다."
  },
  {
    id: 16,
    title: "BNK캐피탈 영업지원시스템 화면(UI/UX)전환 사업",
    noticeDate: "2024.12.17",
    year: 2024,
    industry: "기타 금융",
    type: "SI",
    status: "진행중",
    client: "BNK캐피탈",
    period: "2024.12 ~ 진행중"
  },
  {
    id: 17,
    title: "라이나손해보험 어플리케이션 유지보수",
    noticeDate: "2024.09.06",
    year: 2024,
    industry: "보험",
    type: "ITO",
    status: "진행중",
    client: "라이나손해보험",
    period: "2024.09 ~ 진행중"
  },
  {
    id: 18,
    title: "태광그룹 11개 계열사 홈페이지 운영",
    noticeDate: "2024.08.08",
    year: 2024,
    industry: "기타",
    type: "ITO",
    status: "진행중",
    client: "태광그룹",
    period: "2024.08 ~ 진행중"
  },
  {
    id: 19,
    title: "현대카드 채널계 / 처리계 유지보수 운영",
    noticeDate: "2024.05.07",
    year: 2024,
    industry: "기타 금융",
    type: "ITO",
    status: "진행중",
    client: "현대카드",
    period: "2024.05 ~ 진행중"
  },
  {
    id: 20,
    title: "한국투자캐피탈 시스템 운영",
    noticeDate: "2023",
    year: 2023,
    industry: "기타 금융",
    type: "ITO",
    status: "진행중",
    client: "한국투자캐피탈",
    period: "2023.06 ~ 진행중"
  }
];
