const folders = $('.folder-name');


$(document).ready(() => {
  retrieveFolders();
});

$('.create-folder').on('click', () => {
  let folderName = folders.val();
  addFolders(folderName);
  makeFolder(folderName)
})

const retrieveFolders = () => {
  fetch('/api/folders')
}


const makeFolder = (folderName)=> {
  axios.post('/api/folders',{
      folderName:folderName
    })
    console.log(folderName)
}

const addFolders = (folderName) => {
  alert('Folder Append');
  $('.folder-list').append(
    `<li>
      <h2>${folderName}</h2>
    </li>`
  );
}

//
// <ol>
// response.body.map((folder) => {
//   <li data-id:folder.id><a id="">folder.name<li>
// })
