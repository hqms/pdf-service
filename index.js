'use strict'

const mw = require('./lib/middleware')
const actions = require('./lib/actions')
const app = require('express')()
const bodyParser = require('body-parser')
const bodyLimit = '50mb'
const port = process.argv[2] || 3000

app.use(mw.setHeaders)
app.use(bodyParser.json({limit: bodyLimit}))
app.use(mw.setupTemp)
app.use(mw.writeHtmlFile)
app.use(mw.convertHtmlToPdf)
app.use(mw.createFileList)
app.use(mw.mergeFileList)
app.use(mw.createPostscript)
app.use(mw.addStamp)

app.post('/', actions.sendFile)

app.listen(port, () => console.log('server listening on port %d', port))
