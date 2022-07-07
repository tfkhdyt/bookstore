start-api: 
	@cd api && \
	reflex -r ".go" -s go run .

start-web:
	@cd web && \
	pnpm dev

start-db:
	@doas systemctl start postgresql

stop-db:
	@doas systemctl stop postgresql

status-db:
	@systemctl status postgresql

build: 
	@cd api && \
	rm -fr ./bin/* && \
	go build -o "./bin/bookstore-linux" . && \
	GOOS=windows go build -o "./bin/bookstore-windows.exe" . && \
	GOOS=darwin go build -o "./bin/bookstore-mac" .
