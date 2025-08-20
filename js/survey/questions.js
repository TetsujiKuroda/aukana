//--------------------------------------------------------------------------------
// Questions.js
//--------------------------------------------------------------------------------
//import * as Util from '/js/survey/util.js';

export function getJson(id){
  console.log(`Questions.getJson(${id})`);
  const url = [
    'https://firebasestorage.googleapis.com/v0/b/',
    'aukana-a0724.firebasestorage.app/o/',
    encodeURIComponent(`json/${id}.json`),
    '?alt=media'
  ].join('')
  const json = 
  console.log(url);
}

// ファイルのフェッチ
async function getJsonFromFirebaseStorage(downloadUrl) {
  try {
    const response = await fetch(downloadUrl);
    if (response.ok) {
      const jsonString = await response.text();
      return JSON.parse(jsonString);
    }else{
      console.log(response.status);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

// 使用例：
// const fileDownloadUrl = 'ここにFirebase StorageのダウンロードURLを貼り付けます';
// getTextFromFirebaseStorage(fileDownloadUrl)
//   .then(fileContent => {
//     console.log("File content:", fileContent);
//     // ここで取得したファイル内容を使って処理を行います
//   })
//   .catch(error => {
//     console.error("Failed to get file content:", error);
//   });
