const express = require("express")
const app = express()
const PORT = 3000
const bodyParser = require("body-parser")
const routes = require("./routes")

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

app.listen(PORT, () => {
    console.log(`listen on http://localhost:${PORT}`)
})