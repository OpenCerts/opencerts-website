npm run build:static && \
cp src/components/FramelessViewer/demo-iframe.html out/iframe.html && \
npm run integration:headless -- \
--app "npm run serve-static"
