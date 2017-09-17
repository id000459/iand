$(document).ready(function(){


  var compilation = function (url, tplId, anchor) {
       $.getJSON(url, function(data) {


                var template = $(tplId).html();
                var stone = Handlebars.compile(template)(data);
                $(anchor).append(stone);




       });
    }
      //4b.function firing
      compilation('https://www.googleapis.com/books/v1/volumes/Wfan6L9RGgYC', '#listing-template', '#listing-container'); // since url = 'data.json' , we can use both notations.


