exports.best_price =
    (prices) => {

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
