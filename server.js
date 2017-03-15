const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const fs = require('fs');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'JetFuel'
app.locals.folders = [{
  id:1,
  folderName:'Food'
}]
app.locals.urls = [{
  urlid:123,
  folderID: 1,
  longUrl:'www.foodnetwork.com',
  counter: 0,
  timestamp: ''
}]

app.use(express.static('public'))

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders);
})

app.get('/api/folders/:folderName', (request, response) => {
  response.json(app.locals.urls);
})

app.post('/api/folders', (request, response) => {
  const id = md5(request.body.folderName);
  const { folderName } = request.body;
  app.locals.folders.push({ id, folderName });
  response.json({ id, folderName });
  console.log({folderName})
})

app.post('/api/urls', (request, response) => {
  const id = md5(request.body.longUrl);
  const { folderId, longUrl, timestamp } = request.body;
  let counter;
  ++counter;
  if (folderId === app.locals.folders.id) {
    app.locals.urls.push({ folderId, longUrl, counter, timestamp });
  }
  response.json({ folderId, longUrl, counter, timestamp });
})

app.listen(app.get('port'), ()=>{
  console.log(`${app.locals.title} is running at ${app.get('port')}`)
})

















app.post('api/folders/:id', (request, response) => {
  const { id } = request.params;
  const { url } = request.body;
  app.locals.urls.push({ id, url });
  response.json({ id, url });
})
