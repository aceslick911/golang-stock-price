package main

import (
	"fmt"
)

func get_max_profit(prices []int) []int {

	fmt.Println("Prices", prices)

	best_buy := prices[0]
	best_sell := prices[1]

	candidate_buy := 9999999 //math.Inf(1)
	candidate_sell := -1     //math.Inf(-1)

	for index, price := range prices {
		fmt.Println("price", price, index)

		if price < candidate_buy {
			candidate_buy = price
			candidate_sell = -1 //math.Inf(-1)
		}

		if price > candidate_sell {
			candidate_sell = price
		}

		if ((candidate_sell / candidate_buy) > (best_sell / best_buy)) && (candidate_buy != candidate_sell) {
			best_buy = candidate_buy
			best_sell = candidate_sell
		}
	}

	fmt.Println("Solution", best_buy, best_sell)

	return []int{best_buy, best_sell}

}

func main() {
	prices := []int{10, 7, 12, 5, 8, 11, 9}
	get_max_profit(prices)
}
