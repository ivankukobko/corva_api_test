const mocha = require('mocha')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('./server')
var expect = chai.expect

chai.use(chaiHttp)
chai.should()

describe("server", () => {
  it("should work with proper input", (done) => {
    chai
      .request(server)
      .post("/compute/123")
      .send({
        timestamp: new Date().getTime(),
        data: [
          {
            title: "Part 1",
            values: [1,1,1]
          },
          {
            title: "Part 2",
            values: [1,1,1]
          }
        ]
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        done()
      })
  })

})
