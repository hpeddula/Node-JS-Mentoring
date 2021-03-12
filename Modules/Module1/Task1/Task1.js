const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the string to reverse ', (answer) => {
    const result = answer.split(' ').map(e => e.split('').reverse().join('')).reverse().join(' ')
    console.log('Results',result)
    rl.close();
  });