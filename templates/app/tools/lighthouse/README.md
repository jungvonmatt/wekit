# Lighthouse

Runs local Lighthouse audits and provides a NodeJS server using HTTPS, HTTP/2 and compression.

## Setup

### Install dependencies

```
npm install
```

### Create directories

```
mkdir cert reports
```

### Create SSL certificate

Create a locally-trusted development certificate with [mkcert](https://github.com/FiloSottile/mkcert).

#### macOS

```
brew install mkcert nss
mkcert -install
mkcert -cert-file 'cert/localhost.cert' -key-file 'cert/localhost.key' localhost
```

#### Windows

See [docs](https://github.com/FiloSottile/mkcert#windows).

## Usage

### Run server

```
npm run start
```

### Create new audit

```
npm run report
```

#### Use mobile config

```
npm run report:mobile
```

#### Use desktop config

```
npm run report:desktop
```
