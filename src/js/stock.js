const solutions = {

    // First attempt at algorithm, O(N) complexity by using best and candidate variables (Success 40%)
    get_max_profit_angelo1: (prices) => {

        let best = { buy: prices[0], sell: prices[1] };
        let candidate = { buy: prices[0], sell: prices[1] };

        for (var i = 0; i < prices.length; i++) {
            if (prices[i] < candidate.buy) {
                candidate.buy = prices[i];
                candidate.sell = -1;
            } else if (prices[i] > candidate.sell) {
                candidate.sell = prices[i]
            } else if ((candidate.sell - candidate.buy) > (best.sell - best.buy)) {
                best.sell = candidate.sell;
                best.buy = candidate.buy;
            }
        }
        return [best.buy, best.sell]
    },

    // Removed else statements to allow smaller datasets to work (Success ++)
    get_max_profit_FIXEDELSE: (prices) => {

        let best = { buy: prices[0], sell: prices[1] };
        let candidate = { buy: prices[0], sell: prices[1] };

        for (var i = 0; i < prices.length; i++) {
            if (prices[i] < candidate.buy) {
                candidate.buy = prices[i];
                candidate.sell = -1;
            } if (prices[i] > candidate.sell) {
                candidate.sell = prices[i]
            } if ((candidate.sell - candidate.buy) > (best.sell - best.buy)) {
                best.sell = candidate.sell;
                best.buy = candidate.buy;
            }
        }
        return [best.buy, best.sell]
    },

    // Used negative and positive infinity to reduce READs (Success =)
    get_max_profit_FIXEDELSE_INIT: (prices) => {

        let best = { buy: Number.POSITIVE_INFINITY, sell: Number.NEGATIVE_INFINITY };
        let candidate = { buy: Number.POSITIVE_INFINITY, sell: Number.NEGATIVE_INFINITY };

        for (var i = 0; i < prices.length; i++) {
            if (prices[i] < candidate.buy) {
                candidate.buy = prices[i];
                candidate.sell = Number.NEGATIVE_INFINITY;
            }

            if (prices[i] > candidate.sell) {
                candidate.sell = prices[i]
            }

            if ((candidate.sell - candidate.buy) > (best.sell - best.buy)) {
                best.sell = candidate.sell;
                best.buy = candidate.buy;
            }
        }
        return [best.buy, best.sell]
    },

    // Initialize to the first value then skip it during loop (Success --)
    get_max_profit_FIXEDELSE_INIT_2: (prices) => {


        let best = { buy: prices[0], sell: prices[1] };
        let candidate = { buy: Number.POSITIVE_INFINITY, sell: Number.NEGATIVE_INFINITY };

        for (var i = 1; i < prices.length; i++) {
            if (prices[i] < candidate.buy) {
                candidate.buy = prices[i];
                candidate.sell = Number.NEGATIVE_INFINITY;
            }

            if (prices[i] > candidate.sell) {
                candidate.sell = prices[i]
            }

            if (
                (candidate.sell - candidate.buy) > (best.sell - best.buy)
                && (candidate.buy !== candidate.sell)
            ) {
                best.sell = candidate.sell;
                best.buy = candidate.buy;
            }
        }
        return [best.buy, best.sell]
    },

    // Use profit % ratio to determine if case is better instead of just absolute price diff
    // This makes sense !!IF!! you would prefer to make a higher % yeild from invested ($1-2 = 100%) than absolute yield($1000-$1001 1%)
    get_max_profit_FIXEDELSE_INIT_2_DIV: (prices) => {

        let best = { buy: prices[0], sell: prices[1] };
        let candidate = { buy: Number.POSITIVE_INFINITY, sell: Number.NEGATIVE_INFINITY };

        for (var i = 0; i < prices.length; i++) {
            if (prices[i] < candidate.buy) {
                candidate.buy = prices[i];
                candidate.sell = Number.NEGATIVE_INFINITY;
            }

            if (prices[i] > candidate.sell) {
                candidate.sell = prices[i]
            }

            if (
                (candidate.sell / candidate.buy) > (best.sell / best.buy)
                && (candidate.buy !== candidate.sell)
            ) {
                best.sell = candidate.sell;
                best.buy = candidate.buy;
            }
        }
        return [best.buy, best.sell]
    },

    best_price: require('./best_price').best_price


}

const prices_invalid = [
    {},
    null,
    ["x"],
    ["x", "y"],
    ["x", "x"],
    [1, "x"],
    ["x", 1],
    [],
    [null, null],
    [1, 2, null],
    [1, null, 3],
];

const generated_data = require("./full_day_random");

const testCases = {
    "basic": {
        input: [10, 7, 12, 5, 8, 11, 9],
        expected: [5, 11]
    },
    "mini": {
        input: [10, 7, 12],
        expected: [7, 12]
    },
    "ascending": {
        input: [1, 2, 3, 4, 5],
        expected: [1, 5]
    },
    "descending": {
        input: [5, 4, 3, 2, 1],
        expected: [5, 4]
    },
    "yield_test": {
        input: [100, 104, 1, 3], //Prefer 1-3 (+300%) over 100-104 (4%)
        expected: [1, 3]
    },
    "random_full_day": generated_data.data
};

const colours = { red: "\x1b[31m", green: "\x1b[32m", reset: "\x1b[0m" }

let stats = { success: 0, fail: 0 }

const validateResult = (testFunction, testCase, input, expected) => {
    try {
        const actual = testFunction(input);

        const success = expected[0] === actual[0] && expected[1] === actual[1];
        success ? stats.success++ : stats.fail++;
        console.log(
            success ? colours.green : colours.red, //Green valid, Red invalid
            testCase,
            `[ ${actual} ] ( $${Math.abs(actual[1] - actual[0])} , ${Math.round(Math.abs(actual[1] / actual[0] * 100))}% )`,
            `[ ${expected} ] ( $${Math.abs(expected[1] - expected[0])} , ${Math.round(Math.abs(expected[1] / expected[0] * 100))}% )`,
            colours.reset
        )
    } catch (exception) {
        console.log("Exception occurred", exception);
    }
}

function validateFunction(func) {
    const testFunction = func;
    for (const testcase in testCases) {
        validateResult(testFunction, testcase, testCases[testcase].input, testCases[testcase].expected);
    }
}

function checkInvalidCases(func) {
    for (invalidCase of prices_invalid) {
        try {
            const result = func(invalidCase);
            console.log(colours.red, "Did not throw for ", invalidCase, "with", result, result, colours.reset)
        } catch (exception) {

            console.log(colours.green, "Threw for ", invalidCase, "with", exception.message, colours.reset)
        }

    }
}

for (testcase in testCases) {
    const tcase = testCases[testcase];
    const min = tcase.input.reduce((prev, curr) => Math.min(prev, curr))
    const max = tcase.input.reduce((prev, curr) => Math.max(prev, curr))
    console.log(`Test: ${testcase} ${tcase.input.length} data points, min: ${min} max: ${max} expected: [${tcase.expected}]`)
}

for (solution in solutions) {
    console.log("Solution", solution);
    stats = { success: 0, fail: 0 } // Reset stats
    validateFunction(solutions[solution]);
    console.log(`${stats.success} passed, ${stats.fail} failed, ${stats.success / (stats.success + stats.fail) * 100} % success`)
    checkInvalidCases(solutions[solution])
    console.log("--");
}
