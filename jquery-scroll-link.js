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
			
		
				function bindScroll(){
					$(window).scroll(function(e){
						//bodyScroll();
						checkSelected($(window).scrollTop());
					});					
				}
				
				bindScroll();
				
				function unbindScroll(){
					$(window).unbind("scroll");
				}
	
				function getScrollTop(elem){
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
					$(window).unbind("scroll");
					var li = $(this).closest("li");
					navElements.removeClass("current");		
					//add current selected element.
					$(this).addClass("current");
					var destination = 0;
		
					if(curFilename == "index.php" || curFilename == ""){
						if (li.is(':not(:first-child)')) {
							destination = getScrollTop($(this));
						}
						console.log(destination);
						$("html,body").animate({ 
							scrollTop: destination
						}, 600,
						"easeOutExpo", function()
						{
							bindScroll();
						});
						return false; 
					}		 
						
				})			
								
				  function bodyScroll() {			
						if (scrollTimer != -1)
							clearTimeout(scrollTimer);
				
						scrollTimer = window.setTimeout("scrollFinished()", 500);
				  }
				
					function scrollFinished() {
							checkSelected($(window).scrollTop())
					}
				// Go through each section to see if it's at the top.
				// if it is add an active class
				function checkSelected(scrolledTo){					
					//How close the top has to be to the section.
					var threshold = 300;
		
					var scrollTop = 0;
					for (var i = 0; i < navElements.length; i++) {
						
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
						}else{
						
						}
				};		

			}		
	
});