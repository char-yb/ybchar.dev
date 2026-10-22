'use client';

import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchContentRef,
} from 'react-zoom-pan-pinch';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Maximize2,
  RefreshCw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

const PAN_STEP_PX = 80;
const ZOOM_STEP = 0.4;
const MIN_SCALE = 0.5;
const MAX_SCALE = 8;
const ANIMATION_MS = 200;

const CONTENT_STYLE: CSSProperties = { width: '100%' };
const INLINE_WRAPPER_STYLE: CSSProperties = { width: '100%' };
const EXPANDED_WRAPPER_STYLE: CSSProperties = { width: '100%', height: '100%' };

type DiagramViewerProps = {
  svg: string;
  bindFunctions?: (element: Element) => void;
};

export function DiagramViewer({ svg, bindFunctions }: DiagramViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const expand = () => {
    setIsExpanded(true);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <div className="my-6 overflow-hidden rounded-xl border border-fd-border bg-fd-card">
        <ZoomableDiagram svg={svg} bindFunctions={bindFunctions} onExpand={expand} />
      </div>
      <dialog
        ref={dialogRef}
        aria-label="다이어그램 크게 보기"
        onClose={() => setIsExpanded(false)}
        className="m-0 h-dvh max-h-none w-dvw max-w-none border-0 bg-fd-background p-0 text-fd-foreground backdrop:bg-black/60"
      >
        {isExpanded && (
          <ZoomableDiagram
            svg={svg}
            bindFunctions={bindFunctions}
            isExpanded
            onClose={() => dialogRef.current?.close()}
          />
        )}
      </dialog>
    </>
  );
}

type ZoomableDiagramProps = DiagramViewerProps & {
  isExpanded?: boolean;
  onExpand?: () => void;
  onClose?: () => void;
};

// 본문 안에서는 터치·휠 제스처를 꺼서 페이지 스크롤을 막지 않고, 크게 보기에서만 핀치·드래그를 켠다.
function ZoomableDiagram({ svg, bindFunctions, isExpanded = false, onExpand, onClose }: ZoomableDiagramProps) {
  const areGesturesDisabled = !isExpanded;
  // 본문에서는 리모컨 높이만큼 아래를 비워 처음 화면에서 그림이 리모컨에 가리지 않게 한다.
  const contentClass = isExpanded ? 'w-full' : 'w-full pt-4 pb-30';

  return (
    <TransformWrapper
      minScale={MIN_SCALE}
      maxScale={MAX_SCALE}
      centerOnInit
      panning={{ disabled: areGesturesDisabled }}
      wheel={{ disabled: areGesturesDisabled }}
      pinch={{ disabled: areGesturesDisabled }}
      doubleClick={{ disabled: areGesturesDisabled }}
    >
      {(controls) => (
        <div className={isExpanded ? 'relative h-full' : 'relative'}>
          <TransformComponent
            wrapperStyle={isExpanded ? EXPANDED_WRAPPER_STYLE : INLINE_WRAPPER_STYLE}
            contentStyle={CONTENT_STYLE}
          >
            <div
              className={contentClass}
              ref={(container) => {
                if (container) bindFunctions?.(container);
              }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </TransformComponent>
          <div className="absolute top-2 right-2">
            {onExpand && (
              <ToolButton label="크게 보기" onClick={onExpand}>
                <Maximize2 className="size-4" />
              </ToolButton>
            )}
            {onClose && (
              <ToolButton label="닫기" onClick={onClose}>
                <X className="size-4" />
              </ToolButton>
            )}
          </div>
          <DiagramRemote controls={controls} />
        </div>
      )}
    </TransformWrapper>
  );
}

type DiagramRemoteProps = {
  controls: ReactZoomPanPinchContentRef;
};

// 오른쪽 아래 리모컨. 가운데 십자는 이동, 오른쪽 열은 확대·축소, 가운데는 원래대로.
// 화살표는 보는 위치를 옮긴다. 위로 이동하면 그림의 윗부분이 보이도록 그림이 아래로 내려간다.
function DiagramRemote({ controls }: DiagramRemoteProps) {
  const panBy = (dx: number, dy: number) => {
    const { positionX, positionY, scale } = controls.instance.transformState;
    controls.setTransform(positionX + dx, positionY + dy, scale, ANIMATION_MS);
  };

  return (
    <div
      role="group"
      aria-label="다이어그램 이동과 확대"
      className="absolute right-2 bottom-2 grid grid-cols-3 gap-1"
    >
      <span aria-hidden />
      <ToolButton label="위로 이동" onClick={() => panBy(0, PAN_STEP_PX)}>
        <ChevronUp className="size-4" />
      </ToolButton>
      <ToolButton label="확대" onClick={() => controls.zoomIn(ZOOM_STEP, ANIMATION_MS)}>
        <ZoomIn className="size-4" />
      </ToolButton>
      <ToolButton label="왼쪽으로 이동" onClick={() => panBy(PAN_STEP_PX, 0)}>
        <ChevronLeft className="size-4" />
      </ToolButton>
      <ToolButton label="원래대로" onClick={() => controls.centerView(1, ANIMATION_MS)}>
        <RefreshCw className="size-4" />
      </ToolButton>
      <ToolButton label="오른쪽으로 이동" onClick={() => panBy(-PAN_STEP_PX, 0)}>
        <ChevronRight className="size-4" />
      </ToolButton>
      <span aria-hidden />
      <ToolButton label="아래로 이동" onClick={() => panBy(0, -PAN_STEP_PX)}>
        <ChevronDown className="size-4" />
      </ToolButton>
      <ToolButton label="축소" onClick={() => controls.zoomOut(ZOOM_STEP, ANIMATION_MS)}>
        <ZoomOut className="size-4" />
      </ToolButton>
    </div>
  );
}

type ToolButtonProps = {
  label: string;
  onClick: () => void;
  children: ReactNode;
};

function ToolButton({ label, onClick, children }: ToolButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex size-8 items-center justify-center rounded-md border border-fd-border bg-fd-card text-fd-muted-foreground shadow-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
    >
      {children}
    </button>
  );
}
