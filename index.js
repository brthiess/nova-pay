const express = require('express')
const userUtilities = require('./utilities/userUtilities')
const app = express()
const port = 3000

app.use(express.json()) 

app.get('/', (req, res) => {
  res.send('Nova Pay Api')
})

app.post('/create-user', userUtilities.createUser);

app.post('/sign-in', userUtilities.signIn);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})