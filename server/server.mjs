import express from 'express'
import birds from './birds.json' assert { type: 'json' }
import users from './users.json' assert { type: 'json' }
import sightings from './sightings.json' assert { type: 'json' }

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send(200)
})

app.get('/birds', (req, res) => {
  res.send(birds)
})

app.get('/birds/:id', (req, res) => {
  const { id } = req.params
  const bird = birds.find((b) => b.id === Number(id))
  res.send(bird || 404)
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  const user = users.find((u) => u.id === id)
  res.send(user || 404)
})
app.get('/users/:id/sightings/:sightingId', (req, res) => {
  const { sightingId } = req.params
  const sighting = sightings.find((s) => s.id === sightingId)
  if (!sighting) {
    return res.status(404).send('Sighting not found')
  }
  res.send(sighting)
})

app.post('/users/:id/sightings', (req, res) => {
  const randomSighting = sightings[Math.floor(Math.random() * sightings.length)]
  res.send(randomSighting)
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
