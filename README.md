# Requirements

- Create an API that takes a random ID and increments a number in a db against that ID. If the current number against that ID is even, it will add 3 to the number, otherwise, it will add 1 to the number.
- While that is happening, a cron job should go through all the existing IDs and remove IDs that have a count of greater than 10 and are currently an even number (including 10).
- Write tests to make sure your API and cronjob work


Cron job - 10s interval


API

/do-stuff-with-id ( takes random_id as input)
    returns the value? TBD

Data<Key, Value> key=string:0-100, value = number


## Database Schema

### Table `values`

| column | type |
| id     | int  |


## TODO

- DO cronjob
- Handle case for inserting into db where row for id does not exist

## Run

```bash
docker-compose build
docker compose up
```

## Test api

```curl
curl -X POST http://localhost:8000/do-stuff -H 'Content-Type: application/json' -d "{\"id\": \"test_rec\"}"
{"success":true,"result":21}

# or set environment variables for DB_USERNAME, DB_PASSWORD and DB_DATABASE
# then
npx jest

```
