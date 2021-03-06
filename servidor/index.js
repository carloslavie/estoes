const express = require("express");
const conectarDB = require('./config/db');

const app = express();

conectarDB();

const PORT = process.env.PORT || 4000;

app.use('/api/usuarios', require('./routes/usuarios'))
app.listen(PORT, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})