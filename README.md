# Die even numbers

[![Coverage Status](https://coveralls.io/repos/github/Shidil/die-even-numbers/badge.svg?branch=main)](https://coveralls.io/github/Shidil/die-even-numbers?branch=main)

## Requirements

- Create an API that takes a random ID and increments a number in a db against that ID. If the current number against that ID is even, it will add 3 to the number, otherwise, it will add 1 to the number.
- While that is happening, a cron job should go through all the existing IDs and remove IDs that have a count of greater than 10 and are currently an even number (including 10).
- Write tests to make sure your API and cronjob work

Cron job - 10s interval

## API

POST `/do-stuff`  body: `{ id: string }` response: { success: boolean, result: number}`

## Database Schema

Data<Key, Value> key=string:0-100, value = number

### Table `values_rec`

| column | type |
|--------|------|
| id | varchar(10) |
| value | int |

## Project Structure

Package manager in use is [npm](https://npmjs.org)

```bash
├── api (api using express)
├── workers (cronjob tasks)
├── seed (database seed dumps)
├── shared (libraries)
```

## Run

```bash
docker-compose build
docker compose up

# test api
curl -X POST http://localhost:8000/do-stuff -H 'Content-Type: application/json' -d "{\"id\": \"test_rec\"}" # result 1

curl -X POST http://localhost:8000/do-stuff -H 'Content-Type: application/json' -d "{\"id\": \"test_rec\"}" # result 2

curl -X POST http://localhost:8000/do-stuff -H 'Content-Type: application/json' -d "{\"id\": \"test_rec\"}" # result 3
```

## Tests

```bash
# set environment variables for DB_USERNAME, DB_PASSWORD and DB_DATABASE
export DB_USERNAME=root
export DB_PASSWORD=<password>
export DB_DATABASE=<db-name>

# then run
npx jest
```

## TODO

- [x] Cron job to delete values that are >=10 and is even number (every 10 seconds)
- [x] Unit tests
- [ ] Handle concurrency in api calls
- [ ] Concurrency with cron job
- [ ] e2e tests for cron job
- [ ] use mocks for unit testing db module
