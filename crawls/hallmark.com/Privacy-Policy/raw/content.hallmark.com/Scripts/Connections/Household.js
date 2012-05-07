﻿
var SucessCallBackOnEdit='';$(document).ready(function(){if($('#frmHouseholdListView').length==1){InitHouseholdAddressBook();}});function InitHouseholds(){InitActionDropdown();$('.multipleSelector').bind('click.multipleSelected',function(){if($(this).hasClass('SelectAllLink')){$('.JQIsHouseholdChecked').attr('checked','checked');EnableDisableAction();}
else if($(this).hasClass('DeSelectAllLink')){$('.JQIsHouseholdChecked').attr('checked','');EnableDisableAction();}});$('.JQIsHouseholdChecked').unbind('click').bind('click.selction',function(){EnableDisableAction();});setTimeout(function(){$('#frmHouseholdListView .accordionHead').first().trigger('click');},1000);}
function InitHouseholdAddressBook(){if($('#SelectedHouseHoldIDs').val().length>0){var selectedHHIds=$('#SelectedHouseHoldIDs').val().split(',');var newSelectedHHIds='';for(var i=0;i<selectedHHIds.length;i++){if($('#HouseholdDiv_'+selectedHHIds[i]).length>0){$('#HouseholdDiv_'+selectedHHIds[i]).find('.JQIsHouseholdChecked').attr('checked','checked');}
else{newSelectedHHIds=newSelectedHHIds+selectedHHIds[i]+',';}}
newSelectedHHIds=newSelectedHHIds.substr(0,newSelectedHHIds.length-1);$('#SelectedHouseHoldIDs').val(newSelectedHHIds);}}
function getSelectedHouseholdIDs(){var Ids='';$('input:checked.JQIsHouseholdChecked').each(function(){var parentDivID=$(this).closest('div').attr('id');Ids=Ids+parentDivID.substr(parentDivID.indexOf('_')+1,parentDivID.length)+',';});Ids=Ids.substr(0,Ids.length-1);if($('#SelectedHouseHoldIDs').val()!='undefined'&&$('#SelectedHouseHoldIDs').val()!=""){$('#SelectedHouseHoldIDs').val($('#SelectedHouseHoldIDs').val()+',');$('input.JQIsHouseholdChecked').each(function(){var divID=$(this).closest('div').attr('id');if(!($('#SelectedHouseHoldIDs').val().indexOf(divID.substr(divID.indexOf('_')+1,divID.length))==-1)){$('#SelectedHouseHoldIDs').val($('#SelectedHouseHoldIDs').val().replace(divID.substr(divID.indexOf('_')+1,divID.length)+',',''));}});Ids=$('#SelectedHouseHoldIDs').val()+Ids;}
return Ids;}
function EnableDisableAction(){if($('input:checked.JQIsHouseholdChecked').length!=0){$('.JQDelete').removeClass('disabled');hallmarkBehaviors.hmkEnableButton($('.JQDelete'));}
else{hallmarkBehaviors.hmkDisableButton($('.JQDelete'));$('.JQDelete').addClass('disabled',true);}}
function InitActionDropdown(){if($('#frmHouseholdListView').length==1){EnableDisableAction();}}
function UpdateHouseHold(){if($("#AddressBookType").val().toUpperCase()==addressBookTypes[0].toUpperCase()){document.forms["frmHouseholdEdit"].action="/ConnectionsHousehold/UpdateHouseHold";document.forms["frmHouseholdEdit"].method="POST";document.forms["frmHouseholdEdit"].submit();}
else{SaveHouseHold();}}
var SaveHouseholdOptions={type:"POST",contentType:"application/x-www-form-urlencoded",url:"/ConnectionsHousehold/SaveHousehold",dataType:"json",success:SaveHouseHoldSuccessCallBack,error:''};function SaveHouseHold(){clearAllErrorMessages();$('#frmHouseholdEdit').ajaxSubmit(SaveHouseholdOptions);return false;}
function SaveHouseHoldSuccessCallBack(data){if(null!=data.validationErrors&&data.validationErrors.length>0){displayErrorMessagesOnReLoad(data.validationErrors,errorPage)
hallmarkBehaviors.hmkEnableButton('.JQDisableAction');scrollToElement("msgDiv\\.EditHouseholds");s.prop14=data.validationErrors[0].Message;evalOmniture();s.prop14='';}
else{$("#ShowEditHousehold").attr('style','display:none');$("#ShowEditHousehold").find('.close').trigger('click');errorPage='SelectRecipients';AddSelectedHousehold(data);PostHouseholdForm($('#Households\\.CurrentPageNumber').val());NavigateHouseholds();}}
var AddHouseHoldOptions={type:"POST",contentType:"application/x-www-form-urlencoded",url:"/ConnectionsHousehold/AddHouseHold",dataType:"json",success:AddHouseHoldSuccessCallBack,error:''};function AddHouseHold(){clearAllErrorMessages();if($('div .secondLevel .selected').attr('id')=='AtAGlanceTab'){$('#SelectionCriteria').val('NAME');}
if($("#AddressBookType").val().toUpperCase()!=addressBookTypes[0].toUpperCase()){$('#frmAddEditHousehold').find('#ValidationType').val($('#SelectionCriteria').val().toUpperCase());}
$('#frmAddEditHousehold').ajaxSubmit(AddHouseHoldOptions);return false;}
function AddHouseHoldSuccessCallBack(data){if(null!=data.validationErrors&&data.validationErrors.length>0){displayErrorMessagesOnReLoad(data.validationErrors,errorPage)
scrollToElement("msgDiv\\.AddHouseholds");s.prop14=data.validationErrors[0].Message;evalOmniture();s.prop14='';}
else{if($("#AddressBookType").val().toUpperCase()=="POD"){$("#ShowAddEditContact").find('.close').trigger('click');errorPage='SelectRecipients';AddSelectedHousehold(data);PostHouseholdForm($('#Households\\.CurrentPageNumber').val());}
else if($('div.secondLevel').find('.secHead_Households').hasClass('selected')){window.location.reload();}
else{$('#ShowAddEditContact').find('div.close').trigger('click');}}
hallmarkBehaviors.hmkEnableButton('.JQDisableAction');}
function DisplayHousehold(){document.forms["frmGetContacts"].action="/ConnectionsHousehold/GetHouseholds";document.forms["frmGetContacts"].method="GET";document.forms["frmGetContacts"].submit();}
function EditHousehold(householdID){var params="HouseholdID="+householdID+"&AddressBookType="+$('#AddressBookType').val()+"&HouseholdSelectionCriteria="+$('#SelectionCriteria').val();window.location.href="/ConnectionsHousehold/LoadEditHousehold/"+householdID+"/"+$('#AddressBookType').val()+"/"+$('#SelectionCriteria').val();}
function CancelUpdateHousehold(){if($("#AddressBookType").val().toUpperCase()==addressBookTypes[0].toUpperCase()){window.location.href="/ConnectionsHousehold/LoadHouseholdDetails?HouseholdID="+$('#HouseholdID').val();}
else{$("#ShowEditHousehold").find('.close').trigger('click');}}
function GetHouseholdDetails(obj){window.location.href='/ConnectionsHousehold/LoadHouseholdDetails?householdID='+$(obj).parent('div').parent('div').attr('id');}
function GetHouseholdDetailsByHouseholdID(householdID){var params="HouseholdID="+householdID;window.location.href="/ConnectionsHousehold/LoadHouseholdDetails?"+params;}
function PostHouseholdForm(pageNumber){$('#HouseHolds\\.CurrentPageNumber').val(pageNumber);$('#SelectedHouseHoldIDs').val(getSelectedHouseholdIDs());$("#frmHouseholdListView").attr("action","/ConnectionsHousehold/GetHouseholdsPaged");$("#frmHouseholdListView").attr("method","POST");$("#frmHouseholdListView").submit();}
function DeleteSingleHousehold(householdID){$('#HouseholdID').val(householdID);$('#IsDeleteSingleHousehold').val('true');DisplayDeleteHouseholdOverlay();}
function DeleteHouseholds(formID){if(formID=='frmHouseholdDetails'||formID=='frmHouseholdEdit'){$('#IsDeleteSingleHousehold').val('true');}
document.forms[formID].action="/ConnectionsHousehold/DeleteHousehold";document.forms[formID].method="POST";document.forms[formID].submit();}
function DisplayDeleteHouseholdOverlay(){PostOmnitureData('My Accounts -  Address Book - Delete Households');$('#SelectedHouseHoldIDs').val(getSelectedHouseholdIDs());if($('#IsDeleteSingleHousehold').val().toUpperCase()=='FALSE'&&($("#SelectedHouseHoldIDs").val()=="")){msgDiv=$(getJQSelectorForID('msgDiv.'+errorPage));addErrorToCommonErrorDiv(msgDiv,'CommonError.DisplayDelete',errorMessage);}
else{clearAllErrorMessages();$("#DeleteHouseholds").overlay({api:true,speed:200,expose:{maskId:'overlyMask',loadSpeed:800,opacity:0.9},onBeforeLoad:function(){var wrap=this.getContent().find("div.wrap");if(wrap.is(":empty")){wrap.load(this.getTrigger().attr("href"));}},onClose:function(){$("#DeleteHouseholds.wrap").empty();$('#IsDeleteSingleHousehold').val('false');},closeOnClick:false}).load();setTimeout(function(){extendedBehaviors.hmkFormFocusOverlay($('#DeleteHouseholds'));},1000);$(".close").click(function(){$("#DeleteHouseholds").overlay().close();$('.JQDropdownOptions').attr('checked','');});}}
function NavigateHouseholds(){$("a[rel]").removeAttr('rel');var params="AddressBookType="+$("#AddressBookType").val()+"&SelectionCriteria="
+$("#SelectionCriteria").val()+"&Households.CurrentPageNumber="+$("#Households\\.CurrentPageNumber").val();$('#Loading').css('display','block');$.ajax({type:"GET",contentType:"application/x-www-form-urlencoded",url:"/ConnectionsHousehold/GetRecipientHouseholds",data:params,dataType:"html",async:false,error:function(e){},success:SuccessCallbackHouseholdsNavigation});}
function SuccessCallbackHouseholdsNavigation(data){if(data!=""){$('#Loading').css('display','none');$('a[rel]').removeAttr('rel');$("#ContactsSection").html('');$("#GroupSec").html('');$("#HouseHoldSection").html('');$("#HouseHoldSection").html(data);$('#SelectRecipientsView').val("Households");$('.accordionHead').unbind('click');hallmarkBehaviors.hmkWidgets();hallmarkBehaviors.hmkTooltip();hallmarkBehaviors.hmkOverlay();CheckForSelectedRecipients();$("a[rel]").removeAttr('rel');SetOmnitureDateForSelectRecipients();$("#SelectedRecipientPagination").find('.searchPaginationButton').unbind('click');}}
function SaveGroupAsset(){var params="";if(ImageUpload.avatarID!=""){params="Avatar.AvatarID="+ImageUpload.avatarID
+"&HouseholdID="+$('#HouseholdID').val();}
else{params="Asset.AssetID="+$("#AssetID").val()
+"&Asset.ImageUrl="+ImageUpload.imageUrl+"&HouseholdID="+$('#HouseholdID').val();}
$.ajax({type:"POST",contentType:"application/x-www-form-urlencoded",url:"/ConnectionsHousehold/AddAsset",data:params,dataType:"json",error:function(e){},success:function(data){if(data!=null){if(data.validationErrors!=null){displayErrorMessagesOnReLoad(data.validationErrors,errorPage);hallmarkBehaviors.hmkEnableButton();}
else{ImageUpload.HandleSuccess(data);}}}});}