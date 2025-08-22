//--------------------------------------------------------------------------------
// Confirm.js
//--------------------------------------------------------------------------------
import * as Questions from '/js/survey/questions.js';

// 設問番号（ID）を入力
export function inputId(){
  console.log("Confirm.inputId()");
  questionOptions.innerHTML = [
    '<p id="inputMessage" class="mb-4">設問番号を指定してください。</p>',
    '<input type="input" id="idInput" name="modalInput" ',
    'class="block w-1/2 px-3 py-2 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center">',
    '<button id="okButton" class="w-1/3 py-3 px-4 text-white font-semibold rounded-lg shadow-md bg-indigo-600 transition-transform duration-100 active:scale-95">OK</button>',
  ].join('');
  const questionArea = document.getElementById('questionArea');
  questionArea.classList.remove('hidden');
  const okButton = document.getElementById('okButton');
  okButton.addEventListener('click', onClickOkButton);
}

// 入力チェック
export function onClickOkButton(){
  const idInput = document.getElementById('idInput');
  const inputValue = idInput.value;
  if(inputValue){
    if (!/^[0-9]+$/.test(inputValue)) {
      // 入力エラー（入力値をクリアして再入力）
      idInput.value = "";
      setMessage("設問番号を指定してください。");
    } else {
      // 入力OKならJSON取得へ
      const loading = '<span class="loading-spinner"></span>';
      setMessage(loading + "検索中...");
      getJson(inputValue);
    }
  }else{
    setMessage("設問番号を指定してください。");
  }
}

// メッセージを更新
function setMessage(message, color){
  const modalMessage = document.getElementById('inputMessage');
  modalMessage.innerHTML = message;
  modalMessage.style.color = color || 'black';  
}

// JSONデータの取得
export async function getJson(id){
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
      Questions.start(json, id);
    }else{
      // データ取得失敗
      console.log('JSON not found.');
      const surveyMessage = document.getElementById('surveyMessage');
      surveyMessage.innerHTML = '';
      inputId();
      const idInput = document.getElementById('idInput');
      idInput.value = id;
      setMessage("該当データが見つかりませんでした。", "red");
    }
  } catch (error) {
    console.error('Fetch failed:', error);
    setMessage("処理エラーが発生したました。", "red");
  }
}