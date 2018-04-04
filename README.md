# Certificate Web UI

[![Build Status](https://travis-ci.org/GovTechSG/certificate-web-ui.svg?branch=master)](https://travis-ci.org/GovTechSG/certificate-web-ui)

See also:

* [certificate-schema](https://github.com/GovTechSG/certificate-schema)
* [certificate-contract](https://github.com/GovTechSG/certificate-contract)
* [certificate-cli](https://github.com/GovTechSG/certificate-cli)

## Development

```bash
yarn
yarn dev
yarn lint

yarn start # serves the ui
```

### Setting up web3

If your browser has injected web3 (ie. through Metamask), the application will connect to the injected web3 and will be on the network that provider is connected to. Otherwise, the application will attempt to connect to the local Ethereum node at port `9545`.

Setup 1:

- Install Metamask
- Run Ganache CLI/UI
- Connect Metamask to Ganache

Setup 2:

- Run Ganache CLI/UI on port `9545`
