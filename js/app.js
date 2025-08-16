//--------------------------------------------------------------------------------
// App.js
//--------------------------------------------------------------------------------
import * as Verify from '/js/verify.js';
  
// アップロードボタンのイベントリスナー
document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  let isSuccess = false;

  // 入力チェック
  Verify.check();
});  
