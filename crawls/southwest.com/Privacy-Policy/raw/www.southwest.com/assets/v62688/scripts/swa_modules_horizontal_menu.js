$(document).ready(function(){if($(".swa_modules_horizontal_menu .swa_content_module_inner").size()){$.include(["/assets/v62688/scripts/ui.core.js","/assets/v62688/scripts/ui.tabs.js"],initTabs)
}});
function initTabs(){$(".swa_modules_horizontal_menu .swa_content_module_inner").tabs();
$(".swa_modules_horizontal_menu").show();
$(".swa_modules_horizontal_menu .ui-tabs-nav li a span").vAlign()
};