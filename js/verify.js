//--------------------------------------------------------------------------------
// Verify.js
//--------------------------------------------------------------------------------
import * as Upload from '/js/upload.js';

// 入力チェック
export function check(){
  const dataTitle = document.getElementById('dataTitle');
  const uploadFile = document.getElementById('uploadFile');

  // ファイル
  if (uploadFile.files.length == 0) {
    setMessage('ファイルが選択されていません。', 'red');
    return false;
  }

  // タイトル
  if(!dataTitle.value){
    setMessage('タイトルが入力されていません。', 'red');
    return false;
  }

  // ファイル種別
  const file = uploadFile.files[0];
  const validExcelTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  if (!validExcelTypes.includes(file.type)) {
    setMessage('Excel形式（.xlsx）のファイルを指定してください。', 'red');
    return false;
  }

  // ファイルサイズ
  const fileSize = file.size / (1024 * 1024);
  const MB = fileSize.toFixed(2);
  console.log(MB);
  if(MB > 1){
    setMessage(`ファイルサイズ（${MB}MB）が大きすぎます。1MB以内としてください。`, 'red');
    return false;
  }

  // アップロード実行
  Upload.exec();
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
  messageBox.innerHTML = `<p class="${cls}">${message}</p>`;
}