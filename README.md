# Ordering Delivery API

### Description
Backend API for the Delivery Ordering System.

### Installation

- Clone API source code from git
- checkout to dev branch
- run npm install

  - ``` npm install ```
- create .env file in app root path
***Warning: We don't keep .env file on git repository***
- run npm run dev to start the server
  - ``` npm run dev ```


### Deploy
- Config the ecosystem.config.js
- Enable deploy key in gitlab
    - Settings -> Repository -> Deploy keys -> select key that want to deploy in *Privately accessible deploy keys* tab
- pm2 deploy ecosystem.config.js dev (or uat)