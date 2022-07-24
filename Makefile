start-api: 
	@cd api && \
	reflex -g "*.go" -s -- go run .

start-web:
	@cd web && \
	pnpm dev

start-db:
	@doas systemctl start postgresql

stop-db:
	@doas systemctl stop postgresql

status-db:
	@systemctl status postgresql

build-linux: 
	@cd api && \
	go build -o bin/bookstore-linux .

build-windows:
	@cd api && \
	GOOS=windows go build -o bin/bookstore-windows.exe .

build-mac:
	@cd api && \
	GOOS=darwin go build -o bin/bookstore-mac .
