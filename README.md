# Engineering Interview Question

## Programming Problem:

Your task is to build a POST web service that accepts a JSON value, computes and returns a result. Deliver the final endpoint for testing.

Endpoint: http://XXX/compute/<request_id>

Input POST Value:

```
{
  "timestamp": 1493758596,
  "data": [
    { "title": "Part 1", "values": [0, 3, 5, 6, 2, 9] },
    { "title": "Part 2", "values": [6, 3, 1, 3, 9, 4] }
  ]
}
```

The service shall take the array from Part 1 and subtract the values from Part 2, subtracting numbers that exist in the same index of the array. The final array is also the same size (6).

The return value will be a JSON document in the following format containing the resultant array and request ID.

Output:

```
{
  “request_id”: “<request_id>”,
  “timestamp”: 1493758596,
  “result”: { “title”: “Result”, “values”: […] }
}
```

## How to test:

```
$ curl -H "Content-Type: application/json" --data "{\"timestamp\": 1234567890, \"data\": [{\"values\": [1,2,3]}, {\"values\": [1,2,4]}, {\"values\": [1,2,0]}]}" https://fast-lowlands-16014.herokuapp.com/compute/1
```
