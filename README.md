add the file `common/models/ext-user.js`:

```javascript
let app = require('../../server/server')
let lbStarterPack = require('@calle/loopback-starter-pack')

module.exports = function(Extuser) {
  lbStarterPack.addMyAuthorizationsEndpoint (app, Extuser)
}
```

add the file `common/models/ext-user.json`

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