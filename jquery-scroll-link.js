/*

	Just add the class anchor at your <a> tag and it will slide to bookmark, user with no javascript will 
	still go to destination with the normal html anchor

	*Requires jquery.easing.js for complex easing	
*/
$(function(){

			//set global variables and cache DOM elements for reuse later
			var nav = $('nav').first(),
				navElements = nav.find('a'),
				navHref = navElements.attr("href"),
				bookmarks = $('a[name]');
				console.log(bookmarks.length)
				console.log(navElements.length)		
			var curUrl = window.location.pathname;
			var curFilename = curUrl.substring(curUrl.lastIndexOf('/')+1);	
			
		
				$(window).scroll(function(e){
					checkSelected($(window).scrollTop())
				});

				function getScrollTop(elem){
					console.log(elem);
					//gets the id of the section header
					//from the navigation's href e.g. ("#html")
					var elementClick = elem.attr("href");
					var goClick = elementClick.substring(elementClick.lastIndexOf('#'));
					//Height of the navigation
					var offset = 0;
		
					//Gets the distance from the top and 
					//subtracts the height of the nav.
					return $(goClick).offset().top - offset;
				}

		

				navElements.click(function () {	
					var li = $(this).closest("li");

					var destination = 0;
		
					console.log(curFilename);
					if(curFilename == "index.php" || curFilename == ""){
						if (li.is(':not(:first-child)')) {
							destination = getScrollTop($(this));
						}
						console.log(destination);
						$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, 1000,"easeOutExpo", function(){});
						return false; 
					}		 
						
				})							

				// Go through each section to see if it's at the top.
				// if it is add an active class
				function checkSelected(scrolledTo){					
					//How close the top has to be to the section.
					var threshold = 100;
		
					var i;
					var scrollTop = 0;
					for (i = 0; i < navElements.length; i++) {
						
						//get next nav item
						var navElement = $(navElements[i]);
						
						//get the distance from top
						if(i!=0){
						scrollTop = getScrollTop(navElement);
						}
						//Check if section is at the top of the page.
						if (scrolledTo > scrollTop - threshold && scrolledTo < scrollTop + threshold) {		
							//remove all selected elements
							navElements.removeClass("current");		
							//add current selected element.
							navElement.addClass("current");
						}
				};		

			}		
	
});