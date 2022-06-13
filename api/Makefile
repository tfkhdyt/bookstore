dev:
	@reflex -r ".go" -s go run .

build: 
	@rm -fr ./dist/* && \
	go build -o "./dist/bookstore-linux" . && \
	GOOS=windows go build -o "./dist/bookstore-windows.exe" . && \
	GOOS=darwin go build -o "./dist/bookstore-mac" .
