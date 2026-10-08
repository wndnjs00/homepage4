'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-5 text-center text-paper">
      <p className="mono text-accent">Error</p>
      <h1 className="text-[clamp(28px,3.4vw,48px)] font-bold tracking-[-.035em]">일시적인 오류가 발생했습니다.</h1>
      <button type="button" className="btn btn-accent" onClick={reset}>
        다시 시도 <span className="arr" />
      </button>
    </main>
  );
}
