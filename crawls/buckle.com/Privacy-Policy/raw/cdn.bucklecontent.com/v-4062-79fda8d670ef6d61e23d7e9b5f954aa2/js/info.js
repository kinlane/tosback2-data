var _infoVisibleDiv=-1;function showAnswer(A){if(A){var B="#"+A;if(B!=_infoVisibleDiv){$(_infoVisibleDiv).hide()}_infoVisibleDiv=B;if($(B).is(":visible")){$(B).hide()}else{$(B).show()}}}