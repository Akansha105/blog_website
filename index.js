import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.get('/create', (req, res) => {
  res.render('create.ejs')
})

app.get('/update', (req, res) => {
  res.render('update.ejs')
})
const posts = []
app.get('/view', (req, res) => {
  res.render('view.ejs', { posts: posts })
})

app.post('/check', (req, res) => {
  const data = req.body['upd']
  for (var i = 0; i < posts.length; i++) {
    if (posts[i].name == data) {
      const k = posts[i].text
      delete posts[i].name
      delete posts[i].text
      res.render('update.ejs', { ret: k })
    }
  }
  res.render('update.ejs')
})
app.post('/submit', (req, res) => {
  const blog = req.body['blog']
  const title = req.body['title']
  const postobj = {
    text: blog,
    name: title,
  }
  posts.push(postobj)
  res.redirect('/view')
})

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`)
})
