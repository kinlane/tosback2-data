﻿cbj(document).ready(function() {
    if (cbj('.savedSearches') != undefined) {
        cbj('.savedSearches').change(function() {
            if (this.value != '')
                window.location = this.value;
        });
    }
});