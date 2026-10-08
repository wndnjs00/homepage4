import type { NextConfig } from 'next';

// GitHub Pages 정적 배포: 빌드 결과는 out/ 에 생성된다
// NEXT_PUBLIC_BASE_PATH 로 저장소 하위 경로(/homepage4)를 지정한다
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
