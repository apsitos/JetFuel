const folders = $('.folder-name');

$('.create-folder').on('click', () => {
  let folderName = folders.val();
  addFolder();
})

function addFolder() {
  alert('Folder Append')
  // $(.'folder-list').append(
  //   `<li>
  //     <h2>${folderName}</h2>
  //   </li>`
  // );
}
