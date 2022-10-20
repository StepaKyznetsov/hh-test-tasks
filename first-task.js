const readline = require('readline').createInterface(process.stdin, process.stdout);

let arr = [],
    i = 0;

readline.on('line', (line) => {
    arr.push(line.split(' ').map(s => s!=='-' ? +s : s));
    const numberOfLines = Math.max(arr[0][0], arr[0][1]);
    const S = arr[0][2];
    if(i == numberOfLines) {
        const numbers = arr.slice(1).flat();
        let n = [],
            m = [];
        numbers.forEach((item, i) => (i % 2 == 0) ? n.push(item) : m.push(item));
        const firstArr = n.filter(e => e !== '-'); //итоговые массивы для работы
        const secondArr = m.filter(e => e !== '-');

        let currentSum = 0,  //текущая сумма элементов
            firstCount = 0,  //текущий счетчик обхода по первому массиву
            interimResult = 0,  //промежуточный результат
            result = 0;  //ответ

        while((currentSum < S) && (firstCount < firstArr.length)){
            if((firstArr[firstCount] + currentSum) <= S){
                currentSum += firstArr[firstCount];
                ++interimResult;
            } else break;
            ++firstCount;
        }
            
        if (firstCount > 0) firstCount -= 1;
        result = interimResult;
        
        for(let i=0; i < secondArr.length; i++){
            if((secondArr[i] + currentSum) <= S){
                currentSum += secondArr[i];
                ++interimResult;
            } 
            else {
                while(((secondArr[i] + currentSum) >= S) && (firstCount > 0)){
                    currentSum -= firstArr[firstCount];
                    --firstCount;
                    --interimResult;
                }
                if((secondArr[i] + currentSum) <= S){
                    currentSum += secondArr[i];
                    ++interimResult;
                }
                else break;
            }
            if(interimResult > result) result = interimResult;
        }   
        console.log(result);
        readline.close();
    }
    i++;
}).on('close', () => process.exit(0));
