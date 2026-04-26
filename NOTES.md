# Error Detector Client — Session Notes

## Project
Client-side React+TS+Vite+Tailwind app in `error-detector-client/`.
Ported from Flask/Python app in `error-detector-py-master/`.

## TODOs
- [x] 1. Check dev server runs correctly (`npm run dev` from `error-detector-client/`) — build confirmed working via CI
- [ ] 2. Check `errorData.ts` — review regex patterns and help messages for accuracy (user noted these may need fixing)
- [ ] 3. Check accuracy of error detection across all categories
- [ ] 4. Check regex patterns and feedback/help notes in `errorData.ts`
- [ ] 5. Add video links (YouTube IDs) to error entries in `errorData.ts`
- [ ] 6. Change icon set back to original (currently using lucide-react)

## Key files
- `src/errorData.ts` — all regex patterns and help text (port of `error_feedback.py`)
- `src/errorDetector.ts` — client-side regex matching logic
- `src/components/ErrorAnnotator.tsx` — annotated text with hover tooltips
- `src/App.tsx` — two-mode UI (input / output)

## Deployment
- GitHub Pages: deploys automatically on push to `main` via `.github/workflows/deploy.yml`
- `BASE_URL=/error-detector-compsci/` set in workflow env
- SVG logo: lives in `src/assets/tnt-logo.svg` (imported by Vite) + `public/tnt-logo.svg` (favicon only)
- `master` branch deleted; `main` is the only branch and default

## Notes
- Regex patterns are JS (double-escaped backslashes e.g. `\\s`, `\\W`)
- Video IDs are YouTube IDs — tooltip shows "Watch video" link opening `youtube.com/watch?v=ID`
- Category toggles on output page filter displayed errors without re-running detection
- Build: `npm run build` — confirmed working
