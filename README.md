# Lattitude Stock Price Test
Angelo Perera

## Information
Languages used: Javascript, GoLang.

I've used javascript to quickly test some implementations of an algorithm then my goal is to write production quality code in goLang.

I first started with a simple O(N) implementation with:
- A single 1D loop of the prices array
- A `best` variable to store the best known buy and sell values
- A `candidate` variable to use the current price and test against the best variable

This algorithm was then improved by:
- Removing the "Else if" statement to allow compatibility with small datasets
- Initializing `candidate` and `best` varialbes to negative and positive infinity to remove total number of reads

I then noticed that in some cases since this is stock price movement, that I personally would prefer to get a higher % return on my investment rather than the same increase for a much more expensive stock.

Basically, I would prefer to:
- Buy a stock for $1 and sell for $2 ( Only $1 but %100 profit) RATHER THAN
- Buy a stock for $100 and sell for $104 ( $4 here but only 4% profit)

I created a random walk generator to assert my algorithms accuracy.

See screenshot below:
[![Javascript output text](img/javascript_test_output.png "Logo Title Text 1")](img/javascript_test_output.png)


Finally, the algorithm was re-written in goLang

## How to run

Node:
```
yarn install && yarn dev
```


GoLang:
```
go build -o bin/lattitude src/go/stock.go && bin/lattitude
```

For tests & coverage:
```
go test ./... && go test ./... --coverprofile out/coverage.dat && go tool cover -html=out/coverage.dat -o out/cover.html
```

Then open out/cover.html

Docker:

```
docker build --rm . -t stock
docker run -i --rm --name stock stock sh
```


## Tests
### basic
        input: [10, 7, 12, 5, 8, 11, 9],
        expected: [5, 11]
### mini 
        input: [10, 7, 12],
        expected: [7, 12]
    
### ascending 
        input: [1, 2, 3, 4, 5],
        expected: [1, 5]
    
### descending 
        input: [5, 4, 3, 2, 1],
        expected: [5, 4]
    
### yield_test 
        input: [100, 104, 1, 3], //Prefer 1-3 ($3 but +300%) over 100-104 ($4 but only 4%)
        expected: [1, 3]
    
## random_full_day
Used a random generator to create a [JSON of a full day trading](full_day_random.json)