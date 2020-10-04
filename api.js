
var symbol= 'AAPL';
$.getJSON(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts?region=US&lang=en&symbol=${symbol}&interval=1d&range=3mo&rapidapi-key=35a6bda002mshe28e11703e65a22p1fac4djsn27decb9d3157`,function(data){
    var helo= data.chart.result[0].indicators.quote[0].high[1];
    $(".high").append(helo);
    //console.log(data);
 })
    //var high= data.chart.result[0].indicator.quote[0].high[1];
    //$('.high').append(high);
 