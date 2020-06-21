'use strict';

{

  //タイピングの課題単語を数列で設定
  const words = [
    'ruby',
    'python',
    'php',
    'java',
    'javascript',
    'jquery',
    'nodejs',
    'linux',
    'centos',
    'vagrant',
    'apache',
    'mysql',
    'laravel',
    'docker',
    'xampp',
    'hoge',
    'vscode',
  ];
  let word ;
  let loc ;
  let score ;
  let miss ;

  //それぞれのId属性を読み込み
  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');


  const timeLimid = 30*1000;  //タイムリミッドを設定。ミリ秒単位
  let startTime ;
  let isPlaying = false;

  //タイピングの結果発表
  function showResult() {
    //条件演算子  スコアとミスの和が0なら0％を、その他は正解率をアラートで表記
      const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
      //toFixedで小数点以下2桁表記
      alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
    }

　
  function updateTimer(){
    //残り時間をtimeLeftに代入。残り時間＝タイムリミッド＋開始時刻－現在時刻
    let timeLeft = timeLimid + startTime - Date.now();
    timerLabel.textContent = (timeLeft/1000).toFixed(2);　//小数第二位まで表記
    const timeoutId = setTimeout(()=>{
      updateTimer();
    },10);//setTimeoutでupdateTimerを10ミリ秒ごとに回して、
    if(timeLeft <= 0){
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      isPlaying = false;
      setTimeout(()=>{
      showResult();
      },100);
      target.textContent = 'click to replay';
    }
  }

  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }

  window.addEventListener('click', () => {
    if(isPlaying===true){
      return;
    };
    loc = 0;
    score = 0; scoreLabel.textContent = score;
    miss = 0; missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
    updateTarget();
    isPlaying = true;
  });

  window.addEventListener('keyup', e => {
    if(isPlaying===true){
      if (e.key === word[loc]) {
        loc++;
        if (loc === word.length) {
          word = words[Math.floor(Math.random() * words.length)];
          loc = 0;
        }
        score++;
        scoreLabel.textContent = score;
        updateTarget();
      } else {
        miss++;
        missLabel.textContent = miss;
      }
    }
  });
}
