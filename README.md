## Setup

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate (this imports schema)
```

## Run service offline

```bash
serverless offline start
```

### Create a Rating

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/ratings --data '{ "rating": 1, "rater": 500, "rated": 600 }'
```

Example Result:
```bash
{{"id":"9bea8c90-0e3b-11e9-82d5-0d95223f4566","rating":1,"rater":500,"rated":600,"createdAt":1546398479321,"updatedAt":1546398479321}
```

### List all Ratings

```bash
curl -H "Content-Type:application/json" http://localhost:3000/ratings
```

Example output:
```bash
[{"rating":1,"rated":600,"createdAt":1546398479321,"id":"9bea8c90-0e3b-11e9-82d5-0d95223f4566","rater":500,"updatedAt":1546398479321}]
```

### Get one Rating

```bash
# Replace the <id> part with a real id from your ratings table
curl -H "Content-Type:application/json" http://localhost:3000/ratings/<id>
```

Example Result:
```bash
{"rating":1,"rated":600,"createdAt":1546398479321,"id":"9bea8c90-0e3b-11e9-82d5-0d95223f4566","rater":500,"updatedAt":1546398479321}
```

### Update a Rating

```bash
# Replace the <id> part with a real id from your ratings table
curl -X PUT -H "Content-Type:application/json" http://localhost:3000/ratings/<id> --data '{ "rating": 1, "rater": 500, "rated": 600 }'
```

Example Result:
```bash
{"rated":600,"rating":1,"id":"9bea8c90-0e3b-11e9-82d5-0d95223f4566","rater":500,"updatedAt":1546399616013}
```

### Delete a Rating

```bash
# Replace the <id> part with a real id from your ratings table
curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/ratings/<id>
```
