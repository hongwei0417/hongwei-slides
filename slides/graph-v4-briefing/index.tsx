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

const TOTAL = 29;

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
          <Eyebrow>決策簡報 · 三十九週 · 兩位 RD</Eyebrow>
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
          淘汰 AntV G6,改採 PixiJS v8。九個月、觸發機制驅動的 v4.0 GA 計畫 (Route B3 baseline)。
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
          核准 <span style={{ color: accent }}>60%</span> RD 投入、
          <br />
          兩位工程師、三十九週。
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
          整份簡報的範圍、時程、風險機制與敏感度分析,都從這個數字推導而來。低於 60%,我們按公開規則自動縮減範圍 (Round 2 砍除) 或順延至 B2 路線 (14.5 個月) — 不是靠加班補回時程。
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
    pages={['三個候選', '為何離開 G6', '維度對照', '綜合權衡矩陣', '加權總分']}
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

// ─── Page 9 · Scoring matrix (full 13-dim) ─────────────────────────────────

const MatrixScore = ({ score, top }: { score: number; top?: boolean }) => (
  <div
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 28,
      fontWeight: 700,
      color: top ? accent : ink,
      lineHeight: 1,
      textAlign: 'center',
      letterSpacing: '-0.01em',
      background: top ? washDeep : 'transparent',
      padding: '4px 0',
    }}
  >
    {score}
  </div>
);

const MatrixRow = ({
  axis,
  weight,
  g6,
  cyto,
  pixi,
}: {
  axis: string;
  weight?: string;
  g6: number;
  cyto: number;
  pixi: number;
}) => {
  const max = Math.max(g6, cyto, pixi);
  const weightColor = weight === '最高' ? accent : weight === '高' ? ink : muted;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '300px 90px 1fr 1fr 1fr',
        gap: 28,
        padding: '7px 0',
        borderBottom: `1px solid ${hairline}`,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 19,
          fontWeight: 700,
          color: ink,
          lineHeight: 1.3,
        }}
      >
        {axis}
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
        {weight ?? '—'}
      </div>
      <MatrixScore score={g6} top={g6 === max} />
      <MatrixScore score={cyto} top={cyto === max} />
      <MatrixScore score={pixi} top={pixi === max} />
    </div>
  );
};

const ScoringMatrix: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '150px 140px 130px',
      }}
    >
      <TopRule chapter={2} chapterName="選型" label="綜合權衡矩陣" />

      <div style={anim}>
        <Eyebrow>綜合權衡矩陣 · 13 維度 × 5 分制</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 42,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '0.01em',
            margin: '16px 0 4px 0',
            maxWidth: 1500,
          }}
        >
          13 個維度 · 逐項拆解 · 加權彙整。
        </h2>

        <p
          style={{
            fontSize: 16,
            color: muted,
            marginTop: 4,
            marginBottom: 18,
            maxWidth: 1500,
            lineHeight: 1.45,
          }}
        >
          5 = 最佳 · 1 = 最弱 · 以 SCADA 需求 profile 加權。每列最高分以 accent 標示。
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '300px 90px 1fr 1fr 1fr',
            gap: 28,
            paddingBottom: 8,
            borderBottom: `2px solid ${ink}`,
            marginBottom: 2,
            fontFamily: 'var(--osd-font-body)',
            fontSize: 13,
            letterSpacing: '0.18em',
            color: muted,
            fontWeight: 700,
            maxWidth: 1640,
          }}
        >
          <div>維度</div>
          <div>權重</div>
          <div style={{ textAlign: 'center' }}>G6 5.x</div>
          <div style={{ textAlign: 'center' }}>Cytoscape</div>
          <div style={{ textAlign: 'center', color: accent }}>PixiJS v8 ★</div>
        </div>

        <div style={{ maxWidth: 1640 }}>
          <MatrixRow axis="架構與渲染靈活度" weight="高" g6={3} cyto={3} pixi={5} />
          <MatrixRow axis="效能與規模 (10k 節點)" weight="高" g6={3} cyto={2} pixi={5} />
          <MatrixRow axis="客製節點外觀 (SCADA)" weight="最高" g6={3} cyto={1} pixi={5} />
          <MatrixRow axis="編輯能力 (內建)" weight="中" g6={5} cyto={4} pixi={1} />
          <MatrixRow axis="Layout 演算法" weight="中" g6={5} cyto={4} pixi={4} />
          <MatrixRow axis="圖論演算法" weight="低" g6={4} cyto={5} pixi={4} />
          <MatrixRow axis="Bundle size" weight="中" g6={3} cyto={4} pixi={4} />
          <MatrixRow axis="TypeScript 體驗" weight="中" g6={3} cyto={3} pixi={5} />
          <MatrixRow axis="Angular 整合" weight="低" g6={4} cyto={3} pixi={3} />
          <MatrixRow axis="地圖整合" weight="高" g6={1} cyto={1} pixi={5} />
          <MatrixRow axis="文件與社群" weight="中" g6={4} cyto={4} pixi={5} />
          <MatrixRow axis="License" g6={5} cyto={5} pixi={5} />
          <MatrixRow axis="長期維護持續性" weight="高" g6={3} cyto={3} pixi={5} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '300px 90px 1fr 1fr 1fr',
              gap: 28,
              padding: '14px 0 0',
              borderTop: `2px solid ${ink}`,
              marginTop: 6,
              alignItems: 'baseline',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 22,
                fontWeight: 700,
                color: ink,
              }}
            >
              加權總分
            </div>
            <div
              style={{
                fontFamily: 'var(--osd-font-body)',
                fontSize: 12,
                letterSpacing: '0.18em',
                color: muted,
                fontWeight: 700,
              }}
            >
              / 65
            </div>
            <div
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 44,
                fontWeight: 700,
                color: ink,
                textAlign: 'center',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              45
            </div>
            <div
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 44,
                fontWeight: 700,
                color: ink,
                textAlign: 'center',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              42
            </div>
            <div
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 56,
                fontWeight: 700,
                color: accent,
                textAlign: 'center',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              62
            </div>
          </div>
        </div>
      </div>

      <Footer n={9} />
    </div>
  );
};

// ─── Page 10 · Scoring totals ───────────────────────────────────────────────

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
      <TopRule chapter={2} chapterName="選型" label="加權總分" />

      <div style={anim}>
        <Eyebrow>加權總分 · 結論</Eyebrow>

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

      <Footer n={10} />
    </div>
  );
};

// ─── Page 11 · Ch.III divider · 範圍 ────────────────────────────────────────

const DividerIII: Page = () => (
  <SectionDivider
    chapter={3}
    name="範圍"
    lede="GA 出貨什麼、什麼延後、什麼直接砍。三個下游 grep 盤點完才下手。"
    pages={['GA 出貨範圍', '下游使用盤點', '延後與砍除']}
    n={11}
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
          已對 mxview、act-web、network、topology-web 做完 grep 盤點。三個 behavior 與八個 plugin 延後到 v4.x,Route B3 預砍 element-toolbar + focus-element 為 9 個月 timeline 留 buffer。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 56, maxWidth: 1640 }}>
          <StatTile big="9" label="元件 / Components" sub="node、edge、group 系列 — mxview 大量使用" />
          <StatTile big="10" label="互動行為 / Behaviors" sub="砍 select-all / drill-down / focus-element,附 polyfill" />
          <StatTile big="2" label="Plugin" sub="fixed-toolbar、graph-background (element-toolbar 推 v4.x)" />
          <StatTile big="4" label="佈局 / Layouts" sub="force、grid、ring、align — tree 延後" />
        </div>
      </div>

      <Footer n={12} />
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

      <Footer n={13} />
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
          下游 grep 沒掃到 instantiate 的模組一律延後。Route B3 再預砍 2 個 (element-toolbar / focus-element),全部 4 個推 v4.x 的項目都附 polyfill — 下游 1-3 行替代。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28, maxWidth: 1640 }}>
          <ListBlock
            title="延後到 v4.x (grep 沒掃到)"
            tone={signal.amber}
            toneLabel="DEFERRED · 8"
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
            title="Polyfill 替代 (Route B3 + 砍除)"
            tone={signal.red}
            toneLabel="POLYFILL · 4"
            items={[
              {
                name: 'element-toolbar',
                reason: 'Route B3 預砍 · 用 fixed-toolbar + 自訂 onClick handler + position style 替代',
              },
              {
                name: 'focus-element',
                reason: 'Route B3 預砍 · 用 graph.focusItem(id) Core API 直接呼叫 (功能保留)',
              },
              {
                name: 'select-all',
                reason: '僅 topology-web (內部 demo) 使用 · setElementState 迴圈 polyfill',
              },
              {
                name: 'drill-down',
                reason: '僅 mxview programmatic 使用 · collapse-expand + setData,§11 附 snippet',
              },
            ]}
          />
        </div>
      </div>

      <Footer n={14} />
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
    n={15}
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
            detail="未來 39 週都在這裡。alpha → beta → rc → GA,每週 canary。"
          />
          <PkgBlock
            tone="sunset"
            status="GA 當天 · 改名"
            name="@moxa/graph@4"
            detail="自動產 PR,一次改完 mxview、act-web、network 的 package.json。"
          />
        </div>
      </div>

      <Footer n={16} />
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
          Foundation 若 W6 完成度 &lt; 70%,R1 觸發 → +0.3 RD 或 B2 路線 (14.5 個月)。後續所有 Tier 都依賴它,不可挪後。
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
            weeks="Week 4 — 9"
            name="Core + Shared"
            detail="Graph facade、DataManager、ConfigManager、Renderer、Theme、20 個 model 型別搬遷"
          />
          <Tier
            tag="Tier 2"
            weeks="Week 10 — 21"
            name="Components · Behaviors · Layouts"
            detail="9 個元件、10 個 behavior、4 個 layout 並行開發 (2A / 2B / 2C 三條線同步)"
          />
          <Tier
            tag="Tier 3"
            weeks="Week 22 — 29"
            name="Plugins"
            detail="fixed-toolbar、graph-background (element-toolbar 已 Route B3 預砍至 v4.x)"
          />
          <Tier
            tag="Tier 4"
            weeks="Week 30 — 39"
            name="Integration · Test · Docs"
            detail="mxview / act-web swap PoC、Visual regression baseline、Migration guide、API docs、rc.final dry-run"
          />
        </div>
      </div>

      <Footer n={17} />
    </div>
  );
};

// ─── Page 17 · Ch.V divider · 時程 ──────────────────────────────────────────

const DividerV: Page = () => (
  <SectionDivider
    chapter={5}
    name="時程"
    lede="三十九週、四個 Milestone、二十場 Demo Review。每場 demo 都是觸發條件的即時檢查。"
    pages={['M1 → M4', 'Demo Review · D1 → D13', 'RD 分工']}
    n={18}
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
      <TopRule chapter={5} chapterName="時程" label="M1 → M4 · 39 週" />

      <div style={anim}>
        <Eyebrow>時程 · 2026/6 kickoff · 2027/3 GA</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '24px 0 20px 0',
            maxWidth: 1500,
          }}
        >
          三十九週,四個 Milestone。{' '}
          <span style={{ color: muted, fontWeight: 400 }}>二十場 Demo Review。</span>
        </h2>

        <p style={{ fontSize: 18, color: muted, marginTop: 6, marginBottom: 20, maxWidth: 1500, lineHeight: 1.5 }}>
          Route B3 baseline (2 人 × 60% × 39 週)。kickoff 2026/6/1,GA 落點 2027/3 初。
        </p>

        <div
          style={{
            position: 'relative',
            height: 40,
            marginTop: 24,
            marginBottom: 20,
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
          {[
            { p: 0, label: '2026/6 · kickoff' },
            { p: 23, label: '2026/8 · M1' },
            { p: 54, label: '2026/10 · M2' },
            { p: 74, label: '2026/12 · M3' },
            { p: 100, label: '2027/3 · GA' },
          ].map(({ p, label }, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 14,
                left: `${p}%`,
                transform: 'translateX(-50%)',
                width: 10,
                height: 10,
                borderRadius: 5,
                background: i === 0 || i === 4 ? accent : ink,
              }}
            />
          ))}
          {[
            { p: 0, label: '2026/6 · kickoff' },
            { p: 23, label: '2026/8' },
            { p: 54, label: '2026/10' },
            { p: 74, label: '2026/12' },
            { p: 100, label: '2027/3 · GA' },
          ].map(({ p, label }, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 30,
                left: `${p}%`,
                transform: i === 0 ? 'translateX(0)' : i === 4 ? 'translateX(-100%)' : 'translateX(-50%)',
                fontFamily: 'var(--osd-font-body)',
                fontSize: 12,
                color: i === 0 || i === 4 ? accent : muted,
                letterSpacing: '0.10em',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, maxWidth: 1640, marginTop: 36 }}>
          <Milestone tag="M1" weeks="W1–9 · 2026/6 → 8" title="Foundation + Core" ship="ship · 4.0.0-alpha.1" />
          <Milestone tag="M2" weeks="W10–21 · 2026/8 → 10" title="Components · Behaviors · Layouts" ship="ship · 4.0.0-beta.1" />
          <Milestone tag="M3" weeks="W22–29 · 2026/11 → 12" title="Plugins · subpath exports" ship="ship · 4.0.0-rc.1" />
          <Milestone tag="M4" weeks="W30–39 · 2027/1 → 3" title="Integration · 文件 · GA" ship="ship · 4.0.0 GA" />
        </div>
      </div>

      <Footer n={19} />
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
        <Eyebrow>雙週 demo review · D1 → D20 · 39 週</Eyebrow>

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
        >每兩週一次,共二十場。</h2>

        <p style={{ fontSize: 18, color: muted, marginTop: 6, marginBottom: 24, maxWidth: 1500, lineHeight: 1.5 }}>
          每場 demo 對 R1–R4 做 sanity check。觸發即進入應變,不延後。M1 / M3 各 4 場,M2 / M4 各 6 場。
        </p>

        <div style={{ maxWidth: 1640 }}>
          <DemoGroup
            ms="M1"
            weeks="D1–D4 · W2 / 4 / 6 / 8"
            demos={['Pixi boot + viewport', 'hit-test + Graph facade', 'DataManager + Renderer', 'Theme + sprite loader']}
            trigger="D3 / W6 · R1 check point"
          />
          <DemoGroup
            ms="M2"
            weeks="D5–D10 · W10–20"
            demos={['4.0.0-alpha.1 (D5)', 'node-device + nav 4 (D6)', '6/9 components + selection (D7)', '9 components + 4 layouts (D8)', 'brush / click select (D9)', 'hover + fix-element-size (D10)']}
          />
          <DemoGroup
            ms="M3"
            weeks="D11–D14 · W22–28"
            demos={['4.0.0-beta.1 + create-edge (D11)', 'collapse-expand + subpath (D12)', '2 plugins (D13)', 'feature complete (D14)']}
            trigger="D11 / W22 · R4 check point (mxview PoC kickoff)"
          />
          <DemoGroup
            ms="M4"
            weeks="D15–D20 · W30–39"
            demos={['4.0.0-rc.1 + baseline lock (D15)', 'mxview swap PoC (D16)', 'act-web swap (D17)', 'API docs / storybook (D18)', 'rc.final dry-run (D19)', 'GA Day (D20)']}
            trigger="D20 / W39 · GA Day"
          />
        </div>
      </div>

      <Footer n={20} />
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
            who="主 · 對外介面"
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

      <Footer n={21} />
    </div>
  );
};

// ─── Page 21 · Ch.VI divider · 風險與請求 ───────────────────────────────────

const DividerVI: Page = () => (
  <SectionDivider
    chapter={6}
    name="風險"
    lede="觸發條件、砍除三輪、敏感度與 B2 備用路線、簽核請求。proposal 最重要的部分 — 失敗時的對應已經寫死,落後時自動進下一個應變層級。"
    pages={['R1 → R4 機制', '砍除三輪 + 補回', '敏感度 · B2 備用', '請求']}
    n={22}
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
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '20px 0 8px 0',
            maxWidth: 1500,
          }}
        >
          落後時,按規則進入 Round 2 或 B2 路線。
        </h2>

        <p style={{ fontSize: 18, color: muted, marginTop: 6, marginBottom: 22, maxWidth: 1500, lineHeight: 1.5 }}>
          Route B3 baseline 已預砍 Round 1 (element-toolbar + focus-element)。R1–R4 觸發後,有明確下一步 — Round 2 砍除、加 0.3 RD、或進入 B2 (14.5 個月) 路線。
        </p>

        <div style={{ maxWidth: 1640 }}>
          <Trigger
            code="R1"
            tone={signal.amber}
            title="M1 Foundation 延遲"
            trigger="第 6 週 Foundation 完成度 < 70%。"
            response="拉第 3 位 RD (library 小組 0.3 PW),或 timeline 順延至 B2 路線 (14.5 個月)。"
          />
          <Trigger
            code="R2"
            tone={signal.amber}
            title="60% allocation 前提破滅"
            trigger="任一 RD 連續 2 週實際投入 < 50%。"
            response="觸發 §7 Round 2 砍除 (create-edge / collapse-expand / edge 合併);若連續 4 週 < 45%,啟動 R1 應變或進入 B2。"
          />
          <Trigger
            code="R3"
            tone={signal.amber}
            title="v3 維護量超標"
            trigger="v3 單週處理 > 1.5 天,或連續 2 週 > 1 天。"
            response="該週起暫停 v3 P1、僅接 P0;超 2 週啟動 §7 Round 2 砍除。"
          />
          <Trigger
            code="R4"
            tone={signal.red}
            title="mxview / act-web 整合 PoC 失敗"
            trigger="M3 W26 後 PoC 跑不起,且 missing API 預估 > 2 PW。"
            response="與 mxview / act-web team + 主管聯合決策:補實作 vs §7 砍除。"
          />
        </div>
      </div>

      <Footer n={23} />
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
        <Eyebrow>砍除清單 · 三輪 + 補回順序</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '20px 0 8px 0',
            maxWidth: 1500,
          }}
        >
          Round 1 已在 baseline 預砍 · 觸發後依序進 Round 2 / 3。
        </h2>

        <p style={{ fontSize: 17, color: muted, marginTop: 6, marginBottom: 22, maxWidth: 1500, lineHeight: 1.5 }}>
          Route B3 baseline 已含 Round 1 (element-toolbar + focus-element)。R2/R3 觸發 → Round 2;持續惡化 → Round 3 (minimal viewer)。M1/M2/M3 末提前 ≥ 1 週 → 拉回。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, maxWidth: 1640 }}>
          <RoundBlock
            round="Round 1 ✓ baseline"
            saves="2 PW (已含)"
            tone={signal.green}
            toneLabel="PRE-CUT · B3 內含"
            items={[
              'element-toolbar → v4.x (用 fixed-toolbar polyfill)',
              'focus-element → v4.x (用 graph.focusItem API)',
            ]}
          />
          <RoundBlock
            round="Round 2"
            saves="2–3 PW"
            tone={signal.amber}
            toneLabel="R2/R3 觸發後"
            items={[
              'edge-polyline / arrow / label 合入 edge-line 內部',
              'create-edge → v4.x (DESIGN mode 暫停)',
              'collapse-expand → v4.x (mxview 已 false)',
            ]}
          />
          <RoundBlock
            round="Round 3"
            saves="warning"
            tone={signal.red}
            toneLabel="MINIMAL VIEWER"
            items={[
              'drag-element → v4.x (編輯場景棄用)',
              'hover-activate',
              'scroll-canvas (改用 zoom-canvas 變通)',
            ]}
          />
        </div>

        <div
          style={{
            marginTop: 22,
            paddingTop: 18,
            borderTop: `2px solid ${ink}`,
            maxWidth: 1640,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--osd-font-body)',
              fontSize: 13,
              letterSpacing: '0.18em',
              color: accent,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            PULL-BACK · 提前完成時補回順序
          </div>
          <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 16, color: ink, lineHeight: 1.55 }}>
            +1 週 → <span style={{ fontWeight: 600 }}>drill-down</span>
            {' · '}+2 週 → <span style={{ fontWeight: 600 }}>select-all</span>
            {' · '}+3 週 → <span style={{ fontWeight: 600 }}>minimap plugin</span>
            {' · '}+4 週 → <span style={{ fontWeight: 600 }}>tooltip plugin</span>
          </div>
        </div>
      </div>

      <Footer n={24} />
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
      <TopRule chapter={6} chapterName="風險與請求" label="敏感度 · 備用路線" />

      <div style={anim}>
        <Eyebrow>敏感度 · 60% allocation × 39 週 baseline</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '20px 0 12px 0',
            maxWidth: 1500,
          }}
        >
          60% 是硬前提。跌破就走 Round 2 / B2 路線。
        </h2>

        <p style={{ fontSize: 17, color: muted, marginTop: 6, marginBottom: 22, maxWidth: 1500, lineHeight: 1.5 }}>
          需求 36 PW (Route B3 預砍後,AI 1.2x 加速)。供給 = 2 人 × allocation × 39 週 − v3 維護 1 天/週。
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '140px 180px 1fr',
            gap: 36,
            paddingBottom: 10,
            borderBottom: `2px solid ${ink}`,
            marginBottom: 2,
            fontFamily: 'var(--osd-font-body)',
            fontSize: 13,
            letterSpacing: '0.18em',
            color: muted,
            fontWeight: 600,
            maxWidth: 1640,
          }}
        >
          <div>投入比例</div>
          <div>有效 PW (供給)</div>
          <div>vs 36 PW 需求 · 對應路線</div>
        </div>

        <div style={{ maxWidth: 1640 }}>
          <SensitivityRow
            alloc="70%"
            effective="39.0 PW"
            outcome="+3.0 buffer · 可拉回 §7.3 (drill-down / select-all)。"
            tone={signal.green}
          />
          <SensitivityRow
            alloc="65%"
            effective="35.1 PW"
            outcome="−0.9 marginal · GA 如期,Round 2 待命不發。"
            tone={signal.green}
          />
          <SensitivityRow
            alloc="60%"
            effective="31.2 PW"
            outcome="−4.8 baseline · 倚賴 AI 1.3x 或 Round 2 sub-cut 補。"
            tone={signal.green}
            highlight
          />
          <SensitivityRow
            alloc="55%"
            effective="27.3 PW"
            outcome="−8.7 · 必觸發 R2,啟動 Round 2 砍除。"
            tone={signal.amber}
          />
          <SensitivityRow
            alloc="50%"
            effective="23.4 PW"
            outcome="−12.6 · 進入 B2 路線 (14.5 個月) 或重新 scoping。"
            tone={signal.red}
          />
        </div>

        <div
          style={{
            marginTop: 18,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 22,
            maxWidth: 1640,
          }}
        >
          <div
            style={{
              background: wash,
              border: `1px solid ${hairline}`,
              padding: '14px 18px',
            }}
          >
            <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 12, letterSpacing: '0.18em', color: signal.green, fontWeight: 700 }}>
              ★ B3 BASELINE
            </div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, color: ink, marginTop: 6, fontWeight: 700 }}>
              2 × 60% × 39 週 · scope = full minus Round 1
            </div>
          </div>
          <div
            style={{
              background: wash,
              border: `1px solid ${hairline}`,
              padding: '14px 18px',
            }}
          >
            <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 12, letterSpacing: '0.18em', color: signal.amber, fontWeight: 700 }}>
              B2 FALLBACK
            </div>
            <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 19, color: ink, marginTop: 6, fontWeight: 700 }}>
              2 × 50% × 63 週 (14.5 個月) · scope = full
            </div>
          </div>
        </div>
      </div>

      <Footer n={25} />
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
            title="確認兩位 RD、60% 投入、39 週 (Route B3)。"
            detail="跌破 60% 將觸發 R2、自動進 Round 2 砍除;持續惡化則進 B2 路線 (14.5 個月)。沒有英雄式硬撐。"
          />
          <Ask
            n="b."
            title="把 v3 維護量壓在每週一天以內。"
            detail="超出就會觸發 R3。若 v3 P1 triage 可走 on-call 輪值會很有幫助。"
          />
          <Ask
            n="c."
            title="出席雙週 demo review。"
            detail="39 週內共 20 場 (D1–D20)。每一場都是觸發條件的即時檢查 — 落後就在這裡被抓到。"
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
              fontSize: 30,
              color: ink,
              fontWeight: 700,
            }}
          >
            M0 kickoff · 2026/6
          </div>
          <div
            style={{
              fontFamily: 'var(--osd-font-body)',
              fontSize: 18,
              color: muted,
              letterSpacing: '0.16em',
            }}
          >
            v4.0 GA · 2027/3 (第 39 週)
          </div>
        </div>
      </div>

      <Footer n={26} />
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
    n={27}
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

      <Footer n={28} />
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

      <Footer n={29} />
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
        >五個 dependencies</h2>

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

      <Footer n={28} />
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

      <Footer n={31} />
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
        </div>
      </div>

      <Footer n={29} />
    </div>
  );
};

// ─── Page 30 · Module reference table (Appendix B) ──────────────────────────

const ModuleEntry = ({
  name,
  status,
  note,
}: {
  name: string;
  status: 'GA' | 'v4.x' | 'B3';
  note?: string;
}) => {
  const color =
    status === 'GA' ? signal.green : status === 'B3' ? accent : signal.amber;
  const label = status === 'GA' ? 'GA' : status === 'B3' ? 'B3 預砍' : 'v4.x';
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 84px',
        gap: 10,
        padding: '5px 0',
        borderBottom: `1px solid ${hairline}`,
        alignItems: 'baseline',
      }}
    >
      <div>
        <span
          style={{
            fontFamily: '"SF Mono", Menlo, Monaco, monospace',
            fontSize: 14,
            color: ink,
            fontWeight: 600,
          }}
        >
          {name}
        </span>
        {note && (
          <span
            style={{
              fontFamily: 'var(--osd-font-body)',
              fontSize: 11,
              color: muted,
              marginLeft: 6,
            }}
          >
            · {note}
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 10,
          color,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textAlign: 'right',
        }}
      >
        {label}
      </div>
    </div>
  );
};

const ModuleSection = ({
  title,
  count,
  children,
}: {
  title: string;
  count: string;
  children: React.ReactNode;
}) => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        borderBottom: `2px solid ${ink}`,
        paddingBottom: 6,
        marginBottom: 2,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 18,
          fontWeight: 700,
          color: ink,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 11,
          letterSpacing: '0.14em',
          color: muted,
          fontWeight: 700,
        }}
      >
        {count}
      </div>
    </div>
    {children}
  </div>
);

const ModuleTable: Page = () => {
  const anim = useEntrance();
  return (
    <div
      style={{
        ...fill,
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        padding: '150px 140px 120px',
      }}
    >
      <TopRule chapter={7} chapterName="技術落地" label="完整模組對照表" />

      <div style={anim}>
        <Eyebrow>附錄 · 完整模組對照表 (Appendix B)</Eyebrow>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.18,
            letterSpacing: '0.01em',
            margin: '14px 0 4px 0',
            maxWidth: 1500,
          }}
        >
          39 個模組 · 三個結局 (GA / v4.x / B3 預砍)。
        </h2>

        <p style={{ fontSize: 15, color: muted, marginTop: 4, marginBottom: 18, maxWidth: 1500, lineHeight: 1.5 }}>
          v4.0 GA = 25 · v4.x 延後 = 12 (含 B3 預砍 2 + polyfill 2) · Future = 2。
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, maxWidth: 1640 }}>
          {/* Col 1: Components + Layouts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <ModuleSection title="Components" count="9 個 · 全 GA">
              <ModuleEntry name="node-device" status="GA" note="heavy · 44 hits" />
              <ModuleEntry name="node-icon" status="GA" />
              <ModuleEntry name="node-label" status="GA" />
              <ModuleEntry name="edge-line" status="GA" note="heavy · 43 hits" />
              <ModuleEntry name="edge-polyline" status="GA" note="mxview elbow" />
              <ModuleEntry name="edge-quadratic" status="GA" />
              <ModuleEntry name="edge-label" status="GA" />
              <ModuleEntry name="edge-arrow" status="GA" />
              <ModuleEntry name="group-device" status="GA" />
            </ModuleSection>

            <ModuleSection title="Layouts" count="5 個 · 4 GA · 1 v4.x">
              <ModuleEntry name="force" status="GA" note="FA2" />
              <ModuleEntry name="grid" status="GA" />
              <ModuleEntry name="ring" status="GA" />
              <ModuleEntry name="align" status="GA" />
              <ModuleEntry name="tree" status="v4.x" note="未掃到使用" />
            </ModuleSection>
          </div>

          {/* Col 2: Behaviors */}
          <div>
            <ModuleSection title="Behaviors" count="13 個 · 10 GA · 3 v4.x">
              <ModuleEntry name="drag-canvas" status="GA" />
              <ModuleEntry name="drag-element" status="GA" />
              <ModuleEntry name="zoom-canvas" status="GA" />
              <ModuleEntry name="scroll-canvas" status="GA" />
              <ModuleEntry name="click-select" status="GA" />
              <ModuleEntry name="brush-select" status="GA" />
              <ModuleEntry name="hover-activate" status="GA" />
              <ModuleEntry name="fix-element-size" status="GA" />
              <ModuleEntry name="create-edge" status="GA" />
              <ModuleEntry name="collapse-expand" status="GA" />
              <ModuleEntry name="focus-element" status="B3" note="用 graph.focusItem 替代" />
              <ModuleEntry name="drill-down" status="v4.x" note="polyfill" />
              <ModuleEntry name="select-all" status="v4.x" note="polyfill" />
            </ModuleSection>
          </div>

          {/* Col 3: Plugins + Future */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <ModuleSection title="Plugins" count="10 個 · 2 GA · 8 v4.x">
              <ModuleEntry name="fixed-toolbar" status="GA" />
              <ModuleEntry name="graph-background" status="GA" />
              <ModuleEntry name="element-toolbar" status="B3" note="用 fixed-toolbar polyfill" />
              <ModuleEntry name="minimap" status="v4.x" note="優先補回" />
              <ModuleEntry name="tooltip" status="v4.x" note="優先補回" />
              <ModuleEntry name="rich-tooltip" status="v4.x" />
              <ModuleEntry name="context-menu" status="v4.x" />
              <ModuleEntry name="snapline" status="v4.x" />
              <ModuleEntry name="history" status="v4.x" />
              <ModuleEntry name="hull" status="v4.x" />
            </ModuleSection>

            <ModuleSection title="Future (v4.x+)" count="2 個">
              <ModuleEntry name="orth router (elkjs)" status="v4.x" />
              <ModuleEntry name="leaflet.pixi-overlay" status="v4.x" note="v4.1+" />
            </ModuleSection>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            paddingTop: 12,
            borderTop: `1px solid ${hairline}`,
            maxWidth: 1640,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            fontFamily: 'var(--osd-font-body)',
            fontSize: 13,
            color: muted,
            letterSpacing: '0.06em',
          }}
        >
          <span>
            <span style={{ color: signal.green, fontWeight: 700 }}>● GA</span> v4.0 出貨
            {' · '}
            <span style={{ color: signal.amber, fontWeight: 700 }}>● v4.x</span> 延後
            {' · '}
            <span style={{ color: accent, fontWeight: 700 }}>● B3 預砍</span> baseline 已含
          </span>
          <span>full audit: V4_REFACTOR_PROPOSAL.md · Appendix B</span>
        </div>
      </div>

      <Footer n={30} />
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
  ScoringMatrix,
  Scoring,
  DividerIII,
  Scope,
  ConsumerAudit,
  Deferred,
  ModuleTable,
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
  DividerVII,
  DepStack,
  Migration,
] satisfies Page[];
