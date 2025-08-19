//--------------------------------------------------------------------------------
// App.js
//--------------------------------------------------------------------------------
import * as Verify from '/js/upload/verify.js';
  
// アップロードボタンのイベントリスナー
document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  Verify.check();   // 入力チェックへ
});  

// ファイル選択のイベントリスナー
const uploadFile = document.getElementById('uploadFile');
uploadFile.addEventListener('change', function(e){
  const files = e.target.files;
  if (files.length > 0) {
    const dataTitle = document.getElementById('dataTitle');
    dataTitle.value = files[0].name.split('.')[0];
  }
});