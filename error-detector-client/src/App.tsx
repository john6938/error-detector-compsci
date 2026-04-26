import { useState, useMemo } from 'react';
import { Upload } from 'lucide-react';
import { ErrorAnnotator } from './components/ErrorAnnotator';
import { detectErrors } from './errorDetector';
import { categoryMeta } from './errorData';
import type { CategoryId } from './types';

// ── Sample text demonstrating multiple error types ─────────────────────────────
const SAMPLE_TEXT = `This research aims to investigate the effects of sleep deprivation in university students. Unfortunately, a lot of the researches in this area is conducted on adult populations and doesn't consider younger groups. Clearly, this is a problem. I think this gap should be addressed.

The datas shows that students who sleep less than six hours perform bad on cognitive tasks. They analysis the results and found out that sleep has a direct effect. We can to see from these findings that each students need adequate rest. But this finding is not widely acknowledged.

It is said that students also needs good food and accommodation. Many researcher say this is due to the fact that nutrition and sleep are interdependent. Despite the fact that this relationship is obvious, it have been largely ignored. And this is a concern for educators.

This paper has the following objectives: to identify the main way sleep affects performance, to discuss about potential interventions, and to suggest whether or not universities should provide resources. So the implications are significant for policy makers.`;

type Mode = 'input' | 'output';

const ALL_CATEGORIES: CategoryId[] = [
  'accuracy',
  'brevity',
  'clarity',
  'objectivity',
  'formality',
];

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState<Mode>('input');
  const [text, setText] = useState('');
  const [enabledCategories, setEnabledCategories] = useState<Set<CategoryId>>(
    new Set(ALL_CATEGORIES),
  );

  const matches = useMemo(
    () => (mode === 'output' && text.trim() ? detectErrors(text) : []),
    [mode, text],
  );

  const errorCount = useMemo(
    () => matches.filter(m => enabledCategories.has(m.categoryId)).length,
    [matches, enabledCategories],
  );

  const toggleCategory = (id: CategoryId) => {
    setEnabledCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'text/plain') return;
    const reader = new FileReader();
    reader.onload = ev => setText(ev.target?.result as string);
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAnalyse = () => {
    if (text.trim()) setMode('output');
  };

  // ── Input mode ───────────────────────────────────────────────────────────────
  if (mode === 'input') {
    return (
      <div className="min-h-full flex items-start justify-center bg-gray-50 p-3 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-5 sm:p-8 my-4">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-11 h-11 shrink-0 rounded flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: '#5a7abf' }}
            >
              ED
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-tight text-gray-900">
                Error Detector
              </h1>
              <p className="text-sm text-gray-500">
                Check scientific writing for accuracy, brevity, clarity, objectivity and formality
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2 flex-wrap mb-3">
            <label className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-600 transition">
              <Upload size={15} />
              Upload .txt
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setText(SAMPLE_TEXT)}
              className="px-3 py-2 bg-purple-100 text-purple-700 text-sm rounded-lg hover:bg-purple-200 transition"
            >
              Load sample
            </button>
            <button
              onClick={() => { setText(''); }}
              className="px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition"
            >
              Clear
            </button>
          </div>

          {/* Textarea */}
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Paste your text here, upload a .txt file, or click 'Load sample'…"
            rows={12}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-base font-serif leading-relaxed"
          />

          {/* Analyse button */}
          <button
            onClick={handleAnalyse}
            disabled={!text.trim()}
            className="mt-3 w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition text-base"
          >
            Analyse Text
          </button>

          {/* Category colour key */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
              Checks performed
            </p>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map(id => {
                const meta = categoryMeta[id];
                const Icon = meta.Icon;
                return (
                  <span
                    key={id}
                    style={{ backgroundColor: meta.bgColor, borderBottom: `2px solid ${meta.accentColor}` }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-gray-800"
                  >
                    <Icon size={11} style={{ color: meta.accentColor }} />
                    {meta.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
            <p>John Blake, University of Aizu &copy; 2024</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Output mode ──────────────────────────────────────────────────────────────
  return (
    <div className="h-full flex flex-col bg-gray-50">

      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shrink-0">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto gap-3 flex-wrap">

          {/* Left: logo + title */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: '#5a7abf' }}
            >
              ED
            </div>
            <span className="font-semibold text-gray-900 hidden sm:block">
              Error Detector
            </span>
            <span className="text-xs text-gray-400">
              {errorCount} potential {errorCount === 1 ? 'issue' : 'issues'} found
            </span>
          </div>

          {/* Centre: category toggles */}
          <div className="flex items-center gap-1 flex-wrap">
            {ALL_CATEGORIES.map(id => {
              const meta = categoryMeta[id];
              const Icon = meta.Icon;
              const active = enabledCategories.has(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleCategory(id)}
                  title={active ? `Hide ${meta.label} checks` : `Show ${meta.label} checks`}
                  style={
                    active
                      ? { backgroundColor: meta.bgColor, borderColor: meta.accentColor, color: '#333' }
                      : { backgroundColor: '#f3f4f6', borderColor: '#d1d5db', color: '#9ca3af' }
                  }
                  className="inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium transition-colors"
                >
                  <Icon size={11} />
                  <span className="hidden sm:inline">{meta.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setMode('input')}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition"
            >
              Edit text
            </button>
          </div>
        </div>
      </header>

      {/* Colour legend strip */}
      <div className="bg-white border-b border-gray-100 px-4 py-2 shrink-0">
        <div className="flex items-center gap-3 flex-wrap max-w-screen-xl mx-auto">
          {ALL_CATEGORIES.map(id => {
            const meta = categoryMeta[id];
            const Icon = meta.Icon;
            return (
              <span
                key={id}
                style={{ backgroundColor: meta.bgColor, borderBottom: `2px solid ${meta.accentColor}` }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium text-gray-800"
              >
                <Icon size={10} style={{ color: meta.accentColor }} />
                {meta.label}
              </span>
            );
          })}
          <span className="ml-auto text-xs text-gray-400 hidden sm:block">
            Hover over highlighted text for feedback
          </span>
        </div>
      </div>

      {/* Annotated text */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-screen-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-8">
          {enabledCategories.size === 0 ? (
            <p className="text-gray-400 text-sm italic">
              All categories are hidden. Enable at least one category to see feedback.
            </p>
          ) : (
            <ErrorAnnotator
              text={text}
              matches={matches}
              enabledCategories={enabledCategories}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-4 py-2 text-center text-xs text-gray-400 shrink-0">
        John Blake, University of Aizu &copy; 2024
      </footer>
    </div>
  );
}
