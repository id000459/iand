$(document).ready(function(){


  var compilation = function (url, tplId, anchor) {
       $.getJSON(url, function(data) {


                var template = $(tplId).html();
                var stone = Handlebars.compile(template)(data);
                $(anchor).append(stone);




       });
    }
      //4b.function firing
      compilation('../jobs.json', '#listing-template', '#listing-container'); // since url = 'data.json' , we can use both notations.



    var  modalFunction  = function (index) {
      $.getJSON('../jobs.json', function(data) {
        var jsonIndexData = data[index];
        var template = $('#Job-Modal').html();
        var modalData = Handlebars.compile(template)(jsonIndexData);
        $(anchor).append(modalData);
        alert("I work");
      });
    }








}); // end ready
