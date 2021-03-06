module.exports = (app) => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  
  router.post('/',async (req, res) => {
    const item = await req.Model.create(req.body)
    res.send(item)
  })

  router.get('/',async (req, res) => {
    let queryOptions = {}
    if(req.Model.modelName === 'Category') queryOptions.populate = 'parent'
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  router.put('/:id',async (req, res) => {
    const item = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(item)
  })

  router.get('/:id',async (req, res) => {
    const item = await req.Model.findById(req.params.id)
    res.send(item)
  })

  router.delete('/:id',async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  app.use('/admin/api/rest/:resource',async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
  })
  app.post('/admin/api/upload',upload.single('file'), (req, res, next) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

}