//--------------------------------------------------------------------------------
// Verify.js
//--------------------------------------------------------------------------------
import * as Upload from '/js/upload.js';
import * as Util from '/js/util.js';

// 入力チェック
export function check(){

  // ボタンを無効化
  Util.setButtonState(false);

  const dataTitle = document.getElementById('dataTitle');
  const uploadFile = document.getElementById('uploadFile');

  // ファイル
  if (uploadFile.files.length == 0) {
    Util.setMessage('ファイルが選択されていません。', 'red');
    Util.setButtonState(true);
    return false;
  }

  // タイトル
  if(!dataTitle.value){
    Util.setMessage('タイトルが入力されていません。', 'red');
    Util.setButtonState(true);
    return false;
  }

  // ファイル種別
  const file = uploadFile.files[0];
  const validExcelTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];
  if (!validExcelTypes.includes(file.type)) {
    Util.setMessage('Excel形式（.xlsx）のファイルを指定してください。', 'red');
    Util.setButtonState(true);
    return false;
  }

  // ファイルサイズ
  const fileSize = file.size / (1024 * 1024);
  const MB = fileSize.toFixed(2);
  console.log(MB);
  if(MB > 1){
    Util.setMessage(`ファイルサイズ（${MB}MB）が大きすぎます。1MB以内としてください。`, 'red');
    Util.setButtonState(true);
    return false;
  }

  Upload.exec();    // アップロード処理（STEP2）へ
}
