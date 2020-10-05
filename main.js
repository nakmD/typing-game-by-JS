'use strict'

$(function() {

  //jQueryオブジェクトを変数に代入
  const $yomi = $('#yomi');
  const $mondai = $('#mondai');
  const $finishPanel = $('#finish-panel');
  const $countSelect = $('#count-select');
  
  //問題用の変数の初期化
  let char_index = 1;
  let max_length = 3;//TODO 最初の問題
  let question_number = 1;
  let question_limit = 3;
  
  
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
  
  changeQuestionWord(0);//最初の問題の設定

  $countSelect.on('change', function(e) {
    question_limit = Number($countSelect.val());
    changeQuestionWord(0);
  });

  // MONDAI_LIST[0]['yomi'] = ごはん、 MONDAI_LIST[1]['yomi'] = おすし。です

  $(document).on('keypress', function(e) {
    // console.log('key:' + e.key);
    const $target = $('#char-' + char_index);
    const char = $target.text();
    if(e.key === char) { // 入力文字と現在の位置の文字が一緒だったら
      // alert('正解！');
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
    }

    if(max_length < char_index) {
      question_number++; //次の問題の用意
      if(question_limit < question_number) {
        finish();
        return;
      }
      changeQuestionWord(question_number);
      char_index = 1;//初期化
    }

  });

  function finish() {
    $finishPanel.removeClass('hidden');
    $yomi.hide();
    $mondai.hide();
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