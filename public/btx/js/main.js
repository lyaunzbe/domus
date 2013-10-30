$(function(){
  $.support.cors = true;

  function roundCurr(num) {
    return Math.round(num * 1000) / 1000;
  }

  var base = 'http://benlyaunzon.com:3737/'
  
  $('.submit').click(function(){
    
    var data = {
      amount: $('.amt').val()
    };

    console.log(data);
    $.ajax({
      type: "POST",
      url: base + 'quote',
      data: data,
      dataType: 'json',
      crossDomain: true
    }).done(function(result){
      $('.buy span').empty();
      $('.sell span').empty();

      $('.buy .q').append(' '+roundCurr(result.buy.valBTC)+' BTC / '+
        roundCurr(result.buy.valUSD)+' USD');
      $('.buy .x').append(' '+roundCurr(result.buy.rate)+' USD => 1 BTC');
      $('.buy .d').append(roundCurr(result.buy.depth));

      $('.sell .q').append(' '+roundCurr(result.sell.valBTC)+' BTC / '+
        roundCurr(result.sell.valUSD)+' USD');
      $('.sell .x').append(' '+roundCurr(result.sell.rate)+' USD => 1 BTC');
      $('.sell .d').append(roundCurr(result.sell.depth));
    }).fail(function (jqXHR, textStatus, errorThrown) { console.log(textStatus); })
  })

});