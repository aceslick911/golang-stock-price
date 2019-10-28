# Build container
FROM golang:latest AS build
WORKDIR /go/src/app
COPY . /go/src/app
RUN CGO_ENABLED=0 GOOS=linux go build -o bin/lattitude src/go/stock.go
RUN go test ./... 
RUN go test ./... --coverprofile out/coverage.dat 
RUN go tool cover -html=out/coverage.dat -o out/cover.html

# Run container
FROM alpine
COPY --from=build /go/src/app /go/src/app
CMD ["/go/src/app/bin/lattitude"]
