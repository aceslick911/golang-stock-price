const prices = [10, 7, 12, 5, 8, 11, 9];

const solutions = {

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

    get_max_profit_FIXEDELSE_INIT_2: (prices) => {

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
                (candidate.sell - candidate.buy) > (best.sell - best.buy)
                && (candidate.buy !== candidate.sell)
            ) {
                best.sell = candidate.sell;
                best.buy = candidate.buy;
            }
        }
        return [best.buy, best.sell]
    },


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
    }


}

const prices_too_short = [1];
const prices_invalid = [
    {},
    null,
    ["x"],
    ["x", "y"],
    ["x", "x"],
    [1, "x"],
    ["x", 1],
    [null, null],
    [1, 2, null],
    [1, null, 3],
];

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
};

const validateResult = (testFunction, testCase, input, expected) => {
    const actual = testFunction(input);
    if (expected[0] === actual[0] && expected[1] === actual[1]) {
        console.log("\x1b[32m", testCase, "Valid solution", actual, expected, "\x1b[0m")
    } else {
        console.error("\x1b[31m", testCase, "Invalid solution", actual, "expected:", expected, "\x1b[0m");
    }
}

function validateFunction(func) {
    const testFunction = func;
    for (const testcase in testCases) {
        validateResult(testFunction, testcase, testCases[testcase].input, testCases[testcase].expected);
    }
}

for (solution in solutions) {
    console.log("Solution", solution);
    validateFunction(solutions[solution]);
    console.log("--");
}