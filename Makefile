.PHONY: up down restart logs rebuild  # Обозначение "фейковых" целей, не связанных с файлами

up:                                   # Запустить контейнеры в фоновом режиме
	docker-compose up -d

down:                                 # Остановить и удалить контейнеры, сети и т.д.
	docker-compose down

restart:                              # Перезапустить контейнеры (down + up)
	docker-compose down && docker-compose up -d

logs:                                 # Показать логи всех сервисов в режиме реального времени
	docker-compose logs -f

rebuild:                              # Пересобрать образы без использования кэша
	docker-compose build --no-cache
