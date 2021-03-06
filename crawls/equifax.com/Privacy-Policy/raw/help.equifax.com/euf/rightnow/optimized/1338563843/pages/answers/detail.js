
RightNow.Widget.EmailAnswerLink=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._dialogElement=document.getElementById('rn_'+this.instanceID+'_EmailAnswerLinkForm');this._recipientEmailElement=document.getElementById("rn_"+this.instanceID+"_InputRecipientEmail");this._senderEmailElement=document.getElementById("rn_"+this.instanceID+"_InputSenderEmail");this._senderNameElement=document.getElementById("rn_"+this.instanceID+"_InputSenderName");this._errorDisplay=document.getElementById("rn_"+this.instanceID+"_ErrorMessage");if(this._dialogElement)
{YAHOO.util.Event.addListener("rn_"+this.instanceID+"_Link","click",this._onEmailLinkClick,null,this);}
RightNow.Event.subscribe("evt_emailLinkSubmitResponse",this._onResponseReceived,this);};RightNow.Widget.EmailAnswerLink.prototype={_onEmailLinkClick:function(type,arg)
{if(!(this._dialog))
{var buttons=[{text:this.data.attrs.label_send_button,handler:{fn:this._submitClicked,scope:this},isDefault:true},{text:this.data.attrs.label_cancel_button,handler:{fn:this._closeDialog,scope:this},isDefault:false}];this._dialog=RightNow.UI.Dialog.actionDialog(this.data.attrs.label_dialog_title,this._dialogElement,{"buttons":buttons,"width":'300px'});YAHOO.util.Dom.removeClass(this._dialogElement,"rn_Hidden");YAHOO.util.Dom.addClass(this._dialog.id,'rn_EmailLinkDialog');}
if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
this._dialog.show();if(this._recipientEmailElement)
this._recipientEmailElement.focus();this._dialog.enableButtons();},_closeDialog:function(type,arg)
{if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
this._dialog.enableSecondButton();this._dialog.hide();},_submitClicked:function()
{this._dialog.disableButtons();if(this._validateFormData())
{this._submitRequest();}
else
{this._dialog.enableButtons();}},_validateFormData:function()
{var returnValue=true;if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
if(!this._validateEmailAddress(this._recipientEmailElement,this.data.attrs.label_to))
{returnValue=false;}
if(this._senderEmailElement&&!this._validateEmailAddress(this._senderEmailElement,this.data.attrs.label_sender_email))
{returnValue=false;}
if(this._senderNameElement)
{var nameValue=YAHOO.lang.trim(this._senderNameElement.value);if(nameValue!=="")
{if(nameValue.indexOf("<")>-1||nameValue.indexOf(">")>-1)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_CONTAIN_THAN_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}
if(nameValue.indexOf("'")>-1||nameValue.indexOf('"')>-1)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_MUST_NOT_CONTAIN_QUOTES_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}
if(nameValue.indexOf("&")>-1)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_MUST_NOT_CONTAIN_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}}
else
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_REQUIRED_MSG"),this.data.attrs.label_sender_name),this._senderNameElement.id);returnValue=false;}}
return returnValue;},_validateEmailAddress:function(emailField,label)
{if(emailField)
{var emailFieldValue=YAHOO.lang.trim(emailField.value);if(emailFieldValue==="")
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_REQUIRED_MSG"),label),emailField.id);return false;}
if(emailFieldValue.indexOf(";")>=0||emailFieldValue.indexOf(",")>=0||emailFieldValue.indexOf(" ")>=0)
{this._addErrorMessage(RightNow.Interface.getMessage("PLEASE_ENTER_SINGLE_EMAIL_ADDRESS_MSG"),emailField.id);return false;}
if(!RightNow.Text.isValidEmailAddress(emailFieldValue))
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_INVALID_MSG"),label),emailField.id);return false;}
if(emailFieldValue.length>80)
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_TOO_LONG_MSG"),label),emailField.id);return false;}
return true;}
return false;},_submitRequest:function()
{var eventObject=new RightNow.Event.EventObject();eventObject.w_id=this.instanceID;eventObject.data={"emailAnswerToken":this.data.js.emailAnswerToken,"to":this._recipientEmailElement.value,"a_id":this.data.js.answerID};if(this.data.js.isProfile)
{eventObject.data.from=this.data.js.senderEmail;eventObject.data.name=this.data.js.senderName;}
else
{if(this._senderEmailElement)
{eventObject.data.from=this._senderEmailElement.value;}
if(this._senderNameElement)
{eventObject.data.name=this._senderNameElement.value;}}
RightNow.Event.fire("evt_emailLinkRequest",eventObject);},_onResponseReceived:function(type,arg)
{if(arg[1][0].w_id===this.instanceID)
{RightNow.UI.Dialog.messageDialog(((arg[0]&&arg[0]!==true)?arg[0]:this.data.attrs.label_email_sent),{exitCallback:{fn:this._closeDialog,scope:this}});}},_addErrorMessage:function(message,focusElement){if(this._errorDisplay){YAHOO.util.Dom.addClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');var newMessage='<a href="javascript:void(0);" onclick="document.getElementById(\''+focusElement+'\').focus(); return false;">'+message+'</a>';var oldMessage=this._errorDisplay.innerHTML;if(oldMessage==="")
this._errorDisplay.innerHTML=newMessage;else
this._errorDisplay.innerHTML=oldMessage+'<br/>'+newMessage;this._errorDisplay.firstChild.focus();}}};
RightNow.Widget.AnswerFeedback2=function(data,instanceID)
{this.data=data;this.instanceID=instanceID;this._rate=0;this._emailField=document.getElementById("rn_"+this.instanceID+"_EmailInput");this._errorDisplay=document.getElementById("rn_"+this.instanceID+"_ErrorMessage");this._feedbackField=document.getElementById("rn_"+this.instanceID+"_FeedbackTextarea");if(!this._feedbackField)
{RightNow.UI.DevelopmentHeader.addJavascriptError(RightNow.Text.sprintf(RightNow.Interface.getMessage("ANSWERFEEDBACK2_DIALOG_MISSING_REQD_MSG"),"rn_"+this.instanceID+"_FeedbackTextarea"));return;}
RightNow.Event.subscribe("evt_answerFeedbackSubmitResponse",this._onResponseReceived,this);var Event=YAHOO.util.Event;if(this.data.js.buttonView)
{var noButton=document.getElementById("rn_"+this.instanceID+"_RatingNoButton"),yesButton=document.getElementById("rn_"+this.instanceID+"_RatingYesButton");Event.addListener(noButton,"click",this._onClick,1,this);Event.addListener(yesButton,"click",this._onClick,2,this);Event.addListener([noButton,yesButton],"mouseover",function(){this._wasMouse=true;},null,this);Event.addListener([noButton,yesButton],"mouseout",function(){this._wasMouse=false;},null,this);}
else if(this.data.attrs.use_rank_labels)
{var ratingButton="rn_"+this.instanceID+"_RatingButton_";for(var i=1;i<=this.data.attrs.options_count;++i)
{Event.addListener(ratingButton+i,"click",this._onClick,i,this);Event.addListener(ratingButton+i,"mouseover",function(){this._wasMouse=true;},null,this);Event.addListener(ratingButton+i,"mouseout",function(){this._wasMouse=false;},null,this);}}
else
{var ratingCell="rn_"+this.instanceID+"_RatingCell_";for(var i=1;i<=this.data.attrs.options_count;++i)
{Event.addListener(ratingCell+i,"mouseover",this._onCellOver,i,this);Event.addListener(ratingCell+i,"focus",this._onCellOver,i,this);Event.addListener(ratingCell+i,"mouseout",this._onCellOut,i,this);Event.addListener(ratingCell+i,"blur",this._onCellOut,i,this);Event.addListener(ratingCell+i,"click",this._onClick,i,this);}}};RightNow.Widget.AnswerFeedback2.prototype={_onClick:function(type,args)
{if(this.data.js.buttonView||this.data.attrs.use_rank_labels)
{var ratingButtons=document.getElementById("rn_"+this.instanceID+"_RatingButtons");if(ratingButtons)
YAHOO.util.Event.purgeElement(ratingButtons,true);}
else
{this._onCellOver(0,args);YAHOO.util.Event.preventDefault(type);var rateMeter=document.getElementById("rn_"+this.instanceID+"_RatingMeter");if(rateMeter)
YAHOO.util.Event.purgeElement(rateMeter,true);for(var cell,i=0;i<=this.data.attrs.options_count;++i)
{cell=document.getElementById("rn_"+this.instanceID+"_RatingCell_"+i);if(cell)
{for(var j=0;j<cell.childNodes.length;j++)
{if(cell.childNodes[j].tagName&&cell.childNodes[j].tagName.toLowerCase()==="span"&&YAHOO.util.Dom.hasClass(cell.childNodes[j],"rn_ScreenReaderOnly"))
cell.childNodes[j].innerHTML=RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_D_OF_PCT_D_SELECTED_LBL"),args,this.data.attrs.options_count);}}}}
this._rate=args;this._submitAnswerRating();if(this._rate<=this.data.attrs.dialog_threshold)
{if(this.data.attrs.feedback_page_url)
{var pageString=this.data.attrs.feedback_page_url;pageString=RightNow.Url.addParameter(pageString,"a_id",this.data.js.answerID);pageString=RightNow.Url.addParameter(pageString,"session",RightNow.Url.getSession());window.open(pageString,'',"resizable, scrollbars, width=630, height=400");}
else
{this._showDialog();}}},_showDialog:function()
{if(!this._dialog)
{var buttons=[{text:this.data.attrs.label_send_button,handler:{fn:this._onSubmit,scope:this},isDefault:true},{text:this.data.attrs.label_cancel_button,handler:{fn:this._onCancel,scope:this},isDefault:false}],dialogForm=document.getElementById("rn_"+this.instanceID+"_AnswerFeedback2Form");this._dialog=RightNow.UI.Dialog.actionDialog(this.data.attrs.label_dialog_title,dialogForm,{"buttons":buttons,"dialogDescription":"rn_"+this.instanceID+"_DialogDescription",width:this.data.attrs.dialog_width});YAHOO.util.Dom.removeClass(dialogForm,"rn_Hidden");YAHOO.util.Dom.addClass(this._dialog.id,'rn_AnswerFeedback2Dialog');}
if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
this._dialog.show();var focusElement;if(this._emailField&&this._emailField.value==='')
focusElement=this._emailField;else
focusElement=this._feedbackField;focusElement.focus();this._dialog.enableButtons();},_onSubmit:function()
{this._dialog.disableButtons();if(!this._validateDialogData())
{this._dialog.enableButtons();return;}
this._incidentCreateFlag=true;this._submitFeedback();},_onCancel:function()
{this._dialog.disableButtons();this._closeDialog(true);},_validateDialogData:function()
{YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');this._errorDisplay.innerHTML="";var returnValue=true;if(this._emailField)
{this._emailField.value=YAHOO.lang.trim(this._emailField.value);if(this._emailField.value==="")
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_REQUIRED_MSG"),this.data.attrs.label_email_address),this._emailField.id);returnValue=false;}
else if(!RightNow.Text.isValidEmailAddress(this._emailField.value))
{this._addErrorMessage(this.data.attrs.label_email_address+' '+RightNow.Interface.getMessage("FIELD_IS_NOT_A_VALID_EMAIL_ADDRESS_MSG"),this._emailField.id);returnValue=false;}}
this._feedbackField.value=YAHOO.lang.trim(this._feedbackField.value);if(this._feedbackField.value==="")
{this._addErrorMessage(RightNow.Text.sprintf(RightNow.Interface.getMessage("PCT_S_IS_REQUIRED_MSG"),this.data.attrs.label_comment_box),this._feedbackField.id);returnValue=false;}
return returnValue;},_closeDialog:function(cancelled)
{if(!cancelled)
{this._feedbackField.value="";}
if(this._errorDisplay)
{this._errorDisplay.innerHTML="";YAHOO.util.Dom.removeClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');}
if(this._dialog)
this._dialog.hide();},_submitFeedback:function()
{var eventObject=new RightNow.Event.EventObject();eventObject.w_id=this.instanceID;eventObject.data={"summary":this.data.js.summary,"a_id":this.data.js.answerID,"rate":this._rate,"dialog_threshold":this.data.attrs.dialog_threshold,"options_count":this.data.attrs.options_count,"message":this._feedbackField.value};if(this.data.js.isProfile)
eventObject.data.email=this.data.js.email;else if(this._emailField)
eventObject.data.email=this._emailField.value;RightNow.Event.fire("evt_answerFeedbackRequest",eventObject);return false;},_onResponseReceived:function(type,arg)
{if(this._incidentCreateFlag&&arg[1][0].w_id===this.instanceID)
{this._incidentCreateFlag=false;if(typeof(arg[0])==="string")
{RightNow.UI.Dialog.messageDialog(arg[0],{icon:"WARN",exitCallback:{fn:this._enableDialog,scope:this}});}
else
{RightNow.UI.Dialog.messageDialog(RightNow.Interface.getMessage("THANKS_FOR_YOUR_FEEDBACK_MSG"),{exitCallback:{fn:this._closeDialog,scope:this}});}}
else
{this._closeDialog();}},_submitAnswerRating:function()
{var eventObject=new RightNow.Event.EventObject();eventObject.w_id=this.instanceID;eventObject.data={"a_id":this.data.js.answerID,"rate":this._rate,"options_count":this.data.attrs.options_count,"dialog_threshold":this.data.attrs.dialog_threshold};RightNow.Event.fire("evt_answerRatingRequest",eventObject);var thanksLabel=document.getElementById("rn_"+this.instanceID+"_ThanksLabel");if(thanksLabel)
{if(this._wasMouse)
{thanksLabel.innerHTML=this.data.attrs.label_feedback_submit;}
else if(this._rate>this.data.attrs.dialog_threshold)
{RightNow.UI.Dialog.messageDialog(this.data.attrs.label_feedback_submit);}}},_addErrorMessage:function(message,focusElement)
{if(this._errorDisplay)
{YAHOO.util.Dom.addClass(this._errorDisplay,'rn_MessageBox rn_ErrorMessage');var newMessage='<a href="javascript:void(0);" onclick="document.getElementById(\''+focusElement+'\').focus(); return false;">'+message+'</a>';var oldMessage=this._errorDisplay.innerHTML;if(oldMessage==="")
{this._errorDisplay.innerHTML=newMessage;}
else
{this._errorDisplay.innerHTML=oldMessage+'<br/>'+newMessage;}
this._errorDisplay.firstChild.focus();}},_onCellOver:function(type,chosenRating)
{if(type.type==="mouseover")
this._wasMouse=true;this._updateCellClass(1,chosenRating+1,"rn_RatingCellOver","add");this._updateCellClass(chosenRating+1,this.data.attrs.options_count+1,"rn_RatingCellOver","remove");},_updateCellClass:function(minBound,maxBound,cssClass,removeOrAddClass)
{var cssFunc=(removeOrAddClass==="add")?YAHOO.util.Dom.addClass:YAHOO.util.Dom.removeClass;for(var i=minBound;i<maxBound;i++)
cssFunc("rn_"+this.instanceID+"_RatingCell_"+i,cssClass);},_onCellOut:function(type,args)
{if(type.type==="mouseout")
this._wasMouse=false;this._updateCellClass(1,this.data.attrs.options_count+1,"rn_RatingCellOver","remove");}};