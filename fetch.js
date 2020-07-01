const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const link = process.argv[2];
const pathToWrite = process.argv[3];

request(link, (error, response) => {
  const body = response.body
  try {
    if (fs.existsSync(pathToWrite)) {
      rl.question("This file already exists, would you like to overwrite (Y/N)? ", (answer) => {
        if (answer === "Y") {
          fs.writeFile(pathToWrite, body, (err) => {
            if (err) throw err;
            console.log('The file has been overwritten!');
          })
        }
        rl.close();
      });
    } else {
      fs.writeFile(pathToWrite, body, (err) => {
        if (err) throw err;
        console.log('The file has been overwritten!');
      })
    }
  } catch (err) {
    console.error(err)
  }

});
