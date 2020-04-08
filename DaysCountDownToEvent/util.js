//
// Utility functions
//

// 
// Function for creating a date object with
// UTC input date in the users local timezone.
//
export const createGlobalDate = (
	year,
	month,
	day = 0, 
	hours = 0, 
	minutes = 0, 
	seconds = 0, 
	ms = 0
) => {
	// Note: JavaScript counts months from 0 to 11.
	// January is 0. December is 11.
	month = month - 1;
	return new Date(Date.UTC(year, month, day, hours, minutes, seconds, ms));
}

//
// Function for converting MS to full days
//
export const convertMStoDays = ms => {
	return ms / 1000 / 60 / 60 / 24;
}
