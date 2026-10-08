import { asset } from '@/frontend/lib/asset';
import { cn } from '@/frontend/lib/cn';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

/** 이미지 + 모노 캡션 (호버 시 살짝 확대) */
export function Figure({ src, alt, caption, className }: FigureProps) {
  return (
    <figure className={cn('fig', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- 정적 내보내기(이미지 최적화 미사용) */}
      <img src={asset(src)} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
