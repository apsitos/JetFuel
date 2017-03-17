const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const fs = require('fs');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'JetFuel'
app.locals.folders = [{
  id:1,
  name:'food'
}]
app.locals.urls = [{
  folderId:1,
  longUrl:'www.foodnetwork.com',
  id: '123e23097420984',
  clicks:0
}]


app.use(express.static('public'))

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/folders', (request, response) => {
  database('folders').select()
          .then((folders) => {
            response.status(200).json(folders);
          })
          .catch((error) => {
            console.error('something is wrong with the db');
          })
})

app.get('/api/folders/:id/urls', (request, response) => {
  // const url ={ id, folderId, longUrl, short, clicks:0, created_at: new Date }
  database('urls').where('folderId', request.params.id)
          .then((urls) => {
            console.log(urls);
            response.status(200).json(urls)
          })
          .catch((error) => {
            console.error('something is wrong with the redirect', error);
          })

})

app.post('/api/folders', (request, response) => {
  const { name } = request.body;
  const folder = { id, name, created_at: new Date};

  database('folders').insert(folder)
    .then(() => {
      database('folders').select()
        .then((folders) => {
          response.status(200).json(folders)
        })
        .catch((error) => {
          console.error('something wrong with the db post');
        })
  })
})

app.post('/api/urls', (request, response) => {
  const {folderId, longUrl } = request.body;
  const id = md5(longUrl);
  const short = id.slice(0,5)
  const url ={ id, folderId, longUrl, short, clicks:0, created_at: new Date }

  database('urls').insert(url)
    .then(() => {
      database('urls').select()
        .then((url) => {
          response.status(200).json(url)
        })
        .catch((error) => {
          console.error('something wrong with the db urls post');
        })
  })
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
