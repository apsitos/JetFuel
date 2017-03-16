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
  response.json(app.locals.folders);
})

// app.get('/api/folders/:name', (request, response) => {
//   console.log(app.locals.urls)
//   if(app.locals.urls.length===0){
//     response.json(app.locals.folders);
//   }else{
//     response.json(app.locals.urls);
//   }
// })

app.get('/api/folders/:id/urls', (request, response) => {
  const urls = app.locals.urls.filter((url) => {
    return url.folderId == request.params.id
  })
  console.log(urls)
  response.json(urls);

})


app.post('/api/folders', (request, response) => {
  const { name } = request.body;
  const id = md5(name);
  app.locals.folders.push({ id, name });
  response.json({ id, name });
  // console.log({name})
})

app.post('/api/urls', (request, response) => {
  const {folderId, longUrl } = request.body;
  const id = md5(longUrl);
  const url ={ id, folderId, longUrl, clicks:0, timestamp:Date.now() }
  app.locals.urls.push(url);
  response.json(url);
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
