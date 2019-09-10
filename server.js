const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const port = process.env.PORT || 3000

const resultReducer = (total, current, index) => {
  let totalVals = total.values || [] // TODO: validate input values
  let currentVals = current.values || []

  return {
    title: "Result",
    values: totalVals.map((value, index) => value - (currentVals[index] || 0))
  }
}

server.post('/compute/:request_id', bodyParser.json(), function(req, res, next) {
  const id = req.params.request_id
  const body = req.body
  const timestamp = body.timestamp // TODO: validate timestamp?
  const data = body.data

  if (!timestamp || !id || !data || data.length < 2) {
    throw("Invalid data")
  }

  res.json(
    {
      request_id: id,
      timestamp: timestamp,
      result: data.reduce(resultReducer)
    }
  )

  next()
})

server.listen(port, () => {
  console.log("server running, listening port " + port)
})

module.exports = server
