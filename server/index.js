const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

require('./routes/admin')(app)
require('./plugins/db')(app)



app.listen(3000, () => {
  console.log('app is on port 3000!')
})