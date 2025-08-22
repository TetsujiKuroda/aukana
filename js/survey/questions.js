//--------------------------------------------------------------------------------
// Questions.js
//--------------------------------------------------------------------------------
//import * as Util from '/js/survey/util.js';

// 回答の記憶オブジェクト
const answers = [];

// 診断を開始
export function start(json) {
  console.log("Questions.start()");
  const title = document.getElementById("surveyTitle");
  title.innerText = json.title;
  showQuestion(json.items, 0);
}

// 質問と回答を表示
function showQuestion(items, num){

  // 設問データを取得
  const item = items[num];
  const questionLabel = document.getElementById("surveyMessage");
  questionLabel.innerText = `（${item.no}/${items.length}）${item.label}`;

  // 設問を表示
  const questionText = document.getElementById("questionText");
  questionText.innerText = item.question;
  const questionOptions = document.getElementById("questionOptions");
  questionOptions.innerHTML = [
    item.option1 ? createButton(1, item.option1) : '',
    item.option2 ? createButton(2, item.option2) : '',
    item.option3 ? createButton(3, item.option3) : '',
    item.option4 ? createButton(4, item.option4) : '',
  ].join('');

  // 非表示を解除
  const questionArea = document.getElementById("questionArea");
  questionArea.classList.remove('hidden');
  const questionActions = document.getElementById("questionActions");
  questionActions.classList.remove('hidden');
}

function createButton(num, caption){
  const class1 = 'block w-full py-3 px-4';
  const class2 = 'text-lg font-semibold text-gray-700 peer-checked:bg-green-600 peer-checked:text-white';
  const class3 = 'rounded-lg shadow-md bg-gray-200';
  const class4 = 'cursor-pointer transition-colors duration-200 relative';
    const button = [
    '<div class="py-2">',
    `<input type="radio" id="option${num}" name="surveyOption" value="${num}" class="hidden peer">`,
    `<label for="option${num}" class="${class1} ${class2} ${class3} ${class4}">`,
      `<span class="ml-2">${caption}</span>`,
    '</label>',
    '</div>'
  ].join('');
  return button;
}