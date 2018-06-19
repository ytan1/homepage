var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')

var html = fs.readFileSync('./index.html').toString()

app.use('/', express.static(__dirname))

app.get('/', function(req, res) {
    res.send(html)
})


app.listen(3000, function() {
    console.log(`Listening on port 3000`)
})