$(document).ready(function(){




    var  modalFunction  = function (index) {
      $.getJSON('../id000459/jobs.json', function(data) {
        var jsonIndexData = data[index];
        var template = $('#Job-Modal').html();
        var modalData = Handlebars.compile(template)(jsonIndexData);
        $(anchor).append(modalData);
        alert("I work");
      });
    }








}); // end ready
