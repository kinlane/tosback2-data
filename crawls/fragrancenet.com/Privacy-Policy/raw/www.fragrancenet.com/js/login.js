function ajaxLogon(preventReload){if(document.location.protocol=='http:'){var iframe=$('<iframe>'),postForm=$('form#ajaxLogin').clone(true),frameName=('resp'+Math.random()).replace('.','');iframe
.css('display','none')
.attr('name',frameName)
.attr('id','logoniframe')
.appendTo($('#signinAjax'));iframe[0].contentWindow.name=frameName;$('<input>').attr({type:'hidden',name:'insecure_protocol',value:'1'}).appendTo(postForm);postForm
.unbind()
.css('display','none')
.attr('target',frameName)
.appendTo($('body'));var closeButton=$('a#loaderSwap').clone(true);$('a#loaderSwap').remove();$('#loaderImage').css('display','inline');postForm.submit();$('#logoniframe').one('load',function(){var result=$(iframe).contents().find('html body').html();result=result.replace(/(\n|\r|\s)+$/,'');if(result!='success'){$('#showErrorBox').show();$('.showError').css('color','#CC2704');$('#loaderImage').css('display','none');$('#appendLoader').prepend(closeButton);iframe.remove();postForm.remove();}else{if(typeof preventReload=='undefined'){window.location.href=window.location.href}}});}else{$.ajax({url:'https://'+document.location.hostname+':'+document.location.port+'/f/net/signin_ajax.html',dataType:'html',type:'POST',data:$('form#ajaxLogin').serialize()+'&insecure_protocol=0',beforeSend:function(){$('#loaderImage').css('display','inline');},success:function(data){$('#loaderImage').css('display','none');$('#appendLoader').prepend(closeButton);data=data.replace(/(\n|\r|\s)+$/,'');if(data!='success'){$('#showErrorBox').show();$('.showError').css('color','#CC2704');}
else
if(typeof preventReload=='undefined')
window.location.href=window.location.href},error:function(){window.location.href='https://'+document.location.hostname+':'+document.location.port+'/f/net/login';}});}}
function ajaxLogout(preventReload){$.ajax({url:document.location.protocol+'//'+document.location.hostname+':'+document.location.port+'/f/net/ajax_logout.html',dataType:'html',type:'GET',beforeSend:function(){},success:function(data){if(typeof preventReload=='undefined')
window.location.href=window.location.href},error:function(){window.location.href='https://'+document.location.hostname+':'+document.location.port+'/f/net/logout';}});return false;}
function loginPop(){if($('.trig_signinAjax').length>0){createPopUp('.trig_signinAjax','#signinAjax');$('.trig_signinAjax').click(function(){$('.showError').css('color','black');$('#showErrorBox').hide();$('#signinAjax').css("top",($('#utility').height()-2)+'px');var one_side=(($(window).width()-$('#container').width())/2);$('#signinAjax').css("left",($(window).width()-($('#signinAjax').width()+one_side))+'px');});}}
$(document).ready(function(){$('.trig_signinAjax').click(function(){$('#signinAjax #mv_user').focus();return false;});$('#mvpassword').keyup(function(event){var keyCode=event.keyCode?event.keyCode:event.which?event.which:event.charCode;if(keyCode==13){$('#loginSubmit').click();return false;}});});//@Nick Piscitelli
