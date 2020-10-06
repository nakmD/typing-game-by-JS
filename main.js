'use strict'

$(function() {

  //jQueryオブジェクトを変数に代入
  const $yomi = $('#yomi');
  const $mondai = $('#mondai');
  const $finishPanel = $('#finish-panel');
  const $countSelect = $('#count-select');
  const $correctMessage = $('#correct-message');
  const $mistakeMessage = $('#mistake-message');
  
  //問題用の変数の初期化
  let char_index = 1;
  let max_length = 3;//TODO 最初の問題
  let question_number = 1;
  let question_limit = 3;
  let done_questions = {};
  let typing_cnt = 0; //タイプした合計
  let correct_cnt = 0; //正解タイプ数
  let mistake_cnt = 0; //間違えたタイプ数
  
  
  //問題
  const MONDAI_LIST = [
    {yomi:'ごはん', text:'gohan'},
    {yomi:'おすし', text:'osushi'},
    {yomi:'サイフ', text:'saifu'},
    {yomi:'バナナ', text:'banana'},
    {yomi:'くつした', text:'kutsushita'},
    {yomi:'なべ', text:'nabe'},
    {yomi:'あし', text:'ashi'},
    {yomi:'パソコン', text:'pasokon'},
    {yomi:'けいたい', text:'keitai'},
    {yomi:'ふとん', text:'futon'},
  ];
  
  changeQuestionWord(getQuestionNumber());//最初の問題の設定

  $countSelect.on('change', function(e) {
    question_limit = Number($countSelect.val());
    done_questions = {}; //ここ大事。無限ループ回避
    changeQuestionWord(getQuestionNumber());
  });

  // MONDAI_LIST[0]['yomi'] = ごはん、 MONDAI_LIST[1]['yomi'] = おすし。です

  $(document).on('keypress', function(e) {
    // console.log('key:' + e.key);
    typing_cnt++;

    const $target = $('#char-' + char_index);
    const char = $target.text();
    if(e.key === char) { // 入力文字と現在の位置の文字が一緒だったら
      // alert('正解！');
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
      correct_cnt++;
    } else {
      mistake_cnt++;
    }

    if(max_length < char_index) {
      question_number++; //次の問題の用意
      if(question_limit < question_number) {
        finish();
        return;
      }
      changeQuestionWord(getQuestionNumber());
      char_index = 1;//初期化
    }

  });
  
  function getQuestionNumber() {
    let random_number = Math.floor(Math.random() * 10);
    while (done_questions[random_number] !== undefined) {//done_questions[random_number]が存在する時は、while内のループ処理を実施する
      random_number = Math.floor(Math.random() * 10);
    }
    done_questions[random_number] = random_number; //出題済みとしてnumberを格納する
    // const random_number = Math.floor(Math.random() * 10);
    return random_number;
  }

  function finish() {
    $finishPanel.removeClass('hidden');
    $yomi.hide();
    $mondai.hide();
    $correctMessage.text('正解数:' +correct_cnt+'/'+typing_cnt+'('+Math.floor(correct_cnt/typing_cnt * 100)+'%)');
    $mistakeMessage.text('間違い数:'+mistake_cnt+'/'+typing_cnt+'('+Math.floor(mistake_cnt/typing_cnt * 100)+'%)');
    // alert('問題終了！');
  }

  function changeQuestionWord(index) {
    const word = MONDAI_LIST[index]['text'];
    max_length = word.length; //文字数を取得
    let newHtml = '';
    for (let i = 0; i < max_length; i++) {
      newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>';
    }
    $mondai.html(newHtml);
    //次の問題の実装
    $yomi.text(MONDAI_LIST[index]['yomi']);// ２問目=おすし、3問目=サイフ..
    //console.log('newHtml: '+newHtml); //確認用
    // MONDAI_LIST.html(newHtml); // htmlを入れ替える
  }

});