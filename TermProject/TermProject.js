
var templatetype;
var searchtype;

var includeadultmovies = false;
var includeadultshows = false;
				   
$(document).ready(function ()
{
	
	populateddlist();
	
		
	/* movie buttons*/
	$("#btnSearch").click(function ()
	{
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultmovies + "&query=" + $("#searchTerm").val();
		searchmovies(url, "movielisttemplate","movielist");
	});	 
	 
	$("#btnList").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultmovies + "&query=" + $("#searchTerm").val();
		searchmovies(url, "movielisttemplate","movielist");
		templatetype = "list";
	});

	$("#btnGrid").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultmovies + "&query=" + $("#searchTerm").val();
		searchmovies(url, "moviegridtemplate","movielist");
		templatetype = "grid";
	});	
	
	$("#movieadultcheck").change(function() {
		if(this.checked) {
			includeadultmovies = true;
		} else {
			includeadultmovies = false;
		}
	});
	

	
	/* tv buttons*/
	$("#btnSearchtv").click(function ()
	{
		var url="https://api.themoviedb.org/3/search/tv?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultshows + "&query=" + $("#searchTermtv").val();
		searchmovies(url, "tvlisttemplate","tvlist");
	});
	
	$("#showadultcheck").change(function() {
		if(this.checked) {
			includeadultshows = true;
		} else {
			includeadultshows = false;
		}
	});
	
	
 
 
});

function searchmovies(servicePoint, templatetype, elementname)
{
	
	
	$("#" + elementname).html("Searching ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");
	searchtype = $('.selectlist').val();
	
	if (templatetype == "tvlisttemplate") {
		pageNumberContainertv.classList.remove("pageNumberHide");
		pageNumberContainertv.classList.add("pageNumberShow");
	} else {
		pageNumberContainer.classList.remove("pageNumberHide");
		pageNumberContainer.classList.add("pageNumberShow");
	}
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
		$(".tvlistitemheader").on('click', function () 
		{ 
			div=$(this).next(); // get the tv details div
			getTVDetails($(this).attr("data-tvid"), div);
		});	
		$(".infobtn").on('click', function () 
		{ 
			div=$(this).next(); // get the movie details div
			getGridmovieDetails($(this).attr("data-movieid"), div);
		});
	 
	});		
	
 
}	

function init(id) {	
	getpop(id);
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

function getTVDetails(movieid, div)
{
	 $("#TVdetails").html("Working ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");

	 $.getJSON("https://api.themoviedb.org/3/tv/" + movieid + "?api_key=2034377edd6aba446d2cd930085ab35f" , function (jsonData)
	 {
		var template = $('#tvlistdetailstemplate').html();
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

};
 
function pageClick(buttonNumber)
{
	
	var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultmovies + "&query=" + $("#searchTerm").val() + '&page=' + buttonNumber;
	if (templatetype == "grid") {
		searchmovies(url, "moviegridtemplate","movielist");
	} else {
		searchmovies(url, "movielisttemplate","movielist");

	}
}

function tvpageClick(buttonNumber)
{
	
	var url="https://api.themoviedb.org/3/search/tv?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultshows + "&query=" + $("#searchTermtv").val() + '&page=' + buttonNumber;
	if (templatetype == "grid") {
		searchmovies(url, "tvlisttemplate","tvlist");
	} else {
		searchmovies(url, "tvlisttemplate","tvlist");

	}
}

function getpop(movieid)
{
	
	var moveLeft = 0;
	var moveDown = 0;
	$('a.popper').hover(function (e) {
		var target = '#' + ($(this).attr('data-popbox'));
		var popuptype = $(this).attr('poptype');
		
		if (popuptype == 'company') {
			getcompanymovieDetails(movieid, target);
		}
		
		$(target).show();
		
		moveLeft = $(this).outerWidth();
		moveDown = ($(target).outerHeight() / 2);
	}, function () {
		var target = '#' + ($(this).attr('data-popbox'));
		if (!($("a.popper").hasClass("show"))) {
			$(target).hide();
		}
	});

	$('a.popper').mousemove(function (e) {
		var target = '#' + ($(this).attr('data-popbox'));

		leftD = e.pageX + parseInt(moveLeft);
		maxRight = leftD + $(target).outerWidth();
		windowLeft = $(window).width() - 40;
		windowRight = 0;
		maxLeft = e.pageX - (parseInt(moveLeft) + $(target).outerWidth() + 20);

		if (maxRight > windowLeft && maxLeft > windowRight) {
			leftD = maxLeft;
		}

		topD = e.pageY - parseInt(moveDown);
		maxBottom = parseInt(e.pageY + parseInt(moveDown) + 20);
		windowBottom = parseInt(parseInt($(document).scrollTop()) + parseInt($(window).height()));
		maxTop = topD;
		windowTop = parseInt($(document).scrollTop());
		if (maxBottom > windowBottom) {
			topD = windowBottom - $(target).outerHeight() - 20;
		} else if (maxTop < windowTop) {
			topD = windowTop + 20;
		}

		$(target).css('top', topD).css('left', leftD);
	});
	$('a.popper').click(function (e) {
		var target = '#' + ($(this).attr('data-popbox'));
		if (!($(this).hasClass("show"))) {
			$(target).show();
		}
		$(this).toggleClass("show");
	});
}

function getcompanymovieDetails(movieid, div)
{
	 $.getJSON('https://api.themoviedb.org/3/company/' + movieid + '?api_key=2034377edd6aba446d2cd930085ab35f', function(book) {
				var bookHTML='<table>';
						
					bookHTML+='<h2>' + book.name + ' </h2>';
					if (book.logo_path == null){	
						bookHTML+='<img src="../photos/NOIMG.png" style="float: right;margin-right:1em;"/>';
					} else {
						bookHTML+='<img src="https://image.tmdb.org/t/p/w92/' + book.logo_path + '" style="float: right"/>';
					} 
					
					if (book.headquarters == null){
						bookHTML+='<tr><strong>Headquarters:</strong> N/A </tr><br/>';
					} else {
						bookHTML+='<tr><strong>Headquarters:</strong> ' + book.headquarters + ' </tr><br/>';
					}
					
					if (book.homepage == null){
						bookHTML+='<tr><strong>Homepage:</strong> N/A </tr>';
					} else {
						bookHTML+='<tr><strong>Homepage:</strong> ' + book.homepage + ' </tr>';
					}
	
					bookHTML+="</table>"
				$(div).html(bookHTML);
			
			});
					
}

function populateddlist()
{
	$.getJSON("https://api.themoviedb.org/3/genre/movie/list?api_key=2034377edd6aba446d2cd930085ab35f&language=en-US" , function (jsonData)
	 {
		$('#ddlist').html("");					
		var template = $('#dropdowntemplate' ).html();
		var html = Mustache.render(template, jsonData);
		$('#ddlist').html(html);
	 });
	 
}

function listselect(id)
{
	var url="https://api.themoviedb.org/3/genre/" + id + "/movies?api_key=2034377edd6aba446d2cd930085ab35f&language=en-US";
	searchmovies(url, "movielisttemplate","movielist");
	openTab(event, 'searchTab');
}	