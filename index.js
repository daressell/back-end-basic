const express = require("express")
const app = express()
const routes = require('./routes/item')    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todo', routes);

app.listen(3000, () => {
  console.log('start server');
})
