const express = require('express');
const fs = require('fs');
const app = express();
const moment = require('moment');

let logInfo;
let logJsonObj = [];

app.use((req, res, next) => {
    // write your logging code here
    logInfo = req.headers["user-agent"]
        + ',' + moment().format()
        + ',' + req.method
        + ',' + req.path
        + ',' + 'HTTP/' + req.httpVersion
        + ',' + res.statusCode;
        
        logObj = {
            "Agent": req.headers["user-agent"],
            "Time": moment().format(),
            "Method": req.method,
            "Resource": req.path,
            "Version": 'HTTP/' + req.httpVersion,
            "Status": res.statusCode
        };

        logJsonObj.push(logObj);

    fs.appendFile('log.csv', "\n" + logInfo, 'utf8',
        (err) => {
            if (err) throw err;
            // if no error
            console.log("logInfo is appended to file successfully.")
        });
        console.log(logInfo);
    next();
});

app.get('/', (req, res) => {
    // write your code to respond "ok" here
    res.status(200).send('Status: Ok');
});

app.get('/logs', (req, res) => {
    // write your code to return a json object containing the log data here
    console.log(logJsonObj);
    res.json(logJsonObj)
});

module.exports = app;
