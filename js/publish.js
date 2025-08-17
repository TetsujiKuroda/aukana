//--------------------------------------------------------------------------------
// Publish.js
//--------------------------------------------------------------------------------
import * as Util from '/js/util.js';

export async function exec(id){
  const GasUrl = 'https://script.google.com/macros/s/AKfycbyGKMEgSXqHMRv7eJbVFf2rM068S5Go3-wOVJgM2L1wUqXL3sM_nGT9ZSiUwq8bFfe1/exec';
  const step = 4;
  const url = `${GasUrl}?id=${id}&step=${step}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // メッセージ表示
    const jsonString = await res.text();
    console.log(jsonString);
    const json = JSON.parse(jsonString);
    Util.setMessage(json.message, json.success ? 'blue' : 'red');

    // フォームをリセット
    document.getElementById('uploadForm').reset();
    Util.setButtonState(true);

  } catch (err) {
    console.error("Fetch error:", err);
    Util.setMessage(`通信エラー: ${err.message}`, 'red');
  }
}
