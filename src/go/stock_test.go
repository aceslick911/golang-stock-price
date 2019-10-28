package main

import (
	"testing"
)

func TestBestPrice(t *testing.T) {
	var prices = []int{10, 7, 12, 5, 8, 11, 9}
	result := get_max_profit(prices)
	if result[0] != 5 && result[1] != 11 {
		t.Errorf("Incorrect Result")
	}
}
