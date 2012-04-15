﻿$(function () {

    var locationTextBox = $('input[id$="txtLocation"]');
    $.ajax({
        url: ScriptVariables.Get('SearchAutoCompleteURL') + '&type=location',
        dataType: 'json',
        success: function (data, status, request) {
            if (typeof data[0] !== 'undefined' && data[0] === 'LOCATION_US_ONLY') {
                locationTextBox.autocomplete({
                    source: function (request, response) {
                        $.ajax({
                            url: ScriptVariables.Get('CBAutoCompleteURL'),
                            dataType: 'html',
                            data: {
                                'limit': 10,
                                'q': request.term,
                                'list': 'location',
                                'hostsite': 'us'
                            },
                            success: function (data, status, request) {
                                response(data.toString().split('\n'));
                            },
                            error: function (request, status, err) {
                                response([]);
                            }
                        });
                    }
                });
            } else {
                locationTextBox.autocomplete({
                    source: ScriptVariables.Get('SearchAutoCompleteURL') + '&type=location'
                });
            }
        }
    });
    var keywordTextBox = $('input[id$="txtKeyword"]');
    keywordTextBox.autocomplete({
    source: function (request, response) {
    $.ajax({
            url: ScriptVariables.Get('CBAutoCompleteURL'),
            dataType: 'html',
            data: {
                'limit': 10,
                'q': request.term,
                'list': 'keywords',
                'hostsite': 'us'
            },
            success: function (data, status, request) {
                response(data.toString().split('\n'));
            },
            error: function (request, status, err) {
                response([]);
            }
        });
    }
    });
});