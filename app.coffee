connect = require('connect')
express = require('express')

app = module.exports = express.createServer()

app.use(express.logger())
app.use(connect.static(__dirname + '/public'))

app.get('/', (request, response) ->
  response.send('./public/index.html')
)

port = process.env.PORT or 1337
app.listen(port)
