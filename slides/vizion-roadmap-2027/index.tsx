import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';

export const notes: (string | undefined)[] = [
  `- 今天重點
- 從今年 2026 上半年 安排到 2027 年底`,
  `1. 分兩個版本 3.0, 4.0
2. 每一項逐步介紹`,
  `1. Q3, Q4
2. Q2 Map 整合`,
  undefined,
  `1. 2026 -> 2027 都可以正常使用
2. Release 後仍有半年`,
  `1. 目前仍須多情境刻在產品端... 產品需要...
2. 效能 2000 點體驗會掉 FPS... 
3. 更新節奏... 社群解方少`,
  `1. 說明效能 彈性 社群
2. 內建功能偏少 + low level 開發成本比較高`,
  `1. PoC 決定是否要換
2. 換 or 不換說明`,
  "1. 盤點以上... 先做必要的",
  `1. 最小化使用端影響
2. 逐步換，可以提前發佈 提前驗證`,
];


// ─── Panel-tweakable design tokens ───────────────────────────────────────────
export const design: DesignSystem = {
  palette: {
    bg: '#0a141d',
    text: '#e8f1f4',
    accent: '#19d3c5',
  },
  fonts: {
    display: '"Sora", "Noto Sans TC", sans-serif',
    body: '"Sora", "Noto Sans TC", sans-serif',
  },
  typeScale: {
    hero: 158,
    body: 33,
  },
  radius: 18,
};

// ─── Extra constants outside the DesignSystem shape ──────────────────────────
const teal = '#19d3c5';
const teal2 = '#5fe6da';
const amber = '#ffb020';
const amber2 = '#ffce6b';
const muted = '#8499a8';
const faint = '#5d7385';
const line = '#1d3242';
const line2 = '#27445a';
const bg2 = '#0e1b27';
const mono = '"JetBrains Mono", monospace';
const EASE = 'cubic-bezier(.22,1,.36,1)';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&family=Noto+Sans+TC:wght@400;500;700;800&display=swap';

const STAGE_BG =
  'radial-gradient(1200px 700px at 80% 8%,rgba(25,211,197,.12),transparent 60%),' +
  'radial-gradient(900px 600px at 6% 96%,rgba(255,176,32,.08),transparent 55%),' +
  'linear-gradient(160deg,#0a141d,#060d14)';

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'var(--osd-font-display)',
  color: 'var(--osd-text)',
  background: STAGE_BG,
};

// ─── Module-level chrome: web fonts + pulse keyframes ─────────────────────────
const useChrome = () => {
  useEffect(() => {
    if (!document.getElementById('vizion-rm-fonts')) {
      const l = document.createElement('link');
      l.id = 'vizion-rm-fonts';
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
    if (!document.getElementById('vizion-rm-kf')) {
      const s = document.createElement('style');
      s.id = 'vizion-rm-kf';
      s.textContent =
        '@keyframes vizionPulse{0%{box-shadow:0 0 0 0 rgba(25,211,197,.5)}70%{box-shadow:0 0 0 15px rgba(25,211,197,0)}100%{box-shadow:0 0 0 0 rgba(25,211,197,0)}}';
      document.head.appendChild(s);
    }
  }, []);
};

// ─── Staggered reveal — fade up on mount ─────────────────────────────────────
const useReveal = (step = 0): CSSProperties => {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const d = `${(step * 0.1).toFixed(2)}s`;
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? 'translateY(0)' : 'translateY(34px)',
    transition: `opacity .7s ${EASE} ${d}, transform .7s ${EASE} ${d}`,
  };
};

// ─── Shared chrome components ────────────────────────────────────────────────
const GridBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),' +
        'linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)',
      backgroundSize: '64px 64px',
      WebkitMaskImage: 'radial-gradient(ellipse at 55% 42%,#000 45%,transparent 88%)',
      maskImage: 'radial-gradient(ellipse at 55% 42%,#000 45%,transparent 88%)',
      pointerEvents: 'none',
    }}
  />
);

const Stage = ({ children }: { children: ReactNode }) => {
  useChrome();
  return (
    <div style={fill}>
      <GridBg />
      {children}
    </div>
  );
};

const Pad = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      padding: '96px 120px',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
  >
    {children}
  </div>
);

const Kicker = ({ step, children }: { step: number; children: ReactNode }) => {
  const r = useReveal(step);
  return (
    <div
      style={{
        fontFamily: mono,
        fontSize: 23,
        letterSpacing: '.1em',
        color: amber,
        marginBottom: 22,
        ...r,
      }}
    >
      {children}
    </div>
  );
};

const Heading = ({ step, size = 78, children }: { step: number; size?: number; children: ReactNode }) => {
  const r = useReveal(step);
  return (
    <h2
      style={{
        fontSize: size,
        lineHeight: 1.02,
        fontWeight: 800,
        letterSpacing: '-.025em',
        margin: 0,
        ...r,
      }}
    >
      {children}
    </h2>
  );
};

const Grad = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      background: `linear-gradient(92deg,${teal},${teal2})`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    }}
  >
    {children}
  </span>
);

const Reveal = ({ step, style, children }: { step: number; style?: CSSProperties; children: ReactNode }) => {
  const r = useReveal(step);
  return <div style={{ ...style, ...r }}>{children}</div>;
};

const B = ({ children }: { children: ReactNode }) => (
  <b style={{ color: 'var(--osd-text)', fontWeight: 600 }}>{children}</b>
);

const Footer = ({ tag = 'VIZION ROADMAP' }: { tag?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 54,
          bottom: 42,
          fontFamily: mono,
          fontSize: 18,
          color: faint,
          letterSpacing: '.14em',
          textTransform: 'uppercase',
        }}
      >
        {tag}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 54,
          bottom: 42,
          fontFamily: mono,
          fontSize: 20,
          color: faint,
          letterSpacing: '.08em',
        }}
      >
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </>
  );
};

// ─── PAGE 1 — TITLE ──────────────────────────────────────────────────────────
const RailNode = ({
  ms,
  when,
  variant,
}: {
  ms: string;
  when: string;
  variant: 'teal' | 'dim' | 'amber';
}) => {
  const border = variant === 'teal' ? teal : variant === 'amber' ? amber : line2;
  const dotBg = variant === 'amber' ? amber : bg2;
  const shadow =
    variant === 'teal'
      ? '0 0 12px rgba(25,211,197,.4)'
      : variant === 'amber'
      ? '0 0 14px rgba(255,176,32,.5)'
      : 'none';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 13, width: 140 }}>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: dotBg,
          border: `3px solid ${border}`,
          marginTop: 24,
          boxShadow: shadow,
        }}
      />
      <div style={{ fontFamily: mono, fontSize: 19, color: 'var(--osd-text)', fontWeight: 600 }}>{ms}</div>
      <div style={{ fontSize: 16, color: muted }}>{when}</div>
    </div>
  );
};

const Rail = () => {
  const [grow, setGrow] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setGrow(true), 500);
    return () => clearTimeout(id);
  }, []);
  return (
    <div style={{ position: 'relative', height: 120 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 34, height: 3, background: line }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '62%',
            background: `linear-gradient(90deg,${teal},${amber})`,
            boxShadow: '0 0 16px rgba(25,211,197,.5)',
            transform: grow ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: `transform 1.2s ${EASE}`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <RailNode ms="MS1" when="26 Q2" variant="teal" />
        <RailNode ms="MS2" when="26 Q3" variant="teal" />
        <RailNode ms="MS3" when="26 Q4" variant="teal" />
        <RailNode ms="MS4" when="27 H1" variant="dim" />
        <RailNode ms="MS5" when="27 H2" variant="dim" />
        <RailNode ms="MS6" when="4.0 GA" variant="amber" />
      </div>
    </div>
  );
};

const Title: Page = () => (
  <Stage>
    <Pad style={{ padding: '108px 130px' }}>
      <Reveal
        step={1}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: mono,
          fontSize: 21,
          letterSpacing: '.16em',
          color: muted,
          textTransform: 'uppercase',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 20px',
            border: `1px solid ${line}`,
            borderRadius: 999,
            background: 'rgba(25,211,197,.06)',
            color: teal,
          }}
        >
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: teal,
              animation: 'vizionPulse 2s infinite',
            }}
          />
          VIZION GRAPH PLATFORM
        </span>
        <span>RDFT · 2026.05</span>
      </Reveal>

      <div style={{ marginTop: 90 }}>
        <Kicker step={2}>// 2026 H1 → 2027 H2 · 產品配合時程</Kicker>
        <Reveal step={3}>
          <h1 style={{ fontSize: 158, lineHeight: 0.92, fontWeight: 800, letterSpacing: '-.03em', margin: 0 }}>
            Vizion <Grad>Roadmap</Grad>
          </h1>
        </Reveal>
        <Reveal step={4} style={{ marginTop: 38, fontSize: 33, color: muted, maxWidth: 1100, lineHeight: 1.42 }}>
          3.0 補強現有功能、<B>4.0 聚焦效能與架構整合</B> —— 渲染升級與 Map 整合,一張圖看懂節奏。
        </Reveal>
      </div>

      <Reveal step={5} style={{ marginTop: 'auto' }}>
        <Rail />
      </Reveal>
    </Pad>
  </Stage>
);

// ─── PAGE 2 — VERSION PILLARS ────────────────────────────────────────────────
const Bullet = ({ color, children }: { color: string; children: ReactNode }) => (
  <li style={{ fontSize: 29, color: 'var(--osd-text)', paddingLeft: 38, position: 'relative', lineHeight: 1.35 }}>
    <span
      style={{ position: 'absolute', left: 0, top: 13, width: 14, height: 14, borderRadius: '50%', background: color }}
    />
    {children}
  </li>
);

const VCard = ({
  step,
  variant,
  badge,
  title,
  eng,
  when,
  children,
}: {
  step: number;
  variant: 'v3' | 'v4';
  badge: string;
  title: string;
  eng: string;
  when: string;
  children: ReactNode;
}) => {
  const r = useReveal(step);
  const ac = variant === 'v3' ? teal : amber;
  const ring = variant === 'v3' ? 'rgba(25,211,197,.18)' : 'rgba(255,176,32,.18)';
  const badgeBg = variant === 'v3' ? 'rgba(25,211,197,.12)' : 'rgba(255,176,32,.12)';
  return (
    <div
      style={{
        flex: 1,
        border: `1px solid ${line}`,
        borderRadius: 20,
        padding: '52px 50px',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(165deg,rgba(255,255,255,.03),transparent)',
        boxShadow: `inset 0 0 0 1px ${ring}`,
        ...r,
      }}
    >
      <span
        style={{
          fontFamily: mono,
          fontSize: 24,
          letterSpacing: '.06em',
          padding: '8px 20px',
          borderRadius: 999,
          width: 'fit-content',
          background: badgeBg,
          color: ac,
        }}
      >
        {badge}
      </span>
      <h3 style={{ fontSize: 54, fontWeight: 800, margin: '28px 0 6px', letterSpacing: '-.02em' }}>{title}</h3>
      <div style={{ fontFamily: mono, fontSize: 21, color: faint, marginBottom: 30 }}>{eng}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20, margin: 0, padding: 0 }}>
        {children}
      </ul>
      <div
        style={{
          marginTop: 'auto',
          paddingTop: 30,
          fontFamily: mono,
          fontSize: 23,
          color: muted,
          borderTop: `1px solid ${line}`,
        }}
      >
        {when}
      </div>
    </div>
  );
};

const Pillars: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 版本主軸</Kicker>
      <Heading step={2}>
        兩個版本,<Grad>如何區分</Grad>
      </Heading>
      <div style={{ display: 'flex', gap: 40, marginTop: 60, flex: 1, alignItems: 'stretch' }}>
        <VCard step={3} variant="v3" badge="VIZION 3.0" title="現行引擎" eng="engine: G6 · 全年持續可用" when="對象:所有現有產品">
          <Bullet color={teal}>對齊 Vizion 2.0 設計</Bullet>
          <Bullet color={teal}>Map View(GDS Demo)</Bullet>
          <Bullet color={teal}>功能維護優化:快捷鍵、樣式調整、修正 Bugs</Bullet>
        </VCard>
        <VCard
          step={4}
          variant="v4"
          badge="VIZION 4.0"
          title="新引擎"
          eng="engine: Pixi(graph-next)· 條件性啟動"
          when="2026 Q4 PoC 驗證 → 確認可行才換底 · 先 MXview / ACT"
        >
          <Bullet color={amber}>效能優化(支援 &gt;5000 節點)</Bullet>
          <Bullet color={amber}>Map 整合進同一套引擎</Bullet>
          <Bullet color={amber}>對齊現行 API(drop-in 遷移)</Bullet>
        </VCard>
      </div>
      <Note step={5}>
        <B>4.0 採條件性啟動</B> —— 2026 Q4 先以 Pixi.js PoC 驗證換引擎可行性與團隊掌握度;確認可行才換底並展開開發,
        若判定不可行則仍以既有引擎優化效能 + Map 整合。
      </Note>
    </Pad>
    <Footer />
  </Stage>
);

// ─── PAGE 3 — WHY 4.0 ────────────────────────────────────────────────────────
const WhyCard = ({ step, big, title, children }: { step: number; big: ReactNode; title: string; children: ReactNode }) => {
  const r = useReveal(step);
  return (
    <div
      style={{
        flex: 1,
        border: `1px solid ${line}`,
        borderRadius: 20,
        padding: 44,
        background: 'linear-gradient(160deg,rgba(255,255,255,.025),transparent)',
        ...r,
      }}
    >
      {big}
      <h3 style={{ fontSize: 37, fontWeight: 700, margin: '18px 0 15px', letterSpacing: '-.01em' }}>{title}</h3>
      <p style={{ fontSize: 25, color: muted, lineHeight: 1.5, margin: 0 }}>{children}</p>
    </div>
  );
};

const bigNum = (color: string): CSSProperties => ({
  fontSize: 90,
  fontWeight: 800,
  letterSpacing: '-.03em',
  lineHeight: 1,
  color,
});

const Why: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 為什麼需要 4.0</Kicker>
      <Heading step={2}>
        現行引擎遇到<Grad> 三個結構性瓶頸</Grad>
      </Heading>
      <div style={{ display: 'flex', gap: 30, marginTop: 60, flex: 1 }}>
        <WhyCard step={3} big={<div style={bigNum(teal)}>37</div>} title="客製化彈性不足">
          已累積 37 個 DOM overlay,因現行元件模型無法在畫面內表達拓樸需要的視覺 —— 等於在引擎外硬疊一層。
        </WhyCard>
        <WhyCard step={4} big={<div style={bigNum(amber)}>5000+</div>} title="超大型拓樸效能">
          真實拓樸已達 5000+ 節點,且無 clustering / LOD。新引擎以 canvas / webgl 為核心,正面解決。
        </WhyCard>
        <WhyCard
          step={5}
          big={
            <div style={{ ...bigNum(teal), fontSize: 80, whiteSpace: 'nowrap' }}>
              <span style={{ color: muted }}>G6</span> <span style={{ color: faint }}>→</span>{' '}
              <span style={{ color: teal }}>Pixi</span>
            </div>
          }
          title="社群廣度不足"
        >
          G6 更新節奏不明確、issue 解決偏慢;Pixi.js 社群廣大、解法多,遇問題更容易找到出路。
        </WhyCard>
      </div>
    </Pad>
    <Footer />
  </Stage>
);

// ─── Comparison table primitives ─────────────────────────────────────────────
const thStyle: CSSProperties = {
  textAlign: 'left',
  padding: '21px 26px',
  fontFamily: mono,
  fontSize: 22,
  color: muted,
  fontWeight: 600,
  borderBottom: `2px solid ${line2}`,
  letterSpacing: '.04em',
  verticalAlign: 'top',
};
const tdStyle: CSSProperties = {
  textAlign: 'left',
  padding: '21px 26px',
  borderBottom: `1px solid ${line}`,
  verticalAlign: 'top',
  lineHeight: 1.36,
  fontSize: 25,
};
const dimTd: CSSProperties = { fontWeight: 700, color: 'var(--osd-text)', whiteSpace: 'nowrap' };
const pickTd: CSSProperties = {
  background: 'rgba(255,176,32,.07)',
  color: 'var(--osd-text)',
  borderLeft: `1px solid ${line2}`,
  borderRight: `1px solid ${line2}`,
};
const okTd: CSSProperties = { color: 'var(--osd-text)' };

const Th = ({
  children,
  sub,
  pick,
  ok,
}: {
  children: ReactNode;
  sub?: string;
  pick?: boolean;
  ok?: boolean;
}) => (
  <th
    style={{
      ...thStyle,
      ...(pick ? { color: amber, borderBottomColor: amber } : {}),
      ...(ok ? { color: teal, borderBottomColor: 'rgba(25,211,197,.5)' } : {}),
    }}
  >
    {children}
    {sub && (
      <small style={{ display: 'block', fontSize: 17, color: faint, marginTop: 5, fontWeight: 400 }}>{sub}</small>
    )}
  </th>
);

const Note = ({ step, children }: { step: number; children: ReactNode }) => {
  const r = useReveal(step);
  return <div style={{ marginTop: 30, fontSize: 24, color: muted, lineHeight: 1.5, ...r }}>{children}</div>;
};

// ─── PAGE 4 — TECH SELECTION ─────────────────────────────────────────────────
const TechSelect: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 技術選型比較</Kicker>
      <Heading step={2}>
        為什麼選 <Grad>Pixi.js</Grad>
      </Heading>
      <Reveal step={3}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 42, fontSize: 25 }}>
          <thead>
            <tr>
              <Th>維度</Th>
              <Th sub="現行 3.0">AntV G6</Th>
              <Th sub="圖框架">Cytoscape.js</Th>
              <Th sub="選定 4.0" pick>
                Pixi.js
              </Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, ...dimTd, color: amber }}>效能 ★</td>
              <td style={tdStyle}>canvas/svg/webgl,大圖中等</td>
              <td style={tdStyle}>大圖較弱</td>
              <td style={{ ...tdStyle, ...pickTd }}>WebGL 批次,大圖最強</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dimTd, color: amber }}>彈性 ★</td>
              <td style={tdStyle}>
                受元件模型約束
                <br />
                (37 overlay 佐證)
              </td>
              <td style={tdStyle}>圖語意強,渲染客製受限</td>
              <td style={{ ...tdStyle, ...pickTd }}>
                渲染層全自由
                <br />
                (shader / sprite)
              </td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dimTd, color: amber }}>社群 ★</td>
              <td style={tdStyle}>AntV 生態,中文資源多</td>
              <td style={tdStyle}>學術 / 研究領域為主,穩定但偏窄</td>
              <td style={{ ...tdStyle, ...pickTd }}>
                遊戲 / 視覺化最活躍
                <br />
                (圖演算法需自建)
              </td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dimTd }}>內建圖功能</td>
              <td style={tdStyle}>高(layout / behavior)</td>
              <td style={tdStyle}>高(圖論演算法豐富)</td>
              <td style={{ ...tdStyle, ...pickTd }}>無 — 需自建</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dimTd }}>抽象層級</td>
              <td style={tdStyle}>高階圖框架</td>
              <td style={tdStyle}>高階圖框架</td>
              <td style={{ ...tdStyle, ...pickTd }}>低階渲染引擎</td>
            </tr>
          </tbody>
        </table>
      </Reveal>
      <Note step={4}>
        ★ = 最核心關注維度。<B>取捨</B>:以「自由度 + 效能」換「工程量」—— 高階圖框架換不掉天花板,Pixi
        打開渲染層,符合 &gt;5000 節點與 Map 整合的長期需求。
        <br />
        <span style={{ color: amber }}>選定 Pixi.js 為方向,但 2026 Q4 會先以 PoC 實測掌握度與工程量,確認可行才正式換底。</span>
      </Note>
    </Pad>
    <Footer />
  </Stage>
);

// ─── PAGE — POC DECISION GATE ────────────────────────────────────────────────
const Check = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontFamily: mono,
      fontSize: 21,
      padding: '8px 16px',
      borderRadius: 8,
      border: `1px solid ${line2}`,
      color: 'var(--osd-text)',
      background: 'rgba(255,255,255,.03)',
    }}
  >
    {children}
  </span>
);

const Branch = ({
  step,
  variant,
  verdict,
  title,
  children,
}: {
  step: number;
  variant: 'go' | 'stay';
  verdict: string;
  title: string;
  children: ReactNode;
}) => {
  const r = useReveal(step);
  const c = variant === 'go' ? amber : teal;
  const ring = variant === 'go' ? 'rgba(255,176,32,.2)' : 'rgba(25,211,197,.2)';
  return (
    <div
      style={{
        flex: 1,
        border: `1px solid ${line}`,
        borderRadius: 20,
        padding: '40px 44px',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg,rgba(255,255,255,.03),transparent)',
        boxShadow: `inset 0 0 0 1px ${ring}`,
        ...r,
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 22, color: c, letterSpacing: '.04em' }}>{verdict}</div>
      <h3 style={{ fontSize: 40, fontWeight: 800, margin: '14px 0 16px', letterSpacing: '-.02em', color: c }}>{title}</h3>
      <p style={{ fontSize: 25, color: muted, lineHeight: 1.55, margin: 0 }}>{children}</p>
    </div>
  );
};

const PocGate: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 換引擎決策關卡 · 風險控管</Kicker>
      <Heading step={2}>
        換底前,先過 <Grad>PoC 這一關</Grad>
      </Heading>

      <Reveal
        step={3}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 30,
          marginTop: 48,
          padding: '28px 40px',
          borderRadius: 16,
          border: '1px solid rgba(255,176,32,.3)',
          background: 'rgba(255,176,32,.06)',
        }}
      >
        <div style={{ fontFamily: mono, fontSize: 26, color: amber, fontWeight: 600, whiteSpace: 'nowrap' }}>2026 Q4</div>
        <div style={{ width: 1, height: 56, background: line2 }} />
        <div>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-.02em' }}>Pixi.js PoC 驗證關卡</div>
          <div style={{ fontSize: 23, color: muted, marginTop: 6 }}>
            實測換引擎可行性與團隊掌握度 —— 跑得通才確認換底,展開後續開發任務
          </div>
        </div>
      </Reveal>

      <Reveal step={4} style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 30, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: mono, fontSize: 20, color: faint, letterSpacing: '.04em' }}>PoC 驗什麼:</span>
        <Check>渲染層掌握度</Check>
        <Check>效能達標 &gt;5000 節點</Check>
        <Check>現行 API 對齊可行性</Check>
        <Check>工程量與團隊上手</Check>
      </Reveal>

      <div style={{ display: 'flex', gap: 36, marginTop: 40, flex: 1, alignItems: 'stretch' }}>
        <Branch step={5} variant="go" verdict="✓ 確認可行" title="換底 · 展開 4.0">
          正式切換 Pixi 基底,展開 4.0 全部開發任務 —— <B>效能優化、Map 整合、drop-in 遷移</B>,於 2027 交付,先供
          MXview / ACT 遷移。
        </Branch>
        <Branch step={6} variant="stay" verdict="↺ 判定困難" title="不換底 · 維持既有引擎">
          仍朝原目標前進:以<B>既有引擎優化效能 + Map 整合</B>達成。<B>不換底不影響消費者體驗</B>,只是渲染基底維持現狀。
        </Branch>
      </div>
    </Pad>
    <Footer />
  </Stage>
);

// ─── PAGE 5 — SCOPE INVENTORY ────────────────────────────────────────────────
const Scope: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 4.0 範圍盤點</Kicker>
      <Heading step={2}>
        必要 vs <Grad>Nice-to-have</Grad>
      </Heading>
      <Reveal step={3}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 42, fontSize: 25 }}>
          <thead>
            <tr>
              <Th>模組類別</Th>
              <Th ok>必要(納入 4.0)</Th>
              <Th>可延後(M6)</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, ...dimTd }}>元件 Components</td>
              <td style={{ ...tdStyle, ...okTd }}>全 9 種(node×3 / edge×5 / group)</td>
              <td style={tdStyle}>—</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dimTd }}>行為 Behaviors</td>
              <td style={{ ...tdStyle, ...okTd }}>11 項(選取 / 導航 / 操作 + drill-down)</td>
              <td style={tdStyle}>select-all、fix-element-size</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dimTd }}>佈局 Layouts</td>
              <td style={{ ...tdStyle, ...okTd }}>align、ring</td>
              <td style={tdStyle}>force、grid、tree</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dimTd }}>插件 Plugins</td>
              <td style={{ ...tdStyle, ...okTd }}>tooltip / background / toolbar×2 / history / hull</td>
              <td style={tdStyle}>context-menu、rich-tooltip、snapline、minimap</td>
            </tr>
          </tbody>
        </table>
      </Reveal>
      <Note step={4}>
        依 <B>act / mxview</B> 實際使用情境盤點 · 延後項於消費者切換後再補(M6)· 不影響 in-scope 產品。
        <br />
        <span style={{ color: amber }}>此範圍以「2026 Q4 PoC 確認換底可行」為前提展開;若判定不換底,則改由既有引擎達成效能 + Map 整合。</span>
      </Note>
    </Pad>
    <Footer />
  </Stage>
);

// ─── PAGE 6 — MILESTONE TIMELINE ─────────────────────────────────────────────
const TlPhase = ({ variant, label, sub }: { variant: 'p3' | 'p4'; label: string; sub: string }) => {
  const c = variant === 'p3' ? teal : amber;
  const bg = variant === 'p3' ? 'rgba(25,211,197,.08)' : 'rgba(255,176,32,.08)';
  const bd = variant === 'p3' ? 'rgba(25,211,197,.25)' : 'rgba(255,176,32,.25)';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: '-.02em',
        padding: '14px 28px',
        borderRadius: 12,
        color: c,
        background: bg,
        border: `1px solid ${bd}`,
      }}
    >
      <span style={{ width: 14, height: 14, borderRadius: '50%', background: c }} />
      {label} <small style={{ fontFamily: mono, fontSize: 18, fontWeight: 400, color: muted }}>{sub}</small>
    </div>
  );
};

const TlCard = ({
  variant,
  when,
  ms,
  title,
  desc,
  edge,
}: {
  variant: 't3' | 't4';
  when: string;
  ms: string;
  title: string;
  desc: string;
  edge: 'top' | 'bottom';
}) => {
  const c = variant === 't3' ? teal : amber;
  const conn = variant === 't3' ? 'rgba(25,211,197,.5)' : 'rgba(255,176,32,.5)';
  return (
    <div style={{ position: 'relative', padding: '0 12px', textAlign: 'center' }}>
      <div style={{ fontFamily: mono, fontSize: 18, color: c }}>{when}</div>
      <div style={{ fontFamily: mono, fontSize: 15, color: faint, marginTop: 2 }}>{ms}</div>
      <h4 style={{ fontSize: 24, fontWeight: 700, margin: '7px 0 6px', letterSpacing: '-.01em', lineHeight: 1.16 }}>
        {title}
      </h4>
      <p style={{ fontSize: 19, color: muted, lineHeight: 1.35, margin: 0 }}>{desc}</p>
      <span
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          height: 22,
          background: conn,
          ...(edge === 'top' ? { bottom: -22 } : { top: -22 }),
        }}
      />
    </div>
  );
};

const Nd = ({ variant, ga, gate }: { variant: 'n3' | 'n4'; ga?: boolean; gate?: boolean }) => (
  <div
    style={{
      justifySelf: 'center',
      width: gate ? 26 : 22,
      height: gate ? 26 : 22,
      borderRadius: gate ? 6 : '50%',
      transform: gate ? 'rotate(45deg)' : 'none',
      background: ga ? amber : gate ? 'rgba(255,176,32,.2)' : bg2,
      border: gate
        ? `4px solid ${amber}`
        : variant === 'n3'
        ? `4px solid ${teal}`
        : `4px solid ${amber}`,
      boxShadow: gate
        ? '0 0 16px rgba(255,176,32,.55)'
        : variant === 'n3'
        ? '0 0 12px rgba(25,211,197,.45)'
        : '0 0 12px rgba(255,176,32,.4)',
    }}
  />
);

const TlLine = () => {
  const [grow, setGrow] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setGrow(true), 400);
    return () => clearTimeout(id);
  }, []);
  return (
    <div style={{ position: 'relative', height: 4, margin: '22px 0' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 2,
          background: `linear-gradient(90deg,${teal} 0%,${teal} 48%,${amber} 52%,${amber} 100%)`,
          boxShadow: '0 0 16px rgba(25,211,197,.3)',
          transform: grow ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: `transform 1.3s ${EASE}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(6,1fr)',
          alignItems: 'center',
        }}
      >
        <Nd variant="n3" />
        <Nd variant="n3" />
        <Nd variant="n3" gate />
        <Nd variant="n4" />
        <Nd variant="n4" />
        <Nd variant="n4" ga />
      </div>
    </div>
  );
};

const sixCol: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16 };

const Timeline: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 六個里程碑</Kicker>
      <Heading step={2}>
        Vizion 的<Grad> 節奏</Grad>
      </Heading>
      <Reveal step={3} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, marginBottom: 30 }}>
          <TlPhase variant="p3" label="2026 · Vizion 3.0" sub="現行引擎" />
          <TlPhase variant="p4" label="2027 · Vizion 4.0" sub="新引擎 · 效能 + Map" />
        </div>

        <div style={{ ...sixCol, alignItems: 'end' }}>
          <TlCard variant="t3" when="2026 Q2" ms="MS1" title="盤點設計對齊項目" desc="持續開發 in-flight 功能" edge="top" />
          <div />
          <TlCard variant="t3" when="2026 Q4" ms="MS3 · 關卡" title="設計 2.0 + PoC 關卡" desc="Pixi.js PoC 驗證掌握度 · 確認才換底" edge="top" />
          <div />
          <TlCard variant="t4" when="2027 H2" ms="MS5" title="Beta + Map 整合" desc="開放 MXview / ACT 遷移" edge="top" />
          <div />
        </div>

        <TlLine />

        <div style={{ ...sixCol, alignItems: 'start' }}>
          <div />
          <TlCard variant="t3" when="2026 Q3" ms="MS2" title="Map View(Demo)" desc="GDS Demo · 可試用回饋" edge="bottom" />
          <div />
          <TlCard variant="t4" when="2027 H1" ms="MS4" title="引擎成形(內部)" desc="基底驗證 + 效能關卡 · 尚不可遷移" edge="bottom" />
          <div />
          <TlCard variant="t4" when="2027 H2 末" ms="MS6" title="GA + 遷移完成" desc="正式版(目標)· 跑在 4.0" edge="bottom" />
        </div>
      </Reveal>
    </Pad>
    <Footer />
  </Stage>
);

// ─── PAGE 7 — PRODUCT LANES ──────────────────────────────────────────────────
const Pill = ({ variant, children }: { variant: 'go' | 'stay' | 'none'; children: ReactNode }) => {
  const bg =
    variant === 'go' ? 'rgba(255,176,32,.14)' : variant === 'stay' ? 'rgba(25,211,197,.14)' : 'rgba(132,153,168,.14)';
  const c = variant === 'go' ? amber : variant === 'stay' ? teal : muted;
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: mono,
        fontSize: 18,
        padding: '5px 14px',
        borderRadius: 999,
        marginTop: 8,
        background: bg,
        color: c,
      }}
    >
      {children}
    </span>
  );
};

const Lane = ({
  step,
  variant,
  name,
  sub,
  nameColor,
  nameSize,
  col1,
  col2,
}: {
  step: number;
  variant: 'go' | 'stay' | 'none';
  name: string;
  sub: string;
  nameColor?: string;
  nameSize?: number;
  col1: ReactNode;
  col2: ReactNode;
}) => {
  const r = useReveal(step);
  const ring = variant === 'go' ? 'inset 0 0 0 1px rgba(255,176,32,.2)' : 'none';
  const nc = nameColor ?? (variant === 'go' ? amber : variant === 'stay' ? teal : muted);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr 1fr',
        alignItems: 'center',
        gap: 34,
        border: `1px solid ${line}`,
        borderRadius: 16,
        padding: '34px 44px',
        background: 'linear-gradient(160deg,rgba(255,255,255,.025),transparent)',
        boxShadow: ring,
        ...r,
      }}
    >
      <div style={{ fontSize: nameSize ?? 42, fontWeight: 800, letterSpacing: '-.02em', color: nc }}>
        {name}
        <small
          style={{
            display: 'block',
            fontFamily: mono,
            fontSize: 19,
            color: faint,
            fontWeight: 400,
            marginTop: 6,
            letterSpacing: '.04em',
          }}
        >
          {sub}
        </small>
      </div>
      <div style={{ fontSize: 26, color: muted, lineHeight: 1.4 }}>{col1}</div>
      <div style={{ fontSize: 26, color: muted, lineHeight: 1.4 }}>{col2}</div>
    </div>
  );
};

const Lanes: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 各產品的路徑</Kicker>
      <Heading step={2}>
        影響產品、<Grad>什麼時候</Grad>
      </Heading>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
          marginTop: 54,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Lane
          step={3}
          variant="go"
          name="MXview"
          sub="maf/mxview"
          col1={<>2026:用 3.0,享設計對齊 + Map Demo + 易用性</>}
          col2={
            <>
              <B>2027 H2 遷移至 4.0</B>
              <br />
              <Pill variant="go">App Owner 需自排遷移 + UAT 驗證</Pill>
            </>
          }
        />
        <Lane
          step={4}
          variant="go"
          name="ACT"
          sub="maf/act"
          col1={<>2026:同 MXview,使用 3.0 全部功能</>}
          col2={
            <>
              <B>2027 H2 遷移至 4.0</B>
              <br />
              <Pill variant="go">App Owner 需自排遷移 + UAT 驗證</Pill>
            </>
          }
        />
        <Lane
          step={5}
          variant="stay"
          name="WAC"
          sub="libs/wac"
          col1={
            <>
              預期 <B>2026/8</B> 開始導入 Vizion
            </>
          }
          col2={
            <>
              <B>先採用 3.0 進行</B>(4.0 視後續評估)
              <br />
              <Pill variant="stay">2026/8 起導入</Pill>
            </>
          }
        />
        <Lane
          step={6}
          variant="none"
          name="其他產品"
          sub="DAC / Router / Switch / TPE / Wireless…"
          nameColor={muted}
          nameSize={34}
          col1={<>未使用 Vizion graph</>}
          col2={
            <>
              <B>不受影響</B>
              <br />
              <Pill variant="none">無需配合</Pill>
            </>
          }
        />
      </div>
    </Pad>
    <Footer />
  </Stage>
);

// ─── PAGE 8 — CONSUMER IMPACT ────────────────────────────────────────────────
const Tag = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontFamily: mono,
      fontSize: 20,
      padding: '8px 16px',
      border: `1px solid ${line2}`,
      borderRadius: 8,
      color: teal,
    }}
  >
    {children}
  </span>
);

const ImpactCard = ({
  step,
  ico,
  title,
  children,
  tags,
}: {
  step: number;
  ico: string;
  title: string;
  children: ReactNode;
  tags: ReactNode;
}) => {
  const r = useReveal(step);
  return (
    <div
      style={{
        flex: 1,
        border: `1px solid ${line}`,
        borderRadius: 20,
        padding: 52,
        background: 'linear-gradient(160deg,rgba(255,255,255,.03),transparent)',
        display: 'flex',
        flexDirection: 'column',
        ...r,
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 24, color: amber }}>{ico}</div>
      <h3 style={{ fontSize: 42, fontWeight: 800, margin: '18px 0 18px', letterSpacing: '-.02em', lineHeight: 1.15 }}>
        {title}
      </h3>
      <p style={{ fontSize: 27, color: muted, lineHeight: 1.55, margin: 0 }}>{children}</p>
      <div style={{ marginTop: 'auto', paddingTop: 26, display: 'flex', gap: 14, flexWrap: 'wrap' }}>{tags}</div>
    </div>
  );
};

const Impact: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 4.0 對 consumer 的影響</Kicker>
      <Heading step={2}>
        對使用端<Grad> 友善為原則</Grad>
      </Heading>
      <div style={{ display: 'flex', gap: 40, marginTop: 60, flex: 1 }}>
        <ImpactCard
          step={3}
          ico="// 遷移節奏"
          title="可並存、逐步換"
          tags={
            <>
              <Tag>3.0 ∥ 4.0</Tag>
              <Tag>逐元件遷移</Tag>
              <Tag>no big-bang</Tag>
            </>
          }
        >
          3.0 與 4.0 可在同一專案<B>並存</B>,逐元件、逐頁面替換,<B>不必一次到位</B>;
          不做 big-bang,風險逐步收斂、隨時可暫停。
        </ImpactCard>
        <ImpactCard
          step={4}
          ico="// 相容性"
          title="盡量不影響既有使用"
          tags={
            <>
              <Tag>drop-in API</Tag>
              <Tag>migration guide</Tag>
              <Tag>自動化工具</Tag>
            </>
          }
        >
          以<B>不變動既有 API 與介面</B>為原則;若無法避免變動,提供 <B>migration guide</B> 或
          <B>自動化遷移工具</B>,把調整成本壓到最低。
        </ImpactCard>
      </div>
    </Pad>
    <Footer />
  </Stage>
);

// ─── PAGE 9 — 3.0 MAINTENANCE ────────────────────────────────────────────────
const Maintenance: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 3.0 維護政策</Kicker>
      <Heading step={2}>
        正式 Release 後,<Grad>還有半年緩衝</Grad>
      </Heading>
      <Reveal step={3} style={{ marginTop: 70, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            position: 'relative',
            height: 78,
            borderRadius: 14,
            display: 'flex',
            overflow: 'hidden',
            border: `1px solid ${line}`,
          }}
        >
          <div
            style={{
              flex: 2.4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 27,
              fontWeight: 600,
              color: 'var(--osd-text)',
              background: 'linear-gradient(90deg,rgba(25,211,197,.22),rgba(25,211,197,.08))',
              borderRight: `2px dashed ${line2}`,
            }}
          >
            3.0 全程可用
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 27,
              fontWeight: 600,
              color: amber2,
              background:
                'repeating-linear-gradient(45deg,rgba(255,176,32,.16),rgba(255,176,32,.16) 14px,rgba(255,176,32,.07) 14px,rgba(255,176,32,.07) 28px)',
            }}
          >
            4.0 GA 後 · 維護半年
          </div>
          <div
            style={{
              flex: 0.7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 27,
              fontWeight: 600,
              color: muted,
              background: 'rgba(132,153,168,.1)',
            }}
          >
            EOL
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 20, fontFamily: mono, fontSize: 21, color: muted }}>
          <div style={{ flex: 2.4 }}>2026 → 2027</div>
          <div style={{ flex: 1, color: amber }}>▲ 4.0 GA</div>
          <div style={{ flex: 0.7, textAlign: 'right' }}>+6 個月</div>
        </div>
        <div style={{ marginTop: 46, fontSize: 30, color: muted, lineHeight: 1.5, maxWidth: 1400 }}>
          4.0 GA 後,<B>3.0 持續維護半年</B>(bug fix + 相容支援)作為遷移緩衝;半年後才進入 EOL。
          <B>遷移不急迫、可從容排程。</B>
        </div>
      </Reveal>
    </Pad>
    <Footer />
  </Stage>
);

// ─── PAGE 10 — TIMELINE GRID ─────────────────────────────────────────────────
const C = ({ v }: { v?: 't' | 'a' }) => (
  <div
    style={{
      height: 52,
      borderRadius: 8,
      ...(v === 't'
        ? {
            background: `linear-gradient(135deg,${teal},#13a89d)`,
            border: '1px solid transparent',
            boxShadow: '0 0 14px rgba(25,211,197,.3)',
          }
        : v === 'a'
        ? {
            background: `linear-gradient(135deg,${amber},#e69310)`,
            border: '1px solid transparent',
            boxShadow: '0 0 14px rgba(255,176,32,.28)',
          }
        : { background: 'rgba(255,255,255,.03)', border: `1px solid ${line}` }),
    }}
  />
);

const RowLabel = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 23, color: 'var(--osd-text)', display: 'flex', alignItems: 'center', paddingRight: 16, lineHeight: 1.25 }}>
    {children}
  </div>
);

const HCell = ({ children, lbl }: { children: ReactNode; lbl?: boolean }) => (
  <div
    style={{
      fontFamily: mono,
      fontSize: 22,
      color: lbl ? faint : muted,
      textAlign: lbl ? 'left' : 'center',
      padding: '10px 0',
    }}
  >
    {children}
  </div>
);

const TgLegend = ({ color, children }: { color: string; children: ReactNode }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 11 }}>
    <span style={{ width: 30, height: 16, borderRadius: 5, background: color }} />
    {children}
  </span>
);

const tgGrid: CSSProperties = { display: 'grid', gridTemplateColumns: '430px repeat(6,1fr)', gap: 8 };

const TimeGrid: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 視覺化時程</Kicker>
      <Heading step={2}>
        主題 × 季度<Grad> 時間分布</Grad>
      </Heading>
      <Reveal step={3} style={{ marginTop: 44, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={tgGrid}>
          <HCell lbl>主題 \ 季度</HCell>
          <HCell>26 Q2</HCell>
          <HCell>26 Q3</HCell>
          <HCell>26 Q4</HCell>
          <HCell>27 Q1</HCell>
          <HCell>27 Q2</HCell>
          <HCell>27 Q3</HCell>

          <RowLabel>3.0 盤點設計對齊項目</RowLabel>
          <C v="t" />
          <C />
          <C />
          <C />
          <C />
          <C />

          <RowLabel>3.0 Map View(Demo)</RowLabel>
          <C />
          <C v="t" />
          <C />
          <C />
          <C />
          <C />

          <RowLabel>3.0 持續功能開發(快捷鍵 / Edge / 群組 / Bug)</RowLabel>
          <C v="t" />
          <C v="t" />
          <C v="t" />
          <C />
          <C />
          <C />

          <RowLabel>3.0 設計 2.0 實作 + SRS 盤點</RowLabel>
          <C />
          <C />
          <C v="t" />
          <C />
          <C />
          <C />

          <RowLabel>4.0 引擎 + 效能</RowLabel>
          <C />
          <C />
          <C v="a" />
          <C v="a" />
          <C v="a" />
          <C />

          <RowLabel>4.0 Map 整合</RowLabel>
          <C />
          <C />
          <C />
          <C />
          <C v="a" />
          <C />

          <RowLabel>4.0 Beta → 遷移 → GA</RowLabel>
          <C />
          <C />
          <C />
          <C />
          <C v="a" />
          <C v="a" />
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 30, fontFamily: mono, fontSize: 20, color: muted }}>
          <TgLegend color={teal}>3.0 現行引擎</TgLegend>
          <TgLegend color={amber}>4.0 新引擎</TgLegend>
        </div>
      </Reveal>
    </Pad>
    <Footer />
  </Stage>
);

// ─── PAGE 11 — TAKEAWAYS ─────────────────────────────────────────────────────
const Point = ({ step, no, title, children }: { step: number; no: string; title: string; children: ReactNode }) => {
  const r = useReveal(step);
  return (
    <div
      style={{
        border: `1px solid ${line}`,
        borderRadius: 18,
        padding: '40px 44px',
        background: 'linear-gradient(160deg,rgba(255,255,255,.03),transparent)',
        display: 'flex',
        gap: 30,
        alignItems: 'flex-start',
        ...r,
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 42, fontWeight: 600, color: amber, lineHeight: 1, minWidth: 60 }}>
        {no}
      </div>
      <div>
        <h3 style={{ fontSize: 34, fontWeight: 700, marginBottom: 12, letterSpacing: '-.01em' }}>{title}</h3>
        <p style={{ fontSize: 25, color: muted, lineHeight: 1.5, margin: 0 }}>{children}</p>
      </div>
    </div>
  );
};

const Takeaways: Page = () => (
  <Stage>
    <Pad>
      <Kicker step={1}>// 給產品負責人的重點</Kicker>
      <Heading step={2}>
        記住<Grad> 四件事</Grad>
      </Heading>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 54, flex: 1 }}>
        <Point step={3} no="01" title="3.0 全程可用、不中斷">
          2026 的設計對齊、Map Demo、易用性都在 3.0 上交付,現有產品照常使用。
        </Point>
        <Point step={4} no="02" title="4.0 是 2027 的升級">
          想升級效能 / Map 整合的產品(MXview、ACT),最早 <B>2027 H2</B> 開始遷移。
        </Point>
        <Point step={5} no="03" title="遷移成本低但需排程">
          4.0 對齊現行 API,以「換引擎 + 驗收」為主;請於 <B>2027 H2</B> 預留遷移 + UAT 窗口。
        </Point>
        <Point step={6} no="04" title="有半年緩衝、不必趕">
          4.0 GA 後 <B>3.0 仍維護半年</B>,可在緩衝期內從容遷移,半年後才 EOL。
        </Point>
      </div>
      <Reveal
        step={7}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          marginTop: 26,
          padding: '22px 32px',
          borderRadius: 14,
          borderLeft: `4px solid ${amber}`,
          border: `1px solid rgba(255,176,32,.3)`,
          background: 'rgba(255,176,32,.06)',
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: 19,
            color: amber,
            letterSpacing: '.08em',
            whiteSpace: 'nowrap',
            fontWeight: 600,
          }}
        >
          ⚠ 對外說法
        </span>
        <span style={{ fontSize: 25, color: muted, lineHeight: 1.5 }}>
          此 4.0 規劃<B>暫不對外公開</B>。對外溝通時一律以「<B>效能調整與 Map 架構整合優化</B>」說明,先不提及換引擎 / Pixi。
        </span>
      </Reveal>
    </Pad>
    <Footer />
  </Stage>
);

// ─── PAGE 12 — CLOSING ───────────────────────────────────────────────────────
const KeyDate = ({ step, accent, when, children }: { step: number; accent: string; when: string; children: ReactNode }) => {
  const r = useReveal(step);
  return (
    <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 26, ...r }}>
      <div style={{ fontFamily: mono, fontSize: 26, color: muted }}>{when}</div>
      <div style={{ fontSize: 34, fontWeight: 700, marginTop: 10, lineHeight: 1.25 }}>{children}</div>
    </div>
  );
};

const Closing: Page = () => (
  <Stage>
    <Pad style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
      <Kicker step={1}>// 關鍵時間點</Kicker>
      <Heading step={2} size={120}>
        影響 &amp; 時程
        <br />
        <Grad>看這三個點</Grad>
      </Heading>
      <div style={{ display: 'flex', gap: 50, marginTop: 60 }}>
        <KeyDate step={3} accent={teal} when="2026 Q3">
          Map View Demo
          <br />
          可試用回饋
        </KeyDate>
        <KeyDate step={4} accent={amber} when="2027 H2">
          4.0 開放遷移
          <br />
          MXview / ACT 排程
        </KeyDate>
        <KeyDate step={5} accent={amber} when="2027 H2 末">
          4.0 GA
          <br />+ 3.0 維護半年
        </KeyDate>
      </div>
      <Reveal step={6} style={{ marginTop: 70, fontFamily: mono, fontSize: 20, color: faint, lineHeight: 1.8 }}>
        roadmap:docs/slides/vizion-roadmap-2027.md
        <br />
        工程拆解:Jira Epic RDCHARUIWG-919(M0–M6)· 引擎決策:docs/adr/0001
      </Reveal>
    </Pad>
    <Footer tag="VIZION GRAPH PLATFORM · RDFT" />
  </Stage>
);

// ─── House transition — quiet 6px rise, held across the deck ─────────────────
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

export const meta: SlideMeta = {
  title: 'Vizion Roadmap 2026 → 2027',
  createdAt: '2026-06-04T03:52:44.159Z',
};

export default [
  Title,
  Timeline,
  TimeGrid,
  Lanes,
  Maintenance,
  Why,
  TechSelect,
  PocGate,
  Scope,
  Impact,
  Takeaways,
  Closing,
  Pillars,
] satisfies Page[];
