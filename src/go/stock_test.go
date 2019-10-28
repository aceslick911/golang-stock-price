package main

import (
	"testing"
)

var test_basic = []int{10, 7, 12, 5, 8, 11, 9}
var test_basic_expected = []int{5, 11}

var test_mini = []int{10, 7, 12}
var test_mini_expected = []int{7, 12}

var test_ascending = []int{1, 2, 3, 4, 5}
var test_test_ascending_expected = []int{1, 5}

var descending = []int{5, 4, 3, 2, 1}
var test_descending_expected = []int{5, 4}

var yield_test = []int{100, 104, 1, 3}
var test_yield_test_expected = []int{1, 3}

func VerifyExpected(t *testing.T, input []int, expected []int) {
	result := get_max_profit(input)
	if !(result[0] == expected[0] && result[1] == expected[1]) {
		t.Errorf("Incorrect Result %d,%d expected %d,%d", result[0], result[1], expected[0], expected[1])
	}
}

func TestBestPrice(t *testing.T) {
	VerifyExpected(t, test_basic, test_basic_expected)
	VerifyExpected(t, test_mini, test_mini_expected)
	VerifyExpected(t, test_ascending, test_test_ascending_expected)
	VerifyExpected(t, descending, test_descending_expected)
	VerifyExpected(t, yield_test, test_yield_test_expected)
}
