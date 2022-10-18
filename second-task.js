const readline = require('readline').createInterface(process.stdin, process.stdout);

let arr = [],
    i = 0;

readline.on('line', (line) => {
    arr.push(line.split(' ').map(s => +s));
    const numberOfLines = arr[0][1]
    if(i == numberOfLines) {
        const numbers = arr.slice(1)
        console.log(numbers);
        readline.close();
    }
    i++;
    
}).on('close', () => process.exit(0));