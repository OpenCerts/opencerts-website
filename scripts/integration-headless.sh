if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sudo apt-get install -y xdg-user-dirs
fi
npm run build:static && \
npm run integration:headless -- --app "npm run serve-static"