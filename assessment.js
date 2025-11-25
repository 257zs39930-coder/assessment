'use strict';//厳格モード、タイプミス等を指摘
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener(//イベント検知設定の追加
  'click',//クリックイベント
  function() {//=>でアロー関数にすることも可能
    const userName = userNameInput.value;
     if (userName.length === 0){//長さが0(=入力が無い)とき、
      //名前が空の時は処理を強制終了(return)する
      return;
     }//条件に応じて強制終了するのをガード句と言う
    
     //診断結果表示エリアの作成
     resultDivision.innerText = '';//innerTextは文字の挿入、関数を実行する毎に空文字を挿入して初期化（子要素の全消去と同じ動作）
     const header = document.createElement('h3');//h3タグの作成
     header.innerText = '診断結果';
    resultDivision.appendChild(header)//divタグの子要素として追加
    
    const paragraph = document.createElement('p');//pタグの作成
    const result = assessment(userName);//診断結果を作成
    paragraph.innerText = result;//pタグの内側のテキストを設定
    resultDivision.appendChild(paragraph);//divタグの子要素としてpタグ追加
    
   //ツイートエリアの作成
   tweetDivision.innerText = ''; 
   const anchor = document.createElement('a');
   const hrefValue = 
     'https://twitter.com/intent/tweet?button_hashtag='+
     encodeURIComponent('あなたのいいところ') +
     '&ref_src=twsrc%5Etfw';

   anchor.setAttribute('href',hrefValue);
   anchor.setAttribute('class','twitter-hashtag-button');
   anchor.setAttribute('data-taxt','診断結果の文章');
   anchor.innerText = 'Tweet #あなたのいいところ';

   tweetDivision.appendChild(anchor);//divの子要素を追加


   const script = document.createElement('script');
   script.setAttribute('src','https://platform.twitter.com/widgets.js');
   tweetDivision.appendChild(script);
  }
);

// TODO Enterキーで診断する処理を追加
userNameInput.addEventListener(
  'keydown',//キー入力
  (event) =>{
    if(event.code === 'Enter'){//押されたキーがEnterなら実行
      assessmentButton.dispatchEvent(new Event('click'))//クリックと同じイベントを
    }
  }
)

const answers = [ //配列、constは定数(変更不可)
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
  function assessment(userName){
    //  全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0;i < userName.length; i++){//文字数回繰り返す
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);//文字コードの数値を変数に足す(i文字目の文字コード)
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('###userName###', userName)
    return result;
  }

 // テストを行う関数
function test() {
  console.log('診断結果の文章のテスト');

  //太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') ===
      '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') ===
      '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  
  console.log('診断結果の文章のテスト終了');
}

test();