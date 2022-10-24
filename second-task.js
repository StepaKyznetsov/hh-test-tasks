const readline = require('readline').createInterface(process.stdin, process.stdout);

let arr = [],
    i = 0;

readline.on('line', (line) => {
    arr.push(line.split(' ').map(s => +s));
    const n = arr[0][0]
    const m = arr[0][1]
    if(i == m) {
        const borderMap = arr.slice(1).map((arr) => [0, ...arr.slice(0, n), 0]);
        borderMap.unshift(new Array(borderMap[0].length).fill(0));

        let domainMarkCounter = 0;
        const neighborsMap = [];

        for (let y = 1; y < borderMap.length; y++){
            for (let x = 1; x < borderMap[y].length - 1; x++){
                let target = borderMap[y][x],
                    left = borderMap[y][x - 1],
                    leftTop = borderMap[y - 1][x - 1],
                    middleTop = borderMap[y - 1][x],
                    rightTop = borderMap[y - 1][x + 1],
                    upperNeighbors = []
                    upperNeighbors.push(leftTop, middleTop, rightTop);
                if (target === 1) {
                    if (left !== 0){
                        borderMap[y][x] = left;
                } else{
                    const color = upperNeighbors.find((top) => top !== 0);
                    borderMap[y][x] = color ? color : domainMarkCounter++;
                }
        
                let center = borderMap[y][x];
                if (rightTop !== 0 && rightTop !== center){
                    let detachedBranch = [];
                    const detachedBranchIndex = neighborsMap.findIndex((neighbors) => neighbors.has(rightTop));
                    if (detachedBranchIndex !== -1){
                        if (!neighborsMap[detachedBranchIndex].has(center)){
                            detachedBranch = neighborsMap.splice(detachedBranchIndex, 1)[0];
                        }
                    }
        
                    let colorsCore = neighborsMap.find((neighbors) => neighbors.has(center));
                    if (!colorsCore) {
                        colorsCore = new Set().add(center);
                        neighborsMap.push(colorsCore);
                    }
                    colorsCore.add(rightTop);
        
                    [...detachedBranch].forEach((color) => colorsCore.add(color));
                }
              }
            }
        }
        const colorAliases = neighborsMap.map(([main, ...neighbors]) => ({ main, neighbors }));
        
        const regions = Array(domainMarkCounter);
        for (let y = 1; y < borderMap.length; y++){
            for (let x = 1; x < borderMap[y].length - 1; x++){
                const target = borderMap[y][x];
                if (target === 0) continue;
        
                const colorAliase = colorAliases.find(({ neighbors }) => neighbors.includes(target));
                const color = colorAliase ? colorAliase.main : target;
                if (!regions[color]) {
                    regions[color] = {
                        minX: x,
                        maxX: x,
                        minY: y,
                        maxY: y,
                        power: 1,
                    };
                continue;
                }
                const region = regions[color];
                region.power += 1;
                if (region.minX > x) region.minX = x;
                if (region.maxX < x) region.maxX = x;
                if (region.minY > y) region.minY = y;
                if (region.maxY < y) region.maxY = y;
            }
        }
        
        const analytics = regions
        .filter((region) => region.power > 1)
        .map((region) => {
            let areaPower = 0;
            for (let y = region.minY; y <= region.maxY; y++){
                for (let x = region.minX; x <= region.maxX; x++){
                    borderMap[y][x] && areaPower++;
                }
            }
            return { area: (region.maxX - region.minX + 1) * (region.maxY - region.minY + 1), areaPower };
        })
        .map((region) => ({ ...region, soilQuality: region.areaPower / region.area, }))
        .sort((a, b) => {
            const soilQualityDiff = b.soilQuality - a.soilQuality;
            if (soilQualityDiff) return soilQualityDiff;
        
            const areaDiff = b.area - a.area;
            return areaDiff;
        });
        const [region] = analytics;
        console.log(region.area);
        readline.close();
    }
    i++;
}).on('close', () => process.exit(0));