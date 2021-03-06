/* :::::::::::::::::::::::::::::::::::::::::::::::::::
	
	RESPONSIVE SCRIPTS
	
:::::::::::::::::::::::::::::::::::::::::::::::::::*/
$(document).ready(function() {

	
	//MOBILE MENUS
	var mobileNavOpen = 0; //mobile nav closed
	
	$('#nav-control').click(function(){
		if (mobileNavOpen == 0){
			$('#header-nav').slideDown(300);
			$('#top-bar').slideDown(300);
			$(this).addClass("open");
			mobileNavOpen = 1;
			return false;
		}
		else {
			$('#header-nav').slideUp(300);
			$('#top-bar').slideUp(300);
			$(this).removeClass("open");
			mobileNavOpen = 0;
			return false;
		}	
	});
	
	
	var bodyWidth = $("body").innerWidth(); //no scrollbars
	
		
	//MAIN NAV DROPDOWNS
	var isActionBound;

    if (bodyWidth <= 803) {
		$(".dropdown-link").unbind("click",dropDownMenu);
		isActionBound = 0;
		
		$("#top-bar").hide();
		$("#header-nav").hide();
		$("#nav-control").show();
		$("#searchbox").show();	
    }
	else {
		isActionBound = 1;
	}

	function bindActionToDropdown() {
		if(isActionBound == 0) {
			$(".dropdown-link").bind("click",dropDownMenu);
			isActionBound = 1;
		}
	}
	

	//WINDOW RESIZE
	$(window).resize(function() {
		
		var bodyResize = $("body").innerWidth();
					
		//MOBILE NAV CONTROL
		if (bodyResize <= 803) {
			$("#nav-control").show();
		} else {
			$("#nav-control").hide();
		}
		
		//SHOW OR HIDE NAVS
		if ( (bodyResize <= 803) && mobileNavOpen == 0) {
			$('#top-bar').hide();
			$('#header-nav').hide();
		} else {
			$('#top-bar').show();
			$('#header-nav').show();
		}
		
		//DROP DOWN MENU
		if (bodyResize <= 803) {
			isActionBound = 0;
			$(".dropdown-link").unbind("click",dropDownMenu);
			$(".dropdown-link").removeClass("selected");
			$(".dropdown-wrapper").hide();
			$("#dropdown-spacer").animate({
				height: ""
			}, 0);
	    } else {
			bindActionToDropdown();
	    }	
	});

	
});


