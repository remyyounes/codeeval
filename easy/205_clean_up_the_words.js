const fs = require('fs');

fs.readFileSync(process.argv[2]).toString().split('\n').forEach( line => {
  if (line !== '') {
    console.log(
      line
        .toLowerCase()
        .replace(/[^a-z\s]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      );
  }
});
