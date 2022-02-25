# plotly-challenge

 We build an interactive dashboard to explore microbes that colonise humans. Microbial species (also called operational taxonomic units, or OTU's) were present in more than 70% of people, while the rest were relatively rare.

 We used the D3 library to read in data from [samples.json](./data/samples.json).

The main html code can be found at [main html code](./index.html) and the functionality is found at [app.js](./static/app.js)

 Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

 Created a bubble chart that displays each sample.

 Displayed the sample metadata, i.e., an individual's demographic information

 All of the plots update any time that a new sample is selected.

 Adapted the Gauge Chart to plot the weekly washing frequency of the individual and account for values ranging from 0 through 9 and updates the chart whenever a new sample is selected.

 Deployed app to free static page hosting service, GitHub Pages.