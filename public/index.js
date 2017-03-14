const folders = $('.folder-name');


$(document).ready((folderName) => {
  addFolders(folderName);
});

$('.create-folder').on('click', () => {
  let folderName = folders.val();
  makeFolder(folderName)
  addFolders(folderName);
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
    $('.folder-list').text('');
    response.data.map((folder) => {
      $('.folder-list').append(
        `<li data-id=${folder.id}>
          <a href="javascript:getUrls()">${folder.folderName}</a>
        </li>`
      )
    })
  })
}

const getUrls = () => {
  axios.get('/api/folders/:folderName')
  .then((response) => {
    console.log(response);
  })
}
