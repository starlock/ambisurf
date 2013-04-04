connect = require('connect')
express = require('express')

app = module.exports = express.createServer()

app.use(express.logger())

app.get('/', (request, response) ->
  response.send('Hi.')
)

port = process.env.PORT or 1337
app.listen(port)
