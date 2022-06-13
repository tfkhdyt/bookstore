dev:
	@reflex -r ".go" -s go run .

build: 
	@rm -fr ./dist/* && \
	go build -o "./dist/linux" . && \
	GOOS=windows go build -o "./dist/windows.exe" . && \
	GOOS=darwin go build -o "./dist/mac" .
