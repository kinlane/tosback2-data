/*
  Added existing flash.js code to direct swf click to product page. D Miller 7/21/2004
  Added a modified flashDetect.js code to accept a passed variable and to make it more generic for use with flash
 on the homepage and in modules in static guide pages. D Miller 7/21/2004
 09/17/2004 Balaji Raghavan: Fixed changeShipping function for issue #58031
 05/11/2004 Mark Powers:  Externalized alert messages.
 10/04/2005 Ammar Lakdawala: Added fucntion showShipModeDetails to fix defect # 7473.
 12/07/2005 - Srikanth Garnepudi: Added new function isValidNickname.
 01/23/2006 - Srikanth Garnepudi: Added new invalid character in isValidNickname function.
 01/05/2006 - Jan Hanseth: Changed useRedirect to "false" -- we use SWFObject for Flash detection now.
 02/12/2010 - Ernest Lombardi: Added global isSignature var
 02/16/2010 - Ernest Lombardi: Added global ieEightCompat var
 10/26/2010 - Petra Johnson: Added Chat Window
 12/06/2010 - Lin Hu: Add new functions for Avaya DataWake, appendDataWakeNVPs(), isLLBUrl(), processURL, appendDWVars, maxLenDesc
 					  Modify function, chatWin
 30/01/2012 - Michael Hernandez: added miscUtils utility functions and modified openit method to support it.
*/

//CHECK SUBBRAND
var isSignature = false;
if(window.location.search.indexOf("subrnd=1") > 0){
	isSignature = true;
}

//CHECK IE8 COMPAT-MODE
var ieEightCompat;
if(document.documentMode > 0){
	//RETURNS 7 IF IE8 IN COMPAT-MODE
	//RETURNS 8 IF IE8 IN NON-COMPAT-MODE
	ieEightCompat = document.documentMode;
}

//BeginExternalization
var misc_msg_001 = "Your order is being placed. Please click \"OK\" to continue.";
var misc_msg_002 = "Changing shipping method... Please wait for page to refresh.";
var misc_msg_003 = "The Recipient name you entered contains an invalid character. Please choose another Recipient, using 1-30 characters and any combination of uppercase and lowercase letters. (Please do not use accented characters such as � and � , or non-Roman characters.)";
var misc_msg_004 = "Please enter a different Recipient. Certain nicknames, including \"Me\" and \"ShipTo\", are reserved as Recipient names associated with your original account information.";
var misc_str_me = "me";
var misc_str_shipto = "shipto";
var misc_str_catpref = "catpref";
var misc_str_isjapan = "false";
var scplb_msg_001 = "Please enter item # or keyword";
var scplb_msg_002 = "Enter item # or keyword";
var sp_msg_01 = "Recipient names beginning with \"L.L.Bean:\" are not available. Please enter a different Recipient.";
var sp_msg_02 = "You have selected both a recipient and a store for in-store pickup. Please choose only one \"Ship To\" option.";
var sp_msg_03 = "We're sorry, in-store pickup is not available for backordered items. Please choose a recipient instead, or select an alternate item.";
var sp_msg_04 = "Backordered items are not available for in-store pickup. Please click \"Change Ship To\" to choose a shipping recipient, or select an in-stock alternative.";
var sp_msg_05 = "Please select a shipping recipient.";
var ic_msg_001 = "PLEASE NOTE: L.L.Bean Visa benefits will not be applied to this order if you use a different credit card.\n\nIf you click \"OK\" below, your new L.L.Bean Visa Card number will be removed from this order and will not be available until you receive your new credit card in the mail.";
var ic_msg_002 = "PLEASE NOTE: Editing certain customer information (such as shipping address) may result in your new L.L.Bean Visa Card no longer being available for this order.\n\nIf you make such a change, your new L.L.Bean Visa Card number will be removed from this order and will not be available until you receive your new credit card in the mail.";
var ic_msg_003 = "Please note: You will not receive L.L.Bean Visa benefits on this order if you use a different payment method. \n\nClick \"OK\" below to change payment methods, or click Cancel to use your L.L.Bean Visa Card and receive benefits on this order.";
//EndExternalization

/* [crmh] Lets add here those utility methods we need to be more productive */
var miscUtils = {
	debug: true,
	log: function(str){
		if (window.console && this.debug === true){ console.log(str); }
	},
	simpleWindows: [], /* we store here all created popups */
	openSimpleWindow: function(url, name, options) { /* here we pass our popup methods */ 
		var defaults = {
			resizable: 0,
			menubar: 0,
			location: 1,
			status: 1,
			toolbar: 0,
			scrollbars: 1,
			width: 400,
			height: 400
		};
		var settings = $.extend({}, defaults, options);
		
		var features = "'resizable=" + settings.resizable + ",menubar=" + settings.menubar + ",location=" + settings.location + ",status=" + settings.status + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars + ", width=" + settings.width + ",height=" + settings.height + "'";
		miscUtils.log('[openSimpleWindow]: ' + features);
		var win = window.open(url, name, features);
		this.simpleWindows[name] = win;
		return win;
	},
	closeSimpleWindow: function(name) { /* lets close a popup by passing in its name */ 
		if ( typeof this.simpleWindows[name] != 'undefined' ) this.simpleWindows[name].close();
	}, 
	getDataAttr: function($elem){ /* lets get an element data-x attributes */
		var params = {};
		$.each($elem[0].attributes, function(index, value) {
			var nval = value.nodeValue;
			var nname = value.nodeName;
			if ( nname.match(/^data-/) ){
				params[nname.replace(/^data-/,'')] = nval;
			}
		});
		return params; 
	}
}

function globalopenit(sURL,tWidth,tHeight,showToolbar,windowName) {
	openit(sURL,tWidth,tHeight,showToolbar,windowName);
}

function openit(sURL,tWidth,tHeight,showToolbar,windowName) {
	var tWidth = tWidth ? tWidth : 400;
	var tHeight = tHeight ? tHeight : 400;
	var showToolbar = showToolbar ? showToolbar : 'yes';
	
	var toolbar = ( showToolbar == 'yes' ) ? 1 : 0;
	var windowName = windowName ? windowName : 'popup'; // allows more than one popup to be opened from common parent window

	var newwindow = miscUtils.openSimpleWindow(sURL ,windowName, {width:tWidth, height:tHeight, toolbar: toolbar});
	
	// code changing focus is throwing an error in IE8, skipping if IE	
	
	var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;	
	
	if(!isIE){
	
	if(newwindow.focus) {newwindow.focus();} // bring window to front if already open

	} 
} 

// used to display popup help windows
function viewHelp(hURL) {
	var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;		// true if we're on ie
	var wd = 400;  // width
	var ht = 400;  // height
	var winOptions = "scrollbars=yes,toolbar=no,directories=no,menubar=no,resizable=yes,status=no,width="+wd+",height="+ht;

	if(isIE) {
		winOptions = winOptions + ",top=0" + ",left=" + (window.screen.width - wd - 8);
	} else {
		winOptions = winOptions + ",screenY=0" + ",screenX=" + (window.screen.width - wd);
	}

	_win = window.open(hURL,"helpWindow",winOptions);
	if(_win.focus) { _win.focus(); } // bring window to front if open
}

function showChat(skills) {
	 s_pageName = "Chat Customer Login (/customerService/contactUs/liveHelpLogon.html)";
   s_events="";
   void(sendAnalyticsEvent(''));
  	chatWindow = window.open('/customerService/contactUs/liveHelpLogon.html', skills, 'top=12,left=503,width=317,height=589,scrollbars=yes,toolbar=no, menubar=no, status=yes, resizable=yes, location=no')
  	chatWindow.focus()
}

var bVer = parseInt(navigator.appVersion);
var bName = navigator.appName;

function Display(filename) {
	var child = window.open(filename,"","toolbar=no,location=no,width=500,height=500,directories=no,status=no,scrollbars=yes,resizable=yes,screenX=350,screenY=350,menubar=no");
	child.focus();
}

function openNewWindow(URLtoOpen, windowName, windowFeatures){ 
	newWindow=window.open(URLtoOpen, windowName,windowFeatures); 
}

var newWin;
function redirectParentWin(parentPageURL,focusParameter) {
	if (self.opener != null) {
		if (!self.opener.closed) { 
	      self.opener.location = parentPageURL;
		}
	   else {  
			self.opener = window.open(parentPageURL,'llbean','toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=530,left=0,top=0,screenx=0,screeny=0');
		}
	}
	else {  
		newWin = window.open(parentPageURL,'llbean','toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=530,left=0,top=0,screenx=0,screeny=0');
		self.opener = newWin;
	}
	if ((focusParameter == 'p') || (focusParameter == 'P')) { 
		self.opener.focus();
	}
	else { 
		self.focus();
	}
} // end function redirectParentWin

var newWinFlash;   
function redirectParentWinFlash(vpageID, vtrackingString) {
	if (!vtrackingString) vtrackingString="&feat=not_supplied"; // default value
	newURL =
// V5 below:
 "/webapp/wcs/stores/servlet/CategoryDisplay?storeId=1&catalogId=1&categoryId=" + vpageID + vtrackingString;

newWinFlash = redirectParentWin(newURL,"p");
} // end 


/**
 *	used on product pages and quickshop to pass selected attribute values to the next page
 *	when the user clicks one of the radio buttons.
 */
function doStyleRefresh(linkobj)
{
	for (var i=0;i<= document.data.length-1;i++)
	{
		if( (document.data.elements[i].type == 'select-one')
		 && (document.data.elements[i].name != 'addr_rn') 
		 && (document.data.elements[i].selectedIndex != -1) 
		 && (document.data.elements[i].options[document.data.elements[i].selectedIndex].value != "default")) 
		{
			linkobj.href += "&"+document.data.elements[i].name+"="+escape(document.data.elements[i].options[document.data.elements[i].selectedIndex].value);
		}
	}
	if (window.pageControllerObject && pageControllerObject.closeLargerView) {
		pageControllerObject.closeLargerView();
	}
	if (emailPopUpWindow && !emailPopUpWindow.closed) {
		emailPopUpWindow.close();
	}
}
function changeShipping(shippingImg, ship_form, addressId) {

	//var msg_page_submitted = "Changing shipping method... Please wait for page to refresh.";
	var theSelectedIndex = 0;
	
	var today = new Date();
	var timestamp = new Date(document.dblclick.submitTS.value);
	/*if ((document.card.cvnNum != null) && (document.card.cvnNum.value != null)) {
		ship_form.cvnNum.value = document.card.cvnNum.value;
	}*/
	if((document.dblclick.submitClk.value == "Y" && (today.getTime() - timestamp.getTime() < 30000))){
		alert( misc_msg_001 );
		return false;
	}
	
	for (var i = 0; i < ship_form.shipModeId.length; i++) {
		if(ship_form.shipModeId[i].checked){
			ship_form.currentShippingTierChecked.value = i;
		}
	}
		
	if(document.dblclick.submitClk.value != "S"){
	
	  document.dblclick.submitClk.value = "S";
	  updateTimeStamp(document.dblclick.submitTS);
	  //shippingImg.src=imagePath+"btn_change_shipping_wait.gif";
	  /*//get cc info from other form
	  if(isCCDropDownPresent) {
		  ship_form.ccnum.value = document.card.ccnum.value;
 		  ship_form.cctyp.value = document.card.cctyp.options[document.card.cctyp.selectedIndex].value;
		  ship_form.ccxmonth.value = document.card.ccxmonth.options[document.card.ccxmonth.selectedIndex].value;
		  ship_form.ccxyear.value = document.card.ccxyear.options[document.card.ccxyear.selectedIndex].value;
	  }*/
	  ship_form.submit();							
	  return true;	
	}else{		
	
		ship_form.shipModeId[ship_form.currentShippingTierChecked.value].checked = true;		
		alert(misc_msg_002);	
		return false;
	}
}

function showShipModeDetails(redir,title, dynaWidth,counter) {

	var shipImage = eval("document.shipwait_"+counter);

	if(document.dblclick.submitClk.value == "S"){
		alert( misc_msg_002);
		return false;		
	}else{
		window.open(redir,title,'top=0,left=0,width='+dynaWidth+',height=400,scrollbars=yes,resizable=yes,toolbar=no');
		return true;		
	}
}

function parseQuery ( query ) {
   var Params = new Object ();

   if ( ! query ) return Params; // return empty object
   var Pairs = query.split(/[;&?]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) continue;
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}

// directs to a product page on click of flash swf
function flashGotoProduct(vPageID,vTrackingString) {
	//check if a tracking code was passed and if not put in the default code
	if (!vTrackingString) {
		
		// Assume we're coming from a dynamic guide (module page)
		// so grab the current category ID and create the feat code from that.
		var obj = parseQuery( window.location.search );
		vTrackingString="&feat=" + obj['categoryId'] + "-dg";
	
	}
	//check if breadcrumbNVP is defined, it is used on dynamic guides to setup proper MOE
	if ((typeof breadcrumbNVP) == "undefined") breadcrumbNVP = "";
	window.location = "/webapp/wcs/stores/servlet/CategoryDisplay?storeId=1&catalogId=1&categoryId=" + vPageID + vTrackingString + breadcrumbNVP;
}
// flash detect code
/*
Code to detect flash plug-in and version
 Created 7/21/2004 David Miller
 
Based on  moock fpi [f.lash p.layer i.nspector]
 version: 1.3.5
 written by colin moock
code maintained at: http://"ec"+"webs01".moock.org/webdesign/flash/detection/moockfpi/
 terms of use posted at: http://"ec"+"webs01".moock.org/terms/
*/
// #############################################
// these are the user defined globals
// modify the following variables to customize the inspection behaviour

var requiredVersion = 5;		 // version the user needs to view site (max is 5, min is 2)
var useRedirect = false; 		 // "true" loads new flash or non-flash page into browser
									           // "false" embeds movie or alternate html code into current page

// set next three vars if useRedirect is true...
var flashPage = "index2.html"		// the location of the flash movie page
var noFlashPage = "noflash.html"	// send user here if they don't have the plugin or we can't detect it
var upgradePage = "upgrade.html"	// send user here if we detect an old plugin
// #############################################

// *************
// everything below this point is internal until after the body tag
// do not modify! 
// *************

// system globals
var flash2Installed = false;		// boolean. true if flash 2 is installed
var flash3Installed = false;		// boolean. true if flash 3 is installed
var flash4Installed = false;		// boolean. true if flash 4 is installed
var flash5Installed = false;		// boolean. true if flash 5 is installed
var flash6Installed = false;		// boolean. true if flash 6 is installed
var flash7Installed = false;		// boolean. true if flash 7 is installed
var maxVersion = 6;					    // highest version we can actually detect
var actualVersion = 0;				  // version the user really has
var hasRightVersion = false;		// boolean. true if it's safe to embed the flash movie in the page
var jsVersion = 1.0;				    // the version of javascript supported
//
// check the browser...we're looking for ie/win
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;		// true if we're on ie
var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? true : false; // true if we're on windows

// this is a js1.1 code block, so make note that js1.1 is supported.
jsVersion = 1.1;

// write vbscript detection if we're not on mac.
if(isIE && isWin){ // don't write vbscript tags on anything but ie win
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
	document.write('on error resume next \n');
	document.write('flash2Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.2"))) \n');
	document.write('flash3Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.3"))) \n');
	document.write('flash4Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))) \n');
	document.write('flash5Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))) \n');	
	document.write('flash6Installed = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6"))) \n');
	document.write('</SCR' + 'IPT\> \n'); // break up end tag so it doesn't end our script
}
//
// next comes the standard javascript detection that uses the navigator.plugins array
// we pack the detector into a function so it loads before we run it

function detectFlash(useRedirect){
	if (navigator.plugins){								// does navigator.plugins exist?
		if (navigator.plugins["Shockwave Flash 2.0"] 	// yes>> then is Flash 2 
		|| navigator.plugins["Shockwave Flash"]){		// or flash 3+ installed?

			// set convenient references to flash 2 and the plugin description
			var isVersion2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + isVersion2].description;
			// a flash plugin-description looks like this: Shockwave Flash 4.0 r5
			// so we can get the major version by grabbing the character before the period
			// note that we don't bother with minor version detection. do that in your movie with $version
			var flashVersion = parseInt(flashDescription.charAt(flashDescription.indexOf(".") - 1));

			// we know the version, now set appropriate version flags
			flash2Installed = flashVersion == 2;		
			flash3Installed = flashVersion == 3;
			flash4Installed = flashVersion == 4;
			flash5Installed = flashVersion == 5;
			flash6Installed = flashVersion >= 6;
		}
	}
	
	// loop through all versions we're checking, and set actualVersion to highest detected version
	for (var i = 2; i <= maxVersion; i++) {	
		if (eval("flash" + i + "Installed") == true) actualVersion = i;
	}
	// if we're on webtv, the version supported is 2 (pre-summer2000, or 3, post-summer2000)
	// note that we don't bother sniffing varieties of webtv. you could if you were sadistic...
	if(navigator.userAgent.indexOf("WebTV") != -1) actualVersion = 2;	
	
	// uncomment next line to display flash version during testing
  // we're finished getting the version. time to take the appropriate action

	if (actualVersion >= requiredVersion) { 		// user has a new enough version
		hasRightVersion = true;						// flag: it's okay to write out the object/embed tags later

		if (useRedirect) {							// if the redirection option is on, load the flash page
			if(jsVersion > 1.0) {					// need javascript1.1 to do location.replace
				window.location.replace(flashPage);	// use replace() so we don't break the back button
			} else {
				window.location = flashPage;		// otherwise, use .location
			}
		}
	} else {	// user doesn't have a new enough version.
		if (useRedirect) {		// if the redirection option is on, load the appropriate alternate page
			if(jsVersion > 1.0) {	// need javascript1.1 to do location.replace
				window.location.replace((actualVersion >= 2) ? upgradePage : noFlashPage);
			} else {
				window.location = (actualVersion >= 2) ? upgradePage : noFlashPage;
			}
		}
	}
 } // end function detectFlash

   function isValidNickname(parms)
  { 
	 var nickname = trimSpaces(parms.toLowerCase());
	 if (nickname.length > 0)
	 {
		if(misc_str_isjapan == "false")
		{
			for (var i = 0; i < nickname.length; i++) 
			{
				ch = nickname.substring(i, i + 1);        

				if ((ch >= "a" && ch <= "z") || (ch >="0"  &&  ch <= "9") 
				|| ch == "~" || ch == "!" || ch == "#" || ch == "$" || ch == "%" 
				|| ch == "^" || ch == "&" || ch == "*" || ch == "(" || ch == ")" 
				|| ch == "_" || ch == "+" || ch == "{" || ch == "}" || ch == "|" 
				|| ch == ":"  || ch == " " 
				|| ch == "."  || ch == "/"  || ch == "\'"  || ch == ";" || ch == "\\" 
				|| ch == "]"  || ch == "["  || ch == "=" || ch == "-" || ch == "`" 
				|| ch == "@" || ch == "," || ch == "\"" )
				{ 	}
				else
				{ 
					    alert(misc_msg_003); 
					    return false;
				 } 
			  }
		  } 

		//checking for me & shipto in local language
		if(nickname == misc_str_me || nickname == misc_str_shipto || nickname == misc_str_catpref)
		{
			alert(misc_msg_004); 
			return false;
		 } 
		
		//for J-site check for me & shipto in english as well
		if(misc_str_isjapan != "false" && (nickname.toLowerCase() == "me" || nickname.toLowerCase() == "shipto" || nickname.toLowerCase() == "catpref"))
		 {
			alert(misc_msg_004); 
			return false;
		 } 
	  }
}

/*trims white space from start and end of the passed in string s*/
function trimSpaces(s) {
    var trimmedText = "";
    var i = 0;
    var j = s.length-1;

    while(s.charCodeAt(i) == 32 && i < s.length)
        i++;

    while(s.charCodeAt(j) == 32 && j > 0)
        j--;

    if(i > j)
        s="";
    else 
        s=s.substring(i,j+1);
    
    return s;
}


/**************************************************************
 * this function returns the object using the id based on browser.
 **************************************************************/
function getObject(objectId) {

	if (document.getElementById) {
		return document.getElementById(objectId);
	} 
	else if (document.all) {
		return document.all(objectId);
	}
	else if (document.layers) {
		return document.layers[objectId];
	}
	return false;
}
 
/**************************************************************
 * this function is a text counter used in a textarea that will
 * count the number of characters typed and display remaining
 * characters left in html.
 **************************************************************/
function counter(enterance, exit, characters) {
	var enteranceObj = getObject(enterance);
	var exitObj = getObject(exit);
	if (!enteranceObj || !exitObj) {
		return false;
	}
	
	var length = characters - enteranceObj.value.length;
	
	if (length <= 0) {
		length = 0;
		enteranceObj.value = 
			enteranceObj.value.substr(0, characters);
	}
	
	exitObj.innerHTML = length+"";	
					
 }
 
 // General MM functions
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_goToURL() { //v3.0    used by e.g. hunting/index.html
  var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}

function MM_openBrWindow(theURL,winName,features) { //v2.0 
  window.open(theURL,winName,features);
}

//-=-=-=-=-=-=-=--=-=-=-=-=-=-=--=-=-=-=-=-=-=--=-=-=-=-=-=-=--=-=-=-=-=-=-=--=-=-=-=-=-=-=-
// Preload the rollOver images for the global nav
function preloadGlobalNav() {
//Removed spdpm 5/5/08. not needed for R11
}

function preloadShippingImage() {
	MM_preloadImages(
		imagePath + 'btn_change_shipping_wait.gif'
	);
}

// Checks for null entres in the search box
var submitCounter = 0;
function checkSearch(defaultText) {
	f = document.forms.search;
	
	if (typeof defaultText == 'undefined')
	{
		defaultText = scplb_msg_002;
	}
	
	if ( (f.freeText.value.length == 0) || (f.freeText.value ==  defaultText)) {
		alert(scplb_msg_001);
		f.freeText.focus();
		return false;
	}

	// only process submit button once
	if (submitCounter == 0) {
		++submitCounter;
	} else {
		return false;
	}

    storeUserSchTermCookie (f.freeText.value);

    return true;
}

function  storeUserSchTermCookie (term){
  document.cookie = "LLBUSERSCH="+escape(term)+";path=/;domain=.llbean.com;";
}

//Check for concurrent selection of nickName and Store
function isConcurrentEntry(nicknameSel, nickname, storeid, userAddressId) {
	var conEntryFlg = false;
	if (storeid != 0) {
		if (nickname != null && nickname.length != 0) {
			alert(sp_msg_02);
			conEntryFlg = true;
			document.data.nickname.value = '';
			document.data.storeLocation.value = 0;
			document.data.addr_rn.value = document.data.addr_rn.options[0].value;
		} else if (nicknameSel != userAddressId && nicknameSel != 0) {
			alert(sp_msg_02);
			conEntryFlg = true;
			document.data.nickname.value = '';
			document.data.storeLocation.value = 0;
			document.data.addr_rn.value = document.data.addr_rn.options[0].value;
		}
       }
	return conEntryFlg;
}

//Check nickname does not starts with L.L.Bean
function isLLBNickName(nickname) {
	var nickNameFlg = false;
	if (nickname != null) {
		nicknameVal = nickname.toUpperCase();
		llbVar = "L.L.BEAN:";
		if (nicknameVal.substring(0,9).indexOf(llbVar,0) != -1) {
			alert(sp_msg_01);
			nickNameFlg = true;
		}
	}
       return nickNameFlg;
}

//Check item in stock in product page
function isItemBackOrd(storeLocation) {
    var isItemInStock =  true;
    var searchResultArray;
    // search stuff
   if(window.jsonData){
      	var searchObject = new searchClass(jsonData);
      	this.searchObject = searchObject;
   }

   //menus
   var menuObject = new menuClass();
   this.menuObject = menuObject;
   		
   if (menuObject && searchObject) {
        var size1 = menuObject.getSize1();
        var size2 = menuObject.getSize2();
        var colorCode =  menuObject.getColor();

        if (window.menuNamesArray && window.menuNamesArray.length > 0 ) {
            searchResultArray = searchObject.searchStockType(colorCode, size1, size2, menuNamesArray);
        } else {
            searchResultArray = searchObject.searchStockType(colorCode, size1, size2);
        }
   }
   if (searchResultArray != null && searchResultArray.length > 0 && searchResultArray[2]) {
        isItemInStock = (searchResultArray[2] == 0)?true:false;
   }
   if (storeLocation.value > 0 && !isItemInStock) {
	alert(sp_msg_03);
	return true;
   }
   return false;
}

function checkStrPickUpBackOrd(bkordFlag){
	var flag = true;
	if (bkordFlag != null) {
	
		if(bkordFlag == "true") {
			alert(sp_msg_04);
			flag = false;
		} 
	}

	return flag ;	
}

//Check for empty selection of nickName and Store
function isEmptySelection(nicknameSel, nickname, storeid) {
	var conEntryFlg = false;
	if (storeid == 0 && (nickname == null || nickname.length == 0) && nicknameSel == 0) {
		alert(sp_msg_05);
		conEntryFlg = true;
       }
	return conEntryFlg;
}

//Check for concurrent selection of nickName and Store
function isConcurrentEntryCR(nicknameSel, nickname, storeid, userAddressId) {
	var conEntryFlg = false;
	if (storeid != 0) {
		if ((nickname != null && nickname.length != 0) || nicknameSel != 0) {
			alert(sp_msg_02);
			conEntryFlg = true;
			document.data.nickname.value = '';
			document.data.storeLocation.value = 0;
			document.data.addr_rn.value = document.data.addr_rn.options[0].value;
		} 
       }
	return conEntryFlg;
}

//Check nickname does not starts with L.L.Bean
var componentsCounter = 10;
function isLLBNickNameForMIOP() {
	var nickNameFlg = false;
	for (i=0; i<componentsCounter; ++i) {
		if(eval("document.data.nickname_"  + i)) {
			nickname = (eval("document.data.nickname_" + i)).value;
			nicknameVal = nickname.toUpperCase();
			llbVar = "L.L.BEAN:";
			if (nicknameVal.substring(0,9).indexOf(llbVar,0) != -1) {
				alert(sp_msg_01);
				nickNameFlg = true;
			}
		}
	}
	return nickNameFlg;
}

function resetSearchBox(box, defaultvalue) {
	if(box.value==defaultvalue){box.value = "";}
}

//Rel 12 - OAP
function isICCardChange(url) {
	if (confirm(ic_msg_001)) {
		window.location = url;
	}
	else{
		for (var i=0; i < document.paymentInfo.paymentMethodRadio.length; i++)
		{
			rad_val = document.paymentInfo.paymentMethodRadio[i].value;
			//Set the radio button selection for Credit Card radio 
			if(rad_val=="C"){
				document.paymentInfo.paymentMethodRadio[i].checked=true;
			}
		}
	}
}

function isICOrderChange(url) {
	if (confirm(ic_msg_002)) {
		window.location = url;
	}
}

//Rel25 Changes
function isOAPPayOptChange(url) {
	if(document.paymentInfo.llbVisaAppl.value=="true" && document.paymentInfo.selPayChoice.value=="C"){ 
	  	if (confirm(ic_msg_003)) {
		      window.location = url;
		}else{
			for (var i=0; i < document.paymentInfo.paymentMethodRadio.length; i++)
		   	{
		  		rad_val = document.paymentInfo.paymentMethodRadio[i].value;
				//Set the radio button selection for Credit Card radio 
				if(rad_val=="C"){
					document.paymentInfo.paymentMethodRadio[i].checked=true;
				}
		   	}
		}
	}
}

//workaraound - some netinsight code remanants in JSP files - empty functions till JSP updated
function ntptAddPair ( x,y  ) {

}
function callSendNtptEventTag (x){
}

function chatWin(url,name){
	var nw;
	var splitUrlResults = url.split("#");
	
	url = appendDataWakeNVPs(splitUrlResults[0]) + '#' + splitUrlResults[1] ;

	nw=window.open(url,name,"height=600,width=433,left=100,top=100,resizable=yes,scrollbars=no,toolbar=no,status=no");
	
    if (nw.focus) {nw.focus();}
}

// Google Product Ad Pixel Inclusion - 10.29.10 Tony Elmquist

// Cookie setter with date rather than year function

function Set_Cookie( name, value, expires, path, domain, secure )
{
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}

// function to parse URL parameters

function parm(p){
var re=new RegExp("[\\&|\\?]"+p+"=([^\\&|\\?|\\n]*)");
var s=re.exec(window.location.search);
return (s!= null)?unescape(s[1]):null;
}

/* APPEND DATAWAKE PARAMETERS TO HELP URL */
function appendDataWakeNVPs(url){ 

	url = url;

	// since we have to fit potentially 3 url's on the query string 
	// we must truncate if reaching max of 200 char's
	var maxLen = 200;

	var firstMarker = '?';
	if (url.indexOf('?') > 0) {
		firstMarker = '&';
	}

	url = url + firstMarker + 'aicEscDWDesc1' + '=' + maxLenDesc(document.title) ;
  	
  	if( isLLBUrl( document.URL )) {
  		
  		if( document.URL.slice(0,5) == "https" ){
  			//url = url + '&' + 'aicEscDWUrl1' + '=' + 'Secure';
  		}else {
  			url = url + '&' + 'aicEscDWUrl1' + '=' + processURL( document.URL , maxLen);
  		}
  	} 
  	 
  	if(  isLLBUrl( document.referrer )) {
  	
  		//url = url + '&' + 'aicEscDWDesc2' + '=' + "Previous Page";
  		
  		if( document.referrer.slice(0,5) == "https" ){
  			//url = url + '&' + 'aicEscDWUrl2' + '=' + 'Secure';
  		}else {
			url = url + '&' + 'aicEscDWDesc2' + '=' + "Previous Page";
  			url = url + '&' + 'aicEscDWUrl2' + '=' + processURL( document.referrer , maxLen);
  		}
  	}
  
    return url;
}

// CHECK IF PAGETITLE IS LONGER THEN MAX LENGH, IF SO, TRUNCATE IT
function maxLenDesc(pageTitle) {

	if(pageTitle != undefined && pageTitle.length > 0){
		
		if(escape(pageTitle).length > 100){

			var tempDesc = pageTitle.slice(0, 100);

		}
		
	}

	//THE PAGE TITLE IS ESCAPED LATER IN THE PROCESS
	//DO NOT USE ESCAPE/ENCODE HERE - ICEJL
	pageTitle = pageTitle.replace("&", "");
	pageTitle = pageTitle.replace("'", "");
	pageTitle = pageTitle.replace('"', "");
	pageTitle = pageTitle.replace(':', "");	
	
	return pageTitle;
}


// CHECK IF PASSED URL IS LLBEAN URL FOR AVAYA DATAWAKE
function  isLLBUrl(urlStr){
	var isValid = false;
	//we will not pass non-LLBean urls
	if(urlStr !=undefined && urlStr.indexOf("llbean.com") != -1)
		isValid = true;
	return isValid;
}

// ENCODE THE VALID URL AND TRUNCATE THE PARAMETERS IF THE LENGTH IS LONGER THAN MAXLEN
function processURL(url, maxLen){

	// The escape() function encodes the url for parameterization
	// other options include encodeURI() and encodeURIComponent() depending 
	// on whether special characters need encoding
	
	var encUrl = escape(url);
			
	if(encUrl.length > maxLen){
		//then split off the query string
		var splitUrl = encUrl.split('%3F');
		//var splitUrl = encUrl.split('?');
		encUrl = splitUrl[0];
	}
		
	return encUrl;

}
/* /APPEND DATAWAKE PARAMETERS TO HELP URL */


/* Autocomplete AB test config */

var llb_ab_cookie={
   'name' : 'LLBAC',
   'ck_domain' : '.llbean.com',
   'ck_expiration' : new Date('July 14, 2013'),
   'e_var' :'eVar46',
   'domain' : '.llbean.com',
   'vSeg' : ['LLBAC A Text', 'LLBAC B Image', 'LLBAC C Hybrid', 'LLB Search']
};

llb_ab_cookie.getVal = function (name){
    var re=(name+"=([^\s\;]*)");
    var m=document.cookie.match(re);
    return(m!=null?unescape(m[1]):null);
}

llb_ab_cookie.setVal = function (name, value, expires, path, domain,secure) {
    document.cookie = name + "=" +escape( value ) +
    ( ( expires ) ? ";expires=" + expires : "" ) +
    ( ( path ) ? ";path=" + path : "" ) +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
}

llb_ab_cookie.getRandInt= function (numSegs) {
    return seg = Math.floor( Math.random() * numSegs );
}

llb_ab_cookie.urlParm=function(pnm){
	var re=new RegExp("[\\&|\\?]"+pnm+"=([^\\&|\\?|\\n]*)");
	var s=re.exec(window.location.search);
	return (s!= null) ? unescape(s[1]) : null;
}

llb_ab_cookie.setMetricVar=function(mvar,val) {
    if (typeof s_o_sc=="object"){
        s_o_sc[mvar]=val;
    }else{
        if(typeof ll_o=="undefined")
                ll_o={};

        ll_o[mvar]=val;
    }
}

//gets the random number and based on business prefrence, autocomplete versions are segmented
function cookieValSegmentation() {
    // Random number 0 - 9
    var varRandy = llb_ab_cookie.getRandInt(10);

    // Image - greater than 5 or 40%  (9,8,7,6, 5) - 5 values = 50%
	    if (varRandy >= 5) {
		llb_ab_cookie.val = 1;
	
		// Department - greater than 1 or 40% (1,2,3,4) - 4 values = 40%  - Not used
	    //   } else if (varRandy > 1) {
		//llb_ab_cookie.val = 3;
	
		// Text - equal to 1,2, 3, 4 or 40% (1) - 1 value = 40%
	    } else if (varRandy > 0){
		llb_ab_cookie.val= 0;
		
		// Control - else or (must be zero) 10%  (0) - 1 values 10%
	    } else {
		llb_ab_cookie.val = 4;
	    }

    llb_ab_cookie.setVal(llb_ab_cookie.name, llb_ab_cookie.val, llb_ab_cookie.ck_expiration, '/', llb_ab_cookie.domain);
}

if (llb_ab_cookie.getVal(llb_ab_cookie.name) != null) {
	llb_ab_cookie.val = llb_ab_cookie.getVal(llb_ab_cookie.name);

	if (llb_ab_cookie.val) {
		llb_ab_cookie.val = llb_ab_cookie.val.substr(0, 1);
		llb_ab_cookie.setVal(llb_ab_cookie.name, llb_ab_cookie.val, llb_ab_cookie.ck_expiration, '/', llb_ab_cookie.domain);
	} else {
		cookieValSegmentation();
	}
} else {
	cookieValSegmentation();
}

if (llb_ab_cookie.urlParm('llbac_seg') != null) {
	llb_ab_cookie.val = llb_ab_cookie.urlParm('llbac_seg');
	llb_ab_cookie.setVal(llb_ab_cookie.name, llb_ab_cookie.val, llb_ab_cookie.ck_expiration, '/', llb_ab_cookie.domain);
}

llb_ab_cookie.setMetricVar(llb_ab_cookie.e_var, llb_ab_cookie.vSeg[llb_ab_cookie.val]);

