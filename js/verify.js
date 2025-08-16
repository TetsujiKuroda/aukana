//--------------------------------------------------------------------------------
// Verify.js
//--------------------------------------------------------------------------------
import * as Upload from '/js/upload.js';

// 入力チェック
export function check(){
  const dataTitle = document.getElementById('dataTitle');
  const uploadFile = document.getElementById('uploadFile');

  // タイトル
  if(!dataTitle.value){
    showMessage('タイトルが入力されていません。');
    return false;
  }

  // ファイル選択
  if (uploadFile.files.length == 0) {
    showMessage('ファイルが選択されていません。');
    return false;
  }

  // ファイル種別
  const file = uploadFile.files[0];
  const validExcelTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel' // .xls
  ];
  if (!validExcelTypes.includes(file.type)) {
    showMessage('Excel形式のファイルを指定してください。');
    return false;
  }

  // ファイルサイズ
  const fileSize = file.size / (1024 * 1024);
  const MB = fileSize.toFixed(2);
  console.log(MB);
  if(MB > 1){
    showMessage(`設問シートにしては、ファイルサイズ（${MB}MB）が大きすぎます。`);
    return false;
  }

  // アップロード実行
  Upload.exec();
}

// メッセージ表示
function showMessage(message, isSuccess) {
  const messageBox = document.getElementById('messageBox');
  const classNames = isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  messageBox.textContent = message;
  messageBox.className = 'mt-4 p-4 rounded-lg text-sm text-center font-medium ' + classNames;
  messageBox.style.display = 'block';
}