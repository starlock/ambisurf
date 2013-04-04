connect = require('connect')
express = require('express')
childProcess = require('child_process')
crypto = require('crypto')
fs = require('fs')

app = module.exports = express.createServer()

app.use(express.logger())
app.use(connect.static(__dirname + '/public'))

app.get('/', (request, response) ->
  response.send('./public/index.html')
)

app.get('/snapshot', (request, response) ->
  url = request.query.url

  hash = crypto.createHash("md5")
    .update(url)
    .digest("hex")

  filename = "./public/#{hash}.png"

  callback = => fs.readFile(filename, "binary", (err, file) =>
    response.writeHead(200, {"Content-Type": "image/png"})
    response.write(file, "binary")
  )

  unless fs.existsSync(filename)
    lib = "./lib/snapshot.js"
    phantomjs = childProcess.exec("./node_modules/phantomjs/bin/phantomjs #{lib} #{url} #{filename}")
    phantomjs.on("exit", callback)
  else
    callback()
)

port = process.env.PORT or 1337
app.listen(port)
