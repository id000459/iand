
var templatetype;
$(document).ready(function ()
{
	$("#btnSearch").click(function ()
	{
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val();
		searchmovies(url, "movielisttemplate","movielist");
	});
	 
	$("#btnList").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val();
		searchmovies(url, "movielisttemplate","movielist");
		templatetype = "list";
	});

	$("#btnGrid").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val();
		searchmovies(url, "moviegridtemplate","movielist");
		templatetype = "grid";
	});	

	/* $("#btnList2").click(function ()
	{ 
		var url="https://www.googleapis.com/movies/v1/users/111815788291054011027/movieshelves/5/volumes";
		searchmovies(url, "movielisttemplate","movielist2");
		templatetype = "list";
	});

	$("#btnGrid2").click(function ()
	{ 
		var url="https://www.googleapis.com/movies/v1/users/111815788291054011027/movieshelves/5/volumes";
		searchmovies(url, "moviegridtemplate","movielist2");
		templatetype = "grid";
	});					 
  */
 
});

function searchmovies(servicePoint, templatetype, elementname)
{
	$("#" + elementname).html("Searching ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");

	pageNumberContainer.classList.remove("pageNumberHide");
	pageNumberContainer.classList.add("pageNumberShow");

	$.getJSON(servicePoint, function (jsonData)
	{
		$("#" + elementname).html("");					
		var template = $('#' + templatetype ).html();
		var html = Mustache.render(template, jsonData);
		$("#" + elementname).html(html);

		$(".movielistitemheader").on('click', function () 
		{ 
			div=$(this).next(); // get the movie details div
			getmovieDetails($(this).attr("data-movieid"), div);
		});	

		$(".infobtn").on('click', function () 
		{ 
			div=$(this).next(); // get the movie details div
			getGridmovieDetails($(this).attr("data-movieid"), div);
		});
	 
	});	
 
 
}				 

function getmovieDetails(movieid, div)
{
	 $("#moviedetails").html("Working ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");

	 $.getJSON("https://api.themoviedb.org/3/movie/" + movieid + "?api_key=2034377edd6aba446d2cd930085ab35f" , function (jsonData)
	 {
		var template = $('#movielistdetailstemplate').html();
		var html = Mustache.render(template, jsonData);
		$(div).html(html);
		$(div).slideToggle();
	 });
}

function getGridmovieDetails(movieid)
{
	 $("#movieDetail").html("Working ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");
	 $.getJSON("https://api.themoviedb.org/3/movie/" + movieid + "?api_key=2034377edd6aba446d2cd930085ab35f" , function (jsonData)
	 {
		$("#movieDetail").html("");
		var template = $('#moviegriddetailstemplate').html();
		var html = Mustache.render(template, jsonData);
		$("#movieDetail").html(html);
	 });
}

function openTab(evt, tabName) 
{
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");

	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tablinks");

	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

	/* if (tabName == "movieshelfTab") {
		var url="https://www.googleapis.com/movies/v1/users/111815788291054011027/movieshelves/5/volumes";
		searchmovies(url, "movielisttemplate","movielist2");
	} */

};
 
function pageClick(buttonNumber)
{
	
	var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val() + '&page=' + buttonNumber;
	if (templatetype == "grid") {
		searchmovies(url, "moviegridtemplate","movielist");
	} else {
		searchmovies(url, "movielisttemplate","movielist");

	}
}

$('#genrediv').hover(function (e) {    
    var target = '#' + ($(this).attr('data-popbox'));
    $(target).show();
    moveLeft = $(this).outerWidth();
    moveDown = ($(target).outerHeight() / 2);
}, function () {
    var target = '#' + ($(this).attr('data-popbox'));
    if (!($("#genrediv").hasClass("show"))) {
        $(target).hide(); //dont hide popup if it is clicked
    }
});
/* $('a.popper').click(function (e) {
    var target = '#' + ($(this).attr('data-popbox'));
    if (!($(this).hasClass("show"))) {
        $(target).show();
    }
    $(this).toggleClass("show");
}); */

		