# Nainital Tourism & Resource Monitor

Conference-ready React/Vite prototype.

## Run locally
1. Install Node.js (LTS).
2. Open this folder in a terminal.
3. Run `npm install`
4. Run `npm run dev`
5. Open the localhost URL Vite prints.

## Build for hosting
`npm run build`

Deploy the resulting `dist` folder to Vercel, Netlify, or another static host.

## Spatial integrity
The spatial page uses the validated aggregate results and analytical zones. It deliberately does NOT fabricate enterprise coordinates. Once the real GeoJSON is available, it can be connected to the Leaflet map without changing the reported statistics.
