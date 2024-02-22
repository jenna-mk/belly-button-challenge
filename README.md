# Module 14 Challenge: Interactive Dashboards Using the D3 Library
The purpose of this assignment is to build an interactive dashboard showing the results of the Belly Button Biodiversity dataset, using the D3 library to read the json data. This dashboard includes a dropdown menu to select individuals, a bar chart displaying the top 10 OTUs (operational taxonomic units, or microbial species) for that individual, a bubble chart displaying each sample found in that individual, and a table dispalying the individual's metadata.

Note: due to an unresolved 403 Forbidden Error, all D3 functions connect to the samples.json file directly (found in StarterCode).

## Bar Chart, Bubble Chart, and Metadata Table
To create the charts and table, I used the D3 library to read in the samples.json file. I then created a function to initialize the dashboard with a dropdown menu to select each individual included in the study.

Next, I created a horizontal bar chart to display the top 10 OTUs found in the selected individual, using sample_values as the values, otu_ids as the labels, and otu_labels as the hovertext.

To create the bubble chart for the selected individual, I used otu_ids for the x values, sample_values for the y values, sample_values for the marker size, otu_ids for the marker colors, and otu_labels for the text values.

Finally, I created a table displaying the selected individual's demographic information, using each key-value pair from the metadata JSON object. 

All plots update when a new sample id is selected from the dropdown menu.

## References
Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/Links to an external site.
