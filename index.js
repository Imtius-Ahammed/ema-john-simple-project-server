const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// name:emaJohnDB
// password:xntoZJCzGPImtX3E

// database connection


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ruqflxh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{

    const productCollection = client.db('emaJohn').collection('products')
    app.get('/products',async(req,res)=>{
      const query = {}
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    })

  }
  finally{

  }
}
run().catch(err=>console.error(err))


app.get('/',(req,res)=>{
  res.send('Server is Running')
})

app.listen(port,()=>{
  console.log(`Listening to the ${port}`)
})