//--------------------------------------------------------------------------------
// Publish.js
//--------------------------------------------------------------------------------
import * as Util from '/js/upload/util.js';

export async function exec(id){
  const GasUrl = 'https://script.google.com/macros/s/AKfycbyGKMEgSXqHMRv7eJbVFf2rM068S5Go3-wOVJgM2L1wUqXL3sM_nGT9ZSiUwq8bFfe1/exec';
  const step = 4;
  const url = `${GasUrl}?id=${id}&step=${step}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const jsonString = await res.text();
    const json = JSON.parse(jsonString);
    console.log(json);

    // STEP4の結果表示
    if(json.success){
      const message = [
        `設問データ（No. ${id}）を登録しました。<br>`,
        `<a href="survey.html?id=${id}" `,
        'class="inline-block w-auto py-1 px-2 text-white rounded-lg shadow-md bg-indigo-600 transition-transform duration-100 active:scale-95 no-underline">',
        'サーベイ画面へ進む',
        '</a>'
      ].join('');
      Util.setMessage(message, 'blue');
    }else{
      Util.setMessage(json.message, 'red');
    }

    // フォームをリセット
    document.getElementById('uploadForm').reset();
    Util.setButtonState(true);

  } catch (err) {
    console.error("Fetch error:", err);
    Util.setMessage(err.message, 'red');
  }
}
