type Series = 'mcp' | 'curl' | 'official';

type Bar = {
  series: Series;
  value: number;
  display: string;
  note?: string;
};

type Panel = {
  title: string;
  bars: Bar[];
};

type MetricBarsProps = {
  panels: Panel[];
};

const SERIES_LABEL: Record<Series, string> = {
  mcp: '직접 만든 MCP',
  curl: 'API 키 + curl',
  official: '공식 MCP',
};

// 단위가 다른 지표는 한 축에 섞지 않고 패널마다 0부터 그린다
export function MetricBars({ panels }: MetricBarsProps) {
  const used = [...new Set(panels.flatMap((p) => p.bars.map((b) => b.series)))];

  return (
    <figure className="viz not-prose my-6">
      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-fd-muted-foreground">
        {used.map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-sm" style={{ background: `var(--viz-${s})` }} />
            {SERIES_LABEL[s]}
          </span>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {panels.map((panel) => {
          const max = Math.max(...panel.bars.map((b) => b.value));
          return (
            <div key={panel.title} className="rounded-lg border border-fd-border p-3">
              <p className="mb-2 text-sm font-medium text-fd-foreground">{panel.title}</p>
              <div className="space-y-2">
                {panel.bars.map((bar) => {
                  const tip = `${SERIES_LABEL[bar.series]}: ${bar.display}${bar.note ? ` (${bar.note})` : ''}`;
                  return (
                    <div key={bar.series} title={tip}>
                      <p className="text-xs text-fd-muted-foreground">{SERIES_LABEL[bar.series]}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-4 min-w-0 flex-1 border-l border-fd-border">
                          <div
                            className="h-full rounded-r"
                            style={{
                              width: `${Math.max((bar.value / max) * 100, 1)}%`,
                              background: `var(--viz-${bar.series})`,
                            }}
                          />
                        </div>
                        <span className="w-24 shrink-0 text-xs tabular-nums text-fd-foreground">
                          {bar.display}
                          {bar.note && <span className="block text-fd-muted-foreground">{bar.note}</span>}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </figure>
  );
}
