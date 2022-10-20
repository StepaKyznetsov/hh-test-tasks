const readline = require('readline').createInterface(process.stdin, process.stdout);

let arr = [],
    i = 0;

readline.on('line', (line) => {
    arr.push(line.split(' ').map(s => +s));
    const n = arr[0][0];
    const m = arr[0][1];
    if(i == m) {
        let squaresArr = [];
        let effectivityArr = [];
        const numbers = arr.slice(1);
        console.log(numbers)
        let regionNumber = 2;
        for(let i = 0; i < n; i++){
            for(let j = 0; j < m; j++)
                if (numbers[i][j] == 1){
                    neighbors(numbers, n, m, i, j, regionNumber);
                    regionNumber++;
                }
        }
        for(let k = 2; i < regionNumber; i++){
            let top = 0, 
                bottom = 0, 
                left = 0, 
                right = 0,
                first = true;
            for (let i = 0; i < m; i++){
                for (let j = 0; j < n; j++){
                    if (numbers[i][j] == k){
                        if (first) {
                            top = i;
                            bottom = i;
                            left = j;
                            right = j;
                            first = false;
                        } else {
                            top = Math.min(i, top);
                            bottom = Math.max(i, bottom);
                            left = Math.min(j, left);
                            right = Math.max(j, right);
                        }
                    }
                }
            }
        }
        let fertile = 0;
        let square = (bottom - top + 1) * (right - left + 1);
        for (let i = top; i <= bottom; i++){
            for (let j = left; j <= right; j++){
                if (numbers[i][j] > 0) fertile++;
            }
        }
        squaresArr.push(square);
        effectivityArr.push(fertile/square);


        console.log(squaresArr, effectivityArr);
        readline.close();
    }
    i++;
    
}).on('close', () => process.exit(0));

const neighbors = (arr, n, m, x, y, number) => {
    arr[x][y] = number;
    for(let i = Math.max(0, x-1); i <= Math.min(x+1, m-1); i++){
        for(let j = Math.max(0, y - 1); j <= Math.min(y + 1, n-1); j++){
            if(arr[i][j] == 1) neighbors(arr, n, m, i, j, number);
        }    
    }
}