const express = require('express');
const app = express();

const cors    = (req,res,next) => {
    res.header('Access-Control-Allow-Origin',  '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

// 解析 json 格式的請求體參數
app.use(express.json());

app.use(cors);

app.get('/products1', (req,res) => {

    setTimeout(() => {
        res.send([
            {id:1,name: 'product1.1'},
            {id:2,name: 'product1.2'},
            {id:3,name: 'product1.3'},
        ])
    }, 1000 + Math.random() * 2000);

})

app.get('/products2', (req,res) => {

    setTimeout(() => {
        res.send([
            {id:1,name: 'product2.1'},
            {id:2,name: 'product2.2'},
            {id:3,name: 'product2.3'},
        ])
    }, 1000 + Math.random() * 2000);

})

app.listen(3000);