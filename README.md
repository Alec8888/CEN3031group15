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
6. Install dotenv of environment variables
    - `npm install dotenv`
    - create a file called `.env` in the root directory and add the following line:
        - SUPABASE_KEY="supbase-key-here"
        - Get the supabase key [here](https://supabase.com/dashboard/project/preudbpdnhcigtnuiuit/settings/api).
    

### Start Client
From /client directory:
1. Start JSON server
    - Doesn't work with Cypress: `json-server-auth --watch db.json`
    - Does work with Cypress: `json-server-auth --watch db.json --host 0.0.0.0`
2. Start Quasar dev server
    - `quasar dev`
3. Start Quasar and JSON server
    - `npm run dev`
    - located in package.json

### Cypress Testing
#### Install 
- I ran this from /client `quasar ext add @quasar/testing-e2e-cypress`
- Docs: 
  - https://testing.quasar.dev/packages/e2e-cypress/
  - https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test
#### Run Tests
- Open Cypress: `npx cypress open`
- Run Cypress tests: `npx cypress run`


## Server

### Setup environment

### Start server