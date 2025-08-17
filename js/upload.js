//--------------------------------------------------------------------------------
// Upload.js
//--------------------------------------------------------------------------------
import * as Convert from '/js/convert.js';
import * as Util from '/js/util.js';

// アップロード実行
export function exec(e){

  // メッセージ表示＆ボタン無効化
  Util.setMessage('アップロード中です...', 'blue');
  Util.setButtonState(false);

  // アップロードボタンを無効化
  const uploadButton = document.getElementById('uploadButton');
  uploadButton.disabled = true;
  uploadButton.classList.add('button-disabled');

  // フォームデータの取得 ＆ GAS APIの呼び出し
  const textInput = document.querySelector("input[name=dataTitle]");
  const fileInput = document.querySelector("input[name=uploadFile]");
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = async function() {
    const base64Data = reader.result.split(",")[1]; // data:xxx;base64, を除去
    const payload = {
      dataTitle: textInput.value,
      fileName: file.name,
      mimeType: file.type,
      fileData: base64Data
    };
    const GasUrl = 'https://script.google.com/macros/s/AKfycbyGKMEgSXqHMRv7eJbVFf2rM068S5Go3-wOVJgM2L1wUqXL3sM_nGT9ZSiUwq8bFfe1/exec';
    const res = await fetch(GasUrl, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    const jsonString = await res.text();
    console.log(jsonString);
    const json = JSON.parse(jsonString);

    // メッセージ表示＆ボタン有効化
    Util.setMessage(json.message, json.success ? 'blue' : 'red');
    Util.setButtonState(true);

    if(json.success){
      Convert.exec(json.id);    // ファイル変換処理（STEP3）へ
    }
  };
  reader.readAsDataURL(file);
}
