- Install Strongloop `npm install -g strongloop`
- Create new Loopback application by `slc loopback`
  - api-server

- modify the file `server/model-config.json` so that the following models are set as `public`:
  - ACL
  - RoleMapping
  - Role

- add the file `common/models/ext-user.js`:

```javascript
let app = require('../../server/server')
let lbStarterPack = require('loopback-starter-pack')

module.exports = function(Extuser) {
  lbStarterPack.myAuthorizationsEndpoint (app, Extuser)
}
```

- add the file `common/models/ext-user.json`

```json
{
  "name": "ExtUser",
  "base": "User",
  "idInjection": true,
  "options": {
    "validateUpsert": true
  },
  "properties": {
    "firstName": {
      "type": "string"
    }
  },
  "validations": [],
  "relations": {},
  "acls": [],
  "methods": {}
}
```

- Add the boot-script `init-acl-common.js`:

```javascript
let lbStarterPack = require('loopback-starter-pack')

module.exports = function (app) {
  lbStarterPack.initAclCommon(app)
}
```