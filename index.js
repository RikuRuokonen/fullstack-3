
  
  const express = require('express')
  const app = express()
  const bodyParser = require('body-parser')
  const cors = require('cors')
  
  app.use(cors())

  app.use(bodyParser.json())
  
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let notes = [
    {
      id: 1,
      number: '0443293304',
      name: 'Eero',
    },
    {
        id: 2,
        number: '0564303120',
        name: 'Aki',
    },
    {
        id: 3,
        number: '023043423',
        name: 'Timo',
    }
  ]
  app.get('/api', (req, res) => {
    res.send('<h1>Hello Wodvsdrld!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(notes)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => {
        return note.id === id})
        if ( note ) {
            response.json(note)
          } else {
            response.status(404).end()
          }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })


  app.post('/api/persons', (request, response) => {
    const id = getRandomInt(3000);
    const body = request.body
    let hasName = notes.some( contact => contact['name'] === body.name )
    
      if (body.number === undefined) {
        return response.status(400).json({error: 'number missing'})
      }
      if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
      }

      if (hasName) {
        return response.status(400).json({error: 'name must be unique'})
      }
    
    
      const note = {
        id: id,
        number: body.number,
        name: body.name
      }
    
      notes = notes.concat(note)
    
      response.json(note)
  })

  app.get('/info', (req, res) => {
    var amount = notes.length+1
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    res.send('<h4>Puhelinluettelossa on</h4>' +  amount + '<h4>ihmisen tiedot</h4>' +
        "<b>" + day + "/" + month + "/" + year + "</b>")
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })