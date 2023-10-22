run:
	CompileDaemon -build="go run cmd/main.go" --command=./main
dev:
	go run cmd/main.go
migrate:
	go run cmd/migrate/migrate.database.go
docker-build:
	docker build -t goperum-image .
docker-run:
	docker run -p 8000:8000 goperum-image
docker-compose:
	docker-compose up --build