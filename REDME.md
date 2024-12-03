# Проект Stock and History Services

Данный проект представляет собой систему управления складами и логирования изменений на складе. Он состоит из двух сервисов: **Stock Service** и **History Service**, которые взаимодействуют друг с другом через API. Оба сервиса используют PostgreSQL для хранения данных.

## Требования

Перед запуском приложения убедитесь, что на вашем компьютере установлены следующие инструменты:

- [Docker](https://www.docker.com/products/docker-desktop) (Docker Desktop для Mac/Windows или Docker Engine для Linux)
- [Docker Compose](https://docs.docker.com/compose/) (обычно включен в Docker)

## Шаги для настройки проекта

### 1. Сделайте скрипт исполнимым

Настройка включает запуск скрипта, который строит и разворачивает Docker контейнеры, применяет миграции и заполняет базы данных.

Для запуска скрипта необходимо находится в корневой директории, сначала убедитесь, что у скрипта есть необходимые разрешения:

```bash
chmod +x scripts/migrate-and-seed.sh
```

### 2. Запустите скрипт настройки

Теперь можно запустить скрипт для сборки образов, применения миграций и запуска контейнеров:

```bash
./scripts/migrate-and-seed.sh
```

Скрипт выполнит следующие действия:

+ Соберет Docker контейнеры и запустит их в фоновом режиме.
+ Подождет, пока базы данных будут готовы.
+ Применит миграции для stock-service и history-service.
+ Заполнит базу данных stock-service начальными данными.
+ Запустит приложение.

## Описание проекта
### Проект состоит из двух сервисов:

#### Stock Service (stock-service)
+ Управляет продуктами на складе.
+ Включает создание продуктов, управление количествами на складе и взаимодействие с history-service для логирования действий со складом.
#### History Service (history-service)
+ Логирует действия, связанные с изменениями на складе, такие как создание склада, увеличение или уменьшение количества товаров.
+ Отслеживает историю изменений для каждого товара на складе.
#### Оба сервиса используют базы данных PostgreSQL:
+ stock_db для управления продуктами.
+ history_db для отслеживания действий, связанных с товарами на складе.

## API
### Stock-Service API
#### 1. POST /api/products - Создать продукт
   Тело запроса:
   ```json
{
     "plu": "12345",
     "name": "Product Name"
}
```
#### Ответ:
```json
{
  "id": 1,
  "plu": "12345",
  "name": "Product Name"
}
```

### 2. POST /api/stocks - Создать склад
#### Тело запроса:
```json
{
  "productId": 1,
  "quantityOnShelf": 100,
  "quantityInOrder": 50,
  "shopId": 1
}
```
#### Ответ:
```json
{
  "id": 1,
  "productId": 1,
  "quantityOnShelf": 100,
  "quantityInOrder": 50,
  "shopId": 1
}
```

При создании склада автоматически отправляется запрос в history-service для логирования этого события.

### 3. POST /api/stocks/increase - Увеличить количество на складе
#### Тело запроса:
```json
{
  "productId": 1,
  "quantity": 20,
  "shopId": 1
}
```
#### Ответ:
```json
{
  "id": 1,
  "productId": 1,
  "quantityOnShelf": 120,
  "quantityInOrder": 50,
  "shopId": 1
}
```
### 4. POST /api/stocks/decrease - Уменьшить количество на складе
#### Тело запроса:
```json
{
  "productId": 1,
  "quantity": 10,
  "shopId": 1
}
```
#### Ответ:
```json
{
  "id": 1,
  "productId": 1,
  "quantityOnShelf": 110,
  "quantityInOrder": 50,
  "shopId": 1
}
```
### 5. GET /api/action-history - Получить историю действий
#### Параметры запроса:
+ shopId (необязательно)
+ plu (необязательно)
+ action (необязательно)
+ dateFrom (необязательно)
+ dateTo (необязательно)
+ page (необязательно, по умолчанию 1)
+ pageSize (необязательно, по умолчанию 10)
## History-Service API
### 1. POST /api/products - Создать продукт (History Service)
#### Тот же запрос, что и в stock-service.

### 2. POST /api/stocks - Создать склад (History Service)
#### Тот же запрос, что и в stock-service.

### 3. POST /api/stocks/increase - Увеличить количество на складе (History Service)
#### Тот же запрос, что и в stock-service.

### 4. POST /api/stocks/decrease - Уменьшить количество на складе (History Service)
#### Тот же запрос, что и в stock-service.

### 5. POST /api/log-action - Логировать действие
#### Тело запроса:
```json
{
  "productId": 1,
  "shopId": 1,
  "plu": "12345",
  "action": "Stock Increased"
}
```
#### Ответ:
```json
{
  "id": 1,
  "productId": 1,
  "shopId": 1,
  "plu": "12345",
  "action": "Stock Increased",
  "createdAt": "2024-12-03T12:00:00Z"
}
```

### 6. GET /api/action-history - Получить историю действий
#### Тот же запрос, что и в stock-service.

## Взаимодействие сервисов
```stock-service``` и ```history-service``` связаны между собой. Когда происходит действие с товаром на складе (например, создание склада, увеличение или уменьшение количества), ```stock-service``` отправляет запрос в ```history-service``` для логирования этого действия.
#### Пример:
+ Когда создается склад через ```stock-service``` по эндпоинту ```/api/stocks```, ```history-service``` получает запрос по эндпоинту ```/api/log-action``` для логирования создания товара.