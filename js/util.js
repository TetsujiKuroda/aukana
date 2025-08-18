//--------------------------------------------------------------------------------
// Util.js
//--------------------------------------------------------------------------------

// メッセージ表示
export function setMessage(message, color) {
  const messageBox = document.getElementById('messageBox');
  const classNames = {
    'gray':'text-gray-500',
    'blue':'text-blue-500',
    'green':'text-green-500',
    'red':'text-red-500'
  };
  const cls = classNames[color];
  messageBox.innerHTML = `<p class="${cls}">${message}</p>`;
}

// ボタンの有効化・無効化
export function setButtonState(enable) {
 const uploadButton = document.getElementById('uploadButton');
 if (enable) {
   // ボタンを有効化
   uploadButton.disabled = false;
   // uploadButton.classList.remove('button-disabled-style'); // 例: 無効化用クラス
   uploadButton.classList.remove('bg-blue-300', 'cursor-not-allowed'); // 例: 適用していたクラスを削除
   uploadButton.classList.add('bg-indigo-600'); // 例: 通常時のクラスに戻す
 } else {
   // ボタンを無効化
   uploadButton.disabled = true;
   // uploadButton.classList.add('button-disabled-style'); // 例: 無効化用クラス
   uploadButton.classList.remove('bg-indigo-600'); // 例: 通常時のクラスを削除
   uploadButton.classList.add('bg-blue-300', 'cursor-not-allowed'); // 例: 背景色水色、カーソル禁止マーク
 }
}