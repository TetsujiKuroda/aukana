//--------------------------------------------------------------------------------
// App.js
//--------------------------------------------------------------------------------
import * as Questions from '/js/survey/questions.js';
import * as Confirm from '/js/survey/confirm.js';

document.addEventListener('DOMContentLoaded', function() {

  // 起動パラメータの取得
  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get('id') || "";
  if(id.indexOf("?") > -1) id = id.split("?")[0];  // 開発環境の暗黙的パラメータに対応
  if(id){
    // IDが指定されていたら設問データの取得に進む
    Questions.getJson(id);
  } else {
    // IDが指定されていないときは入力してもらう
    Confirm.inputId();
  }

  // モーダルボタンのイベントリスナー
  document.getElementById('modalButton').addEventListener('click', function() {
    Confirm.onClickOkButton();
  });
});
