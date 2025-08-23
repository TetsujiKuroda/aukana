//--------------------------------------------------------------------------------
// Post.js
//--------------------------------------------------------------------------------

export function exec(answerData){
  console.log("Post.exec()");

  // 回答データを送信
  const actionMessage = document.getElementById("actionMessage");
  actionMessage.innerHTML = '<p><span class="loading-spinner"></span>送信中...</p>';
  actionMessage.classList.remove('hidden');
  setTimeout(function(){ finished(); }, 3000);  // フェッチ処理のダミー
}

// データ登録完了
function finished(){
  console.log("Post.finished()");

  // 完了メッセージを表示
  const surveyMessage = document.getElementById("surveyMessage");
  surveyMessage.innerText = "";
  const questionText = document.getElementById("questionText");
  questionText.innerText = "回答を登録しました。";
  const questionOptions = document.getElementById("questionOptions");
  questionOptions.innerHTML = "";
  const questionActions = document.getElementById('questionActions');
  questionActions.classList.add('hidden');

  // リンク表示
  const actionMessage = document.getElementById("actionMessage");
  actionMessage.innerHTML = [
    '<a href="index.html" class="my-6 text-indigo-600 text-base">トップに戻る</a>'
  ].join('');
  actionMessage.classList.remove('hidden');
}

function error(){
  console.log("Post.error()");
}