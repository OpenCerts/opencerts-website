sudo apt-get install -y xdg-user-dirs && \
npm run build:static && \
npm run integration:headless -- --app "npm run serve-static"