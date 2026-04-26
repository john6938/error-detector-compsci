# Error Detector Client — Session Notes

## Project
Client-side React+TS+Vite+Tailwind app in `error-detector-client/`.
Ported from Flask/Python app in `error-detector-py-master/`.

## TODOs
- [ ] 1. Check dev server runs correctly (`npm run dev` from `error-detector-client/`)
- [ ] 2. Check `errorData.ts` — review regex patterns and help messages for accuracy (user noted these may need fixing)

## Key files
- `src/errorData.ts` — all regex patterns and help text (port of `error_feedback.py`)
- `src/errorDetector.ts` — client-side regex matching logic
- `src/components/ErrorAnnotator.tsx` — annotated text with hover tooltips
- `src/App.tsx` — two-mode UI (input / output)

## Notes
- Regex patterns are JS (double-escaped backslashes e.g. `\\s`, `\\W`)
- Video IDs are YouTube IDs — tooltip shows "Watch video" link opening `youtube.com/watch?v=ID`
- Category toggles on output page filter displayed errors without re-running detection
- Build: `npm run build` — confirmed working
