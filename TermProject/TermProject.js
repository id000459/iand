
var templatetype;
$(document).ready(function ()
{
	$("#btnSearch").click(function ()
	{
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val();
		searchBooks(url, "booklisttemplate","booklist");
	});
	 
	$("#btnList").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val();
		searchBooks(url, "booklisttemplate","booklist");
		templatetype = "list";
	});

	$("#btnGrid").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val();
		searchBooks(url, "bookgridtemplate","booklist");
		templatetype = "grid";
	});	

	$("#btnList2").click(function ()
	{ 
		var url="https://www.googleapis.com/books/v1/users/111815788291054011027/bookshelves/5/volumes";
		searchBooks(url, "booklisttemplate","booklist2");
		templatetype = "list";
	});

	$("#btnGrid2").click(function ()
	{ 
		var url="https://www.googleapis.com/books/v1/users/111815788291054011027/bookshelves/5/volumes";
		searchBooks(url, "bookgridtemplate","booklist2");
		templatetype = "grid";
	});					 
 
 
});

function searchBooks(servicePoint, templatetype, elementname)
{
	$("#" + elementname).html("Searching ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");

	/* pageNumberContainer.classList.remove("pageNumberHide");
	pageNumberContainer.classList.add("pageNumberShow"); */

	$.getJSON(servicePoint, function (jsonData)
	{
		$("#" + elementname).html("");					
		var template = $('#' + templatetype ).html();
		var html = Mustache.render(template, jsonData);
		$("#" + elementname).html(html);

		/* $(".booklistitemheader").on('click', function () 
		{ 
			div=$(this).next(); // get the book details div
			getBookDetails($(this).attr("data-bookid"), div);
		});	

		$(".boxitem").on('click', function () 
		{ 
			div=$(this).next(); // get the book details div
			getGridBookDetails($(this).attr("data-bookid"), div);
		}); */
	 
	});	
 
 
}				 

function getBookDetails(bookid, div)
{
	 $("#bookdetails").html("Working ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");

	 $.getJSON("https://www.googleapis.com/books/v1/volumes/" + bookid, function (jsonData)
	 {
		var template = $('#booklistdetailstemplate').html();
		var html = Mustache.render(template, jsonData);
		$(div).html(html);
		$(div).slideToggle();
	 });
	}

	function getGridBookDetails(bookid)
	{
	 $("#bookDetail").html("Working ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");
	 //we can use AJAX here because this service provider allows cross origin request
	 $.getJSON("https://www.googleapis.com/books/v1/volumes/" + bookid, function (jsonData)
	 {
		$("#bookDetail").html("");
		var template = $('#bookgriddetailstemplate').html();
		var html = Mustache.render(template, jsonData);
		$("#bookDetail").html(html);
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

	if (tabName == "bookshelfTab") {
		var url="https://www.googleapis.com/books/v1/users/111815788291054011027/bookshelves/5/volumes";
		searchBooks(url, "booklisttemplate","booklist2");
	}

};
 
function pageClick(buttonNumber)
{
	searchIndex = buttonNumber * 10;
	
	var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val() + '&maxResults=10&startIndex=' + searchIndex;
	if (templatetype == "grid") {
		searchBooks(url, "bookgridtemplate","booklist");
	} else {
		searchBooks(url, "booklisttemplate","booklist");

	}
}


		