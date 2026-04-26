import { useState, useRef, useCallback, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import type { ErrorMatch, CategoryId } from '../types';
import { categoryMeta } from '../errorData';

interface Props {
  text: string;
  matches: ErrorMatch[];
  enabledCategories: Set<CategoryId>;
}

interface TooltipState {
  error: ErrorMatch;
  x: number;
  y: number;
  above: boolean;
}

type Segment =
  | { type: 'text'; content: string }
  | { type: 'error'; content: string; error: ErrorMatch };

function buildSegments(
  text: string,
  matches: ErrorMatch[],
  enabled: Set<CategoryId>,
): Segment[] {
  // Filter to enabled categories, then re-resolve overlaps
  const filtered = matches
    .filter(m => enabled.has(m.categoryId))
    .sort((a, b) => a.start - b.start);

  const nonOverlapping: ErrorMatch[] = [];
  let lastEnd = 0;
  for (const m of filtered) {
    if (m.start >= lastEnd) {
      nonOverlapping.push(m);
      lastEnd = m.end;
    }
  }

  const segments: Segment[] = [];
  let cursor = 0;
  for (const m of nonOverlapping) {
    if (m.start > cursor)
      segments.push({ type: 'text', content: text.slice(cursor, m.start) });
    segments.push({ type: 'error', content: text.slice(m.start, m.end), error: m });
    cursor = m.end;
  }
  if (cursor < text.length)
    segments.push({ type: 'text', content: text.slice(cursor) });
  return segments;
}

export function ErrorAnnotator({ text, matches, enabledCategories }: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const scheduleHide = useCallback(() => {
    clearHide();
    hideTimer.current = setTimeout(() => setTooltip(null), 250);
  }, [clearHide]);

  const handleSpanEnter = useCallback(
    (e: React.MouseEvent, error: ErrorMatch) => {
      clearHide();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const above = rect.top > 200;
      setTooltip({
        error,
        x: rect.left + rect.width / 2,
        y: above ? rect.top - 10 : rect.bottom + 10,
        above,
      });
    },
    [clearHide],
  );

  const segments = useMemo(
    () => buildSegments(text, matches, enabledCategories),
    [text, matches, enabledCategories],
  );

  if (matches.length === 0) {
    return (
      <div className="text-base leading-loose font-serif whitespace-pre-wrap select-text text-gray-800">
        {text}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="text-base leading-loose font-serif whitespace-pre-wrap select-text text-gray-800">
        {segments.map((seg, idx) => {
          if (seg.type === 'text') return <span key={idx}>{seg.content}</span>;

          const meta = categoryMeta[seg.error.categoryId];
          const Icon = meta.Icon;
          return (
            <span
              key={idx}
              style={{
                backgroundColor: meta.bgColor,
                borderBottom: `2px solid ${meta.accentColor}`,
              }}
              className="rounded px-0.5 cursor-pointer inline-flex items-baseline gap-0.5 font-medium"
              onMouseEnter={e => handleSpanEnter(e, seg.error)}
              onMouseLeave={scheduleHide}
            >
              <Icon
                size={11}
                style={{ color: meta.accentColor, flexShrink: 0, alignSelf: 'center' }}
              />
              <span>{seg.content}</span>
            </span>
          );
        })}
      </div>

      {/* Hover tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl max-w-sm"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: tooltip.above ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
            pointerEvents: 'auto',
          }}
          onMouseEnter={clearHide}
          onMouseLeave={scheduleHide}
        >
          {/* Category + subcategory label */}
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-1"
            style={{ color: categoryMeta[tooltip.error.categoryId].bgColor }}
          >
            {categoryMeta[tooltip.error.categoryId].label} &mdash;{' '}
            {tooltip.error.subcategoryId}: {tooltip.error.subcategoryTitle}
          </p>

          {/* Help text */}
          <p className="text-sm text-gray-100 leading-snug mb-2">
            {tooltip.error.help}
          </p>

          {/* Video link */}
          {tooltip.error.video && (
            <a
              href={`https://www.youtube.com/watch?v=${tooltip.error.video}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink size={11} />
              Watch video explanation
            </a>
          )}

          {/* Arrow */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-transparent ${
              tooltip.above
                ? 'bottom-0 translate-y-full border-t-8 border-t-gray-900'
                : 'top-0 -translate-y-full border-b-8 border-b-gray-900'
            }`}
          />
        </div>
      )}
    </div>
  );
}
