run:
	CompileDaemon -build="go run cmd/main.go" --command=./main
dev:
	go run cmd/main.go
migrate:
	go run config/database/migration/migrate.database.go
docker-build:
	docker build -t go-startup-image .
docker-run:
	docker run -p 8000:8000 go-startup-image
docker-compose:
	docker-compose up --build