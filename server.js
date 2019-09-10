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

const bodyValidator = (req, res, next) => {
  const body = req.body
  const timestamp = body.timestamp // TODO: validate timestamp?
  const data = body.data

  console.log(req.query, req.body)
  if (!timestamp || !data || data.length < 2) {
    throw("Invalid data")
  }

  next()
}

const computeMiddleware = (req, res, next) => {
  const id = req.params.request_id
  const body = req.body

  if (!id) {
    throw("Request Id is missing")
  }

  res.json(
    {
      request_id: id,
      timestamp: body.timestamp,
      result: body.data.reduce(resultReducer)
    }
  )

  next()
}

server.use(bodyParser.json(), bodyValidator)

server.post( '/compute/:request_id', computeMiddleware)

server.listen(port, () => {
  console.log("server running, listening port " + port)
})

module.exports = server
