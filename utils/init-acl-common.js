var defaultUser = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'password',
  emailVerified: true,
  accessToken: 'biffMoneyZebra49Dolarx',
  ttl: 1209600
}

module.exports = (app, inputAdminUser) => {
  var User = app.models.ExtUser
  var ACL = app.models.ACL
  var Role = app.models.Role
  var RoleMapping = app.models.RoleMapping
  var AccessToken = app.models.AccessToken

  let defaultAdminUser = Object.assign({}, defaultUser, inputAdminUser)

  // If there are no users, create admin role and first user
  User.find(null, (err, res) => {
    if (err) return console.log(err)
    if (res.length === 0) {
      createFirstUser()
    }
  })

  // If there are no ACLs, restrict API for ACL, Role, and RoleMapping
  ACL.find(null, (err, res) => {
    if (err) return console.log(err)
    if (res.length === 0) {
      createFirstACLs()
    }
  })

  function createFirstUser() {
    User.create([defaultUser], (err, users) => {
      if (err) return console.log('%j', err)
      console.log(users)
      createAdminRoleAndAssignFirstUser(users)
      createDevAccessToken(users)
    })
  }

  function createAdminRoleAndAssignFirstUser(users) {
    //create the admin role
    Role.create({
      name: 'admin'
    }, (err, role) => {
      if (err) return console.log(err)
      console.log(role)
      //make calle an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users.find((user) => user.email === defaultUser.email).id
      }, (err, principal) => {
        if (err) return console.log(err)
        console.log(principal)
      })
    })
  }

  // For dev, the user will have an access token with a super long ttl
  function createDevAccessToken (users) {
    AccessToken.create({
      id: defaultUser.accessToken,
      ttl: defaultUser.ttl,
      userId: users.find((user) => user.email === defaultUser.email).id
    }, (err, accessToken) => {
      if (err) return console.log(err)
      console.log(accessToken)
    })
  }

  function createFirstACLs() {
    ACL.create([
      {
        'model': 'Role',
        'property': '*',
        'accessType': '*',
        'permission': 'DENY',
        'principalType': 'ROLE',
        'principalId': '$everyone'
      },
      {
        'model': 'Role',
        'property': '*',
        'accessType': '*',
        'permission': 'ALLOW',
        'principalType': 'ROLE',
        'principalId': 'admin'
      },
      {
        'model': 'RoleMapping',
        'property': '*',
        'accessType': '*',
        'permission': 'DENY',
        'principalType': 'ROLE',
        'principalId': '$everyone'
      },
      {
        'model': 'RoleMapping',
        'property': '*',
        'accessType': '*',
        'permission': 'ALLOW',
        'principalType': 'ROLE',
        'principalId': 'admin'
      },
      {
        'model': 'ACL',
        'property': '*',
        'accessType': '*',
        'permission': 'DENY',
        'principalType': 'ROLE',
        'principalId': '$everyone'
      },
      {
        'model': 'ACL',
        'property': '*',
        'accessType': '*',
        'permission': 'ALLOW',
        'principalType': 'ROLE',
        'principalId': 'admin'
      },
      {
        'model': 'ExtUser',
        'property': '*',
        'accessType': '*',
        'permission': 'DENY',
        'principalType': 'ROLE',
        'principalId': '$everyone'
      },
      {
        'model': 'ExtUser',
        'property': '*',
        'accessType': '*',
        'permission': 'ALLOW',
        'principalType': 'ROLE',
        'principalId': 'admin'
      },
      {
        'model': 'ExtUser',
        'property': 'myAuthorizations',
        'accessType': '*',
        'permission': 'ALLOW',
        'principalType': 'ROLE',
        'principalId': '$authenticated'
      },
      {
        'model': 'ExtUser',
        'property': 'getMyProfile',
        'accessType': '*',
        'permission': 'ALLOW',
        'principalType': 'ROLE',
        'principalId': '$authenticated'
      },
      {
        'model': 'ExtUser',
        'property': 'updateMyProfile',
        'accessType': '*',
        'permission': 'ALLOW',
        'principalType': 'ROLE',
        'principalId': '$authenticated'
      }
    ], (err, acls) => {
      if (err) return console.log(err)
      console.log(acls)
    })
  }
}
