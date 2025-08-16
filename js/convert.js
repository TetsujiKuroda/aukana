//--------------------------------------------------------------------------------
// Convert.js
//--------------------------------------------------------------------------------

export function exec(id){
  const GasUrl = 'https://script.google.com/macros/s/AKfycbyGKMEgSXqHMRv7eJbVFf2rM068S5Go3-wOVJgM2L1wUqXL3sM_nGT9ZSiUwq8bFfe1/exec';
  const step = 3;
  const url = `${GasUrl}?id=${id}&step=${step}`;
  fetch(GasUrl)
  .then(res => {
    // レスポンス処理
    const jsonString = res.text();
    console.log(jsonString);
    const json = JSON.parse(jsonString);
    showMessage(json.message, json.success);
  })
  .catch(err => {
    // エラーハンドリング
    showMessage(err.message);
  });
}

// メッセージ表示
function showMessage(message, isSuccess) {
  const messageBox = document.getElementById('messageBox');
  const classNames = isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  messageBox.textContent = message;
  messageBox.className = 'mt-4 p-4 rounded-lg text-sm text-center font-medium ' + classNames;
  messageBox.style.display = 'block';
}