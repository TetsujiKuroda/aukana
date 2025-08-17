//--------------------------------------------------------------------------------
// Convert.js
//--------------------------------------------------------------------------------

export async function exec(id){
  const GasUrl = 'https://script.google.com/macros/s/AKfycbyGKMEgSXqHMRv7eJbVFf2rM068S5Go3-wOVJgM2L1wUqXL3sM_nGT9ZSiUwq8bFfe1/exec';
  const step = 3;
  const url = `${GasUrl}?id=${id}&step=${step}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const jsonString = await res.text();
    console.log(jsonString);
    const json = JSON.parse(jsonString);
    setMessage(json.message, json.success ? 'blue' : 'red');
  } catch (err) {
    console.error("Fetch error:", err);
    setMessage(`通信エラー: ${err.message}`, 'red');
  }
}

// メッセージ表示
function setMessage(message, color) {
  const messageBox = document.getElementById('messageBox');
  const classNames = {
    'gray':'text-gray-500',
    'blue':'text-blue-500',
    'green':'text-green-500',
    'red':'text-red-500'
  };
  const cls = classNames[color];
  const msg = `<p class="${cls}">${message}</p>`;
  messageBox.innerHTML = msg;
}