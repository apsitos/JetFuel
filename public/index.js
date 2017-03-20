const folders = $('.folder-name');

$(document).ready(() => {
  addFolders();
});

//saves new folder to db and appends to page
$('.create-folder').on('click', () => {
  let name = folders.val();
  makeFolder(name)
  addFolders();
})

//highlights the selected folder
$('.folder-list').on('click', (event) => {
  let id = event.target.dataset.id
  $('.folder').each((i,folder) => {
    if(id == folder.dataset.id){
      folder.classList.add('selected')
    } else {
      folder.classList.remove('selected')
    }
  })
  getUrls(id);
})

//saves user-entered URL to db
$('.links-container').on('click', '.shorten-url', (e) => {
  const folderId = $('.selected').attr('data-id');
  const url = $('.long-url').val();
  const longUrl = validateUrl(url).trim();
  let id = folderId
  saveUrl(folderId, longUrl, id);
  getUrls(id);
})

//redirects user
$('.links-container').on('click', '.url', (e) => {
  const id = e.target.dataset.id
  redirect(id);
})

//sort by Popularity
$('.links-container').on('click', '.popular', function() {
  console.log(this);
  const id = this.id
  console.log('sort popular', id);
  sortPopularity(id)
})

//sort by Date
$('.links-container').on('click', '.date', (e) => {
  console.log(e.target);
  const id = e.target.id;
  sortDate(id);
})

//helper functions can be broken out
const addCount = (clicks) => {
  ++clicks;
}

const validateUrl = (url) => {
  const urlRegex = /^(http|https)?:\/\/[w]{2,4}[a-zA-Z0-9-\.]+\.[a-z]{1,10}/
  if(!urlRegex.test(url)){
    url = 'http://' + url
  }
  return url;
}

const appendUrls = (response) => {
  $('.links-container').text('');
  $('.links-container').empty();
  $('.links-container').append(`
    <input class = 'long-url' type='text' placeholder='shorten a url' />
    <button class='shorten-url' type='button'>Submit</button>
    <p class='buttons'>Sort By<button class='popular' id=${response.data[0].folderId} type='button'>Popularity</button>
    <button class='date' id=${response.data[0].folderId} type='button'>Date</button></p>
    <div data-id = ${response.id}>
      <ul class='url-list'></ul>
    </div>
 `);
 response.data.map((url) => {
   $('.url-list').append(`
    <a href= ${url.longUrl} target='_blank' onclick='addCount(${url.clicks})' >
      <li data-id = ${url.id} class='url'>${url.short}</li>
    </a>
    <p>Visited ${url.clicks} times</p>
    <p class='date'>Saved on ${url.created_at}</p>
    <p>${url.longUrl}</p>`
 )})
}

//API calls
const addFolders = () => {
  axios.get('/api/folders')
  .then((response) => {
    console.log(response);
    $('.folder-list').text('');
    response.data.map((folder) => {
      $('.folder-list').append(
        `<li class='folder' data-id=${folder.id}>
          ${folder.name}
        </li>`
      )
    })
  })
}

const getUrls = (id) => {
  axios.get(`/api/folders/${id}/urls`)
  .then((response) => {
    if(response.data.length === 0){
      $('.links-container').empty()
      $('.links-container').append(
      `<div data-id=${response.id}>
        <input class = 'long-url' type='text' placeholder='shorten a url' />
        <button class='shorten-url' type='button'>Submit</button>
        <p class='buttons'>Sort By<button class='popular' id=${response.id} type='button'>Popularity</button>
        <button class='date' type='button'>Date</button></p>
        <ul class= 'url-list'></ul>
      </div>`
      )
    } else {
      console.log(response.data[0].folderId);
      appendUrls(response);
    }
  })
};

const redirect = (id) => {
  axios.get(`/${id}`, {
    id
  })
}

const sortPopularity = (id) => {
  axios.get(`/api/folders/${id}/mostPopular`, {
    id
  }).then(response => appendUrls(response))
}

const sortDate = (id) => {
  console.log(id);
  axios.get(`/api/folders/${id}/date`, {
    id: id
  }).then(response => {
    console.log(response)
    appendUrls(response)
  })
}

const makeFolder = (name)=> {
  axios.post('/api/folders',{
      name:name
    })
}

const saveUrl = (folderId,longUrl, id) => {
  axios.post('/api/urls', {
    folderId,
    longUrl
  }).then(urls => getUrls(id))
}
