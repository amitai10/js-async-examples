var request = require('request');

function getUser() {
  var user;

  return new Promise(function(resolve, reject) {
    request('https://randomuser.me/api/', function(error, response, body) {
      user = body;

      resolve(user);
    });
  });
}

async function main() {
  getUser()
  .then(res => {
    var ret = JSON.parse(res);
    return ret;
  })
  .then(res => {
      console.log('The user is:', res['results'][0]['name']);
  });
}

main();
