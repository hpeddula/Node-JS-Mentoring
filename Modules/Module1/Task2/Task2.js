
const csv = require('csvtojson');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
console.log(path.join(__dirname, '../nodejs-hw1-ex1.csv'));
const csvFilePath = path.join(__dirname, '../nodejs-hw1-ex1.csv');
const os = require('os');

const convertToJSON = () => {
    return new Promise((resolve, reject) => {
        csv({ignoreEmpty:true,downstreamFormat:'line'})
            .fromFile(csvFilePath)
            .then((jsonObj) => {
                fs.writeFile(path.join(__dirname, '../Output.json'), JSON.stringify(jsonObj), (err) => {
                    if (err) {
                        reject(403)
                    }
                    resolve(200)
                })
            })
            .catch(() => {
                reject(403)
            })
    })
}

const writeToTextFile = async () => {
    const response = await convertToJSON();
    if (response === 200) {
        const fileStream = fs.createReadStream(path.join(__dirname, '../Output.json'));
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            const data = JSON.parse(line);
            for(d of data) {
                console.log(JSON.stringify(d))
            fs.appendFile(path.join(__dirname, '../nodejs-hw1-ex2.txt'), JSON.stringify(d) + os.EOL, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        }
    }
}
const main = async () => {
    await writeToTextFile();
}
main();