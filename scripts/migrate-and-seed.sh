#!/bin/bash

docker-compose up --build -d

echo "Waiting for databases to be ready..."
sleep 20

docker-compose run --rm stock-service-migrations

docker-compose run --rm stock-service-seed

docker-compose run --rm history-service-migrations

docker-compose up -d
