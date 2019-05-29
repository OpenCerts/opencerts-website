npm run build:static && \
npm run integration:headless -- \
--app "npx concurrently 'npm run serve-static' 'npm run serve-iframe'"
