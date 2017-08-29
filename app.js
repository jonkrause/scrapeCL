const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const moment = require('moment');

const listArray = [];
const urlStart = 'https://detroit.craigslist.org'

request('https://detroit.craigslist.org/search/web', function (err, res, body) {

    if (!err && res.statusCode === 200) {
        console.log('scraping craigslist...');
        const $ = cheerio.load(body);
        $('.result-title').each(function () {
            let link = $(this).attr('href');
            let title = $(this).text();
            listArray.push(urlStart + link + '\n');
        });

        console.log(listArray);
        console.log(moment().format('YYYY-MM-DD-h:mma'));

        fs.writeFile(moment().format("YYYY-MM-DD-hhmma") + ".html", listArray, function (err) {
            if (err) throw err;
            console.log('file saved');
        });
    }
});
