// Starter Code
var tableData = data;



// References to tbody, input and button tages
var $tbody = d3.select("#myData");
var button = d3.select("#filter-btn");
var inputFieldDate = d3.select("#datetime");
var inputFieldCity = d3.select("#city");
var inputFieldCountry = d3.select("#country");
var inputFieldState = d3.select("#state");
var inputFieldShape = d3.select("#shape");

// Fields of each property of the object
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]


// Inputing the data into the HTML
function addData(dataInput) {
    for (let rowIndex = 0; rowIndex < dataInput.length; rowIndex++) {
        var row = $tbody.append("tr");
        for (let indexColumn = 0; indexColumn < columns.length; indexColumn++) {
            var attrName = columns[indexColumn];
            row.append("td").text(dataInput[rowIndex][attrName]);

        }
    }
}

addData(tableData);


function buttonClick() {

    /*
    http://using-d3js.com/08_01_events.html
    d3.event
    Using selection.on has additional advantages when it comes to handling events. Any event that is registered by selection.on will be accessible inside the event handler with the static field d3.event. d3.event always points to the current event being invoked, so it is useful inside event functions to access various fields or methods on the event (such as event.timeStamp or event.preventDefault()).
    d3.event - Returns the current event being invoked. This contains various fields such as event.pathX/Y and event.timeStamp and methods like event.preventDefault(). Only works when the event handler that is triggered was registered by selection.on
    */
    d3.event.preventDefault();

    // Erase blanks in the inputs 
    var selectedDate = inputFieldDate.property("value").trim();
    var selectedCity = inputFieldCity.property("value").trim();
    var selectedCountry = inputFieldCountry.node().value; 
    var selectedState = inputFieldState.property("value").trim();
    var selectedShape = inputFieldShape.property("value").trim(); 

    // reset the data
    var multipleFilter = data;

  
    if(selectedDate !== '')
    multipleFilter = multipleFilter.filter(tableData => tableData.datetime === selectedDate);     
    if(selectedCity  !== '')   
    multipleFilter = multipleFilter.filter(tableData =>tableData.city === selectedCity);
    if(selectedCountry  !== '')
    multipleFilter = multipleFilter.filter(tableData =>tableData.country === selectedCountry );
    if(selectedState  !== '')
    multipleFilter = multipleFilter.filter(tableData =>tableData.state === selectedState );
    if(selectedShape  !== '')
    multipleFilter = multipleFilter.filter(tableData =>tableData.shape === selectedShape); 
       

    // Clear all html from tbody tag
    $tbody.html("");
  
  
    if (multipleFilter.length !== 0) {
        addData(multipleFilter);
    }

    // add comment if not sightings

    else {
        $tbody.append("tr").append("td").text("No Data on entered Date. Select a different one...");
    }

}

// attach the button click function to the click user event
button.on("click", buttonClick);


