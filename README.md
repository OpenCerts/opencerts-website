# Certificate Web UI

[![CircleCI](https://circleci.com/gh/OpenCerts/opencerts-website.svg?style=svg)](https://circleci.com/gh/OpenCerts/opencerts-website)

See also:

- [opencerts-documentation](https://github.com/OpenCerts/opencerts-documentation)
- [open-certificate](https://github.com/OpenCerts/open-certificate)
- [certificate-contract](https://github.com/OpenCerts/certificate-store-contract)
- [certificate-cli](https://github.com/OpenCerts/certificate-cli)

## Development

We develop primarily on a OS X / Linux environment so please lodge an issue if you are using Windows and find that you cannot successfully set up a local instance of this software.

### Developer CLI

There is a rudimentary interface for adding a new template for organisations that are doing it for the first time. (support for adding templates to existing organisations will come in a later release)

```bash
npm run dev-cli
```

### OS X / Linux

```bash
npm install
npm run dev
```

### Windows

For Windows you need to set up the toolchain for node-gyp before installing this repository, follow the instructions in https://github.com/nodejs/node-gyp#on-windows.

```bash
npm install
npm run dev
```

### Environmental Variables

`NET` is used for setting the default network, setting it to `mainnet` uses the public Ethereum network. If it is not set it defaults to Ropsten testnet

E.g:

```bash
NET=mainnet npm run dev
```

### Frameless Viewer

For embedded certificate rendering, we have provided a frameless view located at `/frameless-viewer`

More information at [opencerts-documentation](http://docs.opencerts.io/embedded_viewer.html)

### Troubleshooting

To enable debug logs in the browser, set `localStorage.debug="*"`

###### Module build failed

If you see module build failure message like:

```
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
ModuleBuildError: Module build failed (from ./node_modules/sass-loader/lib/loader.js):
Error: ENOENT: no such file or directory, scandir 'D:\opencerts-website\node_modules\node-sass\vendor'
at Object.readdirSync (fs.js:783:3)
```

Try running `npm rebuild`

### Integration tests

To run integration tests locally, make sure you run `npm run build:static` once to build the static site first. The e2e tests will then spin up a server based on the `out` folder in project root.
