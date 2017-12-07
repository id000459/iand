
/* genre parameters*/
var genreid;

/* search parameters*/
var templatetype;
var searchtype ="movie";

/* filter parameters*/
var includeadultmovies = false;
var includeadultshows = false;

var moviesearchtype = "search";
				   
$(document).ready(function ()
{
	$( "#movieselect" ).fadeOut( "fast");
	
	populateddlist();
	
	$(document).on("mouseenter", "a", function() {
		var target = '#' + ($(this).attr('data-popbox'));
		var popuptype = $(this).attr('poptype');
		
		if (popuptype == 'company') {
			var moveLeft = 0;
			var moveDown = 0;
			$.getJSON('https://api.themoviedb.org/3/company/' + $(this).attr('id') + '?api_key=2034377edd6aba446d2cd930085ab35f', function(book) {
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
				$(target).html(bookHTML);
				$(target).show();
				moveLeft = $(target).outerWidth();
				moveDown = ($(target).outerHeight() / 2);
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
		}
		if (popuptype == 'cast') {
			var moveLeft = 0;
			var moveDown = 0;
			$.getJSON('https://api.themoviedb.org/3/person/' + $(this).attr('id') + '?api_key=2034377edd6aba446d2cd930085ab35f', function(book) {
				var bookHTML='<table>';
						
					bookHTML+='<h2>' + book.name + ' </h2>';
					bookHTML+='<tr><strong>Born:</strong> ' + book.birthday + '  </tr><br/>';

					if (book.deathday == null){
					} else {
						bookHTML+='<tr><strong>Died:</strong> ' + book.deathday + ' </tr><br/>';
					}
					if (book.gender == "1"){
						bookHTML+='<tr><strong>Gender:</strong> female </tr><br/>';
					} else {
						bookHTML+='<tr><strong>Gender:</strong> male </tr><br/>';	
					}
					
					if (book.also_known_as == null){
					} else {
						bookHTML+='<tr><strong>AKA:</strong> ' + book.also_known_as + ' </tr><br/>';
					}
					
					if (book.bio == null){
						bookHTML+='<tr><strong>Bio:</strong> N/A </tr><br/>';
					} else {
						bookHTML+='<tr><strong>Bio:</strong> ' + book.also_known_as + ' </tr><br/>';
					}
					
					bookHTML+='<tr><strong>Popularity:</strong> ' + book.popularity + '  </tr><br/>';

					
	
					bookHTML+="</table>"
				$(target).html(bookHTML);
				$(target).show();
				moveLeft = $(target).outerWidth();
				moveDown = ($(target).outerHeight() / 2);
			
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
		}
		
	});
	
	$(document).on("mouseleave", "a", function() {
		var target = '#' + ($(this).attr('data-popbox'));
		var popuptype = $(this).attr('poptype');
		
		$(target).hide();
	});
	
		
	/* movie buttons*/
	$("#btnSearch").click(function ()
	{
		if (moviesearchtype == "search") {
			var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultmovies + "&query=" + $("#searchTerm").val();
			searchmovies(url, "movielisttemplate","movielist");
		} else {
			if ($( "#movieselect" ).val() == "In Theaters") {
				var d = new Date();
				var lastmonth = d.getMonth()
				var url='https://api.themoviedb.org/3/discover/' + searchtype + '?api_key=2034377edd6aba446d2cd930085ab35f&primary_release_date.gte=' + d.getDay() + "/" + lastmonth  + "/" + d.getFullYear() + '&primary_release_date.lte=' + d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear() ;
				searchmovies(url, "movielisttemplate","movielist");

				
			}
			
		}
	});	 
	 
	$("#btnList").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/" + moviesearchtype + "/movie?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultmovies + "&query=" + $("#searchTerm").val();
		searchmovies(url, "movielisttemplate","movielist");
		templatetype = "list";
	});

	$("#btnGrid").click(function ()
	{ 
		searchtype ="movie";
		var url="https://api.themoviedb.org/3/" + moviesearchtype + "/" + searchtype + "?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultmovies + "&query=" + $("#searchTerm").val();
		searchmovies(url, "moviegridtemplate","movielist");
		templatetype = "grid";
	});	
	
	$("#movieadultcheck").change(function() {
		if(this.checked) {
			includeadultmovies = false;
			
		} else {
			includeadultmovies = true;
			
		}
	});
	
	$("#moviediscovercheck").change(function() {
		if(this.checked) {
			moviesearchtype = "discover";
			$( "#movieselect" ).fadeIn( "fast");
			$( "#searchTerm" ).fadeOut( "fast");
		} else {
			moviesearchtype = "search";
			$( "#movieselect" ).fadeOut( "fast");
			$( "#searchTerm" ).fadeIn( "fast");
		}
	});
	

	
	/* tv buttons*/
	$("#btnSearchtv").click(function ()
	{
		var url="https://api.themoviedb.org/3/search/tv?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultshows + "&query=" + $("#searchTermtv").val();
		searchmovies(url, "tvlisttemplate","tvlist");
	});
	
	$("#btnGridtv").click(function ()
	{ 
		searchtype="tv";
		var url="https://api.themoviedb.org/3/" + moviesearchtype + "/" + searchtype + "?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultmovies + "&query=" + $("#searchTermtv").val();
		searchmovies(url, "moviegridtemplate","tvlist");
		templatetype = "grid";
	});
	
	$("#btnListtv").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/" + moviesearchtype + "/movie?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultmovies + "&query=" + $("#searchTerm").val();
		searchmovies(url, "tvlisttemplate","tvlist");
		templatetype = "list";
	});
	
	$("#tvadultcheck").change(function() {
		if(this.checked) {
			includeadultshows = false;
		} else {
			includeadultshows = true;
		}
	});
	
	
	
	/* genre buttons*/
	$("#btnGridgenre").click(function ()
	{ 
		searchtype ="movie";
		var url="https://api.themoviedb.org/3/genre/" + genreid + "/movies?api_key=2034377edd6aba446d2cd930085ab35f&language=en-US";
		searchmovies(url, "moviegridtemplate","genrelist");
		templatetype = "grid";
	});
	
	$("#btnListgenre").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/genre/" + genreid + "/movies?api_key=2034377edd6aba446d2cd930085ab35f&language=en-US";
		searchmovies(url, "genrelisttemplate","genrelist");
		templatetype = "list";
	});
	
 
 
});

function searchmovies(servicePoint, templatetype, elementname)
{
	
	
	$("#" + elementname).html("Searching ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");
	
	if (templatetype == "tvlisttemplate") {
		pageNumberContainertv.classList.remove("pageNumberHide");
		pageNumberContainertv.classList.add("pageNumberShow");
	} else if (templatetype == "genrelisttemplate") {
		pageNumberContainergenre.classList.remove("pageNumberHide");
		pageNumberContainergenre.classList.add("pageNumberShow");
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
		$(".genrelistitemheader").on('click', function () 
		{ 
			div=$(this).next(); // get the tv details div
			getmovieDetails($(this).attr("data-movieid"), div);
		});	
		$(".boxitem").on('click', function () 
		{ 
			div=$(this).next(); // get the movie details div
			getGridDetails($(this).attr("id"), div);
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
	 
	 getActors(movieid, "#actorslist");
	 
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

function getGridDetails(movieid)
{
	 $("#movieDetail").html("Working ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");
	 $.getJSON("https://api.themoviedb.org/3/" + searchtype + "/" + movieid + "?api_key=2034377edd6aba446d2cd930085ab35f" , function (jsonData)
	 {
		$(movieGridDetail).html("");
		var template = $('#moviegriddetailstemplate').html();
		var html = Mustache.render(template, jsonData);
		$("#movieGridDetail").html(html);
	 });
}

function getActors(movieid, div)
{
	 $.getJSON("https://api.themoviedb.org/3/movie/" + movieid + "/credits?api_key=2034377edd6aba446d2cd930085ab35f" , function (jsonData)
	 {
		var template = $('#actortemplate').html();
		var html = Mustache.render(template, jsonData);
		$(div).html(html);
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
	
	var url="https://api.themoviedb.org/3/" + moviesearchtype + "/movie?api_key=2034377edd6aba446d2cd930085ab35f&include_adult=" + includeadultmovies + "&query=" + $("#searchTerm").val() + '&page=' + buttonNumber;
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
		searchmovies(url, "moviegridtemplate","tvlist");
	} else {
		searchmovies(url, "tvlisttemplate","tvlist");

	}
}

function genrepageClick(buttonNumber)
{
	
	var url="https://api.themoviedb.org/3/genre/" + genreid + "/movies?api_key=2034377edd6aba446d2cd930085ab35f&language=en-US" + '&page=' + buttonNumber;
	if (templatetype == "grid") {
		searchmovies(url, "moviegridtemplate","genrelist");
	} else {
		searchmovies(url, "genrelisttemplate","genrelist");

	}
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

function getcastDetails(movieid, div)
{
	 $.getJSON('https://api.themoviedb.org/3/person/' + movieid + '?api_key=2034377edd6aba446d2cd930085ab35f', function(book) {
				var bookHTML='<table>';
						
					bookHTML+='<h2>' + book.name + ' </h2>';
					bookHTML+='<tr><strong>Born:</strong> ' + book.birthday + '  </tr><br/>';

					if (book.deathday == null){
					} else {
						bookHTML+='<tr><strong>Died:</strong> ' + book.deathday + ' </tr><br/>';
					}
					if (book.gender == "1"){
						bookHTML+='<tr><strong>Gender:</strong> female </tr><br/>';
					} else {
						bookHTML+='<tr><strong>Gender:</strong> male </tr><br/>';	
					}
					
					if (book.also_known_as == null){
					} else {
						bookHTML+='<tr><strong>AKA:</strong> ' + book.also_known_as + ' </tr><br/>';
					}
					
					if (book.bio == null){
						bookHTML+='<tr><strong>Bio:</strong> N/A </tr><br/>';
					} else {
						bookHTML+='<tr><strong>Bio:</strong> ' + book.also_known_as + ' </tr><br/>';
					}
					
					bookHTML+='<tr><strong>Popularity:</strong> ' + book.popularity + '  </tr><br/>';

					
	
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
	genreid = id
	var url="https://api.themoviedb.org/3/genre/" + id + "/movies?api_key=2034377edd6aba446d2cd930085ab35f&language=en-US";
	searchmovies(url, "genrelisttemplate","genrelist");
	openTab(event, 'genretab');
}	