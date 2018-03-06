# Certificate Web UI

## Setup

### Installing dependencies

```bash
yarn
```

### Setting up web3

If your browser has injected web3 (ie. through Metamask), the application will connect to the injected web3 and will be on the network that provider is connected to. Otherwise, the application will attempt to connect to the local ethereum node at port `9545`.

Setup 1: 

- Install Metamask
- Run Ganache CLI/UI
- Connect Metamask to Ganache

Setup 2:

- Run Ganache CLI/UI on port `9545`

## Running in development mode

```bash
yarn dev
```

## Running in production mode

```bash
yarn start
```

## Test

```bash
TBC
```
