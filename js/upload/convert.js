//--------------------------------------------------------------------------------
// Convert.js
//--------------------------------------------------------------------------------
import * as Util from '/js/upload/util.js';
import * as Publish from '/js/upload/publish.js';

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
    const json = JSON.parse(jsonString);
    console.log(json);

    // STEP3の結果表示
    if(json.success){
      Util.setMessage('設問データを登録中です...', 'green');
      Publish.exec(id);     // 公開処理（STEP4）へ
    }else{
      Util.setMessage(json.message, 'red');
      Util.setButtonState(true);
    }

  } catch (err) {
    console.error("Fetch error:", err);
    Util.setMessage(err.message, 'red');
  }
}
