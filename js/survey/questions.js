//--------------------------------------------------------------------------------
// Questions.js
//--------------------------------------------------------------------------------
//import * as Util from '/js/survey/util.js';

export function getJson(id){
  console.log(`Questions.getJson(${id})`);
  const surveyTitle = document.getElementById('surveyTitle');
  surveyTitle.textContent = `設問（No. ${id}）を読込中...`;
  surveyTitle.innerHTML = [
    '<span class="loading-spinner"></span>',
    `設問（No. ${id}）を読込中...`
  ].join('');
}
