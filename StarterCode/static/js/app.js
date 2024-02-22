// Create a variable to hold the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json."

// Create an initial function to pull the names and create the dropdown menu 
function init() {
    // Retrieve the json data 
    d3.json("samples.json").then((data) => {
        console.log(data);
    // Select the dropdown using d3
    let dropdownMenu = d3.select("#selDataset");

    // Create a variable to collect the names of each person in the study
    let names = data.names;

    // Iterate through each id in the names array and add an
    // option to the dropdown menu for each 
    names.forEach((name) => {
        console.log(name);
        // .text sets the visible text to the id; .property sets the value as the id 
        dropdownMenu.append("option").text(name).property("value", name);
    });

    // Set the the first element as the first sample in the list and log the value 
    let sampleOne = names[0];
    console.log(sampleOne);

    // Draw the initial plots
    drawBarChart(sampleOne);
    drawBubbleChart(sampleOne);
    drawMetadata(sampleOne);
    });  
};

// Draw the bar chart 
function drawBarChart(sample) {
    
    // Retrieve the data using d3 
    d3.json("samples.json").then((data) => {
        // Retrieve the sample data for each participant 
        let samples = data.samples;

        // Filter based on the value of the sample
        let sampleID = samples.filter(result => result.id == sample);

        // Retrieve the first sample from the filtered array  
        let sampleData = sampleID[0];

        // Get the sample values, otu ids, and otu labels for the selected id
        let sampleValues = sampleData.sample_values;
        let otuIDs = sampleData.otu_ids;
        let otuLabels = sampleData.otu_labels;

        // Log the data to the console
        console.log(sampleValues, otuIDs, otuLabels);

        // Grab the top 10 otus and display in descending order
        let xvalues = sampleValues.slice(0, 10).reverse();
        let yvalues = otuIDs.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let labels = otuLabels.slice(0, 10).reverse();

        // Set up the trace to plot the data to the bar chart
        let traceBar = {
            x: xvalues,
            y: yvalues,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Create the layout for the plot
        let layoutBar = {
            title: `Top 10 Bacteria Cultures Present`
        };

        // Use Plotly to plot the bar chart 
        Plotly.newPlot("bar", [traceBar], layoutBar);
    });
};

// Draw the bubble chart
function drawBubbleChart(sample) {
    // Retrieve the data using d3 
    d3.json("samples.json").then((data) => {
        // Retrieve the sample data for each participant 
        let samples = data.samples;
        // Filter based on the value of the sample
        let sampleID = samples.filter(result => result.id == sample);
        // From the above array, retrieve the first id 
        let sampleData = sampleID[0];

        // Get the sample values, otu ids, and otu labels for the selected id
        let sampleValues = sampleData.sample_values;
        let otuIDs = sampleData.otu_ids;
        let otuLabels = sampleData.otu_labels;

        // Log the data to the console
        console.log(sampleValues, otuIDs, otuLabels);

        // Set up the trace to plot the data to the bubble chart
        let traceBubble = {
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIDs,    
            }
        };

        // Create the layout for the chart
        let layoutBubble = {
            title: "Bacteria Present Per Sample"
        };

        // Use Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [traceBubble], layoutBubble);
    });
};

// Pull the demographic data for each participant 
function drawMetadata(sample) {
    d3.json("samples.json").then(data => {
        // Pull the metadata (demographic information) for each participant 
        let metadata = data.metadata;

        // Filter the data based on each indiviual id
        let sampleID = metadata.filter(result => result.id == sample);

        // Log the array of metadata objects
        console.log(sampleID)

        // Pull the first index in the metadata array
        let sampleData = sampleID[0];
        console.log(sampleData);

        // Create a variable for the display where the data is stored
        let metadataDisplay = d3.select("#sample-metadata");

        // Clear out the results from the previous entry
        metadataDisplay.html("");
        
        // Create an array for each key-value pair in the metadata
        Object.entries(sampleData).forEach(([key, value]) => {
            // Log the key value pairs to the console
            console.log(key, value);
            // Add a paragraph to the display with each key value pair
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
}

// Create a function for when the value is changed
function optionChanged(sample) {

    // Log the new sample id 
    console.log(sample);

    // Call all the functions on the sample
    drawBarChart(sample);
    drawBubbleChart(sample);
    drawMetadata(sample);
};

init();