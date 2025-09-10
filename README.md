# Sravz Frontend Angular Codebase

This is the Angular frontend for the Sravz platform. It provides a modern, feature-rich UI for interacting with Sravz backend services.

## Features

- Angular 18+ with SCSS styling
- Ignite UI, Angular Material, Nebular, FontAwesome, Bootstrap, Chart.js, and more
- Modular architecture with feature modules for analytics, assets, portfolios, quotes, mutual funds, and more
- REST API and WebSocket integration
- Docker and Makefile support for local and containerized development
- Environment-based configuration (local, staging, production)
- E2E and unit testing setup

## Directory Structure

```
frontend-ng/
├── src/
│   ├── app/
│   ├── assets/
│   ├── content/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── Makefile
├── Dockerfile
├── README.md
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI (`npm install -g @angular/cli`)
- Docker (optional, for containerized builds)

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
ng serve --host 0.0.0.0 --disable-host-check
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any source files.

### Build

```bash
ng build --configuration=production
```
Build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

```bash
ng test
```
Executes unit tests via [Karma](https://karma-runner.github.io).

### Running E2E Tests

```bash
ng e2e
```
Executes end-to-end tests via [Protractor](http://www.protractortest.org/).

### Docker Usage

Build and run the app in a Docker container:

```bash
docker build -t sravz-frontend-ng .
docker run -p 4200:4200 sravz-frontend-ng
```

### Makefile Usage

The Makefile provides targets for install, build, and run (including Dockerized builds):

```bash
make install
make run
make build environment=production
```

## Main Dependencies

- @angular/core, @angular/material, @angular/cdk
- @infragistics/igniteui-angular, igniteui-angular-charts, igniteui-angular-maps
- @nebular/theme, @nebular/auth, @nebular/security
- @fortawesome/fontawesome, bootstrap, chart.js, rxjs, ngx-toastr, ng-select, ng-recaptcha, ngx-socket-io

## Environment Configuration

Edit files in `src/environments/` to set up local, staging, or production environments.

## Project Structure

- `src/app/` - Main application modules and components
- `src/assets/` - Static assets
- `src/content/` - CSS, fonts, images
- `src/environments/` - Environment-specific configs

## License
Sravz LLC
