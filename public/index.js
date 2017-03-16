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
  console.log(id)
  $(event.target).closest('li').toggleClass('selected')
  getUrls(id);
})

$('.shortened-links').on('click', ".shorten-url", (e) => {
  const folderId = $(".selected").attr("data-id");
  const longUrl = $('.long-url').val();
  let id = event.target.dataset.id

  console.log("folderId", folderId);
  console.log("longUrl", longUrl);

  saveUrl(folderId, longUrl);
  getUrls(id);
})

const makeFolder = (name)=> {
  axios.post('/api/folders',{
      name:name
    })
}

const addFolders = (name) => {
  axios.get('/api/folders')
  .then((response) => {
    console.log(response.data)
    $('.folder-list').text('');
    response.data.map((folder) => {
      $('.folder-list').append(
        `<li data-id=${folder.id}>
          ${folder.name}
        </li>`
      )
    })
  })
}

const getUrls = (id) => {

  // the button doenst have the correct id because it doesn't have a response
  axios.get(`/api/folders/${id}/urls`)
  .then((response) => {
    if(response.data.length === 0){
      // console.log(response)
      $('.shortened-links').empty()
      $('.shortened-links').append(
      `<div data-id=${id}>
        <input class = 'long-url' type='text' placeholder='shorten a url' />
        <button class='shorten-url' type='button'>Submit</button>
        <ul class= 'url-list'></ul>
      </div>`
      )

    }else{
      console.log(response)
      $('.shortened-links').text('');
     $('.shortened-links').empty();
     $('.shortened-links').append(`
       <input class = 'long-url' type='text' placeholder='shorten a url' />
       <button class='shorten-url' type='button'>Submit</button>
       <div data-id = ${id}>
         <ul class='url-list'></ul>
       </div>
     `);
     response.data.map((url) => {
       $('.url-list').append(`
           <li data-id = ${url.id}>${url.longUrl}</li>
     `)})
    }
  });
}

const saveUrl = (folderId,longUrl) => {

  axios.post('/api/urls', {
    folderId,
    longUrl,
  }).then((response)=>{
    const url = response.data
      $('.url-list').append(
        `<li>${url.longUrl}</li>`)
  })
}
