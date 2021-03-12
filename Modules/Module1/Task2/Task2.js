const csvFilePath='../nodejs-hw1-ex1.csv';
const csv=require('csvtojson')
csv()
.fromFile('C:\\Users\\Harsha_Peddula\\Desktop\\Node JS Mentoring\\Modules\\Module1\\nodejs-hw1-ex1.csv')
.then((jsonObj)=>{
    console.log(jsonObj);
}).catch(err => console.log(err))