- Install Strongloop `npm install -g loopback-cli`
- Create new Loopback application by `lb`
  - api-server

- Add `loopback-starter-pack` to `package.json`:
  - "loopback-starter-pack": "git+https://github.com/calleboketoft/loopback-starter-pack.git"

- modify the file `server/model-config.json` so that the following models are set as `public`:
  - ACL
  - RoleMapping
  - Role

- Create the loopback model ExtUser
- lb:model
  - Name: ExtUser
  - db: memory
  - base class: User
  - expose via REST: yes
  - custom plural: no
  - server only

- modify the file `server/models/ext-user.js`:

```javascript
'use strict'

let app = require('../../server/server')
let lbStarterPack = require('loopback-starter-pack')

module.exports = function(Extuser) {
  lbStarterPack.myAuthorizationsEndpoint (app, Extuser)
}
```

- Add the boot-script `init-acl-common.js`:

```javascript
'use strict'

let lbStarterPack = require('loopback-starter-pack')

module.exports = function (app) {
  lbStarterPack.initAclCommon(app)
}
```
