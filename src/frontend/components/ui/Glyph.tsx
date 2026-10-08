// 카드 호버 시 움직이는 추상 도형 (.biz-cell 안에서 사용)
const SHAPES = {
  a: ['a1', 'a2'],
  b: ['b1', 'b2', 'b3'],
  c: ['c1', 'c2'],
  d: ['d1', 'd2', 'd3'],
  e: ['e1', 'e2', 'e3'],
  f: ['f1', 'f2', 'f3'],
} as const;

export type GlyphKind = keyof typeof SHAPES;

export function Glyph({ kind }: { kind: GlyphKind }) {
  return (
    <div className={`glyph g-${kind}`}>
      {SHAPES[kind].map((c) => (
        <i key={c} className={c} />
      ))}
    </div>
  );
}
