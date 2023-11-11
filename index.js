const express = require('express')
const app = express()
const port = 3002
const cors = require('cors')


app.use(express.json())
app.use(cors({ origin: true }))

app.use('/api/sendmessage', require('./routes/twilio'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})