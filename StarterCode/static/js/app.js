// First create a variable to hold the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json."

// Use the d3 library to pull the json data,
// and build in a catch for any errors that might pop up
d3.json(url).then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error retrieving data:', error);
});


// Create the bar plot 
// function barPlot(sampleValues, otuIds, otuLabels){
//     let trace1 = [
        
//     ]
// }