let wordDict = {
  "apple": "apple",
  "dog": "dog",
  "cat": "cat"
};

let currentWord;
let inputBox;
let submitButton;
let nextButton;
let resultText = "";
let isAnswerChecked = false;
let remainingWords;
let isFinished = false;

function setup() {
  createCanvas(400, 400);
  resetWordList();  // 単語リストを初期化して新しい単語を選択

  // 入力ボックスの作成
  inputBox = createInput();
  inputBox.position(20, 350);
 
  // 送信ボタンの作成
  submitButton = createButton('Submit');
  submitButton.position(inputBox.x + inputBox.width + 10, 350);
  submitButton.mousePressed(checkAnswer);
 
  // 次の問題ボタンの作成（最初は非表示）
  nextButton = createButton('Next Question');
  nextButton.position(submitButton.x + submitButton.width + 10, 350);
  nextButton.mousePressed(nextQuestion);
  nextButton.hide();
 
  resultText = "";
}

function draw() {
  background(220);
 
  textSize(16);
  fill(0);
 
  if (isFinished) {
    text("終了", 150, 200);  // すべての問題が解き終わったら「終了」を表示
  } else {
    // 現在のイラストを表示
    drawIllustration(currentWord);
   
    // 結果を表示
    text(resultText, 20, 320);
  }
}

function checkAnswer() {
  if (!isAnswerChecked) {
    let userAnswer = inputBox.value().toLowerCase();  // 入力値を取得
   
    // 正しい答えかチェック
    if (userAnswer === currentWord) {
      resultText = "Correct!";
    } else {
      resultText = `Wrong! The correct answer is: ${currentWord}`;
    }

    isAnswerChecked = true;  // 答えが確認された
    inputBox.attribute('disabled', '');  // 入力ボックスを無効化
    submitButton.hide();  // 送信ボタンを隠す
    nextButton.show();  // 次の問題ボタンを表示
  }
}

function nextQuestion() {
  resultText = "";
 
  if (remainingWords.length === 0) {
    isFinished = true;  // すべての問題を解き終わった
  } else {
    pickNewWord();  // 新しい単語とイラストをランダムに選択
    inputBox.removeAttribute('disabled');  // 入力ボックスを再度有効化
    inputBox.value('');  // 入力ボックスをクリア
    isAnswerChecked = false;  // 答え確認状態をリセット

    // ボタンの表示を元に戻す
    submitButton.show();
    nextButton.hide();
  }
}

function resetWordList() {
  remainingWords = Object.keys(wordDict);  // 単語リストを初期化
  pickNewWord();  // 最初の単語を選択
}

function pickNewWord() {
  if (remainingWords.length > 0) {
    currentWord = random(remainingWords);  // ランダムに単語を選択
    remainingWords = remainingWords.filter(word => word !== currentWord);  // 選択した単語をリストから削除
  }
}

// イラストを描画する関数
function drawIllustration(word) {
  fill(255, 204, 0);
  stroke(0);

  if (word === "apple") {
    fill(255, 0, 0);
    ellipse(200, 200, 150, 150);  // リンゴの円
    fill(0, 150, 0);
    rect(190, 120, 20, 50);  // 茎

  } else if (word === "dog") {
    fill(150, 75, 0);
    ellipse(200, 220, 100, 60);  // 体
    ellipse(170, 180, 40, 50);   // 左耳
    ellipse(230, 180, 40, 50);   // 右耳
    ellipse(200, 180, 60, 60);   // 顔
    fill(0);
    ellipse(185, 170, 10, 10);   // 左目
    ellipse(215, 170, 10, 10);   // 右目
    ellipse(200, 190, 10, 10);   // 鼻
    stroke(0);
    line(200, 190, 200, 210);    // 口
    noStroke();
   
    // 犬の足を描画
    fill(0);
    ellipse(180, 250, 30, 20);   // 左前足
    ellipse(220, 250, 30, 20);   // 右前足
    ellipse(170, 270, 30, 20);   // 左後ろ足
    ellipse(230, 270, 30, 20);   // 右後ろ足

  } else if (word === "cat") {
    fill(150, 75, 0); // 体の色
    ellipse(200, 200, 100, 60);   // 体
    fill(255);  // 白色
    ellipse(200, 160, 50, 50);    // 顔
   
    // 耳を描画
    fill(150, 75, 0);
    triangle(180, 140, 200, 120, 220, 140); // 左耳
    fill(255);  // 耳の内側
    triangle(180, 140, 190, 125, 200, 140); // 左耳の内側
    triangle(220, 140, 210, 125, 200, 140); // 右耳の内側
   
    fill(0); // 目と鼻の色
    ellipse(185, 160, 10, 10);    // 左目
    ellipse(215, 160, 10, 10);    // 右目
    fill(255, 0, 0);
    ellipse(200, 180, 8, 8);    // 鼻

    // 口を描画
    stroke(0);
    line(200, 190, 200, 200); // 口の中央
    noStroke();
    fill(0);
    arc(200, 195, 20, 10, 0, PI); // 笑っている口

    // 猫の足を描画
    fill(0);
    ellipse(180, 250, 20, 15);   // 左前足
    ellipse(220, 250, 20, 15);   // 右前足
    ellipse(170, 270, 20, 15);   // 左後ろ足
    ellipse(230, 270, 20, 15);   // 右後ろ足
  }
}
