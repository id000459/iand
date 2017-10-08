$(document).ready(function(){


  var compilation = function (url, tplId, anchor) {
       $.getJSON(url, function(data) {


                var template = $(tplId).html();
                var stone = Handlebars.compile(template)(data);
                $(anchor).append(stone);




       });
    }
      //4b.function firing
      compilation('../milestone1/link1.json', '#listing-template', '#listing-container'); // since url = 'data.json' , we can use both notations.









}); // end ready
