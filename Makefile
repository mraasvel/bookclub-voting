DB := postgres
BACKEND := bookclub-voting-backend
FRONTEND := bookclub-voting-frontend

up:
	docker-compose up --build

build:
	docker-compose build

clean:
	docker-compose down

fclean:
	docker-compose down
	docker volume prune -y

exec_db:
	docker exec -it $(DB) bash

exec_be:
	docker exec -it $(BACKEND) bash

exec_fe:
	docker exec -it $(FRONTEND) bash


