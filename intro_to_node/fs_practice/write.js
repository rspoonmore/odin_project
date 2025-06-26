const fs = require('node:fs');

const content = 'Some content!';

fs.writeFile('fs_practice/test.txt', content, {flag: 'a'}, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('file written successfully')
  }
});
