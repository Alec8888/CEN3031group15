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
Was able to run some tests with `quasar test --component cypress`.


Open Cypress: `npx cypress open`


## Server

### Setup environment

### Start server