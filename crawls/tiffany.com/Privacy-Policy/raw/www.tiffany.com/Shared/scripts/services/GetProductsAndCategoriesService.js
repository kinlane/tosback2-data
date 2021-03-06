﻿// ----------------------------------------------
// File:		GetProductsAndCategoriesService.js
// Author:		Nathan Derksen
// Description:	A class that holds the available service methods, along with response handlers.
// Example:
// GetProductsAndCategoriesService.getInstance().getProducts(searchCriteria, 0, 12);
// ----------------------------------------------


// ----------------------------------------------
// Function:	GetProductsAndCategoriesService
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<none>
// Returns:		<nothing>
// ----------------------------------------------
function GetProductsAndCategoriesService()
{
}

var getProductsAndCategoriesService_isIncremental = false;
var getProductsAndCategoriesService_firstLoadComplete = false;

// ----------------------------------------------
// Function:	GetProductsAndCategoriesService.getProducts
// Author:		Nathan Derksen
// Description:	Calls the service to retrieve a set of products
// Inputs:		<Object> searchCriteria - An object of properties to search on
//				<Number> startIndex - The zero-based index of which row to start at in the total results
//				<Number> maxResults - The maximum number of results to return
// Returns:		<nothing>
// ----------------------------------------------
GetProductsAndCategoriesService.prototype.getData = function(queryString)
{
	try
	{
		var currentPage = Number(URLFactory.extractValue(queryString, "currentPage"));
		var searchString = window.location.search.split("?").join("");
		var cid = URLFactory.extractQueryStringValue(searchString, "cid");
		var sortCriteria = URLFactory.extractValue(queryString, "sortCriteria");
		var pageQueryString = window.location.search.split("?").join("");
		var search = false;
		var searchQSVal = URLFactory.extractQueryStringValue(pageQueryString, "search");
		var productsGrid = ViewLocator.getInstance().getView("productsGrid");
		var parent = this;
		if (productsGrid.isPageCached(currentPage - 1) == false)
		{
			// Added ability to add to the list of displayed products rather than replace
			// what's visible. Default is to replace. Global var is used to pass parameter
			// to event handler result.
			getProductsAndCategoriesService_isIncremental = false;
			if (typeof (arguments[1]) != "undefined")
			{
				getProductsAndCategoriesService_isIncremental = arguments[1];
			}

			if (sortCriteria == "")
			{
				if (cid != "")
				{
					queryString = URLFactory.updateHash(queryString, "sortCriteria", "5"); // CategoryOrder
				}
				else
				{
					queryString = URLFactory.updateHash(queryString, "sortCriteria", "1"); // PriceHighToLow
				}
			}

			if (searchQSVal == "1")
			{
				search = true;
			}

			if (isAjaxEnabled() == true)
			{
				PageMethods.GetCategoriesXmlBySearchQS(URLFactory.convertHashToServiceHash(queryString), search, function(result)
				{
					parent.onResult(result, queryString);
				}, this.onError);
			}
		}
	}
	catch (err)
	{
		Debug.error(err);
	}
};

// ----------------------------------------------
// Function:	GetProductsAndCategoriesService.getProducts
// Author:		Nathan Derksen
// Description:	Calls the service to retrieve a set of products
// Inputs:		<Object> searchCriteria - An object of properties to search on
//				<Number> startIndex - The zero-based index of which row to start at in the total results
//				<Number> maxResults - The maximum number of results to return
// Returns:		<nothing>
// ----------------------------------------------
GetProductsAndCategoriesService.prototype.getJSONData = function()
{
	try
	{
		var resultProductArray = [];
		if (typeof(tblData) != "undefined")
		{
			resultProductArray = ProductFactory.convertJSONToArray(tblData);
		}
		
		var resultCategoryArray = [];
		if (typeof(menuData) != "undefined")
		{
			resultCategoryArray = CategoriesFactory.convertJSONToObjects(menuData);
		}
		
		var numHits = 0;
		var layoutType = "1";
		var showSort = true;
		if (typeof(gridData) != "undefined")
		{
			numHits = gridData.numHits;
			layoutType = String(gridData.layout);
			if (typeof(gridData.showSortBy) != "undefined")
			{
				if (gridData.showSortBy == false || gridData.showSortBy == "false")
				{
					showSort = false;
				}
			}
		}

		GetProductsAndCategoriesService_process(resultProductArray, resultCategoryArray, numHits, layoutType, "", "", showSort);
	}
	catch (err)
	{
		Debug.error(err);
	}
};

// ----------------------------------------------
// Function:	GetProductsAndCategoriesService.onResult
// Author:		Nathan Derksen
// Description:	Callback from the successful completion of the service call
// Inputs:		<XMLElement> result - Handle to the results xml object
// Returns:		<nothing>
// ----------------------------------------------
GetProductsAndCategoriesService.prototype.onResult = function(result, queryString)
{
	try
	{
		getProductsAndCategoriesService_firstLoadComplete = true;
		if (result)
		{
			var resultElements = result.documentElement;
			var resultProductArray = ProductFactory.convertXMLToArray(resultElements);
			var resultCategoryArray = CategoriesFactory.convertXMLToObjects(resultElements);
			var numHits = ProductFactory.getTotalNumProducts(resultElements);
			var layoutType = CategoriesFactory.getLayoutType(resultElements);
			var didYouMean = SearchFactory.getDidYouMeanFromXML(resultElements);
			var showSort = ProductFactory.getShowSortMenu(resultElements);

			GetProductsAndCategoriesService_process(resultProductArray, resultCategoryArray, numHits, layoutType, didYouMean.keyword, didYouMean.qs, showSort, queryString);
		}
		else
		{
			var tempArray = new Array();
			var productsGrid = ViewLocator.getInstance().getView("productsGrid");
			productsGrid.setProducts(tempArray);

			var error = new Object();
			error.name = "Service 'GetProductsAndCategoriesService' returned with no results";
			error.message = error.name;
			error.fileName = "GetProductsAndCategoriesService.js";
			error.lineNumber = "";
			Debug.error(error);
		}
		$("#productsGrid").removeClass("loading");
	}
	catch (err)
	{
		Debug.error(err);
	}
};

// ----------------------------------------------
// Function:	GetProductsAndCategoriesService.onError
// Author:		Nathan Derksen
// Description:	Callback from the unsuccessful completion of the service call
// Inputs:		<XMLElement> result - Handle to the results xml object
// Returns:		<nothing>
// ----------------------------------------------
GetProductsAndCategoriesService.prototype.onError = function(result) {
    var tempArray = new Array();
    var productsGrid = ViewLocator.getInstance().getView("productsGrid");
    productsGrid.setProducts(tempArray);
    //Added to resolve Bug: 1684; 1963, 1964, 1953, 1956
    if (tempArray.length == 0)
        window.location = "../default.aspx";
    var error = new Object();
    error.name = "Service 'GetProductsAndCategoriesService' returned with an error";
    error.message = result.get_message();
    error.fileName = "GetProductsAndCategoriesService.js";
    error.lineNumber = "";

    Debug.error(error);

    if (error.message.indexOf("Authentication") >= 0)
        window.location = "../Default.aspx";
};

// ----------------------------------------------
// ----------------------------------------------
function GetProductsAndCategoriesService_process(resultProductArray, resultCategoryArray, numHits, layoutType, keyword, qs, showSort, queryString)
{
	var vwLocator = ViewLocator.getInstance();
	var model = ProductModel.getInstance();
	model.setNumProducts(numHits);
	model.setProducts(resultProductArray);

	var currentPage = model.getPageNum();

	if (typeof (queryString) != "undefined" && queryString != null && URLFactory.extractValue(queryString, "currentPage") != null)
	{
		currentPage = Number(URLFactory.extractValue(queryString, "currentPage")) - 1;
	}
	
	if (layoutType == "1")
	{
		model.getProductGrid("viewAll").gridType = "topLeftBottomRight";
		model.getProductGrid("viewPaged").gridType = "topLeftBottomRight";
	}
	else
	{
		model.getProductGrid("viewAll").gridType = "bottomLeftTopRight";
		model.getProductGrid("viewPaged").gridType = "bottomLeftTopRight";
	}
	ViewLocator.getInstance().getView("productsGrid").setGridType(model.getCurrentProductGrid().gridType);
	if (ViewLocator.getInstance().getView("sortBy") != null)
	{
		if (showSort == false)
		{
			ViewLocator.getInstance().getView("sortBy").style.display = "none";
		}
		else
		{
			ViewLocator.getInstance().getView("sortBy").style.display = "block";
		}
	}
	
	blockDropDownClicks = false;
	
	CategoriesModel.getInstance().addMenus(resultCategoryArray);
	
	if (keyword != "" && keyword != null && qs != "" && qs != null)
	{
		var query = window.location.search.split("?").join("");
		var sessionId = "";
		var sessionIdQSVal = URLFactory.extractQueryStringValue(query, "mysid2");
		var redirect = "/Shopping/CategoryBrowse.aspx?search=1&search_params=" + qs + sessionId;
		var didYouMeanHolder = ViewLocator.getInstance().getView("didYouMeanHolder");
		
		didYouMeanHolder.style.display = "block";
		didYouMeanHolder.innerHTML = didYouMeanLiteral.split("{0}").join('<a href="' + redirect + '">' + keyword + '</a>');
	}
	
	var productsGrid = ViewLocator.getInstance().getView("productsGrid");
	if (getProductsAndCategoriesService_isIncremental == false)
	{
		productsGrid.setProducts(resultProductArray, currentPage);
	}
	else
	{
		productsGrid.appendToProducts(resultProductArray);
	}

	var gridName = ProductModel.getInstance().getCurrentProductGridName();
	var gridProperties = ProductModel.getInstance().getProductGrid(gridName);
	var numSections = Math.floor(numHits / 12);
	var extraSquares = numHits % 12;
	var height = 460 + (460 - 10) * (numSections - 1);

	switch (gridProperties.gridType)
	{
		case "topLeftBottomRight":
		case "bottomLeftTopRight":
			{
				if (extraSquares >= 8)
				{
					height += 460;
				}
				else if (extraSquares < 8 && extraSquares > 6)
				{
					height += 310;
				}
				else if (extraSquares <= 6 && extraSquares > 0)
				{
					height += 150;
				}
				break;
			}
		case "topLeft":
		case "uniform":
			{
				if (extraSquares > 6)
				{
					height += 310;
				}
				else if (extraSquares <= 6 && extraSquares > 0)
				{
					height += 150;
				}
				break;
			}
	}

	if (gridName == "viewAll")
	{
		$("#staticBorderLeft").hide();
		$("#staticBorderRight").hide();
		$("#productsGrid").css("height", height + "px");
		$("#divArrowsAndGrid").css("height", height + "px");
	}
	else
	{
		$("#staticBorderLeft").show();
		$("#staticBorderRight").show();
		$("#productsGrid").css("height", "460px");
		$("#divArrowsAndGrid").css("height", "460px");
	}

	if (isMobileDomain())
	{
		var loadMoreButton = ViewLocator.getInstance().getView("loadMoreButton");
		if (loadMoreButton != null)
		{
			loadMoreButton.onclick = function() { handleLoadMore(); };
			loadMoreButton.className = "btn";
			if (productsGrid.productArray.length >= numHits)
			{
				loadMoreButton.style.display = "none";
			}
			else
			{
				loadMoreButton.style.display = "inline";
			}
		}
		$("#loadMoreThumbnailsLoading").hide();

		if (typeof (generateFilterMenu) != "undefined")
		{
			generateFilterMenu();
		}
	}
};
