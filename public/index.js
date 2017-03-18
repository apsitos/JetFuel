const folders = $('.folder-name');


$(document).ready((name) => {
  addFolders(name);
});

$('.create-folder').on('click', () => {
  let name = folders.val();
  makeFolder(name)
  addFolders(name);
})

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

$('.links-container').on('click', '.shorten-url', (e) => {
  const folderId = $('.selected').attr('data-id');
  const longUrl = $('.long-url').val();
  let id = folderId
  saveUrl(folderId, longUrl, id);
  getUrls(id);
})

$('.links-container').on('click', '.url', (e) => {
  console.log('short click', e.target.dataset.id);
  const id = e.target.dataset.id
  // const short = $(this.innerHTML)
  getShort(id);
  window.open(`${this.innerHTML}`, "_blank")
})

const makeFolder = (name)=> {
  axios.post('/api/folders',{
      name:name
    })
}

const addFolders = (name) => {
  axios.get('/api/folders')
  .then((response) => {
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
        <ul class= 'url-list'></ul>
      </div>`
      )
    } else {
      $('.links-container').text('');
      $('.links-container').empty();
      $('.links-container').append(`
        <input class = 'long-url' type='text' placeholder='shorten a url' />
        <button class='shorten-url' type='button'>Submit</button>
        <div data-id = ${response.id}>
          <ul class='url-list'></ul>
        </div>
     `);
     response.data.map((url) => {
       $('.url-list').append(`
          <li data-id = ${url.id} class='url'>${url.short}</li>
           <p>${url.longUrl}</p>
     `)})
    }
  });
}

const saveUrl = (folderId,longUrl, id) => {
  axios.post('/api/urls', {
    folderId,
    longUrl,
  }).then((response)=>{
    getUrls(id);
    })
  }

const getShort = (id) => {
  axios.get(`/api/${id}`, {
    id
  }).then(response => {
    console.log(response);
  })
}
