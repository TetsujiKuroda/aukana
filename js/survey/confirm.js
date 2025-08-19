//--------------------------------------------------------------------------------
// Confirm.js
//--------------------------------------------------------------------------------
import * as Questions from '/js/survey/questions.js';

// モーダルウィンドウでIDを入力
export function inputId(){
  console.log("Confirm.inputId()");
  modalOpen("設問番号", "設問番号を指定してください。", "OK");
}

// OKボタンが押されたときのコールバック
export function onClick(){
  const modalInput = document.getElementById('modalInput');
  const inputValue = modalInput.value;
  if(inputValue){
    if (!/^[0-9]+$/.test(inputValue)) {
      // 入力エラー
      modalInput.value = "";
    } else {
      // 入力OK
      modalClose();
      Questions.getJson(inputValue);
    }
  }
}

// モーダルウィンドウを開く
function modalOpen(title, message, button){
  const modal = document.getElementById('modal');
  const modalTItle = document.getElementById('modalTItle');
  const modalMessage = document.getElementById('modalMessage');
  const modalButton = document.getElementById('modalButton');
  modalTItle.textContent = title;
  modalMessage.textContent = message;
  modalButton.textContent = button;
  modal.classList.remove('hidden');
}
// モーダルウィンドウを閉じる
function modalClose(){
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
}