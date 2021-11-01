# Requirements

- Create an API that takes a random ID and increments a number in a db against that ID. If the current number against that ID is even, it will add 3 to the number, otherwise, it will add 1 to the number.
- While that is happening, a cron job should go through all the existing IDs and remove IDs that have a count of greater than 10 and are currently an even number (including 10).
- Write tests to make sure your API and cronjob work


Cron job - 10s interval


API

/do-stuff-with-id ( takes random_id as input)
    returns the value? TBD

Data<Key, Value> key=string | number, value = number

