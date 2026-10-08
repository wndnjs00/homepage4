import Link from 'next/link';

import { ROUTES } from '@/shared/constants/routes';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-5 text-center text-paper">
      <p className="mono text-accent">404</p>
      <h1 className="text-[clamp(28px,3.4vw,48px)] font-bold tracking-[-.035em]">페이지를 찾을 수 없습니다.</h1>
      <Link href={ROUTES.home} className="btn btn-accent">
        홈으로 <span className="arr" />
      </Link>
    </main>
  );
}
