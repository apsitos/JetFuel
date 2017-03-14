const folders = $('.folder-name');
const axios = require('axios');

$(document).ready(() => {
  retrieveFolders();
});

$('.create-folder').on('click', () => {
  let folderName = folders.val();
  addFolder(folderName);
})

const retrieveFolders = () => {
  fetch('/api/folders')
}

const addFolders = (folderName) => {
  alert('Folder Append');
  $('.folder-list').append(
    `<li>
      <h2>${folderName}</h2>
    </li>`
  );
}


<ol>
response.body.map((folder) => {
  <li data-id:folder.id><a id="">folder.name<li>
})
