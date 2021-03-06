﻿// ----------------------------------------------
// File:		EmailSubscribeService.js
// Author:		Nathan Derksen
// Description:	A class that holds the available service methods, along with response handlers.
// Example:
// EmailSubscribeService.getInstance().isSearchEmpty();
// ----------------------------------------------


// ----------------------------------------------
// Function:	SearchService
// Author:		Nathan Derksen
// Description:	Base class
// Inputs:		<none>
// Returns:		<nothing>
// ----------------------------------------------
function EmailSubscribeService()
{
}

// ----------------------------------------------
// Function:	SearchValidationService.isSearchEmpty
// Author:		Nathan Derksen
// Description:	Calls the service to find if the given search is an empty search or not
// Inputs:		<Object> searchCriteria - An object of properties to search on
//				<Number> startIndex - The zero-based index of which row to start at in the total results
//				<Number> maxResults - The maximum number of results to return
// Returns:		<nothing>
// ----------------------------------------------
EmailSubscribeService.prototype.processEmail = function(email, mobileEmail,countryCode)
{
	try
	{
		if (mobileEmail == null || typeof(mobileEmail) == undefined)
		{
			mobileEmail = "";
		}
		
		PageMethods.SubmitEmailMarketingPreference(email, mobileEmail,countryCode, this.onResult, this.onError);
	}
	catch (err)
	{
		Debug.error(err);
	}
};

// ----------------------------------------------
// Function:	SearchValidationService.onResult
// Author:		Nathan Derksen
// Description:	Callback from the successful completion of the service call
// Inputs:		<XMLElement> result - Handle to the results xml object
// Returns:		<nothing>
// ----------------------------------------------
EmailSubscribeService.prototype.onResult = function(result)
{
	try
	{
		emailMarketing_showResults();
	}
	catch (err)
	{
		Debug.error(err);
	}
};

// ----------------------------------------------
// Function:	SearchValidationService.onError
// Author:		Nathan Derksen
// Description:	Callback from the unsuccessful completion of the service call
// Inputs:		<XMLElement> result - Handle to the results xml object
// Returns:		<nothing>
// ----------------------------------------------
EmailSubscribeService.prototype.onError = function(result)
{
	try
	{
		emailMarketing_showResults();
		
		var error = new Object();
		error.name = "Service 'EmailSubscribeService' returned with an error";
		error.message = result.get_message();
		error.fileName = "EmailSubscribeService.js";
		error.lineNumber = "";
		Debug.error(error);
		if (error.message.indexOf("Authentication") >= 0)
		    window.location = "../Default.aspx";
	}
	catch (err)
	{
		Debug.error(err);
	}
};
