const folders = $('.folder-name');


$(document).ready((folderName) => {
  addFolders(folderName);
});

$('.create-folder').on('click', () => {
  let folderName = folders.val();
  makeFolder(folderName)
  addFolders(folderName);
})

$('.folder-list').on('click', (event) => {
  getUrls();
})

$('.shortened-links').on('click', ".shorten-url", (e) => {
  console.log('url shortened');
  saveUrl(e);
})

const makeFolder = (folderName)=> {
  axios.post('/api/folders',{
      folderName:folderName
    })
    console.log(folderName)
}

const addFolders = (folderName) => {
  axios.get('/api/folders')
  .then((response) => {
    console.log(response.data)
    $('.folder-list').text('');
    response.data.map((folder) => {
      $('.folder-list').append(
        `<li data-id=${folder.id}>
          ${folder.folderName}
        </li>`
      )
    })
  })
}

const getUrls = () => {
  axios.get('/api/folders/:folderName')
  .then((response) => {
    response.data.map((folder) => {
      $('.shortened-links').append(
        `<ul><li>${folder.longUrl}</li></ul>
        <input class = 'long-url' type='text' placeholder='shorten a url' />
        <button class='shorten-url' id=${folder.folderID} type='button'>Submit</button>`
      )
    });
  })
}

const saveUrl = (e) => {
  const folderId = e.target.id;
  const longUrl = $('.long-url').val();
  const timestamp = Date.now();
  axios.post('/api/urls', {
    folderId,
    longUrl,
    timestamp
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
