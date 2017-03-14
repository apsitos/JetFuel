const folders = $('.folder-name');


$(document).ready(() => {
  retrieveFolders();
});

$('.create-folder').on('click', () => {
  let folderName = folders.val();
  makeFolder(folderName)
  addFolders(folderName);
})

const retrieveFolders = () => {
  axios.get('/api/folders')
}


const makeFolder = (folderName)=> {
  axios.post('/api/folders',{
      folderName:folderName
    })
    console.log(folderName)
}

const addFolders = (folderName) => {
  axios.get('/api/folders')
  .then((response) => {
    console.log(response);
    response.data.map((folder) => {
      $('.folder-list').append(
        `<li data-id=folder.id>
          <a id="bob">${folder.folderName}</a>
        </li>`
      )
    })
  })
}

//
// <ol>
// response.body.map((folder) => {
//   <li data-id:folder.id><a id="">folder.name<li>
// })
