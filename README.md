# CEN3031group15

## Client

### Setup environment

1. Install nvm
2. Install npm with nvm
3. Intall quasar CLI
    - `npm install -g @quasar/cli`
4. Install JSON-Server  
    - `npm install -g json-server`
    - [More directions](https://www.npmjs.com/package/json-server01)
5. Install JSON Server Auth
    - `npm install -g json-server-auth`
    - [More directions](https://www.npmjs.com/package/json-server-auth)


### Start Client
From /client directory:
1. Start JSON server
    - `json-server-auth --watch db.json`
2. Start Quasar dev server
    - `quasar dev`

### Testing Client
### Cypress
- Install: `quasar ext add @quasar/testing-e2e-cypress`
- Docs: 
  - https://testing.quasar.dev/packages/e2e-cypress/
  - https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test
- Open Cypress: `npx cypress open`
- Run Cypress tests: `npx cypress run`


## Server

### Setup environment

### Start server