import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

// ─── Panel-tweakable design tokens ────────────────────────────────────────────
export const design: DesignSystem = {
  palette: {
    bg: '#0B1220',
    text: '#E2E8F0',
    accent: '#FF6B35',
  },
  fonts: {
    display: '"SF Mono", Menlo, Monaco, "JetBrains Mono", monospace',
    body: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  },
  typeScale: {
    hero: 140,
    body: 32,
  },
  radius: 4,
};

// ─── Extra constants outside the DesignSystem shape ──────────────────────────
const surface = '#121A2E';
const surfaceHi = '#1A2440';
const border = 'rgba(96, 165, 250, 0.18)';
const muted = '#8B97AE';
const dim = '#5A6B85';
const cyan = '#22D3EE';
const ok = '#34D399';
const warn = '#FBBF24';
const danger = '#F87171';

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
  overflow: 'hidden',
} as const;

const gridBg: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage: `
    linear-gradient(${border} 1px, transparent 1px),
    linear-gradient(90deg, ${border} 1px, transparent 1px)
  `,
  backgroundSize: '80px 80px',
  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
  pointerEvents: 'none',
};

// ─── Reusable bits ───────────────────────────────────────────────────────────

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 22,
      color: 'var(--osd-accent)',
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: 18,
    }}
  >
    <span
      style={{
        display: 'inline-block',
        width: 56,
        height: 1,
        background: 'var(--osd-accent)',
      }}
    />
    {children}
  </div>
);

const PageNumber = ({ n, total }: { n: number; total: number }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 60,
      right: 80,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 18,
      color: dim,
      letterSpacing: '0.15em',
    }}
  >
    {String(n).padStart(2, '0')} / {String(total).padStart(2, '0')}
  </div>
);

const TopRule = ({ label }: { label: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 60,
      left: 80,
      right: 80,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'var(--osd-font-display)',
      fontSize: 18,
      color: dim,
      letterSpacing: '0.18em',
      borderBottom: `1px solid ${border}`,
      paddingBottom: 14,
    }}
  >
    <span>@MOXA/GRAPH · V4.0.0</span>
    <span>{label}</span>
  </div>
);

const TOTAL = 13;

// ═════════════════════════════════════════════════════════════════════════════
// Page 1 — Cover
// ═════════════════════════════════════════════════════════════════════════════
const Cover: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      animation: 'osd-fade-in 600ms ease-out',
    }}
  >
    <style>{`
      @keyframes osd-fade-in {
        from { opacity: 0; transform: translateY(12px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes osd-row-in {
        from { opacity: 0; transform: translateX(-12px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes osd-pulse {
        0%, 100% { opacity: 0.5; }
        50%      { opacity: 1; }
      }
    `}</style>
    <div style={gridBg} />

    {/* Bracket marks */}
    <div
      style={{
        position: 'absolute',
        top: 80,
        left: 80,
        width: 60,
        height: 60,
        borderTop: `2px solid var(--osd-accent)`,
        borderLeft: `2px solid var(--osd-accent)`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        right: 80,
        width: 60,
        height: 60,
        borderBottom: `2px solid var(--osd-accent)`,
        borderRight: `2px solid var(--osd-accent)`,
      }}
    />

    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 160px',
      }}
    >
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 22, color: cyan, letterSpacing: '0.32em' }}>
        REFACTOR PLAN · v1.0
      </div>
      <div style={{ marginTop: 36, display: 'flex', alignItems: 'baseline', gap: 24, flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 700,
            lineHeight: 1.0,
            color: 'var(--osd-text)',
          }}
        >
          @moxa/graph
        </span>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 96,
            fontWeight: 600,
            color: 'var(--osd-accent)',
            lineHeight: 1.0,
          }}
        >
          v4.0.0
        </span>
      </div>
      <div
        style={{
          marginTop: 44,
          fontSize: 46,
          fontWeight: 300,
          color: 'var(--osd-text)',
          lineHeight: 1.35,
        }}
      >
        把渲染底層從 <span style={{ color: muted }}>AntV G6 5.x</span>
        <span style={{ color: 'var(--osd-accent)', margin: '0 16px', fontFamily: 'var(--osd-font-display)' }}>→</span>
        <span style={{ fontWeight: 500 }}>PixiJS v8</span>
      </div>
      <div
        style={{
          marginTop: 80,
          display: 'flex',
          gap: 64,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 22,
          color: muted,
          letterSpacing: '0.06em',
        }}
      >
        <div>
          <span style={{ color: dim }}>KICKOFF</span>
          <span style={{ color: 'var(--osd-text)', marginLeft: 14 }}>2026-05-25</span>
        </div>
        <div>
          <span style={{ color: dim }}>SHIP</span>
          <span style={{ color: 'var(--osd-text)', marginLeft: 14 }}>2026-09-01</span>
        </div>
        <div>
          <span style={{ color: dim }}>WINDOW</span>
          <span style={{ color: 'var(--osd-text)', marginLeft: 14 }}>14–15 weeks</span>
        </div>
      </div>
    </div>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 2 — TL;DR
// ═════════════════════════════════════════════════════════════════════════════
const StatCard = ({
  label,
  value,
  unit,
  hint,
}: {
  label: string;
  value: string;
  unit?: string;
  hint: string;
}) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 6,
      padding: '32px 36px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 16,
        color: dim,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 72,
          fontWeight: 700,
          color: 'var(--osd-accent)',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      {unit && (
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, color: muted }}>
          {unit}
        </span>
      )}
    </div>
    <div style={{ fontSize: 22, color: muted, lineHeight: 1.4 }}>{hint}</div>
  </div>
);

const TLDR: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="01 · TL;DR" />
    <div style={{ position: 'absolute', inset: 0, padding: '160px 80px 100px' }}>
      <Eyebrow>TL;DR</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 68,
          fontWeight: 700,
          margin: '24px 0 32px',
          lineHeight: 1.15,
        }}
      >
        14–15 週把 G6 換成 PixiJS，<br />
        發 <span style={{ color: 'var(--osd-accent)' }}>v4.0.0</span> 給 WAC Q4 整合。
      </h1>
      <div
        style={{
          fontSize: 28,
          color: muted,
          lineHeight: 1.5,
          maxWidth: 1500,
          marginBottom: 48,
        }}
      >
        Two drivers — <span style={{ color: 'var(--osd-text)' }}>效能</span>（WAC 10k+ 節點）+
        <span style={{ color: 'var(--osd-text)' }}> 維運</span>（2 人團隊 G6 升版成本）。
        Surface API 透過 edge-shim 軟相容；breaking changes 集中在 G6 內部抽象洩漏。
      </div>
      <div style={{ display: 'flex', gap: 28 }}>
        <StatCard label="Components" value="9→3" hint="只保留瀏覽 case 必要件" />
        <StatCard label="Behaviors" value="13→6" hint="編輯類延後 v4.1+" />
        <StatCard label="Plugins" value="10→3" hint="minimap / tooltip / bg" />
        <StatCard label="Layouts" value="5→2" hint="force + grid" />
      </div>
    </div>
    <PageNumber n={1} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 3 — Why now: Two Drivers
// ═════════════════════════════════════════════════════════════════════════════
const DriverRow = ({ k, now, need }: { k: string; now: string; need: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '180px 1fr 1fr',
      gap: 16,
      fontSize: 22,
      alignItems: 'baseline',
      paddingBottom: 12,
      borderBottom: `1px dashed ${border}`,
    }}
  >
    <span style={{ color: dim, fontFamily: 'var(--osd-font-display)', fontSize: 18 }}>{k}</span>
    <span style={{ color: muted }}>{now}</span>
    <span style={{ color: 'var(--osd-text)', fontWeight: 500 }}>{need}</span>
  </div>
);

const DriverBlock = ({
  tag,
  title,
  accentColor,
  children,
}: {
  tag: string;
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 6,
      padding: 36,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 16,
        color: accentColor,
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
      }}
    >
      {tag}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 42,
        fontWeight: 700,
        color: 'var(--osd-text)',
        lineHeight: 1.15,
      }}
    >
      {title}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 6 }}>
      {children}
    </div>
  </div>
);

const Drivers: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="02 · WHY NOW" />
    <div style={{ position: 'absolute', inset: 0, padding: '160px 80px 100px' }}>
      <Eyebrow>Two Drivers</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 700,
          margin: '24px 0 12px',
        }}
      >
        為什麼是<span style={{ color: 'var(--osd-accent)' }}>現在</span>。
      </h2>
      <div style={{ fontSize: 24, color: muted, marginBottom: 40 }}>
        <span style={{ color: dim, fontFamily: 'var(--osd-font-display)', marginRight: 8 }}>CURRENT</span>
        <span style={{ color: 'var(--osd-text)' }}>→</span>
        <span style={{ color: dim, fontFamily: 'var(--osd-font-display)', margin: '0 8px' }}>REQUIRED</span>
      </div>
      <div style={{ display: 'flex', gap: 32 }}>
        <DriverBlock
          tag="Driver i · Performance"
          title="WAC 需要 10k+ 節點"
          accentColor={cyan}
        >
          <DriverRow k="同屏上限" now="5k 開始掉 fps" need="10k+ 穩定" />
          <DriverRow k="觸發時點" now="已逼近 ceiling" need="Q4 2026 必達" />
        </DriverBlock>
        <DriverBlock
          tag="Driver iv · Operations"
          title="2 人團隊綁不住 G6 升版"
          accentColor="var(--osd-accent)"
        >
          <DriverRow k="維護人手" now="2 人 FTE" need="頻寬解綁" />
          <DriverRow k="升版節奏" now="G6 不嚴謹" need="自家擁有" />
          <DriverRow k="遷移成本" now="每次破壞" need="一次性解決" />
        </DriverBlock>
      </div>
    </div>
    <PageNumber n={2} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 4 — Why not stay on G6 (the three forced options)
// ═════════════════════════════════════════════════════════════════════════════
const ForcedOption = ({
  n,
  label,
  rejection,
}: {
  n: string;
  label: string;
  rejection: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '80px 1fr 1fr',
      alignItems: 'center',
      gap: 32,
      padding: '28px 32px',
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 6,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 44,
        fontWeight: 700,
        color: dim,
      }}
    >
      {n}
    </div>
    <div style={{ fontSize: 30, color: 'var(--osd-text)', fontWeight: 500 }}>{label}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 14,
          color: danger,
          letterSpacing: '0.2em',
          padding: '4px 10px',
          border: `1px solid ${danger}`,
          borderRadius: 3,
        }}
      >
        REJECTED
      </span>
      <span style={{ fontSize: 22, color: muted, lineHeight: 1.4 }}>{rejection}</span>
    </div>
  </div>
);

const NoRefactorCost: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="03 · COST OF NOT REFACTORING" />
    <div style={{ position: 'absolute', inset: 0, padding: '160px 80px 100px' }}>
      <Eyebrow>If we don't refactor</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 56,
          fontWeight: 700,
          margin: '24px 0 12px',
          lineHeight: 1.2,
        }}
      >
        WAC 會被迫採用三個選項之一。
      </h2>
      <div style={{ fontSize: 24, color: muted, marginBottom: 40 }}>
        三個都不可行 — 所以重構是唯一可控的路。
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <ForcedOption
          n="01"
          label="砍 WAC scale 到 5k"
          rejection="規格決策不在我們手上"
        />
        <ForcedOption
          n="02"
          label="G6 5.x WebGL 深度優化 N 週"
          rejection="工時不可控、結果不保證、綁定 AntV"
        />
        <ForcedOption
          n="03"
          label="自研 — 本案"
          rejection="這就是我們要做的事 ✓"
        />
      </div>
    </div>
    <PageNumber n={3} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 5 — Why PixiJS (scoring)
// ═════════════════════════════════════════════════════════════════════════════
const CandidateRow = ({
  name,
  score,
  verdict,
  reason,
  picked,
}: {
  name: string;
  score: number;
  verdict: string;
  reason: string;
  picked?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '300px 200px 200px 1fr',
      alignItems: 'center',
      gap: 24,
      padding: '28px 32px',
      background: picked ? surfaceHi : surface,
      border: `1px solid ${picked ? 'var(--osd-accent)' : border}`,
      borderRadius: 6,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 30,
        fontWeight: 700,
        color: picked ? 'var(--osd-accent)' : 'var(--osd-text)',
      }}
    >
      {name}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          flex: 1,
          height: 8,
          background: '#0B1220',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${(score / 70) * 100}%`,
            height: '100%',
            background: picked ? 'var(--osd-accent)' : muted,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 26,
          fontWeight: 700,
          color: picked ? 'var(--osd-accent)' : muted,
          minWidth: 36,
          textAlign: 'right',
        }}
      >
        {score}
      </span>
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 14,
        letterSpacing: '0.2em',
        color: picked ? ok : dim,
        padding: '4px 10px',
        border: `1px solid ${picked ? ok : dim}`,
        borderRadius: 3,
        justifySelf: 'start',
      }}
    >
      {verdict}
    </div>
    <div style={{ fontSize: 22, color: muted }}>{reason}</div>
  </div>
);

const WhyPixi: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="04 · ENGINE SELECTION" />
    <div style={{ position: 'absolute', inset: 0, padding: '160px 80px 100px' }}>
      <Eyebrow>Why PixiJS</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 60,
          fontWeight: 700,
          margin: '24px 0 16px',
        }}
      >
        加權評分 — <span style={{ color: 'var(--osd-accent)' }}>PixiJS 62</span> / 滿分 70。
      </h2>
      <div style={{ fontSize: 24, color: muted, marginBottom: 36 }}>
        完整分析見 CANVAS-ENGINE-ANALYSIS.md。
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <CandidateRow
          name="AntV G6 5.x"
          score={45}
          verdict="STATUS QUO"
          reason="即現況 — 不解決 driver"
        />
        <CandidateRow
          name="Cytoscape.js"
          score={42}
          verdict="EXCLUDED"
          reason="客製受限、10k 邊緣、無地圖整合"
        />
        <CandidateRow
          name="PixiJS v8"
          score={62}
          verdict="ADOPTED"
          reason="100k+ 規模 demo 過、TS 體驗頂級、自家擁有抽象"
          picked
        />
      </div>
    </div>
    <PageNumber n={4} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 6 — P0 Scope (4 columns)
// ═════════════════════════════════════════════════════════════════════════════
const ScopeItem = ({ accentColor, children }: { accentColor: string; children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 19,
      color: 'var(--osd-text)',
      paddingLeft: 14,
      borderLeft: `2px solid ${accentColor}`,
      lineHeight: 1.35,
    }}
  >
    {children}
  </div>
);

const ScopeColumn = ({
  tag,
  title,
  hint,
  accentColor,
  children,
}: {
  tag: string;
  title: string;
  hint: string;
  accentColor: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${border}`,
      borderTop: `3px solid ${accentColor}`,
      borderRadius: 6,
      padding: '24px 24px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 14,
        color: accentColor,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
      }}
    >
      {tag}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 26,
        fontWeight: 700,
        color: 'var(--osd-text)',
        lineHeight: 1.2,
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: 18, color: muted, lineHeight: 1.4, minHeight: 50 }}>{hint}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
      {children}
    </div>
  </div>
);

const Scope: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="05 · P0 SCOPE" />
    <div style={{ position: 'absolute', inset: 0, padding: '150px 80px 100px' }}>
      <Eyebrow>P0 Scope — v4.0.0</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 56,
          fontWeight: 700,
          margin: '20px 0 32px',
        }}
      >
        四欄分組 — Native / Shim / Defer / Drop。
      </h2>
      <div style={{ display: 'flex', gap: 20 }}>
        <ScopeColumn
          tag="① Native"
          title="WAC 直接需要"
          hint="瀏覽 case 必要件 — 全部重寫"
          accentColor="var(--osd-accent)"
        >
          <ScopeItem accentColor="var(--osd-accent)">node-simple</ScopeItem>
          <ScopeItem accentColor="var(--osd-accent)">edge-line / edge-label</ScopeItem>
          <ScopeItem accentColor="var(--osd-accent)">drag / zoom / scroll canvas</ScopeItem>
          <ScopeItem accentColor="var(--osd-accent)">click-select / hover</ScopeItem>
          <ScopeItem accentColor="var(--osd-accent)">minimap / tooltip / bg</ScopeItem>
          <ScopeItem accentColor="var(--osd-accent)">force (FA2) / grid</ScopeItem>
        </ScopeColumn>
        <ScopeColumn
          tag="② Shim"
          title="既有 consumer 包裹"
          hint="範圍依 Week 1 audit · 上限 3–5 週"
          accentColor={cyan}
        >
          <ScopeItem accentColor={cyan}>node-device (複合)</ScopeItem>
          <ScopeItem accentColor={cyan}>edge-polyline / quadratic</ScopeItem>
          <ScopeItem accentColor={cyan}>group-device (折疊)</ScopeItem>
          <ScopeItem accentColor={cyan}>brush-select / drag-element</ScopeItem>
          <ScopeItem accentColor={cyan}>collapse-expand</ScopeItem>
        </ScopeColumn>
        <ScopeColumn
          tag="③ Defer"
          title="延後 v4.1+"
          hint="不在 v4 ship — 進 backlog"
          accentColor={warn}
        >
          <ScopeItem accentColor={warn}>create-edge / drill-down</ScopeItem>
          <ScopeItem accentColor={warn}>history / snapline</ScopeItem>
          <ScopeItem accentColor={warn}>context-menu / toolbar</ScopeItem>
          <ScopeItem accentColor={warn}>hull / rich-tooltip</ScopeItem>
          <ScopeItem accentColor={warn}>tree / ring / align layout</ScopeItem>
        </ScopeColumn>
        <ScopeColumn
          tag="④ Drop"
          title="v4 直接移除"
          hint="G6 內部抽象洩漏 — 不應 export"
          accentColor={danger}
        >
          <ScopeItem accentColor={danger}>renderer: 'svg'/'webgl' 切換</ScopeItem>
          <ScopeItem accentColor={danger}>BEHAVIOR_FACTORIES</ScopeItem>
          <ScopeItem accentColor={danger}>PLUGIN_FACTORIES</ScopeItem>
          <ScopeItem accentColor={danger}>transformBehaviors / Plugins</ScopeItem>
          <ScopeItem accentColor={danger}>peerDep @antv/g6</ScopeItem>
        </ScopeColumn>
      </div>
    </div>
    <PageNumber n={5} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 7 — Consumer Impact & Migration
// ═════════════════════════════════════════════════════════════════════════════
const TimelineNode = ({
  version,
  date,
  state,
  desc,
  color,
}: {
  version: string;
  date: string;
  state: string;
  desc: string;
  color: string;
}) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 0 4px ${surface}, 0 0 0 5px ${color}`,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--osd-text)',
        }}
      >
        {version}
      </div>
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 16,
        color: dim,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
      }}
    >
      {date}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 14,
        color,
        letterSpacing: '0.22em',
        padding: '4px 10px',
        border: `1px solid ${color}`,
        borderRadius: 3,
        alignSelf: 'flex-start',
      }}
    >
      {state}
    </div>
    <div style={{ fontSize: 20, color: muted, lineHeight: 1.45 }}>{desc}</div>
  </div>
);

const Migration: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="06 · MIGRATION" />
    <div style={{ position: 'absolute', inset: 0, padding: '160px 80px 100px' }}>
      <Eyebrow>Strategy A′ — Hard break + sized shim</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 56,
          fontWeight: 700,
          margin: '20px 0 16px',
          lineHeight: 1.2,
        }}
      >
        Consumer 有 <span style={{ color: 'var(--osd-accent)' }}>6–12 個月</span>遷移窗口。
      </h2>
      <div style={{ fontSize: 24, color: muted, marginBottom: 56, maxWidth: 1500 }}>
        Shim 範圍 = 既有 2 consumer 真實 import 集合（Week 1 α+γ audit 決定）。
        Surface API 軟相容；breaking 集中在 G6 內部抽象洩漏的部分。
      </div>
      <div
        style={{
          position: 'relative',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 9,
            left: 30,
            right: 30,
            height: 1,
            background: border,
          }}
        />
        <div style={{ display: 'flex', gap: 28, position: 'relative' }}>
          <TimelineNode
            version="v3.x"
            date="NOW · 2026-05"
            state="MAINTAIN"
            desc="Feature freeze — 僅修 critical bug"
            color={dim}
          />
          <TimelineNode
            version="v4.0.0-β"
            date="W14 · 2026-08-24"
            state="BETA"
            desc="既有 2 consumer + WAC 試裝"
            color={cyan}
          />
          <TimelineNode
            version="v4.0.0"
            date="W15 · 2026-09-01"
            state="SHIP"
            desc="shim 帶 @deprecated + runtime warn"
            color="var(--osd-accent)"
          />
          <TimelineNode
            version="v5.0.0"
            date="+6–12 MONTHS"
            state="CLEANUP"
            desc="Shim 全部移除"
            color={danger}
          />
        </div>
      </div>
    </div>
    <PageNumber n={6} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 8 — WAC binding
// ═════════════════════════════════════════════════════════════════════════════
const WACStep = ({
  n,
  when,
  what,
  output,
}: {
  n: string;
  when: string;
  what: string;
  output: string;
}) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 6,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'relative',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 60,
        fontWeight: 700,
        color: 'var(--osd-accent)',
        lineHeight: 1,
        opacity: 0.35,
      }}
    >
      {n}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 16,
        color: cyan,
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
      }}
    >
      {when}
    </div>
    <div style={{ fontSize: 26, color: 'var(--osd-text)', fontWeight: 500, lineHeight: 1.3 }}>
      {what}
    </div>
    <div
      style={{
        fontSize: 18,
        color: muted,
        lineHeight: 1.45,
        marginTop: 'auto',
        paddingTop: 18,
        borderTop: `1px dashed ${border}`,
      }}
    >
      <span style={{ color: dim, fontFamily: 'var(--osd-font-display)', fontSize: 14, letterSpacing: '0.18em' }}>
        OUTPUT
      </span>
      <br />
      {output}
    </div>
  </div>
);

const WAC: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="07 · WAC BINDING" />
    <div style={{ position: 'absolute', inset: 0, padding: '160px 80px 100px' }}>
      <Eyebrow>WAC requirements — Mode B</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 56,
          fontWeight: 700,
          margin: '20px 0 12px',
        }}
      >
        紙上需求 walk-through，<span style={{ color: 'var(--osd-accent)' }}>Week 1 lock</span>。
      </h2>
      <div style={{ fontSize: 24, color: muted, marginBottom: 44, maxWidth: 1500 }}>
        WAC 沒有 code 可 grep — 第 1 週開設計會議拿到節點視覺草稿、互動需求、規模預估。
        之後新需求 → 一律 v4.1，不擴 v4 scope。
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <WACStep
          n="01"
          when="Week 1"
          what="60–90 min 設計會議 — 拿視覺草稿、互動需求、規模預估"
          output="WAC-NEEDS.md"
        />
        <WACStep
          n="02"
          when="Week 1 end · Gate G1"
          what="WAC 需求對齊 P0 scope — 鎖定不再擴張"
          output="進 G1 / shim ≤ 15 symbols"
        />
        <WACStep
          n="03"
          when="Every month"
          what="月度 demo — WAC team 工程師受邀，設計 drift 早期發現"
          output="共識同步 · 無 PO 簽核"
        />
      </div>
    </div>
    <PageNumber n={7} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 9 — Timeline 14–15 weeks
// ═════════════════════════════════════════════════════════════════════════════
const PhaseBar = ({
  code,
  weeks,
  title,
  date,
  width,
  offset,
  color,
  gateAt,
}: {
  code: string;
  weeks: string;
  title: string;
  date: string;
  width: number;
  offset: number;
  color: string;
  gateAt?: 'right' | 'left';
}) => (
  <div style={{ position: 'relative', height: 56, marginBottom: 14 }}>
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 14,
        width: 140,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 16,
        color: dim,
        letterSpacing: '0.16em',
      }}
    >
      {code} · {weeks}
    </div>
    <div
      style={{
        position: 'absolute',
        left: `${160 + offset}px`,
        top: 8,
        height: 40,
        width: `${width}px`,
        background: color,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 18,
          fontWeight: 600,
          color: '#0B1220',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </span>
      <span
        style={{
          marginLeft: 'auto',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 14,
          color: 'rgba(11,18,32,0.7)',
          whiteSpace: 'nowrap',
        }}
      >
        {date}
      </span>
    </div>
    {gateAt && (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: gateAt === 'right' ? `${160 + offset + width - 8}px` : `${160 + offset - 8}px`,
          width: 16,
          height: 56,
          background: 'var(--osd-accent)',
          clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
        }}
      />
    )}
  </div>
);

const Timeline: Page = () => {
  // Each week ≈ 90px. 15 weeks = 1350px. Container = ~1600px wide.
  const W = 90;
  return (
    <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
      <div style={gridBg} />
      <TopRule label="08 · TIMELINE" />
      <div style={{ position: 'absolute', inset: 0, padding: '140px 80px 80px' }}>
        <Eyebrow>14–15 weeks · 9 phases</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 44,
            fontWeight: 700,
            margin: '14px 0 18px',
          }}
        >
          2026-05-25 <span style={{ color: 'var(--osd-accent)' }}>→</span> 2026-09-01
        </h2>
        <div style={{ position: 'relative', paddingTop: 8 }}>
          <PhaseBar code="P0" weeks="W1" title="Audit + WAC walk-through" date="05-25" width={W * 1} offset={0} color="#3B82F6" gateAt="right" />
          <PhaseBar code="P1" weeks="W2" title="Perf spike (10k/30k)" date="06-01" width={W * 1} offset={W * 1} color={cyan} gateAt="right" />
          <PhaseBar code="P2" weeks="W3–4" title="Interaction spike" date="06-08" width={W * 2} offset={W * 2} color={cyan} gateAt="right" />
          <PhaseBar code="P3" weeks="W5–6" title="Core + viewport 底座" date="06-22" width={W * 2} offset={W * 4} color="#A855F7" />
          <PhaseBar code="P4" weeks="W7–8" title="Component 三件套" date="07-06" width={W * 2} offset={W * 6} color="#A855F7" />
          <PhaseBar code="P5" weeks="W9–10" title="Behavior 六件套" date="07-20" width={W * 2} offset={W * 8} color="#A855F7" />
          <PhaseBar code="P6" weeks="W11–12" title="Plugin + Layout" date="08-03" width={W * 2} offset={W * 10} color="#A855F7" />
          <PhaseBar code="P7" weeks="W13" title="Shim + MIGRATION.md" date="08-17" width={W * 1} offset={W * 12} color={warn} />
          <PhaseBar code="P8" weeks="W14–15" title="Beta + Ship v4.0.0" date="08-24" width={W * 2} offset={W * 13} color={ok} />
          <div
            style={{
              marginTop: 24,
              display: 'flex',
              gap: 32,
              fontSize: 18,
              color: muted,
              fontFamily: 'var(--osd-font-display)',
            }}
          >
            <span>
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  background: 'var(--osd-accent)',
                  clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
                  marginRight: 8,
                  verticalAlign: 'middle',
                }}
              />
              GATE (G1 / G2 / G3)
            </span>
            <span style={{ color: dim }}>Spike → 立即觸發 gate review · 不等雙週 cycle</span>
          </div>
        </div>
      </div>
      <PageNumber n={8} total={TOTAL} />
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════════════
// Page 10 — Three Gates
// ═════════════════════════════════════════════════════════════════════════════
const GateCard = ({
  id,
  when,
  title,
  pass,
  fail,
}: {
  id: string;
  when: string;
  title: string;
  pass: string;
  fail: string;
}) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 6,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'relative',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 24,
        right: 28,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 14,
        color: dim,
        letterSpacing: '0.2em',
      }}
    >
      {when}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 80,
        fontWeight: 700,
        color: 'var(--osd-accent)',
        lineHeight: 0.9,
      }}
    >
      {id}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 26,
        fontWeight: 700,
        color: 'var(--osd-text)',
        lineHeight: 1.2,
      }}
    >
      {title}
    </div>
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 13,
          color: ok,
          letterSpacing: '0.22em',
          marginBottom: 6,
        }}
      >
        ✓ PASS
      </div>
      <div style={{ fontSize: 19, color: 'var(--osd-text)', lineHeight: 1.45 }}>{pass}</div>
    </div>
    <div style={{ marginTop: 4 }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 13,
          color: danger,
          letterSpacing: '0.22em',
          marginBottom: 6,
        }}
      >
        ✗ FAIL
      </div>
      <div style={{ fontSize: 19, color: muted, lineHeight: 1.45 }}>{fail}</div>
    </div>
  </div>
);

const Gates: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="09 · HARD GATES" />
    <div style={{ position: 'absolute', inset: 0, padding: '160px 80px 100px' }}>
      <Eyebrow>Three Hard Gates</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 56,
          fontWeight: 700,
          margin: '20px 0 12px',
        }}
      >
        Go / abort 決策點 — 不是 demo。
      </h2>
      <div style={{ fontSize: 24, color: muted, marginBottom: 44 }}>
        Spike 完成立即觸發 gate review，不等下一個雙週 cycle。
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <GateCard
          id="G1"
          when="W1 END"
          title="Audit gate"
          pass="α+γ 完成 · WAC-NEEDS.md · shim ≤ 15 symbols"
          fail="Shim 過大 → REPLAN P0 scope"
        />
        <GateCard
          id="G2"
          when="W2 END"
          title="Perf gate"
          pass="10k node + 30k edge · 平均 ≥ 50fps · p1 < 100ms"
          fail="ABORT v4 · 啟動 Plan B (β3)"
        />
        <GateCard
          id="G3"
          when="W4 END"
          title="Interaction gate"
          pass="Click hit-test < 50ms · hover 順暢 @ 10k 規模"
          fail="投 1 週 rbush 調校 · 仍不達標再 abort"
        />
      </div>
    </div>
    <PageNumber n={9} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 11 — People & rhythm
// ═════════════════════════════════════════════════════════════════════════════
const PersonCard = ({
  role,
  alloc,
  duties,
  color,
}: {
  role: string;
  alloc: string;
  duties: string;
  color: string;
}) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${border}`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 6,
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 32,
          fontWeight: 700,
          color: 'var(--osd-text)',
        }}
      >
        {role}
      </span>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 22,
          fontWeight: 600,
          color,
        }}
      >
        {alloc}
      </span>
    </div>
    <div style={{ fontSize: 22, color: muted, lineHeight: 1.45 }}>{duties}</div>
  </div>
);

const DefaultRule = ({ n, rule }: { n: string; rule: string }) => (
  <div
    style={{
      display: 'flex',
      gap: 20,
      alignItems: 'baseline',
      padding: '16px 24px',
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 4,
    }}
  >
    <span
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 18,
        color: 'var(--osd-accent)',
        letterSpacing: '0.18em',
        flexShrink: 0,
      }}
    >
      DEF {n}
    </span>
    <span style={{ fontSize: 22, color: 'var(--osd-text)', lineHeight: 1.4 }}>{rule}</span>
  </div>
);

const People: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="10 · TEAM & RHYTHM" />
    <div style={{ position: 'absolute', inset: 0, padding: '150px 80px 100px' }}>
      <Eyebrow>Team — 1 FTE + 30% reviewer</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 48,
          fontWeight: 700,
          margin: '18px 0 28px',
        }}
      >
        雙人 sync · 雙週 review · 月度 demo
      </h2>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <PersonCard
          role="主筆"
          alloc="100% on v4"
          duties="重構主線實作、spike、所有 P0–P8 階段交付"
          color="var(--osd-accent)"
        />
        <PersonCard
          role="Reviewer"
          alloc="30% v4 + 70% v3"
          duties="雙週 review、spike gate 共決、v3 critical bug 修復"
          color={cyan}
        />
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 16,
          color: dim,
          letterSpacing: '0.22em',
          marginBottom: 14,
        }}
      >
        3 BAKED-IN DEFAULTS — 不需討論直接照做
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DefaultRule n="01" rule="fps 通過線 = 平均 50fps + p1 抖動 < 100ms（不是 60fps）" />
        <DefaultRule n="02" rule="Consumer 用了 transform* helper → 一律請 consumer 改寫，shim 不包" />
        <DefaultRule n="03" rule="WAC walk-through 後新需求 → 視為 v4.1，不擴 v4 scope" />
      </div>
    </div>
    <PageNumber n={10} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 12 — Testing strategy
// ═════════════════════════════════════════════════════════════════════════════
const WeekChip = ({
  range,
  action,
  color,
}: {
  range: string;
  action: string;
  color: string;
}) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${border}`,
      borderTop: `3px solid ${color}`,
      borderRadius: 4,
      padding: '22px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 22,
        fontWeight: 700,
        color,
      }}
    >
      {range}
    </div>
    <div style={{ fontSize: 20, color: 'var(--osd-text)', lineHeight: 1.45 }}>{action}</div>
  </div>
);

const Testing: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="11 · TESTING" />
    <div style={{ position: 'absolute', inset: 0, padding: '150px 80px 100px' }}>
      <Eyebrow>Strategy A · Reset baseline at W13</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 52,
          fontWeight: 700,
          margin: '18px 0 16px',
          lineHeight: 1.2,
        }}
      >
        Pixel <span style={{ color: 'var(--osd-accent)' }}>.skip()</span> until W13 —
        behavioral test + Storybook 撐住 12 週。
      </h2>
      <div style={{ fontSize: 24, color: muted, marginBottom: 36, maxWidth: 1500 }}>
        Mitigation：每週五 15 分鐘 Storybook visual sweep · drift log W13 前清零。
      </div>
      <div style={{ display: 'flex', gap: 18, marginBottom: 32 }}>
        <WeekChip range="W1" action="既有 pixel tests 全 .skip() — 註解「v4 refactor」" color={dim} />
        <WeekChip range="W1–12" action="新 component / behavior 寫 behavioral test，不寫 pixel" color={cyan} />
        <WeekChip range="W13" action="重生所有 pixel baseline · 切 Docker fixed image" color="var(--osd-accent)" />
        <WeekChip range="W14" action="雙人 + WAC walk-through 視覺驗收" color={ok} />
      </div>
      <div
        style={{
          background: surfaceHi,
          border: `1px solid ${border}`,
          borderLeft: `4px solid ${cyan}`,
          borderRadius: 4,
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 32,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 16,
            color: cyan,
            letterSpacing: '0.22em',
            flexShrink: 0,
          }}
        >
          BONUS WIN
        </span>
        <span style={{ fontSize: 22, color: 'var(--osd-text)', lineHeight: 1.45 }}>
          W13 順便切 Docker-fixed image — 徹底消除 macOS/CI 7px 高度差抖動。
        </span>
      </div>
    </div>
    <PageNumber n={11} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 13 — Risk + Plan B
// ═════════════════════════════════════════════════════════════════════════════
const RiskRow = ({
  id,
  risk,
  severity,
  mitigation,
}: {
  id: string;
  risk: string;
  severity: 'HIGH' | 'MED' | 'LOW';
  mitigation: string;
}) => {
  const sevColor = severity === 'HIGH' ? danger : severity === 'MED' ? warn : dim;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '70px 1fr 90px 1fr',
        gap: 20,
        alignItems: 'baseline',
        padding: '14px 20px',
        background: surface,
        border: `1px solid ${border}`,
        borderLeft: `3px solid ${sevColor}`,
        borderRadius: 4,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 20,
          fontWeight: 700,
          color: sevColor,
        }}
      >
        {id}
      </span>
      <span style={{ fontSize: 20, color: 'var(--osd-text)', lineHeight: 1.35 }}>{risk}</span>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 13,
          color: sevColor,
          letterSpacing: '0.2em',
          padding: '3px 10px',
          border: `1px solid ${sevColor}`,
          borderRadius: 3,
          justifySelf: 'start',
        }}
      >
        {severity}
      </span>
      <span style={{ fontSize: 19, color: muted, lineHeight: 1.4 }}>{mitigation}</span>
    </div>
  );
};

const Risk: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="12 · RISK + PLAN B" />
    <div style={{ position: 'absolute', inset: 0, padding: '150px 80px 100px' }}>
      <Eyebrow>Risk register</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 48,
          fontWeight: 700,
          margin: '18px 0 24px',
        }}
      >
        5 個風險 + Plan B (β3)。
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        <RiskRow id="R1" risk="Bus factor = 1 — 主筆 SPOF" severity="HIGH" mitigation="Reviewer 30% + 雙週 review 強制知識同步" />
        <RiskRow id="R2" risk="既有 consumer 拒絕遷移" severity="MED" mitigation="Shim + 同公司可拉會 + 6–12 月窗口" />
        <RiskRow id="R3" risk="WAC 需求中途劇變" severity="MED" mitigation="Default 3：新需求一律 v4.1" />
        <RiskRow id="R4" risk="Storybook 重寫工時低估" severity="MED" mitigation="每完成一 component 立刻寫 story" />
        <RiskRow id="R5" risk="v3 critical bug 暴增" severity="LOW" mitigation="Feature freeze · reviewer 主擔 v3" />
      </div>
      <div
        style={{
          background: surfaceHi,
          border: `1px solid ${danger}`,
          borderRadius: 4,
          padding: '20px 28px',
          display: 'grid',
          gridTemplateColumns: '140px 1fr 1fr',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            fontWeight: 700,
            color: danger,
            letterSpacing: '0.2em',
          }}
        >
          PLAN B · β3
        </span>
        <span style={{ fontSize: 20, color: 'var(--osd-text)', lineHeight: 1.4 }}>
          觸發：G2 perf 失敗 → ABORT，等 G6 6.x
        </span>
        <span style={{ fontSize: 20, color: muted, lineHeight: 1.4 }}>
          等待無上限 · WAC ship 延後 · kickoff 前同步給 WAC team
        </span>
      </div>
    </div>
    <PageNumber n={12} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 14 — Pre-kickoff checklist
// ═════════════════════════════════════════════════════════════════════════════
const CheckItem = ({
  n,
  who,
  what,
  why,
}: {
  n: string;
  who: string;
  what: string;
  why: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '80px 200px 1fr',
      gap: 32,
      alignItems: 'start',
      padding: '32px 36px',
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 6,
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        border: `2px solid var(--osd-accent)`,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 26,
        fontWeight: 700,
        color: 'var(--osd-accent)',
      }}
    >
      {n}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 16,
        color: cyan,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        paddingTop: 18,
      }}
    >
      {who}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 26, color: 'var(--osd-text)', fontWeight: 500, lineHeight: 1.35 }}>
        {what}
      </div>
      <div style={{ fontSize: 20, color: muted, lineHeight: 1.45 }}>{why}</div>
    </div>
  </div>
);

const Checklist: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />
    <TopRule label="13 · PRE-KICKOFF" />
    <div style={{ position: 'absolute', inset: 0, padding: '160px 80px 100px' }}>
      <Eyebrow>Before 2026-05-25</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 56,
          fontWeight: 700,
          margin: '20px 0 36px',
        }}
      >
        三件事，kickoff 前必完成。
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <CheckItem
          n="01"
          who="WAC team"
          what="同步 Plan B 風險"
          why="1 對 1 會議告知 spike 有失敗可能 — 不要求簽核，但資訊同步"
        />
        <CheckItem
          n="02"
          who="2 Consumer teams"
          what="同步 v3 feature freeze"
          why="協調重構期間 v3 不接 feature · request 統一進 v4 backlog"
        />
        <CheckItem
          n="03"
          who="主筆 self-prep"
          what="PixiJS v8 入門功課"
          why="預留 3–5 天看官方文件 + pixi-viewport / graphology 基本操作"
        />
      </div>
    </div>
    <PageNumber n={13} total={TOTAL} />
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// Page 15 — Closing
// ═════════════════════════════════════════════════════════════════════════════
const Closing: Page = () => (
  <div style={{ ...fill, background: 'var(--osd-bg)', color: 'var(--osd-text)' }}>
    <div style={gridBg} />

    <div
      style={{
        position: 'absolute',
        top: 80,
        left: 80,
        width: 60,
        height: 60,
        borderTop: `2px solid var(--osd-accent)`,
        borderLeft: `2px solid var(--osd-accent)`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        right: 80,
        width: 60,
        height: 60,
        borderBottom: `2px solid var(--osd-accent)`,
        borderRight: `2px solid var(--osd-accent)`,
      }}
    />

    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 160px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 22,
          color: cyan,
          letterSpacing: '0.32em',
        }}
      >
        2026-05-25 · KICKOFF
      </div>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 700,
          margin: '36px 0 24px',
          lineHeight: 1.0,
        }}
      >
        Ship it.
      </h1>
      <div
        style={{
          fontSize: 40,
          fontWeight: 300,
          color: muted,
          lineHeight: 1.4,
          maxWidth: 1500,
        }}
      >
        Plan v1.0 — 9 個決策點 · 3 個 gates · 1 個 Plan B.
        <br />
        <span style={{ color: 'var(--osd-text)' }}>
          回饋 / 修訂前請 ping 主筆。
        </span>
      </div>
      <div
        style={{
          marginTop: 100,
          display: 'flex',
          gap: 40,
          alignItems: 'center',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 18,
          color: dim,
          letterSpacing: '0.18em',
        }}
      >
        <span>@MOXA/GRAPH · v4.0.0</span>
        <span style={{ color: border }}>·</span>
        <span>PLAN v1.0 · 2026-05-19</span>
        <span style={{ color: border }}>·</span>
        <span>SHIP 2026-09-01</span>
      </div>
    </div>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════

export const meta: SlideMeta = {
  title: '@moxa/graph v4.0.0 重構計劃',
  createdAt: '2026-05-19T16:10:30.635Z',
};

export default [
  Cover,
  TLDR,
  Drivers,
  NoRefactorCost,
  WhyPixi,
  Scope,
  Migration,
  WAC,
  Timeline,
  Gates,
  People,
  Testing,
  Risk,
  Checklist,
  Closing,
] satisfies Page[];
