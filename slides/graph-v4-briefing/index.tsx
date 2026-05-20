import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useEffect, useState } from 'react';

// ─── Panel-tweakable design tokens ────────────────────────────────────────────
export const design: DesignSystem = {
  palette: {
    bg: '#F4F1EA',
    text: '#1A1814',
    accent: '#B0492A',
  },
  fonts: {
    display:
      '"Songti TC", "STSong", "Source Han Serif TC", "Noto Serif TC", "Iowan Old Style", "Charter", "Georgia", serif',
    body:
      '"PingFang TC", "Noto Sans TC", "Source Han Sans TC", "Microsoft JhengHei", -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  },
  typeScale: {
    hero: 168,
    body: 36,
  },
  radius: 2,
};

// ─── Extra constants outside the DesignSystem shape ──────────────────────────
const ink = '#1A1814';
const accent = '#B0492A';
const muted = '#6E665A';
const dim = '#9C9385';
const hairline = 'rgba(26, 24, 20, 0.16)';
const wash = '#E9E3D6';
const washDeep = '#DED5C2';

const signal = {
  green: '#2F6B3F',
  amber: '#B07A1F',
  red: '#9E2A2A',
  blue: '#1F4F7A',
};

const TOTAL = 31;

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

// ─── Fade-in entrance ─────────────────────────────────────────────────────────

const useEntrance = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return {
    opacity: ready ? 1 : 0,
    transform: ready ? 'translateY(0)' : 'translateY(14px)',
    transition: 'opacity 700ms ease-out, transform 700ms ease-out',
  };
};

// ─── Reusable bits ───────────────────────────────────────────────────────────

const Roman = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontFamily: 'var(--osd-font-body)',
      fontSize: 18,
      color: accent,
      letterSpacing: '0.24em',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: 18,
    }}
  >
    <span style={{ display: 'inline-block', width: 48, height: 1, background: accent }} />
    {children}
  </div>
);

const TopRule = ({
  chapter,
  chapterName,
  label,
}: {
  chapter: number;
  chapterName: string;
  label: string;
}) => (
  <div
    style={{
      position: 'absolute',
      top: 64,
      left: 140,
      right: 140,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontFamily: 'var(--osd-font-body)',
      fontSize: 16,
      color: muted,
      letterSpacing: '0.16em',
      borderBottom: `1px solid ${hairline}`,
      paddingBottom: 14,
    }}
  >
    <span>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontStyle: 'italic',
          color: ink,
          letterSpacing: '0.04em',
          fontSize: 18,
          marginRight: 14,
        }}
      >
        Ch.{Roman[chapter]}
      </span>
      <span style={{ color: ink }}>{chapterName}</span>
      <span style={{ margin: '0 14px', color: dim }}>·</span>
      <span>@moxa/graph · v4 · 決策簡報</span>
    </span>
    <span>{label}</span>
  </div>
);

const Footer = ({ n }: { n: number }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 60,
      left: 140,
      right: 140,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontFamily: 'var(--osd-font-body)',
      fontSize: 15,
      color: muted,
      letterSpacing: '0.14em',
    }}
  >
    <span>首席 RD · @moxa/graph 維護團隊</span>
    <span>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontStyle: 'italic',
          color: ink,
          letterSpacing: '0.04em',
          fontSize: 17,
        }}
      >
        {String(n).padStart(2, '0')}
      </span>
      <span style={{ color: muted, margin: '0 6px' }}>/</span>
      <span>{String(TOTAL).padStart(2, '0')}</span>
    </span>
  </div>
);

// ─── Page 1 · Cover ─────────────────────────────────────────────────────────

const Cover: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '140px 140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 64,
          left: 140,
          right: 140,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          fontFamily: 'var(--osd-font-body)',
          fontSize: 16,
          color: muted,
          letterSpacing: '0.16em',
        }}
      >
        <span>Moxa · 網路視覺化</span>
        <span>內部文件 · 初稿 v1 · 2026-05-20</span>
      </div>

      <div style={anim}>
        <div style={{ marginTop: 60 }}>
          <Eyebrow>決策簡報 · 二十六週 · 兩位 RD</Eyebrow>
        </div>

        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            margin: '48px 0 0 0',
            maxWidth: 1500,
          }}
        >
          重建
          <br />
          <span style={{ color: accent }}>渲染引擎。</span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--osd-font-body)',
            fontSize: 38,
            lineHeight: 1.5,
            color: muted,
            maxWidth: 1300,
            marginTop: 56,
            fontWeight: 400,
          }}
        >
          <span style={{ color: ink, fontWeight: 500 }}>@moxa/graph v3 → v4。</span>{' '}
          淘汰 AntV G6,改採 PixiJS v8。六個月、觸發機制驅動的 v4.0 GA 計畫。
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: `1px solid ${hairline}`,
          paddingTop: 28,
          fontFamily: 'var(--osd-font-body)',
          fontSize: 18,
          color: muted,
          letterSpacing: '0.04em',
        }}
      >
        <span>PixiJS v8 · graphology · pixi-viewport · rbush</span>
        <span style={{ fontFamily: 'var(--osd-font-display)', color: ink, fontSize: 22 }}>
          mxview · act-web · network
        </span>
      </div>
    </div>
  );
};

// ─── Section divider ────────────────────────────────────────────────────────

const SectionDivider = ({
  chapter,
  name,
  lede,
  pages,
  n,
}: {
  chapter: number;
  name: string;
  lede: string;
  pages: string[];
  n: number;
}) => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '180px 140px 140px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 64,
          left: 140,
          right: 140,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          fontFamily: 'var(--osd-font-body)',
          fontSize: 16,
          color: muted,
          letterSpacing: '0.16em',
          borderBottom: `1px solid ${hairline}`,
          paddingBottom: 14,
        }}
      >
        <span>@moxa/graph · v4 · 決策簡報</span>
        <span>章節分隔</span>
      </div>

      <div style={anim}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '420px 1fr',
            gap: 60,
            alignItems: 'baseline',
            marginTop: 60,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--osd-font-body)',
                fontSize: 18,
                color: accent,
                letterSpacing: '0.24em',
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              CHAPTER
            </div>
            <div
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontStyle: 'italic',
                fontSize: 280,
                fontWeight: 400,
                color: accent,
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
              }}
            >
              {Roman[chapter]}
            </div>
          </div>

          <div style={{ paddingTop: 24 }}>
            <h2
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 128,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '0.02em',
                margin: 0,
              }}
            >
              {name}
            </h2>
            <p
              style={{
                fontFamily: 'var(--osd-font-body)',
                fontSize: 28,
                lineHeight: 1.55,
                color: muted,
                marginTop: 40,
                maxWidth: 900,
              }}
            >
              {lede}
            </p>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 140,
            left: 140,
            right: 140,
            borderTop: `1px solid ${hairline}`,
            paddingTop: 28,
            display: 'flex',
            gap: 48,
            flexWrap: 'wrap',
            fontFamily: 'var(--osd-font-body)',
            fontSize: 18,
            color: muted,
            letterSpacing: '0.06em',
          }}
        >
          {pages.map((p, i) => (
            <span key={i}>
              <span
                style={{
                  fontFamily: 'var(--osd-font-display)',
                  fontStyle: 'italic',
                  color: ink,
                  fontSize: 20,
                  marginRight: 10,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {p}
            </span>
          ))}
        </div>
      </div>

      <Footer n={n} />
    </div>
  );
};

// ─── Page 2 · Ch.I divider ──────────────────────────────────────────────────

const DividerI: Page = () => (
  <SectionDivider
    chapter={1}
    name="背景"
    lede="先說我們在哪裡、為什麼此刻要動。沒有這層,後面 23 頁都缺脈絡。"
    pages={['今日決策', '為何此事 · 為何此刻']}
    n={2}
  />
);

// ─── Page 3 · Decision ──────────────────────────────────────────────────────

const Decision: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '180px 140px 140px',
      }}
    >
      <TopRule chapter={1} chapterName="背景" label="決策" />

      <div style={anim}>
        <Eyebrow>今日 · 一個決策</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '0.01em',
            margin: '40px 0 0 0',
            maxWidth: 1550,
          }}
        >
          核准 <span style={{ color: accent }}>80%</span> RD 投入、
          <br />
          兩位工程師、二十六週。
        </h2>

        <p
          style={{
            fontFamily: 'var(--osd-font-body)',
            fontSize: 32,
            lineHeight: 1.6,
            color: muted,
            maxWidth: 1400,
            marginTop: 48,
          }}
        >
          整份簡報的範圍、時程、風險機制與敏感度分析,都從這個數字推導而來。低於 80%,我們按公開規則自動縮減範圍 — 不是靠加班補回時程。
        </p>
      </div>

      <Footer n={3} />
    </div>
  );
};

// ─── Page 4 · Why this, why now ─────────────────────────────────────────────

const ReasonRow = ({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr',
      gap: 32,
      paddingBottom: 36,
      borderBottom: `1px solid ${hairline}`,
      marginBottom: 36,
      alignItems: 'baseline',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontStyle: 'italic',
        fontSize: 56,
        color: accent,
        fontWeight: 400,
        lineHeight: 1,
      }}
    >
      {n}
    </div>
    <div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 42,
          fontWeight: 700,
          lineHeight: 1.25,
          marginBottom: 12,
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 24, lineHeight: 1.6, color: muted }}>
        {body}
      </div>
    </div>
  </div>
);

const Why: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={1} chapterName="背景" label="現況" />

      <div style={anim}>
        <Eyebrow>為何此事 · 為何此刻</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            margin: '36px 0 60px 0',
            maxWidth: 1500,
          }}
        >
          三股壓力,一個時機。
        </h2>

        <div style={{ maxWidth: 1500 }}>
          <ReasonRow
            n="i."
            title="G6 已到我們使用場景的極限。"
            body="工業拓樸圖規模常超出 G6 5.x 的合理運作範圍。底層選型報告已於 2026-05-18 拍板。"
          />
          <ReasonRow
            n="ii."
            title="PixiJS v8 + graphology 已經成熟。"
            body="WebGL/WebGPU 並有 Canvas 後備。資料模型與演算法交由 graphology。底層相依不再是賭注。"
          />
          <ReasonRow
            n="iii."
            title="三個正式產品都在等。"
            body="mxview、act-web (chamberlain)、network — 都已釘住 v3 beta。每延一季,遷移債就再滾一輪。"
          />
        </div>
      </div>

      <Footer n={4} />
    </div>
  );
};

// ─── Page 5 · Ch.II divider · 選型 ──────────────────────────────────────────

const DividerII: Page = () => (
  <SectionDivider
    chapter={2}
    name="選型"
    lede="在 PixiJS、Cytoscape、AntV G6 之間做完成本與長期戰略比較。底層選擇是其餘所有決策的根基。報告於 2026-05-18 拍板。"
    pages={['三個候選', '為何離開 G6', '維度對照', '加權評分']}
    n={5}
  />
);

// ─── Page 6 · Candidates ────────────────────────────────────────────────────

const CandidateCard = ({
  tagLabel,
  tagColor,
  name,
  intro,
  pros,
  cons,
  star,
}: {
  tagLabel: string;
  tagColor: string;
  name: string;
  intro: string;
  pros: string[];
  cons: string[];
  star?: boolean;
}) => (
  <div
    style={{
      background: star ? washDeep : wash,
      border: `${star ? 2 : 1}px solid ${star ? accent : hairline}`,
      padding: '28px 28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 12,
          letterSpacing: '0.20em',
          color: tagColor,
          fontWeight: 700,
        }}
      >
        {tagLabel}
      </div>
      {star && (
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 22,
            color: accent,
          }}
        >
          ★
        </div>
      )}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 30,
        fontWeight: 700,
        color: ink,
        lineHeight: 1.2,
      }}
    >
      {name}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 17,
        color: muted,
        lineHeight: 1.55,
        paddingBottom: 14,
        borderBottom: `1px solid ${hairline}`,
      }}
    >
      {intro}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {pros.map((p, i) => (
        <div
          key={i}
          style={{
            fontFamily: 'var(--osd-font-body)',
            fontSize: 16,
            color: ink,
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: signal.green, marginRight: 8, fontWeight: 700 }}>+</span>
          {p}
        </div>
      ))}
      {cons.map((c, i) => (
        <div
          key={i}
          style={{
            fontFamily: 'var(--osd-font-body)',
            fontSize: 16,
            color: muted,
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: signal.red, marginRight: 8, fontWeight: 700 }}>−</span>
          {c}
        </div>
      ))}
    </div>
  </div>
);

const Candidates: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={2} chapterName="選型" label="三個候選" />

      <div style={anim}>
        <Eyebrow>候選 · 三個方向</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '24px 0 8px 0',
            maxWidth: 1500,
          }}
        >
          維持框架、換框架、或換引擎。
        </h2>

        <p style={{ fontSize: 18, color: muted, marginTop: 6, marginBottom: 24, maxWidth: 1500, lineHeight: 1.5 }}>
          AntV G6 (現況)、Cytoscape.js (替代框架)、PixiJS (通用引擎) — 三種底層哲學截然不同。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1640 }}>
          <CandidateCard
            tagLabel="現況 · CURRENT"
            tagColor={muted}
            name="AntV G6 5.x"
            intro="開箱完整的圖視覺化框架,目前 v3 的底層。"
            pros={['behavior / layout / plugin 一條龍', '中文資源豐富', '雙渲染後端 (Canvas / WebGL)']}
            cons={['AntV 生態深度鎖定', '客製複合節點受限', '5.x 仍在快速演進,升級頻繁']}
          />
          <CandidateCard
            tagLabel="替代 · ALTERNATIVE"
            tagColor={signal.amber}
            name="Cytoscape.js"
            intro="學術界主流圖框架,API 多年穩定。"
            pros={['文件最完整 (cookbook + live editor)', '圖論演算法業界最強', '學習曲線最平緩']}
            cons={['複合節點做不到 (SCADA 硬傷)', '5k 節點是上限', '無一線地圖整合方案']}
          />
          <CandidateCard
            star
            tagLabel="選定 · SELECTED"
            tagColor={accent}
            name="PixiJS v8"
            intro="通用 2D / WebGL 引擎。Scene graph 是 SCADA 天然抽象。"
            pros={['客製自由度爆表', '10k 節點無壓力 · WebGPU 路線', 'leaflet.pixi-overlay 地圖整合一線方案', 'TypeScript 業界頂級']}
            cons={['不是圖框架 · 拓樸層要自建', '上手到 G6 水準需 8–12 週']}
          />
        </div>
      </div>

      <Footer n={6} />
    </div>
  );
};

// ─── Page 7 · Why leave G6 ──────────────────────────────────────────────────

const PainPoint = ({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '80px 1fr',
      gap: 28,
      paddingBottom: 18,
      borderBottom: `1px solid ${hairline}`,
      marginBottom: 18,
      alignItems: 'baseline',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontStyle: 'italic',
        fontSize: 44,
        color: accent,
        fontWeight: 400,
        lineHeight: 1,
      }}
    >
      {n}
    </div>
    <div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 32,
          fontWeight: 700,
          lineHeight: 1.25,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 19, lineHeight: 1.55, color: muted }}>
        {body}
      </div>
    </div>
  </div>
);

const WhyLeaveG6: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={2} chapterName="選型" label="為何離開 G6" />

      <div style={anim}>
        <Eyebrow>痛點 · 為何離開 G6</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '24px 0 8px 0',
            maxWidth: 1500,
          }}
        >
          四個痛點 · 沒有一個能從框架內解決。
        </h2>

        <p style={{ fontSize: 18, color: muted, marginTop: 6, marginBottom: 28, maxWidth: 1500, lineHeight: 1.5 }}>
          這些不是用法問題、不是版本問題 — 是 G6 的架構特性。再升一版 G6,問題仍在。
        </p>

        <div style={{ maxWidth: 1640 }}>
          <PainPoint
            n="i."
            title="AntV 生態深度鎖定。"
            body="libs/graph/src/ 內部緊耦合 @antv/g、@antv/g-canvas、@antv/g-svg。AntV 改 API,整庫陪改 — 過去一年已經發生。"
          />
          <PainPoint
            n="ii."
            title="客製複合節點受限。"
            body="SCADA 節點是「外殼 + icon + 多燈號 + 即時數值 + 警示徽章」的複合元件。G6 element 抽象可組合但不如 Pixi scene graph 自然。"
          />
          <PainPoint
            n="iii."
            title="長期路線圖不在我們手上。"
            body="4.x → 5.x 已是破壞性升級。AntV 未來再推 6.x,我們又要陪一次大型遷移 — 沒有議價空間。"
          />
          <PainPoint
            n="iv."
            title="效能 ceiling 不夠高。"
            body="G6 5.x 雖有 WebGL backend,但 SCADA 即時狀態大量小更新場景,dispatch overhead 比通用引擎高。"
          />
        </div>
      </div>

      <Footer n={7} />
    </div>
  );
};

// ─── Page 8 · Dimension comparison ─────────────────────────────────────────

const CmpRow = ({
  dim,
  g6,
  cyto,
  pixi,
  weight,
}: {
  dim: string;
  g6: string;
  cyto: string;
  pixi: string;
  weight?: 'high' | 'top';
}) => {
  const weightLabel = weight === 'top' ? '最高' : weight === 'high' ? '高' : '';
  const weightColor = weight === 'top' ? accent : weight === 'high' ? ink : muted;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '320px 80px 1fr 1fr 1fr',
        gap: 28,
        padding: '18px 0',
        borderBottom: `1px solid ${hairline}`,
        alignItems: 'baseline',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 22,
          fontWeight: 700,
          color: ink,
          lineHeight: 1.3,
        }}
      >
        {dim}
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 12,
          letterSpacing: '0.18em',
          color: weightColor,
          fontWeight: 700,
        }}
      >
        {weightLabel}
      </div>
      <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 17, color: muted, lineHeight: 1.5 }}>
        {g6}
      </div>
      <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 17, color: muted, lineHeight: 1.5 }}>
        {cyto}
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 17,
          color: ink,
          fontWeight: 500,
          lineHeight: 1.5,
        }}
      >
        {pixi}
      </div>
    </div>
  );
};

const Comparison: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={2} chapterName="選型" label="維度對照" />

      <div style={anim}>
        <Eyebrow>對照 · SCADA 關鍵維度</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '24px 0 24px 0',
            maxWidth: 1500,
          }}
        >
          六個維度 · 三個候選 · 並排攤開。
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '320px 80px 1fr 1fr 1fr',
            gap: 28,
            paddingBottom: 12,
            borderBottom: `2px solid ${ink}`,
            marginBottom: 4,
            fontFamily: 'var(--osd-font-body)',
            fontSize: 13,
            letterSpacing: '0.18em',
            color: muted,
            fontWeight: 700,
          }}
        >
          <div>維度</div>
          <div>權重</div>
          <div>G6 5.x</div>
          <div>Cytoscape</div>
          <div style={{ color: accent }}>PixiJS v8 ★</div>
        </div>

        <div style={{ maxWidth: 1640 }}>
          <CmpRow
            dim="客製複合節點"
            weight="top"
            g6="可行但組合受限"
            cyto="單節點 = 單視覺單元,做不到"
            pixi="Container 任意組合,自由度爆表"
          />
          <CmpRow
            dim="10k 節點效能"
            weight="high"
            g6="要關動畫"
            cyto="極限 · fps 掉"
            pixi="無壓力 · 100k 也可行"
          />
          <CmpRow
            dim="地圖整合"
            weight="high"
            g6="無一線方案"
            cyto="無一線方案"
            pixi="leaflet.pixi-overlay 唯一 production-grade"
          />
          <CmpRow
            dim="TypeScript 體驗"
            g6="型別品質中等"
            cyto="JS + d.ts"
            pixi="全 TS,業界頂級"
          />
          <CmpRow
            dim="長期維護持續性"
            weight="high"
            g6="視 AntV 路線圖"
            cyto="志願者持續度"
            pixi="PixiJS Inc. 商業營利支撐"
          />
          <CmpRow
            dim="編輯能力內建"
            g6="behavior 全內建"
            cyto="拖曳/框選內建"
            pixi="自寫 (沿用既有 wrapper 抽象)"
          />
        </div>
      </div>

      <Footer n={8} />
    </div>
  );
};

// ─── Page 9 · Scoring matrix ────────────────────────────────────────────────

const ScoreBlock = ({
  name,
  score,
  highlight,
  note,
}: {
  name: string;
  score: number;
  highlight?: boolean;
  note: string;
}) => (
  <div
    style={{
      background: highlight ? washDeep : wash,
      border: `${highlight ? 2 : 1}px solid ${highlight ? accent : hairline}`,
      padding: '32px 32px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 26,
        fontWeight: 700,
        color: ink,
        lineHeight: 1.2,
      }}
    >
      {name}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 168,
        fontWeight: 700,
        lineHeight: 0.9,
        letterSpacing: '-0.03em',
        color: highlight ? accent : ink,
      }}
    >
      {score}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 14,
        letterSpacing: '0.18em',
        color: muted,
        fontWeight: 600,
        borderTop: `1px solid ${hairline}`,
        paddingTop: 14,
      }}
    >
      加權總分 · OUT OF 65
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 16,
        color: highlight ? ink : muted,
        lineHeight: 1.5,
      }}
    >
      {note}
    </div>
  </div>
);

const Scoring: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={2} chapterName="選型" label="加權評分" />

      <div style={anim}>
        <Eyebrow>加權評分 · 13 維度 × 五分制</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '24px 0 12px 0',
            maxWidth: 1500,
          }}
        >
          PixiJS <span style={{ color: accent }}>62</span> · G6 45 · Cytoscape 42.
        </h2>

        <p style={{ fontSize: 18, color: muted, marginTop: 6, marginBottom: 32, maxWidth: 1500, lineHeight: 1.5 }}>
          在「客製外觀、效能、地圖、TS、長期持續性」等對 SCADA 最關鍵的維度上,PixiJS 全勝。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1640 }}>
          <ScoreBlock
            name="AntV G6 5.x"
            score={45}
            note="編輯內建、layout 內建是強項;但 SCADA 關鍵維度上拿不到滿分。"
          />
          <ScoreBlock
            name="Cytoscape.js"
            score={42}
            note="圖論與文件最強;但複合節點與地圖是硬傷。"
          />
          <ScoreBlock
            name="PixiJS v8"
            score={62}
            highlight
            note="關鍵維度全勝。代價:編輯層自寫 (沿用既有 behavior 抽象,12–18 週)。"
          />
        </div>

        <div
          style={{
            marginTop: 24,
            paddingTop: 18,
            borderTop: `1px solid ${hairline}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            maxWidth: 1640,
            fontFamily: 'var(--osd-font-body)',
            fontSize: 15,
            color: muted,
            letterSpacing: '0.06em',
          }}
        >
          <span>工程成本對照 · 維持 G6 0 週 · Cytoscape 6–10 週 · PixiJS 12–18 週</span>
          <span style={{ color: ink, fontWeight: 600 }}>
            維護成本 · 三者中 PixiJS 路線最低 (自家控制全部抽象)
          </span>
        </div>
      </div>

      <Footer n={9} />
    </div>
  );
};

// ─── Page 10 · Ch.III divider · 範圍 ────────────────────────────────────────

const DividerIII: Page = () => (
  <SectionDivider
    chapter={3}
    name="範圍"
    lede="GA 出貨什麼、什麼延後、什麼直接砍。三個下游 grep 盤點完才下手。"
    pages={['GA 出貨範圍', '下游使用盤點', '延後與砍除']}
    n={10}
  />
);

// ─── Page 11 · What ships at GA ─────────────────────────────────────────────

const StatTile = ({
  big,
  label,
  sub,
}: {
  big: string;
  label: string;
  sub: string;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      paddingTop: 28,
      borderTop: `2px solid ${ink}`,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 130,
        fontWeight: 700,
        lineHeight: 0.95,
        letterSpacing: '-0.02em',
        color: ink,
      }}
    >
      {big}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: '0.12em',
        color: ink,
        marginTop: 8,
      }}
    >
      {label}
    </div>
    <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 20, lineHeight: 1.5, color: muted }}>
      {sub}
    </div>
  </div>
);

const Scope: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={3} chapterName="範圍" label="GA 範圍" />

      <div style={anim}>
        <Eyebrow>v4.0 GA 出貨範圍</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '32px 0 20px 0',
            maxWidth: 1500,
          }}
        >
          三個消費端真正用到的全部做。{' '}
          <span style={{ color: muted, fontWeight: 400 }}>沒人用到的全部不做。</span>
        </h2>

        <p style={{ fontSize: 22, color: muted, marginTop: 8, marginBottom: 56, maxWidth: 1300, lineHeight: 1.55 }}>
          已對 mxview、act-web、network、topology-web 做完 grep 盤點。砍掉兩個沒人用的 behavior,七個 plugin 延後到 v4.x。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 56, maxWidth: 1640 }}>
          <StatTile big="9" label="元件 / Components" sub="node、edge、group 系列 — mxview 大量使用" />
          <StatTile big="11" label="互動行為 / Behaviors" sub="砍 select-all 與 drill-down,附 polyfill" />
          <StatTile big="3" label="Plugin" sub="fixed-toolbar、graph-background、element-toolbar" />
          <StatTile big="4" label="佈局 / Layouts" sub="force、grid、ring、align — tree 延後" />
        </div>
      </div>

      <Footer n={11} />
    </div>
  );
};

// ─── Page 12 · Consumer audit ───────────────────────────────────────────────

const ConsumerCard = ({
  name,
  role,
  intensity,
  intensityColor,
  modules,
}: {
  name: string;
  role: string;
  intensity: string;
  intensityColor: string;
  modules: string;
}) => (
  <div
    style={{
      background: wash,
      border: `1px solid ${hairline}`,
      padding: '32px 32px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div
        style={{
          fontFamily: '"SF Mono", Menlo, Monaco, monospace',
          fontSize: 24,
          fontWeight: 700,
          color: ink,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 13,
          fontWeight: 700,
          color: intensityColor,
          letterSpacing: '0.18em',
        }}
      >
        {intensity}
      </div>
    </div>
    <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 19, color: muted, lineHeight: 1.55 }}>
      {role}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 17,
        color: ink,
        lineHeight: 1.5,
        borderTop: `1px solid ${hairline}`,
        paddingTop: 16,
      }}
    >
      {modules}
    </div>
  </div>
);

const ConsumerAudit: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={3} chapterName="範圍" label="下游盤點" />

      <div style={anim}>
        <Eyebrow>下游使用盤點 · 已完成</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '28px 0 12px 0',
            maxWidth: 1500,
          }}
        >
          先看誰在用、用多少。
        </h2>

        <p style={{ fontSize: 22, color: muted, marginTop: 8, marginBottom: 44, maxWidth: 1400, lineHeight: 1.55 }}>
          One-UI repo 全範圍 grep 已完成。device-node 出現 44 次、line-edge 出現 43 次 — 重要程度一目瞭然。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28, maxWidth: 1640 }}>
          <ConsumerCard
            name="mxview"
            intensity="主力 · HEAVY"
            intensityColor={signal.red}
            role="工業網路管理產品,目前最主要的正式用戶。"
            modules="device-node、line-edge、polyline-edge(elbow line)、group-device、drill-down(programmatic)"
          />
          <ConsumerCard
            name="act-web · chamberlain"
            intensity="正式 · USED"
            intensityColor={signal.amber}
            role="網路設定 UI,透過 topology-{status,monitor,vlan,compute,device}-view 接入。"
            modules="device-node、line-edge、drag-canvas、click-select(presumed via base class)"
          />
          <ConsumerCard
            name="network"
            intensity="模組 · USED"
            intensityColor={signal.amber}
            role="Network 模組底下的拓樸頁,屬於正式產品線。"
            modules="topology-page、demo-topology-page、dragCanvas"
          />
          <ConsumerCard
            name="topology-web · demo"
            intensity="內部 · DEMO"
            intensityColor={signal.blue}
            role="內部展示用 demo,sunset 政策可忽略。"
            modules="brushSelect、scrollCanvas、createEdge、selectAll、collapseExpand"
          />
        </div>
      </div>

      <Footer n={12} />
    </div>
  );
};

// ─── Page 13 · Deferred & dropped ──────────────────────────────────────────

const ListBlock = ({
  title,
  tone,
  toneLabel,
  items,
}: {
  title: string;
  tone: string;
  toneLabel: string;
  items: { name: string; reason: string }[];
}) => (
  <div
    style={{
      background: wash,
      border: `1px solid ${hairline}`,
      padding: '32px 32px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        borderBottom: `1px solid ${hairline}`,
        paddingBottom: 14,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 30,
          fontWeight: 700,
          color: ink,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 13,
          fontWeight: 700,
          color: tone,
          letterSpacing: '0.18em',
        }}
      >
        {toneLabel}
      </div>
    </div>
    {items.map((item, i) => (
      <div
        key={i}
        style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr',
          gap: 18,
          alignItems: 'baseline',
          paddingBottom: 10,
        }}
      >
        <div
          style={{
            fontFamily: '"SF Mono", Menlo, Monaco, monospace',
            fontSize: 16,
            color: ink,
            fontWeight: 600,
          }}
        >
          {item.name}
        </div>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 16, color: muted, lineHeight: 1.5 }}>
          {item.reason}
        </div>
      </div>
    ))}
  </div>
);

const Deferred: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={3} chapterName="範圍" label="延後與砍除" />

      <div style={anim}>
        <Eyebrow>延後到 v4.x · 直接砍除</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '28px 0 8px 0',
            maxWidth: 1500,
          }}
        >
          沒人用到的,先不做。
        </h2>

        <p style={{ fontSize: 20, color: muted, marginTop: 6, marginBottom: 32, maxWidth: 1500, lineHeight: 1.55 }}>
          下游 grep 沒掃到 instantiate 的模組一律延後。兩個 behavior 直接砍 — 附 polyfill,下游可自行 1-3 行替代。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28, maxWidth: 1640 }}>
          <ListBlock
            title="延後到 v4.x"
            tone={signal.amber}
            toneLabel="DEFERRED · 7+1"
            items={[
              { name: 'minimap', reason: 'SCADA 標配,v4.x 補回優先' },
              { name: 'tooltip / rich-tooltip', reason: '同上,v4.x 補回優先' },
              { name: 'context-menu', reason: '下游 grep 未發現' },
              { name: 'snapline / history', reason: '編輯場景,topology-web 之外少見' },
              { name: 'hull', reason: 'mxview 已有 overlay' },
              { name: 'tree layout', reason: '下游沒掃到使用' },
            ]}
          />
          <ListBlock
            title="直接砍除"
            tone={signal.red}
            toneLabel="DROPPED · 2"
            items={[
              {
                name: 'select-all',
                reason: '僅 topology-web (內部 demo) 使用 · 下游可用 setElementState 迴圈 polyfill',
              },
              {
                name: 'drill-down',
                reason: '僅 mxview programmatic 使用 · 改用 collapse-expand + setData,§11 附 snippet',
              },
            ]}
          />
        </div>
      </div>

      <Footer n={13} />
    </div>
  );
};

// ─── Page 14 · Ch.IV divider · 策略 ─────────────────────────────────────────

const DividerIV: Page = () => (
  <SectionDivider
    chapter={4}
    name="策略"
    lede="平行套件而非長分支。v3 留著當對照、GA 當天一次改名;下游動 package.json 一行,import path 不動。"
    pages={['平行套件策略', '架構分層']}
    n={14}
  />
);

// ─── Page 15 · Parallel package strategy ───────────────────────────────────

const PkgBlock = ({
  name,
  status,
  tone,
  detail,
}: {
  name: string;
  status: string;
  tone: 'live' | 'new' | 'sunset';
  detail: string;
}) => {
  const toneColor = tone === 'live' ? muted : tone === 'new' ? accent : signal.amber;
  return (
    <div
      style={{
        background: wash,
        border: `1px solid ${hairline}`,
        padding: '36px 36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 14,
          letterSpacing: '0.20em',
          color: toneColor,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: toneColor,
            display: 'inline-block',
          }}
        />
        {status}
      </div>
      <div
        style={{
          fontFamily: '"SF Mono", Menlo, Monaco, monospace',
          fontSize: 26,
          fontWeight: 600,
          color: ink,
          lineHeight: 1.2,
        }}
      >
        {name}
      </div>
      <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 19, lineHeight: 1.6, color: muted }}>
        {detail}
      </div>
    </div>
  );
};

const Strategy: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={4} chapterName="策略" label="平行套件" />

      <div style={anim}>
        <Eyebrow>做法 · 平行套件</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '32px 0 20px 0',
            maxWidth: 1500,
          }}
        >
          並行開發。{' '}
          <span style={{ color: muted, fontWeight: 400 }}>GA 當天改名。</span>
        </h2>

        <p
          style={{
            fontSize: 22,
            color: muted,
            marginTop: 8,
            marginBottom: 52,
            maxWidth: 1500,
            lineHeight: 1.6,
          }}
        >
          整段重構期間 v3 保留作為對照。GA 當天{' '}
          <code style={{ fontFamily: '"SF Mono", monospace', fontSize: 20 }}>@moxa/graph-next</code>{' '}
          改名為{' '}
          <code style={{ fontFamily: '"SF Mono", monospace', fontSize: 20 }}>@moxa/graph@4</code>。下游只改{' '}
          <code style={{ fontFamily: '"SF Mono", monospace', fontSize: 20 }}>package.json</code>{' '}
          一行,import path 不變 — subpath exports 已保留。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, maxWidth: 1640 }}>
          <PkgBlock
            tone="live"
            status="v3 · 維護模式"
            name="libs/graph"
            detail="僅修 P0/P1。不承諾 backport。GA 後 6 個月封存。"
          />
          <PkgBlock
            tone="new"
            status="v4 · 進行中"
            name="libs/graph-next"
            detail="未來 26 週都在這裡。alpha → beta → rc → GA,每週 canary。"
          />
          <PkgBlock
            tone="sunset"
            status="GA 當天 · 改名"
            name="@moxa/graph@4"
            detail="自動產 PR,一次改完 mxview、act-web、network 的 package.json。"
          />
        </div>
      </div>

      <Footer n={15} />
    </div>
  );
};

// ─── Page 16 · Architecture tiers ──────────────────────────────────────────

const Tier = ({
  tag,
  weeks,
  name,
  detail,
  blocking,
}: {
  tag: string;
  weeks: string;
  name: string;
  detail: string;
  blocking?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '100px 180px 1fr',
      gap: 28,
      padding: '16px 24px',
      background: blocking ? washDeep : 'transparent',
      borderBottom: `1px solid ${hairline}`,
      alignItems: 'baseline',
      marginLeft: blocking ? -24 : 0,
      marginRight: blocking ? -24 : 0,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 32,
        fontWeight: 700,
        color: blocking ? accent : ink,
        lineHeight: 1,
        letterSpacing: '-0.01em',
      }}
    >
      {tag}
    </div>
    <div
      style={{
        fontFamily: '"SF Mono", Menlo, Monaco, monospace',
        fontSize: 16,
        color: muted,
      }}
    >
      {weeks}
    </div>
    <div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 24,
          fontWeight: 700,
          color: ink,
          lineHeight: 1.3,
          marginBottom: 4,
        }}
      >
        {name}
        {blocking && (
          <span
            style={{
              marginLeft: 14,
              fontFamily: 'var(--osd-font-body)',
              fontSize: 12,
              color: accent,
              letterSpacing: '0.18em',
              fontWeight: 700,
            }}
          >
            ⚠ BLOCKING
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 17,
          color: muted,
          lineHeight: 1.5,
        }}
      >
        {detail}
      </div>
    </div>
  </div>
);

const Architecture: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={4} chapterName="策略" label="架構分層" />

      <div style={anim}>
        <Eyebrow>架構 · Dependency DAG</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '24px 0 8px 0',
            maxWidth: 1500,
          }}
        >
          五層,上層依賴下層,Tier 0 是死線。
        </h2>

        <p style={{ fontSize: 18, color: muted, marginTop: 6, marginBottom: 20, maxWidth: 1500, lineHeight: 1.5 }}>
          Foundation 若 Week 4 完成度未達 70%,R1 觸發。後續所有 Tier 都依賴它,不可挪後。
        </p>

        <div style={{ maxWidth: 1640 }}>
          <Tier
            tag="Tier 0"
            weeks="Week 1 — 3"
            name="Foundation"
            detail="Pixi v8 app + WebGL/WebGPU + Canvas fallback、pixi-viewport、rbush 空間索引、Scene graph 慣例"
            blocking
          />
          <Tier
            tag="Tier 1"
            weeks="Week 3 — 7"
            name="Core + Shared"
            detail="Graph facade、DataManager、ConfigManager、Renderer、Theme、20 個 model 型別搬遷"
          />
          <Tier
            tag="Tier 2"
            weeks="Week 7 — 16"
            name="Components · Behaviors · Layouts"
            detail="9 個元件、11 個 behavior、4 個 layout 並行開發"
          />
          <Tier
            tag="Tier 3"
            weeks="Week 14 — 18"
            name="Plugins"
            detail="fixed-toolbar、graph-background、element-toolbar(DOM + Pixi 座標同步)"
          />
          <Tier
            tag="Tier 4"
            weeks="Week 18 — 26"
            name="Integration · Test · Docs"
            detail="mxview swap PoC、Visual regression baseline、Migration guide、API docs"
          />
        </div>
      </div>

      <Footer n={16} />
    </div>
  );
};

// ─── Page 17 · Ch.V divider · 時程 ──────────────────────────────────────────

const DividerV: Page = () => (
  <SectionDivider
    chapter={5}
    name="時程"
    lede="二十六週、四個 Milestone、十三場 Demo Review。每場 demo 都是觸發條件的即時檢查。"
    pages={['M1 → M4', 'Demo Review · D1 → D13', 'RD 分工']}
    n={17}
  />
);

// ─── Page 18 · Timeline ────────────────────────────────────────────────────

const Milestone = ({
  tag,
  weeks,
  title,
  ship,
}: {
  tag: string;
  weeks: string;
  title: string;
  ship: string;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 56,
        fontWeight: 700,
        color: ink,
        lineHeight: 1,
      }}
    >
      {tag}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 18,
        letterSpacing: '0.16em',
        color: accent,
        fontWeight: 600,
      }}
    >
      {weeks}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 28,
        fontWeight: 700,
        color: ink,
        lineHeight: 1.4,
        marginTop: 4,
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontFamily: '"SF Mono", Menlo, Monaco, monospace',
        fontSize: 17,
        color: muted,
        marginTop: 6,
      }}
    >
      {ship}
    </div>
  </div>
);

const Timeline: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={5} chapterName="時程" label="M1 → M4" />

      <div style={anim}>
        <Eyebrow>時程 · M1 → M4</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '32px 0 32px 0',
            maxWidth: 1500,
          }}
        >
          二十六週。四個 Milestone。{' '}
          <span style={{ color: muted, fontWeight: 400 }}>十三場 Demo Review。</span>
        </h2>

        <div
          style={{
            position: 'relative',
            height: 36,
            marginTop: 40,
            marginBottom: 24,
            maxWidth: 1640,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 18,
              height: 2,
              background: hairline,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 18,
              width: '100%',
              height: 2,
              background: `linear-gradient(90deg, ${accent} 0%, ${accent} 23%, ${hairline} 23%)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '23%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--osd-font-body)',
              fontSize: 14,
              color: accent,
              letterSpacing: '0.16em',
              fontWeight: 600,
            }}
          >
            ▼ 此刻 · W6
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 56, maxWidth: 1640 }}>
          <Milestone tag="M1" weeks="第 1 — 6 週" title="基礎建設與核心" ship="ship · 4.0.0-alpha.1" />
          <Milestone tag="M2" weeks="第 7 — 13 週" title="元件、行為、佈局" ship="ship · 4.0.0-beta.1" />
          <Milestone tag="M3" weeks="第 14 — 18 週" title="Plugin、mxview PoC" ship="ship · 4.0.0-rc.1" />
          <Milestone tag="M4" weeks="第 19 — 26 週" title="整合、文件、GA" ship="ship · 4.0.0" />
        </div>
      </div>

      <Footer n={18} />
    </div>
  );
};

// ─── Page 19 · Demo cadence ────────────────────────────────────────────────

const DemoGroup = ({
  ms,
  weeks,
  demos,
  trigger,
}: {
  ms: string;
  weeks: string;
  demos: string[];
  trigger?: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '120px 200px 1fr',
      gap: 32,
      padding: '20px 0',
      borderBottom: `1px solid ${hairline}`,
      alignItems: 'baseline',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 38,
        fontWeight: 700,
        color: ink,
        lineHeight: 1,
      }}
    >
      {ms}
    </div>
    <div
      style={{
        fontFamily: '"SF Mono", Menlo, Monaco, monospace',
        fontSize: 17,
        color: muted,
      }}
    >
      {weeks}
    </div>
    <div>
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 19,
          color: ink,
          lineHeight: 1.5,
          marginBottom: trigger ? 6 : 0,
        }}
      >
        {demos.join(' · ')}
      </div>
      {trigger && (
        <div
          style={{
            fontFamily: 'var(--osd-font-body)',
            fontSize: 15,
            color: accent,
            letterSpacing: '0.12em',
            fontWeight: 600,
          }}
        >
          ▲ {trigger}
        </div>
      )}
    </div>
  </div>
);

const DemoCadence: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={5} chapterName="時程" label="Demo Review" />

      <div style={anim}>
        <Eyebrow>雙週 demo review · D1 → D13</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '24px 0 8px 0',
            maxWidth: 1500,
          }}
        >
          每兩週一次,共十三場。
        </h2>

        <p style={{ fontSize: 18, color: muted, marginTop: 6, marginBottom: 24, maxWidth: 1500, lineHeight: 1.5 }}>
          每場 demo 對 R1–R4 做 sanity check。觸發即進入應變,不延後。
        </p>

        <div style={{ maxWidth: 1640 }}>
          <DemoGroup
            ms="M1"
            weeks="D1 · D2 · D3"
            demos={['Pixi v8 boot', 'hit-test + scene graph', '4.0.0-alpha.1']}
            trigger="D2 / W4 · R1 check point"
          />
          <DemoGroup
            ms="M2"
            weeks="D4 · D5 · D6"
            demos={['node-device + edge-line', '4 navigation behaviors', '元件 9 + behavior 6']}
          />
          <DemoGroup
            ms="M3"
            weeks="D7 · D8 · D9"
            demos={['4.0.0-beta.1', 'element-toolbar + collapse-expand', '4.0.0-rc.1']}
            trigger="D8 / W16 · R4 check point (mxview PoC)"
          />
          <DemoGroup
            ms="M4"
            weeks="D10 · D11 · D12 · D13"
            demos={['visual baseline lock', 'mxview swap PoC', 'docs', 'GA dry-run']}
            trigger="D13 · GA Day Eve"
          />
        </div>
      </div>

      <Footer n={19} />
    </div>
  );
};

// ─── Page 20 · WBS / RD ownership ──────────────────────────────────────────

const OwnerCol = ({
  who,
  role,
  blocks,
}: {
  who: string;
  role: string;
  blocks: { phase: string; work: string }[];
}) => (
  <div
    style={{
      background: wash,
      border: `1px solid ${hairline}`,
      padding: '32px 32px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 13,
        letterSpacing: '0.20em',
        color: accent,
        fontWeight: 700,
      }}
    >
      {role}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 36,
        fontWeight: 700,
        color: ink,
        lineHeight: 1.2,
      }}
    >
      {who}
    </div>
    {blocks.map((b, i) => (
      <div
        key={i}
        style={{
          display: 'grid',
          gridTemplateColumns: '90px 1fr',
          gap: 14,
          alignItems: 'baseline',
          paddingTop: 12,
          borderTop: `1px solid ${hairline}`,
        }}
      >
        <div
          style={{
            fontFamily: '"SF Mono", Menlo, Monaco, monospace',
            fontSize: 15,
            color: muted,
            fontWeight: 600,
          }}
        >
          {b.phase}
        </div>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 17, color: ink, lineHeight: 1.5 }}>
          {b.work}
        </div>
      </div>
    ))}
  </div>
);

const WBS: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={5} chapterName="時程" label="RD 分工" />

      <div style={anim}>
        <Eyebrow>分工 · Hybrid C (Pair + Split)</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '24px 0 8px 0',
            maxWidth: 1500,
          }}
        >
          前 6 週 pair,之後分頭。
        </h2>

        <p style={{ fontSize: 18, color: muted, marginTop: 6, marginBottom: 24, maxWidth: 1500, lineHeight: 1.5 }}>
          兩人都對 Pixi v8 / graphology 不熟。共建 Foundation + Core 把 pattern 講透,後續分頭才不會撞牆。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28, maxWidth: 1640 }}>
          <OwnerCol
            role="LEAD RD · D1"
            who="主筆 · 對外介面"
            blocks={[
              { phase: 'M1', work: '與 D2 共建 Foundation (pair)' },
              { phase: 'M1–M2', work: 'Graph facade、Renderer、DataManager、Theme' },
              { phase: 'M2–M3', work: '元件 9 個 — 從 node-device 起手' },
              { phase: 'M3', work: 'fixed-toolbar、graph-background' },
              { phase: 'M4', work: 'mxview swap PoC + Visual baseline' },
            ]}
          />
          <OwnerCol
            role="FOLLOWER RD · D2"
            who="互動行為 · 文件"
            blocks={[
              { phase: 'M1', work: '與 D1 共建 Foundation (pair)' },
              { phase: 'M1–M2', work: 'Models + Shared utils + Transforms + SVG loader' },
              { phase: 'M2–M3', work: 'Behavior 11 + Layout 4 並行' },
              { phase: 'M3', work: 'element-toolbar (依賴 D1 hit-test API)' },
              { phase: 'M4', work: 'Migration guide + API docs + v3 P0 backport' },
            ]}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginTop: 28,
            paddingTop: 22,
            borderTop: `2px solid ${ink}`,
            maxWidth: 1640,
          }}
        >
          <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 17, color: muted, letterSpacing: '0.12em' }}>
            單人專注估算 35.1 pw  ·  +30% overhead  ·  AI-assist ÷1.2
          </div>
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 28,
              fontWeight: 700,
              color: ink,
            }}
          >
            需求 ≈ <span style={{ color: accent }}>38 person-weeks</span>
          </div>
        </div>
      </div>

      <Footer n={20} />
    </div>
  );
};

// ─── Page 21 · Ch.VI divider · 風險與請求 ───────────────────────────────────

const DividerVI: Page = () => (
  <SectionDivider
    chapter={6}
    name="風險與請求"
    lede="觸發條件、砍除清單、敏感度分析、簽核請求。proposal 最重要的部分 — 失敗時的對應已經寫死。"
    pages={['R1 → R4 機制', '砍除清單與補回', '敏感度', '請求']}
    n={21}
  />
);

// ─── Page 22 · Risk machinery ──────────────────────────────────────────────

const Trigger = ({
  code,
  title,
  trigger,
  response,
  tone,
}: {
  code: string;
  title: string;
  trigger: string;
  response: string;
  tone: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '100px 1fr',
      gap: 24,
      paddingBottom: 18,
      borderBottom: `1px solid ${hairline}`,
      marginBottom: 18,
      alignItems: 'baseline',
    }}
  >
    <div
      style={{
        fontFamily: '"SF Mono", Menlo, Monaco, monospace',
        fontSize: 26,
        fontWeight: 700,
        color: tone,
        lineHeight: 1,
        letterSpacing: '0.04em',
      }}
    >
      {code}
    </div>
    <div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 1.3,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 18, lineHeight: 1.55, color: muted }}>
        <span style={{ color: ink, fontWeight: 600 }}>觸發.</span> {trigger}{' '}
        <span style={{ color: ink, fontWeight: 600 }}>應變.</span> {response}
      </div>
    </div>
  </div>
);

const Risk: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={6} chapterName="風險與請求" label="R1 → R4 機制" />

      <div style={anim}>
        <Eyebrow>風險 · 機制觸發,不是英雄式硬撐</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '24px 0 8px 0',
            maxWidth: 1500,
          }}
        >
          落後時,按規則砍除範圍。
        </h2>

        <p style={{ fontSize: 19, color: muted, marginTop: 6, marginBottom: 28, maxWidth: 1500, lineHeight: 1.5 }}>
          四個觸發條件,四個事先講好的應變動作。R1–R4 若 M2 前都沒觸發,GA 就會準時。
        </p>

        <div style={{ maxWidth: 1640 }}>
          <Trigger
            code="R1"
            tone={signal.amber}
            title="M1 基礎建設延遲"
            trigger="第 4 週完成度 < 70%。"
            response="拉第三位 RD (0.3 pw),或時程延長 1.5 個月。"
          />
          <Trigger
            code="R2"
            tone={signal.amber}
            title="投入低於承諾"
            trigger="任一 RD 連續兩週低於 60%。"
            response="啟動 §7 砍除清單第一輪 (element-toolbar、focus-element)。"
          />
          <Trigger
            code="R3"
            tone={signal.amber}
            title="v3 維護量超標"
            trigger="v3 處理量單週 > 1.5 天,或連續兩週 > 1 天。"
            response="當週暫停 v3 P1;持續則啟動砍除清單。"
          />
          <Trigger
            code="R4"
            tone={signal.red}
            title="mxview 整合 PoC 失敗"
            trigger="M3 第 16 週後,缺失 API 估超過 2 person-weeks。"
            response="與 mxview team 聯合決策:補實作或啟動砍除清單。"
          />
        </div>
      </div>

      <Footer n={22} />
    </div>
  );
};

// ─── Page 23 · Cut-list & pull-back ────────────────────────────────────────

const RoundBlock = ({
  round,
  saves,
  tone,
  toneLabel,
  items,
}: {
  round: string;
  saves: string;
  tone: string;
  toneLabel: string;
  items: string[];
}) => (
  <div
    style={{
      background: wash,
      border: `1px solid ${hairline}`,
      padding: '28px 28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 28,
          fontWeight: 700,
          color: ink,
        }}
      >
        {round}
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 12,
          fontWeight: 700,
          color: tone,
          letterSpacing: '0.18em',
        }}
      >
        {toneLabel}
      </div>
    </div>
    <div
      style={{
        fontFamily: '"SF Mono", Menlo, Monaco, monospace',
        fontSize: 14,
        color: muted,
        borderBottom: `1px solid ${hairline}`,
        paddingBottom: 10,
      }}
    >
      saves ≈ {saves}
    </div>
    {items.map((item, i) => (
      <div
        key={i}
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 16,
          color: ink,
          lineHeight: 1.5,
        }}
      >
        — {item}
      </div>
    ))}
  </div>
);

const Cutlist: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={6} chapterName="風險與請求" label="砍除與補回" />

      <div style={anim}>
        <Eyebrow>砍除清單 · 補回順序</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '24px 0 8px 0',
            maxWidth: 1500,
          }}
        >
          失敗時砍什麼、成功時補什麼。
        </h2>

        <p style={{ fontSize: 18, color: muted, marginTop: 6, marginBottom: 24, maxWidth: 1500, lineHeight: 1.5 }}>
          R2/R3 觸發 → Round 1;進一步惡化 → Round 2、Round 3。M1/M2/M3 末提前 ≥ 1 週 → 拉回。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, maxWidth: 1640 }}>
          <RoundBlock
            round="Round 1"
            saves="3 pw"
            tone={signal.amber}
            toneLabel="FIRST CUT"
            items={['element-toolbar', 'focus-element (需主管 sign-off)']}
          />
          <RoundBlock
            round="Round 2"
            saves="2 pw"
            tone={signal.amber}
            toneLabel="DEEPER"
            items={['create-edge', 'collapse-expand', 'edge-polyline / arrow / label 併入']}
          />
          <RoundBlock
            round="Round 3"
            saves="warning"
            tone={signal.red}
            toneLabel="MINIMAL"
            items={['hover-activate', 'scroll-canvas (改用 zoom-canvas)']}
          />
        </div>

        <div
          style={{
            marginTop: 28,
            paddingTop: 22,
            borderTop: `2px solid ${ink}`,
            maxWidth: 1640,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--osd-font-body)',
              fontSize: 14,
              letterSpacing: '0.18em',
              color: accent,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            PULL-BACK · 提前完成時補回順序
          </div>
          <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 17, color: ink, lineHeight: 1.6 }}>
            +1 週 → <span style={{ fontWeight: 600 }}>drill-down</span>{' '}
            · +2 週 → <span style={{ fontWeight: 600 }}>select-all</span>{' '}
            · +3 週 → <span style={{ fontWeight: 600 }}>minimap plugin</span>{' '}
            · +4 週 → <span style={{ fontWeight: 600 }}>tooltip plugin</span>
          </div>
        </div>
      </div>

      <Footer n={23} />
    </div>
  );
};

// ─── Page 24 · Sensitivity ─────────────────────────────────────────────────

const SensitivityRow = ({
  alloc,
  effective,
  outcome,
  tone,
  highlight,
}: {
  alloc: string;
  effective: string;
  outcome: string;
  tone: string;
  highlight?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '180px 220px 1fr',
      gap: 40,
      padding: '22px 0',
      borderBottom: `1px solid ${hairline}`,
      alignItems: 'baseline',
      background: highlight ? wash : 'transparent',
      paddingLeft: highlight ? 20 : 0,
      paddingRight: highlight ? 20 : 0,
      marginLeft: highlight ? -20 : 0,
      marginRight: highlight ? -20 : 0,
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 44,
        fontWeight: 700,
        color: tone,
        lineHeight: 1,
        letterSpacing: '-0.01em',
      }}
    >
      {alloc}
    </div>
    <div style={{ fontFamily: '"SF Mono", Menlo, Monaco, monospace', fontSize: 20, color: ink }}>
      {effective}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 22,
        lineHeight: 1.5,
        color: highlight ? ink : muted,
        fontWeight: highlight ? 500 : 400,
      }}
    >
      {outcome}
    </div>
  </div>
);

const Sensitivity: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={6} chapterName="風險與請求" label="敏感度" />

      <div style={anim}>
        <Eyebrow>敏感度 · 投入 vs 範圍</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '32px 0 32px 0',
            maxWidth: 1500,
          }}
        >
          80% 這個數字不是隨便取的。
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 220px 1fr',
            gap: 40,
            paddingBottom: 12,
            borderBottom: `2px solid ${ink}`,
            marginBottom: 4,
            fontFamily: 'var(--osd-font-body)',
            fontSize: 14,
            letterSpacing: '0.18em',
            color: muted,
            fontWeight: 600,
          }}
        >
          <div>投入比例</div>
          <div>有效 PW</div>
          <div>結果 (對應 38 pw 需求)</div>
        </div>

        <div style={{ maxWidth: 1640 }}>
          <SensitivityRow
            alloc="90%"
            effective="36.4 pw"
            outcome="幾乎打平。可挑戰延伸目標。"
            tone={signal.green}
          />
          <SensitivityRow
            alloc="80%"
            effective="31.2 pw"
            outcome="計畫基準。觸發器待命但不發動。"
            tone={signal.green}
            highlight
          />
          <SensitivityRow
            alloc="70%"
            effective="26.0 pw"
            outcome="砍除清單第一輪自動啟動。"
            tone={signal.amber}
          />
          <SensitivityRow
            alloc="60%"
            effective="20.8 pw"
            outcome="6 個月無法達成。需重新 scoping 或加人。"
            tone={signal.red}
          />
          <SensitivityRow
            alloc="50%"
            effective="15.6 pw"
            outcome="僅能交付約 40% 的 GA 範圍。專案需重新 baseline。"
            tone={signal.red}
          />
        </div>
      </div>

      <Footer n={24} />
    </div>
  );
};

// ─── Page 25 · The ask ─────────────────────────────────────────────────────

const Ask = ({
  n,
  title,
  detail,
}: {
  n: string;
  title: string;
  detail: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '70px 1fr',
      gap: 32,
      paddingBottom: 28,
      borderBottom: `1px solid ${hairline}`,
      marginBottom: 28,
      alignItems: 'baseline',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontStyle: 'italic',
        fontSize: 44,
        color: accent,
        fontWeight: 400,
        lineHeight: 1,
      }}
    >
      {n}
    </div>
    <div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1.3,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 22, lineHeight: 1.55, color: muted }}>
        {detail}
      </div>
    </div>
  </div>
);

const Closing: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={6} chapterName="風險與請求" label="請求" />

      <div style={anim}>
        <Eyebrow>我們需要 · 來自你</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '32px 0 48px 0',
            maxWidth: 1500,
          }}
        >
          三項簽核,計時器開始跑。
        </h2>

        <div style={{ maxWidth: 1500 }}>
          <Ask
            n="a."
            title="確認兩位 RD、80% 投入、26 週。"
            detail="低於 80%,砍除清單依公開規則自動觸發。沒有英雄式硬撐。"
          />
          <Ask
            n="b."
            title="把 v3 維護量壓在每週一天以內。"
            detail="超出就會觸發 R3。若 v3 P1 triage 可走 on-call 輪值會很有幫助。"
          />
          <Ask
            n="c."
            title="出席雙週 demo review。"
            detail="26 週內共 13 場。每一場都是觸發條件的即時檢查 — 落後就在這裡被抓到。"
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 140,
            left: 140,
            right: 140,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderTop: `2px solid ${ink}`,
            paddingTop: 28,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 32,
              color: ink,
              fontWeight: 700,
            }}
          >
            需於 M0 · 第 0 週前完成決策
          </div>
          <div
            style={{
              fontFamily: 'var(--osd-font-body)',
              fontSize: 18,
              color: muted,
              letterSpacing: '0.16em',
            }}
          >
            v4.0 GA · 第 26 週
          </div>
        </div>
      </div>

      <Footer n={25} />
    </div>
  );
};

// ─── Page 26 · Ch.VII divider ───────────────────────────────────────────────

const DividerVII: Page = () => (
  <SectionDivider
    chapter={7}
    name="技術落地"
    lede="2026-05-21 規格文件出爐。前面六章的決策落到套件命名、版本釋出、相依 stack、Phase 模型與遷移工具五項具體承諾。"
    pages={['規格出爐', '套件 & 版本', '相依 stack', 'Phase 模型', '遷移工具']}
    n={26}
  />
);

// ─── Page 27 · Spec arrival & positioning shifts ────────────────────────────

const ShiftRow = ({
  axis,
  before,
  after,
}: {
  axis: string;
  before: string;
  after: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '220px 1fr 56px 1fr',
      gap: 28,
      padding: '22px 0',
      borderBottom: `1px solid ${hairline}`,
      alignItems: 'baseline',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 17,
        letterSpacing: '0.18em',
        color: muted,
        fontWeight: 600,
      }}
    >
      {axis}
    </div>
    <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 24, color: ink, lineHeight: 1.45 }}>
      {before}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontStyle: 'italic',
        fontSize: 28,
        color: dim,
        textAlign: 'center',
        lineHeight: 1,
      }}
    >
      →
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 24,
        color: accent,
        fontWeight: 600,
        lineHeight: 1.45,
      }}
    >
      {after}
    </div>
  </div>
);

const SpecArrival: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={7} chapterName="技術落地" label="規格出爐" />

      <div style={anim}>
        <Eyebrow>規格文件 · Design 進入 review</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '28px 0 20px 0',
            maxWidth: 1500,
          }}
        >
          由決策落地到實作:三個尺度的修正。
        </h2>

        <p
          style={{
            fontSize: 21,
            color: muted,
            lineHeight: 1.6,
            maxWidth: 1500,
            marginBottom: 40,
          }}
        >
          <code style={{ fontFamily: '"SF Mono", Menlo, Monaco, monospace', fontSize: 19, color: ink }}>
            2026-05-21-graph-pixijs-refactor-design.md
          </code>{' '}
          已釋出待 review。簡報主軸不變,但終點、Phase 模型、Feature 計數在落地階段都有細微修正。
        </p>

        <div style={{ maxWidth: 1640 }}>
          <ShiftRow axis="終點" before="v4.0 GA" after="MVP beta(GA 屬 post-MVP)" />
          <ShiftRow axis="Phase 模型" before="M1 — M4 milestone" after="P0 — P4 vertical slice + iterate" />
          <ShiftRow
            axis="MVP feature 總數"
            before="27 件 ｜ 9c · 11b · 3p · 4l"
            after="36 件 ｜ 9c · 13b · 9p · 5l(hull 排除)"
          />
        </div>
      </div>

      <Footer n={27} />
    </div>
  );
};

// ─── Page 28 · Package naming & dist-tag strategy ───────────────────────────

const StageBlock = ({
  tag,
  version,
  label,
  detail,
  tone,
}: {
  tag: string;
  version: string;
  label: string;
  detail: string;
  tone: 'alpha' | 'next' | 'beta' | 'latest';
}) => {
  const toneColor =
    tone === 'alpha'
      ? muted
      : tone === 'next'
        ? signal.amber
        : tone === 'beta'
          ? accent
          : signal.green;
  return (
    <div
      style={{
        background: wash,
        border: `1px solid ${hairline}`,
        padding: '26px 26px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 13,
          letterSpacing: '0.22em',
          color: toneColor,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: toneColor,
            display: 'inline-block',
          }}
        />
        {tag}
      </div>
      <div
        style={{
          fontFamily: '"SF Mono", Menlo, Monaco, monospace',
          fontSize: 19,
          color: ink,
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        {version}
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 22,
          color: ink,
          fontWeight: 700,
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 15,
          color: muted,
          lineHeight: 1.55,
          borderTop: `1px solid ${hairline}`,
          paddingTop: 12,
        }}
      >
        {detail}
      </div>
    </div>
  );
};

const PackageNaming: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={7} chapterName="技術落地" label="套件 & 版本" />

      <div style={anim}>
        <Eyebrow>命名 · npm dist-tag</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '28px 0 16px 0',
            maxWidth: 1500,
          }}
        >
          一個過渡名稱,四階段 dist-tag。
        </h2>

        <p
          style={{
            fontSize: 21,
            color: muted,
            lineHeight: 1.6,
            maxWidth: 1500,
            marginBottom: 36,
          }}
        >
          開發期使用{' '}
          <code style={{ fontFamily: '"SF Mono", Menlo, Monaco, monospace', fontSize: 19, color: ink }}>
            @moxa/graph-next
          </code>
          ,GA 當天改名回{' '}
          <code style={{ fontFamily: '"SF Mono", Menlo, Monaco, monospace', fontSize: 19, color: ink }}>
            @moxa/graph@4
          </code>
          。下游動 package.json 一行,import path 不變。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22, maxWidth: 1640 }}>
          <StageBlock
            tone="alpha"
            tag="ALPHA"
            version="0.1.0-alpha.x"
            label="內部試裝"
            detail="P0 起以 alpha tag 發 lib team 自用。Storybook 雙掛 /graph-next/* 與 /graph/* 並排對比。"
          />
          <StageBlock
            tone="next"
            tag="NEXT"
            version="0.x.0-next.x"
            label="wac dogfood"
            detail="P2 W14 起 wac team staging 接 next tag。每週 canary,收 P2 redesign feedback。"
          />
          <StageBlock
            tone="beta"
            tag="BETA"
            version="0.x.0-beta.0"
            label="MVP 正式"
            detail="P4 W24 釋出。mxview / act 收到 beta + migration guide,consumer-ready,不要求遷移完成。"
          />
          <StageBlock
            tone="latest"
            tag="LATEST"
            version="1.0.0"
            label="GA · 改名"
            detail="post-MVP,由市場驗證後升 1.0。GA 當天 @moxa/graph-next → @moxa/graph@4。"
          />
        </div>
      </div>

      <Footer n={28} />
    </div>
  );
};

// ─── Page 29 · Dependency stack & bundle budget ─────────────────────────────

const DepRow = ({
  name,
  version,
  role,
  lazy,
}: {
  name: string;
  version: string;
  role: string;
  lazy?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '320px 160px 1fr 120px',
      gap: 28,
      padding: '16px 0',
      borderBottom: `1px solid ${hairline}`,
      alignItems: 'baseline',
    }}
  >
    <div
      style={{
        fontFamily: '"SF Mono", Menlo, Monaco, monospace',
        fontSize: 22,
        color: ink,
        fontWeight: 600,
      }}
    >
      {name}
    </div>
    <div
      style={{
        fontFamily: '"SF Mono", Menlo, Monaco, monospace',
        fontSize: 18,
        color: muted,
      }}
    >
      {version}
    </div>
    <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 18, color: muted, lineHeight: 1.5 }}>
      {role}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontSize: 13,
        color: lazy ? accent : 'transparent',
        letterSpacing: '0.20em',
        textAlign: 'right',
        fontWeight: 700,
      }}
    >
      {lazy ? 'LAZY' : ''}
    </div>
  </div>
);

const DepStack: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={7} chapterName="技術落地" label="相依 stack" />

      <div style={anim}>
        <Eyebrow>相依清單 · bundle 預算</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '28px 0 16px 0',
            maxWidth: 1500,
          }}
        >
          五個 dep,一條紅線。
        </h2>

        <p
          style={{
            fontSize: 21,
            color: muted,
            lineHeight: 1.6,
            maxWidth: 1500,
            marginBottom: 32,
          }}
        >
          所有版本皆 caret + lockfile;dep audit 在 CI 跑。elkjs 體積大,僅在 layered / orth 佈局動態載入。
        </p>

        <div style={{ maxWidth: 1640 }}>
          <DepRow name="pixi.js" version="^8.x" role="WebGL / WebGPU 渲染核心,Canvas 後備" />
          <DepRow name="pixi-viewport" version="^6.x" role="pan / zoom / pinch / inertia / follow / snap" />
          <DepRow
            name="graphology"
            version="^0.26.x"
            role="圖資料模型 + FA2 / shortest-path / traversal / components"
          />
          <DepRow name="elkjs" version="^0.10.x" role="layered / orth 階層佈局與 edge router" lazy />
          <DepRow name="rbush" version="^4.x" role="空間索引,brush-select / hit-test 加速" />
        </div>

        <div
          style={{
            marginTop: 36,
            padding: '20px 28px',
            background: washDeep,
            borderLeft: `4px solid ${accent}`,
            display: 'flex',
            alignItems: 'baseline',
            gap: 28,
            maxWidth: 1640,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 36,
              fontWeight: 700,
              color: accent,
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            ≤ 150 KB
          </div>
          <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 19, color: ink, lineHeight: 1.5 }}>
            Base bundle gzip 預算 · 不含 elkjs lazy chunk · P1 起每 PR 量測,超出 block merge
          </div>
        </div>
      </div>

      <Footer n={29} />
    </div>
  );
};

// ─── Page 30 · Phase model alignment ────────────────────────────────────────

const PhaseRow = ({
  tag,
  weeks,
  name,
  gate,
}: {
  tag: string;
  weeks: string;
  name: string;
  gate: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '110px 160px 1fr 1.1fr',
      gap: 28,
      padding: '18px 0',
      borderBottom: `1px solid ${hairline}`,
      alignItems: 'baseline',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 36,
        fontWeight: 700,
        color: accent,
        lineHeight: 1,
        letterSpacing: '-0.01em',
      }}
    >
      {tag}
    </div>
    <div
      style={{
        fontFamily: '"SF Mono", Menlo, Monaco, monospace',
        fontSize: 16,
        color: muted,
      }}
    >
      {weeks}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 22,
        color: ink,
        fontWeight: 700,
        lineHeight: 1.35,
      }}
    >
      {name}
    </div>
    <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 16, color: muted, lineHeight: 1.55 }}>
      {gate}
    </div>
  </div>
);

const PhaseModel: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={7} chapterName="技術落地" label="Phase 模型" />

      <div style={anim}>
        <Eyebrow>26 週 · P0 — P4</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '28px 0 12px 0',
            maxWidth: 1500,
          }}
        >
          M1—M4 是對外節奏,P0—P4 是內部執行模型。
        </h2>

        <p
          style={{
            fontSize: 20,
            color: muted,
            lineHeight: 1.55,
            maxWidth: 1500,
            marginBottom: 32,
          }}
        >
          Vertical slice + iterate:5w 跑通一條線 → 4w 鞏固 → 10w 鋪寬 + Pilot 接入 → 4w 穩 → 3w beta。每 Phase 都有可量化的 exit gate。
        </p>

        <div style={{ maxWidth: 1640 }}>
          <PhaseRow
            tag="P0"
            weeks="W1 — W5"
            name="Audit + Slice 1"
            gate="Slice 1 跑起、audit 表 W3 結凍、10k 節點 fps ≥ 30(不過則 R1 fallback)"
          />
          <PhaseRow
            tag="P1"
            weeks="W6 — W9"
            name="Foundation 鞏固 + Priority Fill"
            gate="Theme / state / pipeline 穩定、視覺 baseline 鎖定、MVP scope ~55% 完成"
          />
          <PhaseRow
            tag="P2"
            weeks="W10 — W19"
            name="Wide Build + wac Onboard"
            gate="MVP audit subset 100%、wac 1 page 跑起、Migration guide v1"
          />
          <PhaseRow
            tag="P3"
            weeks="W20 — W23"
            name="Stabilize + Migration Guide"
            gate="P1 bug 清空、guide 過 mxview / act review、beta acceptance tests 全綠"
          />
          <PhaseRow
            tag="P4"
            weeks="W24 — W26"
            name="Beta Release + Buffer"
            gate="@moxa/graph-next@0.x-beta.0 npm publish、wac staging 穩跑"
          />
        </div>
      </div>

      <Footer n={30} />
    </div>
  );
};

// ─── Page 31 · Migration tooling ────────────────────────────────────────────

const ToolRow = ({
  n,
  name,
  detail,
}: {
  n: string;
  name: string;
  detail: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '70px 320px 1fr',
      gap: 28,
      padding: '20px 0',
      borderBottom: `1px solid ${hairline}`,
      alignItems: 'baseline',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontStyle: 'italic',
        fontSize: 36,
        color: accent,
        fontWeight: 400,
        lineHeight: 1,
      }}
    >
      {n}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 24,
        color: ink,
        fontWeight: 700,
        lineHeight: 1.3,
      }}
    >
      {name}
    </div>
    <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 18, color: muted, lineHeight: 1.55 }}>
      {detail}
    </div>
  </div>
);

const Migration: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '160px 140px 140px',
      }}
    >
      <TopRule chapter={7} chapterName="技術落地" label="遷移工具" />

      <div style={anim}>
        <Eyebrow>遷移工具組 · P3 W21 交付</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '28px 0 16px 0',
            maxWidth: 1500,
          }}
        >
          自動化能改的全自動,剩下的標清楚。
        </h2>

        <p
          style={{
            fontSize: 20,
            color: muted,
            lineHeight: 1.6,
            maxWidth: 1500,
            marginBottom: 28,
          }}
        >
          API 形狀對等 — Graph facade、事件名稱、.zoom / .fitView / .setLayout / .on / .off 全部保留。必要 breaking 限於 custom factory 簽名、config.renderer、G6 型別 re-export。
        </p>

        <div style={{ maxWidth: 1640 }}>
          <ToolRow
            n="i."
            name="Import path codemod"
            detail="jscodeshift script,改 from '@moxa/graph' → from '@moxa/graph-next';偵測 G6 type re-export 並標記人工處理。"
          />
          <ToolRow
            n="ii."
            name="API surface diff report"
            detail="自動產 markdown:所有 breaking change + 對應替換寫法。每 PR 跑,落差就在 review 看到。"
          />
          <ToolRow
            n="iii."
            name="Migration guide v1"
            detail="每個 breaking change 含 Before(G6) / After(Pixi-next) 並排範例、complexity 標記、行為差異警示。"
          />
          <ToolRow
            n="iv."
            name="Compat ESLint rule"
            detail="給 mxview / act 在 migration 期內可選裝。標記混用兩版 import,避免不小心同時引兩個 lib。"
          />
        </div>
      </div>

      <Footer n={31} />
    </div>
  );
};

// ─── Meta + default export ──────────────────────────────────────────────────

export const meta: SlideMeta = {
  title: '@moxa/graph v4 · 決策簡報',
  createdAt: '2026-05-20T15:45:28.131Z',
};

export default [
  Cover,
  DividerI,
  Decision,
  Why,
  DividerII,
  Candidates,
  WhyLeaveG6,
  Comparison,
  Scoring,
  DividerIII,
  Scope,
  ConsumerAudit,
  Deferred,
  DividerIV,
  Strategy,
  Architecture,
  DividerV,
  Timeline,
  DemoCadence,
  WBS,
  DividerVI,
  Risk,
  Cutlist,
  Sensitivity,
  Closing,
  DividerVII,
  SpecArrival,
  PackageNaming,
  DepStack,
  PhaseModel,
  Migration,
] satisfies Page[];
