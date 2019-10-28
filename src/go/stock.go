package main

const MaxInt = int(^uint(0) >> 1)
const MinInt = -MaxInt - 1

func get_max_profit(prices []int) []int {
	best_buy := prices[0]
	best_sell := prices[1]

	candidate_buy := MaxInt
	candidate_sell := MinInt

	for _, price := range prices {
		if price < candidate_buy {
			candidate_buy = price
			candidate_sell = MinInt
		}

		if price > candidate_sell {
			candidate_sell = price
		}

		if ((candidate_sell / candidate_buy) > (best_sell / best_buy)) && (candidate_buy != candidate_sell) {
			best_buy = candidate_buy
			best_sell = candidate_sell
		}
	}

	return []int{best_buy, best_sell}

}

func main() {
}
