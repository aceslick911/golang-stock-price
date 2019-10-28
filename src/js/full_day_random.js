const tradingStart = new Date("2019-10-26 10:00:00");
const tradingEnd = new Date("2019-10-26 17:00:00");
const secondsTrading = Number(tradingEnd - tradingStart) / 1000;
const minutesTrading = secondsTrading / 60;

const priceQuantity = minutesTrading;

let lastVal = 20;
const maxVariance = 2;

const fs = require('fs')

const saved_data_file = './src/js/full_day_random.json'

const generate_new_data = false // False will use the json file saved, true will generate a new random walk

exports.data = {

    input:
        (
            generate_new_data ?
                new Array(priceQuantity).fill(0).map(val => lastVal = Math.max(1, Math.round(lastVal + (Math.random() * maxVariance * 2 - maxVariance))))
                :
                JSON.parse(fs.readFileSync(saved_data_file))
        ),
    expected: [1, 16], //Needs to be manually set
}

if (generate_new_data) {
    fs.writeFileSync(saved_data_file, JSON.stringify(exports.data.input, null, 4))
}

const asciichart = require('asciichart')
// Must have screen with of 420 characters to view this graph (with small text size)
console.log(asciichart.plot(exports.data.input))