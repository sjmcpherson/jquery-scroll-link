$(function(){

			//set global variables and cache DOM elements for reuse later
			var nav = $('nav').first(),
				navElements = nav.find('a'),
				navHref = navElements.attr("href"),
				bookmarks = $('a[name]'),
				curUrl = window.location.pathname,
				curFilename = curUrl.substring(curUrl.lastIndexOf('/')+1),
				//rolledUp = false;			
				
				//Binds Scroll Event to Browser Window
				function bindScroll(){
					$(window).scroll(function(e){
						setScrollTimer();
						var scrollPos = $(window).scrollTop();
						if(curFilename == "index.php" || curFilename == ""){
							checkSelected(scrollPos);
						}
						//checkHeaderFixed(scrollPos);
					});					
				}
				bindScroll();				
							
				//Sets Timeout to limit the amount of Scroll Events taking place to improve performance			
				function setScrollTimer(){
					unbindScroll();
					scrollTimer = window.setTimeout(function(){bindScroll()}, 10);
				}
				
				//Unbinds Scroll Event
				function unbindScroll(){
					$(window).unbind("scroll");
				}
	
				//Toggles Between Header States
				function checkHeaderFixed(scrollPos) {	
					//Masthead
					if (scrollPos > 60 && !rolledUp) {
						$("header").addClass("fix");							
						rolledUp = true;
					} else if (scrollPos < 101 && rolledUp) {
						$("header").removeClass("fix");
						rolledUp = false;
					}			
				}

	
				function getScrollTop(elem){
					//Gets the id of the section header
					//From the navigation's href e.g. ("#html")
					var elementClick = elem.attr("href");
					var goClick = elementClick.substring(elementClick.lastIndexOf('#'));
					
					//Height of the navigation
					var offset = 54;		
					//Gets the distance from the top and 
					//subtracts the height of the nav.
					return $(goClick).offset().top - offset;
				}

		
				//Nav click event scrolls window to bookmark tag
				navElements.click(function () {	
					$(window).unbind("scroll");
					var li = $(this).closest("li");
					navElements.removeClass("current");		
					//Add current selected element.
					$(this).addClass("current");
					var destination = 0;
		
					if(curFilename == "index.php" || curFilename == ""){
						if (li.is(':not(:first-child)')) {
							destination = getScrollTop($(this));
						}
						$("html,body").animate({scrollTop: destination}, 600, "easeOutExpo", function(){
							bindScroll();						
							//checkHeaderFixed($(window).scrollTop());
						});
						return false; 
					}		 
						
				})			
								
				// NOTE: Needs work on the Threshold Should be determined by the Window Height
				// Go through each section to see if it's at the top. if it is add an active class
				function checkSelected(scrolledTo){					
					//How close to the bookmark the top of the Window needs to be to change the current nav button display
					var threshold = 400;
		
					var scrollTop = 0;
					
					for (var i = 0; i < navElements.length; i++) {
						
						//Get next nav item
						var navElement = $(navElements[i]);
						
						//Get the distance from top
						if(i!=0){
							scrollTop = getScrollTop(navElement);
						}
						//Check if section is at the top of the page.
						if (scrolledTo > scrollTop - threshold && scrolledTo < scrollTop + threshold) {		
							//Remove all selected elements
							navElements.removeClass("current");		
							//Add current selected element.
							navElement.addClass("current");
						}else{
						
						}
				};		

			}		
	
});