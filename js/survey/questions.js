//--------------------------------------------------------------------------------
// Questions.js
//--------------------------------------------------------------------------------
import * as Post from '/js/survey/post.js';

// 回答の記憶オブジェクト
const answerData = {};

// 診断を開始 ----------------------------------------------------------------------
export function start(json, id) {
  console.log("Questions.start()");

  // 戻るボタンのイベントリスナー
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", function(){
    goBack(json.items, answerData);
  });

  // 進むボタンのイベントリスナー
  const nextButton = document.getElementById("nextButton");
  nextButton.addEventListener("click", function(){
    goNext(json.items, answerData);
  });

  // 診断タイトルを表示
  const title = document.getElementById("surveyTitle");
  title.innerText = json.title;

  // データ保持
  answerData.id = id;
  answerData.title = json.title;
  answerData.questionIndex = 0;
  answerData.selectedOptions = Array(json.items.length).fill('');

  // 非表示を解除
  const questionArea = document.getElementById("questionArea");
  questionArea.classList.remove('hidden');
  const questionActions = document.getElementById("questionActions");
  questionActions.classList.remove('hidden');

  // アンケート開始
  showQuestion(json.items, answerData);
}

// 質問と回答を表示 ------------------------------------------------------------
function showQuestion(items, answerData){
  console.log("Questions.showQuestion()");
  console.log(answerData);

  // 設問データを取得
  const item = items[answerData.questionIndex];

  // 設問タイトルを表示
  const questionLabel = document.getElementById("surveyMessage");
  if(item.no == "0" || item.no == "99"){
    questionLabel.innerText = item.label;
  }else{
    questionLabel.innerText = `（${item.no}/${items.length - 2}）${item.label}`;
  }

  // 設問を表示
  const questionText = document.getElementById("questionText");
  questionText.innerText = item.question;

  // 選択肢を表示
  const questionOptions = document.getElementById("questionOptions");
  questionOptions.innerHTML = [
    item.option1 ? createButton(1, item.option1) : '',
    item.option2 ? createButton(2, item.option2) : '',
    item.option3 ? createButton(3, item.option3) : '',
    item.option4 ? createButton(4, item.option4) : '',
  ].join('');

  //イベントリスナーを設置
  const optionButtons = document.querySelectorAll('input[name="surveyOption"]');
  if(optionButtons){
    optionButtons.forEach(radio => {
      radio.addEventListener('change', (e) => {
        saveValue(answerData, e.target.value);
      });  
    });
  }

  // すでに回答があれば反映
  const selectedAnswer = answerData.selectedOptions[parseInt(answerData.questionIndex)];
  const selectedButton = document.querySelector(`input[name="surveyOption"][value="${selectedAnswer}"]`);
  if (selectedButton) selectedButton.checked = true;

  // ボタン表示の制御
  const backButton = document.getElementById('backButton');
  if(answerData.questionIndex < 1){
    backButton.classList.add('hidden');
  }else{
    backButton.classList.remove('hidden');
  }
}

// 選択肢ボタンの作成 ------------------------------------------------------------
function createButton(num, caption){
  const class1 = 'block w-full py-3 px-4';
  const class2 = 'text-base font-semibold text-gray-700 peer-checked:bg-green-600 peer-checked:text-white';
  const class3 = 'rounded-lg shadow-md bg-gray-200';
  const class4 = 'cursor-pointer transition-colors duration-200 relative';
    const button = [
    '<div class="py-2 w-full">',
    `<input type="radio" id="option${num}" name="surveyOption" value="${num}" class="hidden peer">`,
    `<label for="option${num}" class="${class1} ${class2} ${class3} ${class4}">`,
      `<p class="mx-1">${caption}</p>`,
    '</label>',
    '</div>'
  ].join('');
  return button;
}

// 選択された値の保存 ------------------------------------------------------------
function saveValue(answerData, value){
  const index = answerData.questionIndex;
  answerData.selectedOptions[index] = value;
  console.log(answerData.selectedOptions);
}

// 戻るボタンのイベントハンドラー --------------------------------------------------
function goBack(items, answerData){
  resetActionMessage();
  const nextButton = document.getElementById("nextButton");
  nextButton.textContent = "次に進む ＞";
  answerData.questionIndex--;
  showQuestion(items, answerData);
}

// 進むボタンのイベントハンドラー --------------------------------------------------
function goNext(items, answerData){
  resetActionMessage();

  if(answerData.questionIndex < items.length - 1){

    // 進むボタンを表示
    const nextButton = document.getElementById("nextButton");
    nextButton.textContent = "次に進む ＞";

    // 選択肢の有無で分岐
    const item = items[answerData.questionIndex];
    if(item.option1 || item.option2 || item.option3 || item.option4){

      // 選択肢が存在するとき（選択状態をチェック）
      const questionOptions = document.getElementById("questionOptions");
      const selectedOption = questionOptions.querySelector('input[type="radio"]:checked');
      if(selectedOption){
        showNext(items, answerData);
      }else{
        setActionMessage('回答を選択してください。', 'red');
      }

    }else{
      // 選択肢が存在しないとき（無条件で次へ進む）
      showNext(items, answerData);
    }        

  }else if(answerData.questionIndex < items.length){
    // 最終ページのとき（回答の送信へ）
    Post.exec(answerData);
  }
}

// 次の設問に進む ------------------------------------------------------------
function showNext(items, answerData){
  const backButton = document.getElementById('backButton');
  backButton.classList.remove('hidden');
  answerData.questionIndex++;
  if(answerData.questionIndex == items.length - 1){
    const nextButton = document.getElementById("nextButton");
    nextButton.textContent = "登録";
  }
  showQuestion(items, answerData);
}

// アクションメッセージ ------------------------------------------------------------
function setActionMessage(msg, color){
  const actionMessage = document.getElementById("actionMessage");
  actionMessage.innerHTML = [
    `<p class="text-base text-${color}-500">`,
    msg,
    '</p>'
  ].join('');
  actionMessage.classList.remove('hidden');
}
function resetActionMessage(){
  const actionMessage = document.getElementById("actionMessage");
  actionMessage.innerHTML = '';
  actionMessage.classList.add('hidden');
}
