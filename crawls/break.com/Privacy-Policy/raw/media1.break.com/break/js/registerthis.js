var captchaText;var innerDivHTML="";var safeNsf="snfw";var spicyPicsLocal=null;var thisURL=window.location.href;jQuery(document).ready(function($){function createOverlay(){var brkRegisterOverlay='<style type="text/css">\n\nbody > div#login_wrap { position: fixed;}\ndiv#login_wrap {  \nleft: expression( ( 500 - login_wrap.width + ( ignoreMe2 = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ) ) + \'px\' );\n  top: expression( ( 172 + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ) ) + \'px\' );\n}\n</style><style type="text/css">\n\nbody > div#register_wrap { position: fixed;}\ndiv#register_wrap {  \nleft: expression( ( 500 - register_wrap.width + ( ignoreMe2 = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ) ) + \'px\' );\n  top: expression( ( 65 + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ) ) + \'px\' );\n}\n .fbook_login, .fbook_login2{ margin-top:17px; text-align:center;padding-right:24px; } .fbook_login2{ text-align:right;padding-right:19px; }</style><div id="register_wrap" class="register_wrap" style=""><table class="reg_outer" cellpadding="0" cellspacing="0" border="0"><tr><td colspan="3" class="register_top">&nbsp;</td></tr><tr><td class="register_lft">&nbsp;</td><td class="register_cnt" valign="top"><div class="register_closebox"><a class="regthis_closebox" href=""><img src="http://media1.break.com/static/live/v1/img/site/regthis/regthis_close.gif" alt="Close" /></a></div><div class="register_hdr" id="register_hdr_div">You need to register for or login to Break to do that!</div><div class="register_hdr" id="register_hdr_div_spicy" style="display:none;">You need to register for or login to view spicy pictures!</div><div class="register_msg" id="register_msg_div"><span class="register_em">Register Now!</span> It\'s free, it\'s easy and it only takes a couple of minutes. <span class="register_sml"> *required field</span></div> <div class="register_msg" id="register_msg_div_spicy" style="display:none;"> Register now to access thousands of our spiciest videos and pictures. <span class="register_sml"> *required field</span></div> <div id="spicy_girls" style=\'width:338px;margin:0px auto;\'></div>  <div class="register_loginlink">Already Registered? <a id="regthis_login" href="http://my.break.com/Member/Authentication/login.aspx" rel="nofollow">Login Now.</a></div><div class="register_innercnt"><div class="regthis_error" id="regthis_error_register">&nbsp;</div><div class="register_innerinnercnt"><div id="register_popmsg"><div id="register_popmsg_inner" class="register_popmsg_inner">&nbsp;</div></div><table cellpadding="0" cellspacing="0" border="0"><tr><td class="regthis_td1 rgtalign">Nickname<span>*</span>:</td><td class="regthis_td2"><input type="text" name="regthis_nickname" id="regthis_nickname" /><span class="regthis_error_star" id="regthis_nickname_star">*</span></td></tr><tr><td class="regthis_td1 rgtalign">Password<span>*</span>:</td><td class="regthis_td2"><input type="password" name="regthis_password" id="regthis_password" /><span class="regthis_error_star" id="regthis_password_star">*</span></td></tr><tr><td class="regthis_td1 rgtalign">Confirm Password<span>*</span>:</td><td class="regthis_td2"><input type="password" name="regthis_password2" id="regthis_password2" /><span class="regthis_error_star" id="regthis_password2_star">*</span></td></tr><tr><td class="regthis_td1 rgtalign">Email Address<span>*</span>:</td><td class="regthis_td2"><input type="text" name="regthis_email" id="regthis_email" /><span class="regthis_error_star" id="regthis_email_star">*</span></td></tr><tr><td class="regthis_td1 rgtalign">Date of Birth<span>*</span>:</td><td class="regthis_td2"><select name="regthis_dob_month" id="regthis_dob_month"><option value="0">month</option><option value="1">Jan</option><option value="2">Feb</option><option value="3">Mar</option><option value="4">Apr</option><option value="5">May</option><option value="6">Jun</option><option value="7">Jul</option><option value="8">Aug</option><option value="9">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option></select><select name="regthis_dob_day" id="regthis_dob_day"><option value="0">day</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select><select name="regthis_dob_year" id="regthis_dob_year"><option value="0">year</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option><option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option><option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option><option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option><option value="1958">1958</option><option value="1957">1957</option><option value="1956">1956</option><option value="1955">1955</option><option value="1954">1954</option><option value="1953">1953</option><option value="1952">1952</option><option value="1951">1951</option><option value="1950">1950</option><option value="1949">1949</option><option value="1948">1948</option><option value="1947">1947</option><option value="1946">1946</option><option value="1945">1945</option><option value="1944">1944</option><option value="1943">1943</option><option value="1942">1942</option><option value="1941">1941</option><option value="1940">1940</option><option value="1939">1939</option><option value="1938">1938</option><option value="1937">1937</option><option value="1936">1936</option><option value="1935">1935</option><option value="1934">1934</option><option value="1933">1933</option><option value="1932">1932</option><option value="1931">1931</option><option value="1930">1930</option><option value="1929">1929</option><option value="1928">1928</option><option value="1927">1927</option><option value="1926">1926</option><option value="1925">1925</option><option value="1924">1924</option><option value="1923">1923</option><option value="1922">1922</option><option value="1921">1921</option><option value="1920">1920</option><option value="1919">1919</option><option value="1918">1918</option><option value="1917">1917</option><option value="1916">1916</option><option value="1915">1915</option><option value="1914">1914</option><option value="1913">1913</option><option value="1912">1912</option><option value="1911">1911</option><option value="1910">1910</option><option value="1909">1909</option><option value="1908">1908</option><option value="1907">1907</option><option value="1906">1906</option><option value="1905">1905</option><option value="1904">1904</option><option value="1903">1903</option><option value="1902">1902</option><option value="1901">1901</option><option value="1900">1900</option></select><span class="regthis_error_star" id="regthis_dob_star">*</span></td></tr><tr><td class="regthis_td1 rgtalign">Verify Code<span>*</span>:</td><td class="regthis_td2" style="padding-top:5px;"><div class="verify_captcha"><input type="text" name="regthis_email_verifyimg" id="regthis_email_verifyimg" class="regthis_verify_field" /></div><div id="captchaImage"></div>&nbsp;<a id="cantReadCaptcha" href="">I can\'t read this</a></td></tr> <tr><td class="padless rgtalign"><input type="checkbox" name="regthis_chk_emailme" id="regthis_chk_emailme" value="yes" checked/></td><td class="padless">Send me the best videos and photos from Break and its partners.</td></tr><tr><td class="padless rgtalign"><input type="checkbox" name="regthis_chk_terms" id="regthis_chk_terms" value="yes" /></td><td class="padless">I agree with the <a href="http://info.break.com/static/live/v1/pages/terms.html">Terms of Use</a> and <a href="http://info.break.com/static/live/v1/pages/privacy.html">Privacy Policy</a>. <span class="red">*</span></td></tr> <tr style="visibility:hidden;"><td class="padless rgtalign"><input type="checkbox" name="regthis_chk_mademail" id="regthis_chk_mademail" value="yes" checked/></td><td class="padless">Get MadeMail, the guy\'s guide to new gadgets, good food, and rad threads</td></tr> <tr><td class="regthis_td1 rgtalign">&nbsp;</td><td class="regthis_submit"><input type="submit" id="submitRegister" name="submitRegister" value="Click Here to Register" /></td></tr><tr><td colspan="2"><div class="fbook_login"><strong>Login with your Facebook Account</strong><br /><a href="javascript:void(0)" onclick="FB.Connect.requireSession(loginNewFacebookMember); return false;" ><img id="fb_login_image" src="http://media1.break.com/static/live/v1/img/thirdparty/facebook-login-btn.gif" alt="Connect" border="0" /></a></div></td></tr></table></div></div></td><td class="register_rgt">&nbsp;</td></tr><tr><td colspan="3"><div class="register_btm">&nbsp;</div></td></tr></table></div><div id="login_wrap" class="register_wrap"><table cellpadding="0" cellspacing="0" border="0"><tr><td colspan="3" class="register_top">&nbsp;</td></tr><tr><td class="login_lft">&nbsp;</td><td class="login_cnt" valign="top"><div class="register_closebox"><a class="regthis_closebox" href=""><img src="http://media1.break.com/static/live/v1/img/site/regthis/regthis_close.gif" alt="Close" /></a></div><div class="register_hdr">You need to register for or login to Break to do that!</div><div class="login_msg"><div class="register_em">Login</div>Not registered? <a id="regthis_signup" class="regthis_signup" href="" rel="nofollow">Sign Up now!</a></div><div class="login_innercnt"><div class="regthis_error" id="regthis_error_login">Please enter a valid email address and password</div><table cellpadding="0" cellspacing="0" border="0"><tr><td class="regthis_td1 rgtalign">Email:</td><td class="regthis_td2"><input type="text" name="regthis_login_email" id="regthis_login_email" /><span class="red">&nbsp;*</span></td></tr><tr><td class="regthis_td1 rgtalign">Password:</td><td class="regthis_td2"><input type="password" name="regthis_password" id="regthis_login_password" /><span class="red">&nbsp;*</span></td></tr><tr><td class="padless rgtalign">&nbsp;</td><td class="padless"><a class="boldme" href="http://my.break.com/Member/Authentication/PasswordRecovery.aspx">Forgot your password?</a></td></tr><tr><td class="padless rgtalign"><input type="checkbox" name="regthis_chk_rememberme" id="regthis_chk_rememberme" value="yes" checked/></td><td class="padless">Remember Me</td></tr><tr><td class="regthis_td1 rgtalign">&nbsp;</td><td align="center" class="login_submit"><input type="submit" name="submitLogin" id="submitLogin" value="Login" /></td></tr><tr><td colspan="2"><div class="fbook_login2"><strong>Login with your Facebook Account</strong><br /> <a href="javascript:void(0)" onclick="FB.Connect.requireSession(loginNewFacebookMember); return false;" ><img id="fb_login_image" src="http://media1.break.com/static/live/v1/img/thirdparty/facebook-login-btn.gif" alt="Connect" border="0" /></a></div></td></tr></table></div></td><td class="login_rgt">&nbsp;</td></tr><tr><td colspan="3"><div class="register_btm">&nbsp;</div></td></tr></table></div>';return brkRegisterOverlay}$("body").append(createOverlay());$("#register_wrap").css("display","none");$("#login_wrap").css("display","none");$("#paid_upload").addClass("checkLogin");if(document.getElementById("paid_upload")){document.getElementById("paid_upload").onclick=function(){if(jQuery.checkLoggedIn()){location.href="http://upload.break.com/Content/Upload/uploadmultiple.aspx"}}}else{if(document.getElementById("upload")){document.getElementById("upload").onclick=function(){if(jQuery.checkLoggedIn()){location.href="http://upload.break.com/Content/Upload/uploadmultiple.aspx"}}}}function SecondsFromNow(sec){var dt1=new Date();var dt2=new Date(dt1.valueOf()+(sec*1000));return dt2.toUTCString()}function PopulateData(){var thirdPartyCookie=($.cookie("tsite")!==null)?$.cookie("tsite"):null;var thirdPartyUserId;var thirdPartyName;if($.cookie("MemberID")!=null&&$.cookie("MemberID").length>0&&$.cookie("MemberData")!=null&&$.cookie("MemberData").length>0){var data=eval("("+unescape($.cookie("MemberData"))+")");var nickname=data.Nickname;if((thirdPartyCookie!==null&&thirdPartyCookie.length>0)&&!thirdPartyIsLoggedIntoBreak()){logoutThirdPartyMember()}if(thirdPartyCookie!==null){thirdPartyUserId=thirdPartyCookie.split("_")[0];thirdPartyName=thirdPartyCookie.split("_")[1]}if($.cookie("NewMessageCount")!=null&&$.cookie("NewMessageCount").length>0){RenderLoggedInUserStatus(nickname,$.cookie("NewMessageCount"),thirdPartyName,thirdPartyUserId)}else{RenderLoggedInUserStatus(nickname,0,thirdPartyName,thirdPartyUserId);$.getJSON("http://profile-websvc.break.com/Membership/Handlers/Messages/MessageHandler.ashx?callback=?",{invoke:"getmembermessagecount",siteId:1,mid:$.cookie("MemberID")},function(jsonData){if(jsonData&&jsonData.Response.Code==0){var content=jsonData.Response.Content;if(content){RenderLoggedInUserStatus(nickname,content.MessageCount.NewMessageCount,thirdPartyName,thirdPartyUserId);$.cookie("NewMessageCount",content.MessageCount.NewMessageCount,{path:"/",expires:SecondsFromNow(300)})}}})}}else{RenderGuestLoginStatus()}}function getLogoutLink(thirdPartyName){var onclickfunc="";var theName=(thirdPartyName)?thirdPartyName.toLowerCase():"break";switch(theName){case"break":onclickfunc='<a rel="nofollow" class="bk-ga" brkga="logout" href="http://my.break.com/Member/Authentication/Logout.aspx">Logout</a>';break;case"facebook":onclickfunc='<a rel="nofollow" class="bk-ga" brkga="logout" href="javascript:void(0)" onclick="ThirdPartyMember.logOut();return false;">Logout</a>';break}return onclickfunc}function RenderLoggedInUserStatus(pNickname,pNewMessageCount,thirdPartyName,thirdPartyUserId){var shortNickname=pNickname;if(shortNickname.length>=16){shortNickname=shortNickname.substring(0,10)+"..."}var content=new Array();if(thirdPartyName){content[content.length]=getThirdPartyMiniLogo(thirdPartyUserId,thirdPartyName,false)}content[content.length]='Hi <a rel="nofollow" href="';content[content.length]="http://www.break.com/user/";content[content.length]=pNickname;content[content.length]=' ">';content[content.length]=shortNickname;content[content.length]="</a> | ";content[content.length]=getLogoutLink(thirdPartyName);$("#login_status").html(content.join(""))}function RenderGuestLoginStatus(){$("#login_status").html('<a id="topNav_registerNow" href="" rel="nofollow"> Register</a> or <a id="topNav_login" href="" rel="nofollow">Login</a>');$("#topNav_registerNow").click(function(){ShowRegistrationBox();return false});$("#topNav_login").click(function(){if(!IsLoggedIn()){ShowLoginBox()}return false})}$.extend({setNsf:function(data,doRemove){if(doRemove){$.cookie(safeNsf,null,{path:"/"})}else{$.cookie(safeNsf,data,{path:"/"})}}});function isLogout(){if(window.location.href.toLowerCase().indexOf("logout.aspx")!=-1){setNsf("",true);return true}return false}function getSpicyGirls(turnOffClose){if(!spicyPicsLocal){$.getJSON("http://websvc.break.com/membership/Handlers/Profile/Presentation/PictureGallery.ashx?callback=?",{invoke:"spicygirls"},function(results){if(results.isSuccess){var girls=results.Girls;if(girls&&girls.length&&girls.length>0){var len=girls.length;var imgList="";for(var i=0;i<len;i++){var padRight=(i<(len-1))?"9px;":"0px";imgList+='<img src="'+girls[i]+'" width="73" height="51" alt="Spicy Girl" style="padding-right:5px;" />'}spicyPicsLocal=imgList}}else{spicyPicsLocal="notfound"}showSpicyContent(turnOffClose)})}else{showSpicyContent(turnOffClose)}}function showSpicyContent(turnOffClose){toggleSpicyContent(true,turnOffClose);ShowRegistrationBox()}function toggleSpicyContent(showSpicy,turnOffClose){if(showSpicy){if(spicyPicsLocal&&spicyPicsLocal!=="notfound"){$("#spicy_girls").html(spicyPicsLocal);$("#spicy_girls").css("display","block")}$("#register_hdr_div").css("display","none");$("#register_msg_div").css("display","none");if(turnOffClose){$(".register_closebox").css("display","none")}$("#register_hdr_div_spicy").css("display","block");$("#register_msg_div_spicy").css("display","block")}else{$("#register_hdr_div").css("display","block");$("#register_msg_div").css("display","block");$(".register_closebox").css("display","block");$("#spicy_girls").css("display","none");$("#register_hdr_div_spicy").css("display","none");$("#register_msg_div_spicy").css("display","none")}}jQuery.extend({showSpicyReg:function(turnOffClose){getSpicyGirls(turnOffClose)}});$.extend({checkLoggedIn:function(){if($.cookie("membernickname")!=null){if(!IsLoggedIn()){ShowLoginBox();return false}return true}else{ShowRegistrationBox();return false}}});function ShowRegistrationBox(){var playerTarget=document.getElementById("defaultDiv");if(typeof hideFlashPlayerDiv=="function"){if(typeof flashOutPut!="function"){if(innerDivHTML==""){innerDivHTML=jQuery("#defaultDiv").html()}jQuery("#defaultDiv").html("&nbsp;")}else{playerTarget.brPlayerPause();playerTarget.style.visibility="hidden"}}if(typeof hideHPVSDiv=="function"){if(document.getElementById("videoplayer")){hideHPVSDiv()}}$("#regthis_error_register").hide();$("#login_wrap").hide();generateCaptcha();$("#register_wrap").show(0)}function ShowLoginBox(){var playerTarget=document.getElementById("defaultDiv");try{if(typeof hideFlashPlayerDiv=="function"){if(typeof flashOutPut!="function"){if(innerDivHTML==""){innerDivHTML=jQuery("#defaultDiv").html()}jQuery("#defaultDiv").html("&nbsp;")}else{playerTarget.brPlayerPause();playerTarget.style.visibility="hidden"}}if(typeof hideHPVSDiv=="function"){if(document.getElementById("videoplayer")){hideHPVSDiv()}}$("#regthis_error_login").hide();$("#regthis_login_password, #regthis_login_email").change();$("#register_wrap").hide();$("#login_wrap").show(0)}catch(e){alert(e.message+" Desc: "+e.description)}}function randomXToY(minVal,maxVal){var randVal=Math.round(minVal+(Math.random()*(maxVal-minVal)))}function generateCaptcha(){captchaText=Math.round(100000+(Math.random()*8999999));$("#regthis_email_verifyimg").val("");$("#captchaImage").html('<img src="http://my.break.com/Member/Authentication/CaptchaImage.aspx?randomCode='+captchaText+'"/>')}function renderFlash(){var playerTarget=document.getElementById("defaultDiv");if(typeof showFlashPlayerDiv=="function"){if(typeof flashOutPut!="function"){if(innerDivHTML!=""){jQuery("#defaultDiv").html(innerDivHTML)}innerDivHTML=""}else{playerTarget.style.visibility="visible";playerTarget.brPlayerPlay();if(typeof hideVideoSettingDiv=="function"){hideVideoSettingDiv()}}}if(typeof showHPVSDiv=="function"){if(document.getElementById("videoplayer")){showHPVSDiv()}}}function loginFacebookMember(userId){if(!userId||userId==undefined){return}$.getJSON("http://websvc.break.com/membership/Handlers/Profile/Member/MemberHandler.ashx?callback=?",{invoke:"loginthirdpartymember",u:userId,site:"facebook"},function(results){if(results.isSuccess){PopulateData();renderFlash();$(".register_wrap").hide(0);window.location.reload()}else{$("#regthis_error_register").text(result.reason).show(0)}})}$.extend({callFacebookMemberLogin:function(){loginFacebookMember(FB.Facebook.apiClient.get_session().uid)}});function getLoginThirdPartyIcon(thirdPartyName,thirdPartyUserId){var thirdPartyIcon="";var tpName=(thirdPartyName)?thirdPartyName:"";var imgPath="http://media1.break.com/static/live/v1/img/thirdparty/";switch(tpName.toLowerCase()){case"facebook":var html="";if(thirdPartyUserId){html+="<a href='http://www.facebook.com/profile.php?id="+thirdPartyUserId+"'>"}html+='<img src="'+imgPath+"facebook-icon.gif\" alt='Facebook' border='0' />";if(thirdPartyUserId){html+="</a>"}thirdPartyIcon=html;break;default:break}return thirdPartyIcon}function logoutThirdPartyMember(){var data=eval("("+unescape($.cookie("MemberData"))+")");var nickname=data.Nickname;var thirdPartyName;var thirdPartyCookie=($.cookie("tsite")!=null)?$.cookie("tsite"):null;if(thirdPartyCookie!=null){thirdPartyName=thirdPartyCookie.split("_")[1];$.getJSON("http://websvc.break.com/membership/Handlers/Profile/Member/MemberHandler.ashx?callback=?",{invoke:"logoutthirdpartymember",nick:nickname,site:thirdPartyName},function(result){if(result.isSuccess){window.location.reload(false)}else{$("#regthis_error_register").text(result.reason).show(0)}})}}$.extend({loginThirdPartyUser:function(userId,thirdPartyName){if($.cookie("tsite")!==null&&thirdPartyIsLoggedIntoBreak()){PopulateData();renderFlash();$(".register_wrap").hide(0);return}else{switch(thirdPartyName){case"openid":break;default:loginFacebookMember(userId);break}}}});$(".register_closebox").click(function(){renderFlash();$(".register_wrap").hide(0);toggleSpicyContent(false);return false});$("#regthis_signup").click(function(){ShowRegistrationBox();return false});$("#regthis_login").click(function(){ShowLoginBox();return false});$("regthis_login").click(function(){ShowLoginBox();return false});$("#cantReadCaptcha").click(function(){generateCaptcha();return false});function moveTooltip(sourceOfMovement,text){$("#register_popmsg_inner").text(text);$("#register_popmsg").show(200,function(){$(this).animate({top:parseInt($(sourceOfMovement).position().top+$(sourceOfMovement).height()/2-$("#register_popmsg").height()/2+1)},500)})}$("#regthis_nickname").focus(function(){moveTooltip(this,"Nickname must contain at least 3 alpha characters")});$("#regthis_password, #regthis_password2").focus(function(){moveTooltip(this,"Password must be 5 - 15 characters long with at least 1 letter and 1 number")});$("#regthis_email, #regthis_dob_month, #regthis_dob_day, #regthis_dob_year, #regthis_email_verifyimg, #regthis_chk_emailme, #regthis_chk_terms","#regthis_chk_mademail").focus(function(){$("#register_popmsg").hide(0)});var nick_err="";var pass_err="";if($("#ctl00_ContentBody_ucAddMember_MemberNickNameTextBox1").length){$("#ctl00_ContentBody_ucAddMember_MemberNickNameTextBox1").change(function(){if($(this).val().length>=3){$.getJSON("http://websvc.break.com/membership/Handlers/Profile/Member/MemberHandler.ashx?callback=?",{invoke:"isnicknameavailable",nickname:$(this).val()},function(isAvailable){if(isAvailable){$("#register_page_error").hide(0)}else{$("#register_page_error").html("Another person has already claimed this nickname, please try a different one").show(0)}})}});$("#ctl00_ContentBody_ucAddMember_MemberPasswordTextBox1, #ctl00_ContentBody_ucAddMember_MemberPasswordTextBox2").change(function(){if($("#ctl00_ContentBody_ucAddMember_MemberPasswordTextBox1").val().length>0&&$("#ctl00_ContentBody_ucAddMember_MemberPasswordTextBox2").val().length>0){if($("#ctl00_ContentBody_ucAddMember_MemberPasswordTextBox1").val()==$("#ctl00_ContentBody_ucAddMember_MemberPasswordTextBox2").val()){$("#register_page_error").hide(0)}else{$("#register_page_error").html("Your passwords do not match, please try again").show(0)}}});$("#ctl00_ContentBody_ucAddMember_MemberPasswordTextBox1, #ctl00_ContentBody_ucAddMember_MemberEmailTextBox1").change(function(){if($(this).val().length==0){$(this).next("span").fadeIn(100)}else{$(this).next("span").fadeOut(100)}})}$("#regthis_nickname").change(function(){if($(this).val().length>=3){$.getJSON("http://websvc.break.com/membership/Handlers/Profile/Member/MemberHandler.ashx?callback=?",{invoke:"isnicknameavailable",nickname:$(this).val()},function(isAvailable){if(isAvailable){nick_err="";if(pass_err==""){$("#regthis_nickname_star").css("visibility","hidden");$("#regthis_error_register").hide(0)}}else{nick_err="<strong>Nickname:</strong> Another person has already claimed this nickname, please try a different one<br />";$("#regthis_nickname_star").css("visibility","visible");$("#regthis_error_register").html(nick_err+pass_err).show(0)}})}});$("#regthis_password, #regthis_password2").change(function(){if($("#regthis_password").val().length>0&&$("#regthis_password2").val().length>0){if($("#regthis_password").val()==$("#regthis_password2").val()){pass_err="";if(nick_err==""){$("#regthis_password_star").css("visibility","hidden");$("#regthis_password2_star").css("visibility","hidden");$("#regthis_error_register").hide(0)}}else{$("#regthis_password_star").css("visibility","visible");$("#regthis_password2_star").css("visibility","visible");pass_err="<strong>Password:</strong> Your passwords do not match, please try again <br />";$("#regthis_error_register").html(nick_err+pass_err).show(0)}}});$("#regthis_login_password, #regthis_login_email").change(function(){if($(this).val().length==0){$(this).next("span").fadeIn(100)}else{$(this).next("span").fadeOut(100)}});$("#submitLogin").click(function(){if($("#regthis_login_email").val().length>0&&$("#regthis_login_password").val().length>0){$("#regthis_error_login").hide(0);$.getJSON("http://websvc.break.com/membership/Handlers/Profile/Member/MemberHandler.ashx?callback=?",{invoke:"loginmember",email:$("#regthis_login_email").val(),password:$("#regthis_login_password").val(),rememberme:$("#regthis_chk_rememberme:checked").length==1},function(isLoginSuccess){if(isLoginSuccess.isSuccess){PopulateData();renderFlash();$(".register_wrap").hide(0);_gaq.push(["_trackEvent","user","login",thisURL]);window.location.reload(false)}else{if(isLoginSuccess.reason=="regcode"){location.href="http://my.break.com/Member/Authentication/VerifyRegistrationEmail.aspx"}else{$("#regthis_error_login").show(0)}}})}else{$("#regthis_error_login").show(0)}return false});$("#submitRegister").click(function(){var hasError=false;var nickname_err="";var passmatch_err="";var passlen_err="";var email_err="";var dob_err="";var verify_err="";var terms_err="";$("#regthis_error_register").hide(0);$("#regthis_nickname_star").css("visibility","hidden");$("#regthis_password_star").css("visibility","hidden");$("#regthis_password2_star").css("visibility","hidden");$("#regthis_email_star").css("visibility","hidden");$("#regthis_dob_star").css("visibility","hidden");if(!$("#regthis_nickname").val().match(/^[0-9a-zA-Z_]{1,40}$/)){hasError=true;nickname_err="<strong>Nickname:</strong> Nickname must not contain spaces or special characters<br />";$("#regthis_nickname_star").css("visibility","visible")}if($("#regthis_nickname").val().length<3){hasError=true;nickname_err="<strong>Nickname:</strong> Nickname must contain at least 3 alpha characters. <br />";$("#regthis_nickname_star").css("visibility","visible")}if($("#regthis_password").val().length<1||$("#regthis_password2").val().length<1||$("#regthis_password").val()!=$("#regthis_password2").val()){hasError=true;passmatch_err="<strong>Password:</strong> Your passwords do not match, please try again <br />";$("#regthis_password_star").css("visibility","visible");$("#regthis_password2_star").css("visibility","visible")}if(!$("#regthis_password").val().match(/^.*(?=.{5,15})(?=.*\d)(?=.*[a-zA-Z]).*$/)){hasError=true;$("#regthis_password_star").css("visibility","visible");passlen_err="<strong>Password:</strong> Password must be 5 - 15 characters long with at least 1 letter and 1 number<br />"}if($("#regthis_email").val().length<1){hasError=true;$("#regthis_email_star").css("visibility","visible");email_err="<strong>Email Address:</strong> Please enter your Email Address<br />"}if($("#regthis_dob_month option:selected").val()==0||$("#regthis_dob_day option:selected").val()==0||$("#regthis_dob_year option:selected").val()==0){hasError=true;$("#regthis_dob_star").css("visibility","visible");dob_err="<strong>Date of Birth:</strong> Please enter your Date of Birth<br />"}if($("#regthis_email_verifyimg").val()!=captchaText){hasError=true;verify_err="<strong>Verify Code:</strong> The Verify Code you have entered does not match, please try again<br />"}if($("#regthis_chk_terms:checked").length==0){hasError=true;terms_err="<strong>Terms of Use/Privacy Policy:</strong> You must agree to our Terms of Use and Privacy Policy<br />"}var breakMailChecked=$("#regthis_chk_emailme").is(":checked");if(breakMailChecked){$("#regthis_chk_mademail").attr("checked",true)}else{$("#regthis_chk_mademail").attr("checked",false)}if(!hasError){$.getJSON("http://websvc.break.com/membership/Handlers/Profile/Member/MemberHandler.ashx?callback=?",{invoke:"registermember",nickname:$("#regthis_nickname").val(),password:$("#regthis_password").val(),email:$("#regthis_email").val(),optinEmail:$("#regthis_chk_emailme:checked").length==1,optinMadeMail:$("#regthis_chk_mademail:checked").length==1,month:$("#regthis_dob_month option:selected").val(),day:$("#regthis_dob_day option:selected").val(),year:$("#regthis_dob_year option:selected").val()},function(result){if(result.isSuccess){$(".register_wrap").hide(0);location.href="http://my.break.com/Member/Authentication/VerifyRegistrationEmail.aspx"}else{$("#regthis_error_register").text(result.reason).show(0);generateCaptcha()}})}else{if(nick_err!=""){$("#regthis_nickname_star").css("visibility","visible")}$("#regthis_error_register").html(nick_err+nickname_err+passmatch_err+passlen_err+email_err+dob_err+verify_err+terms_err).show(0);generateCaptcha()}return false});if($.cookie("MemberAuthentication")!=null&&$.cookie("MemberData")!=null&&$.cookie("MemberAuthentication").length>0&&$.cookie("MemberData").length>0){PopulateData()}else{RenderGuestLoginStatus()}$(".checkLogin").bind("click",function(){var sessionInfo=BRK.api.session,userLoggedIn=false,postAuthValue=$(this).attr("href");if(postAuthValue){postAuthURI=postAuthValue}if(sessionInfo!="undefined"){if(sessionInfo!=null){userLoggedIn=true}}else{if(getCookie("brk_net_13")!=null){userLoggedIn=true}}if(!userLoggedIn){if(sessionInfo!="undefined"){BRK.hat.showLoginModal();return false}}});$(".showLoginBox").click(function(){ShowLoginBox();return false});$(".showRegisterBox").click(function(){ShowRegistrationBox();return false})});function openLoginOverlay(){var a=jQuery.noConflict();if(typeof a.checkLoggedIn=="function"){a.checkLoggedIn()}else{$.checkLoggedIn()}}var counter=0;function showSpicyReg(a){if(jQuery.showSpicyReg){jQuery.showSpicyReg(a)}else{counter++;if(counter<15){window.setTimeout(function(){showSpicyReg(a)},400)}}}function setNsf(b,a){var c=jQuery.noConflict();if(typeof c.setNsf=="function"){c.setNsf(b,a)}else{$.setNsf(b,a)}}function login_third_party_user(a,b){var c=jQuery.noConflict();if(typeof c.loginThirdPartyUser=="function"){c.loginThirdPartyUser(a,b)}else{$.loginThirdPartyUser(a,b)}}function loginNewFacebookMember(){var a=jQuery.noConflict();if(typeof a.callFacebookMemberLogin=="function"){a.callFacebookMemberLogin()}else{$.callFacebookMemberLogin()}};