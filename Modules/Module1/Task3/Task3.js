
import csv from 'csvtojson';
import { createInterface } from 'readline';
import { writeFile, createReadStream, appendFile } from 'fs';
import { join } from 'path';
import { EOL } from 'os';
import { csvPath,jsonFile,txtFile } from './pathconstants';


// const csvPath = '../Module1/nodejs-hw1-ex1.csv';
// const jsonFile = './Output.json';
// const txtFile = './nodejs-hw1-ex2.txt';
const csvFilePath = join(__dirname,csvPath);


const convertToJSON = () => {
    return new Promise((resolve, reject) => {
        csv({ ignoreEmpty: true, downstreamFormat: 'line' })
            .fromFile(csvFilePath)
            .then((jsonObj) => {
                writeFile(join(__dirname,jsonFile), JSON.stringify(jsonObj), (err) => {
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
    try {
        const response = await convertToJSON();
        if (response === 200) {
            const fileStream = createReadStream(join(__dirname,jsonFile));
            const rl = createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            for await (const line of rl) {
                const data = JSON.parse(line);
                for (let d of data) {
                    console.log(JSON.stringify(d))
                    appendFile(join(__dirname,txtFile), JSON.stringify(d) + EOL, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            }
        }
    } catch (e) {
        console.log('Error', e)
    }
}
const main = async () => {
    await writeToTextFile();
}
main();