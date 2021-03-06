//// hover effect
//$(document).ready(function() {
//  $('div.rightRailEditorial h3').add('div.rightRailEditorial2 h3').hover(function() {
//    $(this).addClass('hover');
//  }, function() {
//    $(this).removeClass('hover');
//  });
//});
//
//// independently show and hide
//$(document).ready(function() {
//  $('div.rightRailEditorial:eq(0) > div').hide();  
//  $('div.rightRailEditorial:eq(0) > h3').click(function() {
//    $(this).next().slideToggle('slow');
//  });
//});
//
//// one showing at a time
//
//$(document).ready(function() {
//  $('div.rightRailEditorial:eq(1) > div:gt(0)').hide();  
//  $('div.rightRailEditorial:eq(1) > h3').click(function() {
//    $(this).next('div:hidden').slideDown('slow')
//    .siblings('div:visible').slideUp('slow');
//  });
//});
//
//
////simultaneous showing and hiding
//
//$(document).ready(function() {
//  $('div.rightRailEditorial2:eq(0) > div').hide();
//  $('div.rightRailEditorial2:eq(0) > h3').click(function() {
//    $(this).next('div').slideToggle('slow')
//    .siblings('div:visible').slideUp('slow');
//  });
//});
//
////queued showing and hiding
//$(document).ready(function() {
//  $('div.rightRailEditorial2:eq(1) > div').hide();  
//  $('div.rightRailEditorial2:eq(1) > h3').click(function() {
//    var $nextDiv = $(this).next();
//    var $visibleSiblings = $nextDiv.siblings('div:visible');
//
//    if ($visibleSiblings.length ) {
//      $visibleSiblings.slideUp('slow', function() {
//        $nextDiv.slideToggle('slow');
//      });
//    } else {
//       $nextDiv.slideToggle('slow');
//    }
//  });
//});


/*
This JQuery creates a closed/open state for the collapsable tout headers.
- All header images have 4 states, they are listed here with their mandatory image endings:
1) open: .gif
2) open hover: _hover.gif
3) closed: _closed.gif
4) closed hover: _closed_hover.gif

- The image must also have a class of ".slide_tout_rollover"

- Please note, TMPL_UNLESS is used to set the DD tag to either ".open_on_load" or "display: none" because JQuery is not fast enough
to hide the DD tag (don't want to see animation when page is loaded for items set to be closed on load).
*/

//Define regular expressions so javascript can optimize (cache) them
var dot_gif_end = /.gif$/ig;
var hover_dot_gif_end = /_hover.gif$/ig;
var hover_text = /_hover/;

//Open and closed switching
$(document).ready(function(){
	
	//preload states 2, 3, and 4
	$(".slide_tout_rollover").each(function()
	{		
		rollsrc = $(this).attr("src");
		$("<img>").attr("src",rollsrc.replace(dot_gif_end,"_hover.gif"));
		$("<img>").attr("src",rollsrc.replace(dot_gif_end,"_closed.gif"));
		$("<img>").attr("src",rollsrc.replace(dot_gif_end,"_closed_hover.gif"));
	});

	//Do special code if there are items not set to "open on load", close their images and give them a special toggle funtion (if statements prevents undefined error)
	if ( $("dd:not(.open_on_load)").length != 0 )
	{	
		//Find all dd tags without the open_on_load classs and set their image to the "closed" state
		$("dd:not(.open_on_load)").siblings("dt").each(function()
		{
			current_image = $(this).find("img"); 
			if (current_image.length > 0) {
				current_image.attr("src", current_image.attr("src").replace(dot_gif_end,"_closed.gif"));
			}
		});
			
		//Create a toggle function for opening and closing items that were not set to "open on load" (it's just reversed)
		$("dd:not(.open_on_load)").siblings("dt").find("a").toggle(
			function(){
				$(this).parent().next().slideDown("slow"); //OPEN
			
				//Replace gif with normal gif (state 1 or 2)
				closedsrc = $(this).children("img").attr("src");
			
				matches = closedsrc.match(hover_text); //if hovering
				if (matches)
				{
					opensrc = closedsrc.replace(/_closed_hover.gif$/ig,"_hover.gif");
				}
				else //This is incase they use keyboard shortcuts instead of the mouse (no hovering)
				{
					opensrc = closedsrc.replace(/_closed.gif$/ig,".gif");
				}
				$(this).children("img").attr("src", opensrc);
			
				return false;
			}		 
			,
			function(){
				$(this).parent().next().slideUp("slow"); //CLOSE

				//Replace gif with closed gif (state 3 or 4)
				opensrc = $(this).children("img").attr("src");
			
				matches = opensrc.match(hover_text); //if hovering
				if (matches)
				{
					closedsrc = opensrc.replace(hover_dot_gif_end,"_closed_hover.gif");
				}
				else //This is incase they use keyboard shortcuts instead of the mouse (no hovering)
				{
					closedsrc = opensrc.replace(dot_gif_end,"_closed.gif");
				}

				$(this).children("img").attr("src", closedsrc);

				return false;
			}		 
		);
	}
	
	//Create a normal toggle for all the other items (the ones that are set to "open on load")
	$(".open_on_load").siblings("dt").find("a").toggle(
	     function(){
			$(this).parent().next().slideUp("slow"); //CLOSE

			//Replace gif with closed gif (state 3 or 4)
			opensrc = $(this).children("img").attr("src");
			
			matches = opensrc.match(hover_text); //if already hovering
			if (matches)
			{
				closedsrc = opensrc.replace(hover_dot_gif_end,"_closed_hover.gif");
			}
			else //This is incase they use keyboard shortcuts instead of the mouse (no hovering)
			{
				closedsrc = opensrc.replace(dot_gif_end,"_closed.gif");
			}

			$(this).children("img").attr("src", closedsrc);

			return false;
		}
		,
		function(){
			$(this).parent().next().slideDown("slow"); //OPEN
			
			//Replace gif with normal gif (state 1 or 2)
			closedsrc = $(this).children("img").attr("src");
			
			matches = closedsrc.match(hover_text); //if already hovering
			if (matches)
			{
				opensrc = closedsrc.replace(/_closed_hover.gif$/ig,"_hover.gif");
			}
			else //This is incase they use keyboard shortcuts instead of the mouse (no hovering)
			{
				opensrc = closedsrc.replace(/_closed.gif$/ig,".gif");
			}
			$(this).children("img").attr("src", opensrc);
			
			return false;
		}		 
	);
});

//Hover state switching
$(document).ready(function()
{
	/*
	Create a hover state for the collapsable tout headers.
	All hover state images must end with "_hover.gif" or "_closed_hover.gif"
	*/
	
	$(".slide_tout_rollover").mouseover(function()
	{
		imgsrc = $(this).attr("src");
		matches = imgsrc.match(hover_text); //if image is not already the hover state image
		
		if (!matches)
		{
			//replace .gif with _hover.gif
			imgsrcON = imgsrc.replace(dot_gif_end, "_hover.gif");
			$(this).attr("src", imgsrcON);
		}
	});
	
	$(".slide_tout_rollover").mouseout(function()
	{
		//get current state and remove "_hover" (state 2 becomes 1, and state 4 becomes 3)
		currentsrc = $(this).attr("src");
		newcurrentsrc = currentsrc.replace(hover_dot_gif_end,".gif");
		$(this).attr("src", newcurrentsrc);
	});
});