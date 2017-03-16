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
  getUrls(id);
})

$('.shortened-links').on('click', ".shorten-url", (e) => {
  const folderId = e.target.parentElement.dataset.id;
  const longUrl = $('.long-url').val();
  saveUrl(folderId, longUrl);
})

const makeFolder = (name)=> {
  axios.post('/api/folders',{
      name:name
    })
    // console.log(name)
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
      console.log(response)
      $('.shortened-links').empty()
      $('.shortened-links').append(

      `<div data-id=${id}>
        <input class = 'long-url' type='text' placeholder='shorten a url' />
        <button class='shorten-url' type='button'>Submit</button>
        <ul class= 'url-list'></ul>
      </div>`
      )

    }else{
      response.data.map((url) => {
        console.log(response)
        $('.shortened-links').empty()
        $('.shortened-links').append(
        `<div data-id = ${id}>
        <input class = 'long-url' type='text' placeholder='shorten a url' />
        <button class='shorten-url' type='button'>Submit</button>
          <ul class= 'url-list'><li data-id = ${url.id}>${url.longUrl}</li></ul>
        </div>`
        )})
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


// `<div data-id=folder.id>
//   <input id="newUrl">Enter new url</a>
//   <ol>
//     <ol>
// </div>`
//
// on('click', () => {
//   const longURL = $('#newURL').value
//   const id = $('#newURL').parent.data-id
//   axios.post('/folders/urls') {
//     body,
//     folderID: id,
//   }
// })

// <ol>
// response.body.map((folder) => {
//   <li data-id:folder.id><a id="">folder.name<li>
// })


//ask about shorten url
