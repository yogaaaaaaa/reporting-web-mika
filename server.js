const express = require("express");
const app = express();
const PORT = 5000;

app.listen(PORT, ()=> console.log(`server run on port ${PORT}`));

app.get('/',  (req, res)=>{
    res.json("helo")
})