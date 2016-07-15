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
  var user = await getUser();
  var ret = JSON.parse(user);
  console.log('The user is:', ret['results'][0]['name']);
}

main();
