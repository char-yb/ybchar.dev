'use client';
import mermaid from 'mermaid';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

const ZOOM_STEP = 0.2;
const ZOOM_MIN = 0.3;
const ZOOM_MAX = 4;

type MermaidProps = {
  chart: string;
  width?: string;
};

export function Mermaid({ chart, width = '100%' }: MermaidProps) {
  const id = useId().replace(/:/g, '');
  const ref = useRef<HTMLDivElement>(null);
  const panAreaRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [open, setOpen] = useState(false);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const scaleRef = useRef(1);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      fontSize: 13,
      sequence: { useMaxWidth: true },
      flowchart: { useMaxWidth: true },
    });
    mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => setSvg(svg));
  }, [chart, id, isDark]);

  useEffect(() => {
    if (!svg || !ref.current) return;
    ref.current.innerHTML = svg;
    const svgEl = ref.current.querySelector('svg');
    if (svgEl) {
      svgEl.setAttribute('width', width);
      svgEl.style.width = width;
      svgEl.style.maxWidth = '100%';
      svgEl.style.height = 'auto';
      svgEl.style.display = 'block';
    }
  }, [svg, width]);

  useEffect(() => {
    if (open) {
      setScale(1);
      scaleRef.current = 1;
      setOffset({ x: 0, y: 0 });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // non-passive wheel listener
  useEffect(() => {
    const el = panAreaRef.current;
    if (!open || !el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((scaleRef.current + delta) * 10) / 10));
      scaleRef.current = next;
      setScale(next);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [open]);

  const zoom = useCallback((delta: number) => {
    const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((scaleRef.current + delta) * 10) / 10));
    scaleRef.current = next;
    setScale(next);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, ox: 0, oy: 0 };
    setOffset(prev => {
      dragStart.current.ox = prev.x;
      dragStart.current.oy = prev.y;
      return prev;
    });
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    setOffset({
      x: dragStart.current.ox + (e.clientX - dragStart.current.x),
      y: dragStart.current.oy + (e.clientY - dragStart.current.y),
    });
  }, []);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  const modifiedSvg = svg.replace(
    /<svg /,
    '<svg style="height:75vh;width:auto;max-width:85vw;display:block" '
  );

  return (
    <>
      <div
        className="my-4 cursor-zoom-in rounded-xl overflow-x-auto"
        style={{
          width,
          fontSize: '0.82em',
          backgroundColor: isDark ? '#1e1e2e' : 'white',
          padding: '20px',
          boxShadow: isDark
            ? '0 2px 12px rgba(0,0,0,0.4)'
            : '0 2px 12px rgba(0,0,0,0.08)',
        }}
        onClick={() => setOpen(true)}
        title="클릭하면 크게 볼 수 있습니다"
      >
        <div ref={ref} style={{ width }} />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* toolbar */}
          <div
            className="absolute top-4 right-4 flex items-center gap-1 bg-white rounded-lg shadow-lg px-2 py-1 z-10 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => zoom(ZOOM_STEP)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-xl font-bold text-gray-700"
              aria-label="확대"
            >+</button>
            <span className="text-xs text-gray-500 w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => zoom(-ZOOM_STEP)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-xl font-bold text-gray-700"
              aria-label="축소"
            >−</button>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <button
              onClick={() => { const next = 1; scaleRef.current = next; setScale(next); setOffset({ x: 0, y: 0 }); }}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-base text-gray-500"
              aria-label="초기화"
            >↺</button>
            <div className="w-px h-5 bg-gray-200 mx-1" />
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500"
              aria-label="닫기"
            >✕</button>
          </div>

          {/* pan area */}
          <div
            ref={panAreaRef}
            className="w-full h-full overflow-hidden"
            style={{ cursor: dragging.current ? 'grabbing' : 'grab' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
                transformOrigin: 'center center',
                backgroundColor: isDark ? '#1e1e2e' : 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
              dangerouslySetInnerHTML={{ __html: modifiedSvg }}
            />
          </div>
        </div>
      )}
    </>
  );
}
