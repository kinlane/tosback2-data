jQuery(document).ready(function(){jQuery(".column-container").filter(":first").each(function(){var a=jQuery(this);a.find(".icon").click(function(){a.find(".container").slideToggle("normal");a.find(".icon").toggleClass("close");return false})});jQuery(".column-container").filter(":last").each(function(){var a=jQuery(this);a.find(".icon").click(function(){a.find(".container").slideToggle("normal");a.find(".icon").toggleClass("close");return false})});jQuery(".commonquestionscontent .article").each(function(){var a=jQuery(this);a.find(".icon").click(function(){a.find(".description").slideToggle("normal");a.find(".icon").toggleClass("close");return false})})});