const express = require('express')
const mongoose = require('mongoose')
const ProductModel = require('./Models/Products')
const app = express()
async function mongooseConnect() {
  await mongoose.connect(
    'mongodb+srv://elnurxo:Starboystar1@products.lhifuq4.mongodb.net/test',
  )
}
mongooseConnect()
app.use(express.json());

//add
app.post('/products', async (req, res) => {
  const newProd = new ProductModel(req.body)
  await newProd.save()
  res.status(201).send('Product created successfully!')
})

//get all
app.get('/products', async (req, res) => {
  const prods = await ProductModel.find()
  res.json(prods)
})

// get by id
app.get('/products/:id', async (req, res) => {
  const id = req.params.id
  const prod = await ProductModel.findById(id)
  res.status(200).json(prod)
})

//update
app.patch('/products/:id', async (req, res) => {
  const id = req.params.id
  const prod = await ProductModel.findByIdAndUpdate(id, req.body)
  res.status(200).json(prod)
})

//delete
app.delete('/products/:id', async (req, res) => {
  const id = req.params.id
  const prod = await ProductModel.findByIdAndDelete(id)
  res.status(200).json(prod)
})

let PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})