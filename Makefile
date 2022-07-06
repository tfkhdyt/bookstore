start-api: 
	@cd ./api && \
	make dev

start-web:
	cd ./web && \
	pnpm dev

start-db:
	doas systemctl start postgresql

stop-db:
	doas systemctl stop postgresql

status-db:
	systemctl status postgresql