'use client';

import { useState, type ReactNode } from 'react';

import { Button } from '@/frontend/components/ui/Button';

// 시안: 정적 배포 중에는 전송하지 않는다.
// 서버 배포 전환 후 backend/modules/inquiry 의 Server Action(Zod 검증 → 저장)으로 연결한다
const FIELDS = ['IT OUTSOURCING', 'SYSTEM INTEGRATION', 'INFRASTRUCTURE', 'SOLUTION', '기타 / 협력 제안'];

const baseClass =
  'w-full rounded-none border-line bg-transparent font-sans text-[16px] tracking-[-.01em] normal-case text-ink outline-none transition-colors duration-300 focus:border-ink';
const controlClass = `${baseClass} border-b py-3`;

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 font-mono text-[11px] uppercase tracking-[.06em] text-muted">
      {label}
      {children}
    </label>
  );
}

export function InquiryForm() {
  const [message, setMessage] = useState('※ 시안이므로 실제 전송은 되지 않습니다.');
  return (
    <form
      className="mt-9 grid gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage('시안 화면이므로 실제 전송은 되지 않습니다.');
      }}
    >
      <div className="grid grid-cols-2 gap-6 max-mob:grid-cols-1">
        <Field label="회사명 / 기관명">
          <input className={controlClass} type="text" placeholder="예) ○○은행" />
        </Field>
        <Field label="담당자 성함">
          <input className={controlClass} type="text" placeholder="홍길동" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-6 max-mob:grid-cols-1">
        <Field label="연락처">
          <input className={controlClass} type="tel" placeholder="010-0000-0000" />
        </Field>
        <Field label="이메일">
          <input className={controlClass} type="email" placeholder="name@company.co.kr" />
        </Field>
      </div>
      <Field label="문의 분야">
        <select className={controlClass}>
          {FIELDS.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </Field>
      <Field label="문의 내용">
        <textarea
          className={`${baseClass} resize-y border p-3.5`}
          rows={6}
          placeholder="프로젝트 개요, 일정, 범위 등을 자유롭게 작성해 주세요."
        />
      </Field>
      <div className="flex flex-wrap items-center gap-5">
        <Button type="submit" variant="ink" className="mt-0">
          문의 접수
        </Button>
        <span className="mono text-muted">{message}</span>
      </div>
    </form>
  );
}
