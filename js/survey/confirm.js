//--------------------------------------------------------------------------------
// Confirm.js
//--------------------------------------------------------------------------------
import * as Questions from '/js/survey/questions.js';

// モーダルウィンドウでIDを入力
export function inputId(){
  console.log("Confirm.inputId()");
  modalOpen("設問番号", "設問番号を指定してください。", "OK");
}
export function onClickOkButton(){
  const modalInput = document.getElementById('modalInput');
  const inputValue = modalInput.value;
  if(inputValue){
    if (!/^[0-9]+$/.test(inputValue)) {
      // 入力エラー（入力値をクリアして再入力）
      modalInput.value = "";
      modalOpen("設問番号", "設問番号を指定してください。", "OK");
    } else {
      // 入力OKならJSON取得へ
      const loading = '<span class="loading-spinner"></span>';
      modalMessage(loading + "検索中...");
      getJson(inputValue);
    }
  }
}

// モーダルウィンドウを開く
function modalOpen(title, message, button, color){
  const modal = document.getElementById('modal');
  const modalTItle = document.getElementById('modalTItle');
  const modalMessage = document.getElementById('modalMessage');
  const modalButton = document.getElementById('modalButton');
  modalTItle.textContent = title;
  modalMessage.innerHTML = message;
  modalMessage.style.color = color || 'black';
  modalButton.textContent = button;
  modal.classList.remove('hidden');
}
// モーダルメッセージを更新
function modalMessage(message, color){
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.innerHTML = message;
  modalMessage.style.color = color || 'black';  
}
// モーダルウィンドウを閉じる
function modalClose(){
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
}

// JSONデータの取得
async function getJson(id){
  console.log(`Confirm.getJson(${id})`);
  const url = [
    'https://firebasestorage.googleapis.com/v0/b/',
    'aukana-a0724.firebasestorage.app/o/',
    `json%2F${id}.json`,
    '?alt=media'
  ].join('')
  try {
    const res = await fetch(url);
    const json = await res.json();
    if(res.ok){
      // データ取得成功
      console.log(json);
      modalClose();
      Questions.start(json);
    }else{
      console.log('JSON not found.');
      modalOpen("設問番号", "設問が見つかりませんでした。", "OK", "red");
    }
  } catch (error) {
    console.error('Fetch failed:', error);
    modalOpen("設問番号", "処理エラーが発生したました。", "OK", "red");
  }
}