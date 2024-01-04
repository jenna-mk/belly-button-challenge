// First create a variable to hold the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json."

// Use the d3 library to pull the json data,
// and build in a catch for any errors that might pop up
d3.json(url).then(data => {
    console.log(data);
}).catch(error => {
    console.error('Error retrieving data:', error);
});

// First create an intitial function to pull the names,
// populate the dropdown menu, and create the initial dashboard plots
function init() {
    // Select the dropdown using d3
    let dropdownMenu = d3.select("#selDataset");

    // Use d3 to retrieve the sample names and store in the dropdown menu 
    d3.json(url).then((data) => {
        // Create a variable to collect the names of each person in the study
        let names = data.names;

        // Iterate through each id in the names array and add an
        // option to the dropdown menu for each 
        names.forEach((id) => {
            console.log(id);
            // .text sets the visible text to the id; .property sets the value as the id 
            dropdownMenu.append("option").text(id).property("value", id);
        });

        // Set the the first element as the first sample in the list 
        // and log the value 
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
    d3.json(url).then((data) => {
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
            title: `Top 10 OTUs Present`
        };

        // Use Plotly to plot the bar chart 
        Plotly.newPlot("bar", [traceBar], layout)
    });
};

// Draw the bubble chart
function drawBubbleChart(sample) {
    // Retrieve the data using d3 
    d3.json(url).then((data) => {
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
        let layout = {
            title: "Bacteria Present Per Sample"
        };

        // Use Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [traceBubble], layout);
    });
};