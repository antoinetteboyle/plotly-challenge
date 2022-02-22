
//1. Read in `samples.json` with D3
const samples = ('../samples.json');
d3.json(samples).then(function(data) {
let a = data.names;
console.log(a);
let b = data.metadata;
console.log(b);
let c = data.samples;
console.log(c)

// Populate drop down list
let drop = d3.select("#selDataset")
a.forEach(item=>drop.append("option").attr("value",item).text(item));

// Call optionChanged() with dropdown option to variable
d3.select("#selDataset").on("change",optionSelect);

function optionSelect() {
  var option = d3.select("#selDataset").property("value");
  console.log(`option found value ${option}`);
  option = option.toString()

// Loop through samples list (c) of id objects
  for (let i = 0; i < c.length; i++) {
  let row = c[i];
   if (row.id==option) {
    //if (row.id=="940") {
      //Object.entries(row).forEach(([key, value]) => console.log(`Key: ${key} and Value ${value}`));
      console.log(`Id ${option} otu_ids found! ${row.otu_ids}`);
      console.log(`Id ${option} sample_values found! ${row.sample_values}`);
      console.log(`Id ${option} otu_labels found! ${row.otu_labels}`)
      var slicedx = row.sample_values.slice(0, 10).reverse();
      var slicedy = row.otu_ids.slice(0, 10).reverse();
      var slicedz = slicedy.map(item => `OTC# ${item}`);
      var slicedtext = row.otu_labels.slice(0, 10).reverse();
      console.log(slicedx,slicedz,slicedtext);
      let trace1 = {
         x: slicedx,
         y: slicedz,
         text: slicedtext,
         //name: string,
         type: "bar",
         orientation: "h"
        };
      var layout = {
          title: "Top ten OTU's Chart",
           xaxis: { title: "Sample values"},
           yaxis: { title: "Otu Id's"}
        };
        let traceData = [trace1];
        Plotly.newPlot("bar", traceData,layout);
     
//** START BUBBLE in if statement***
var data = [{x: row.otu_ids,
             y: row.sample_values,
             z: row.otu_labels}]
// set the dimensions and margins of the graph
const margin = {top: 10, right: 20, bottom: 30, left: 50},
width = 500 - margin.left - margin.right,
height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#bubble")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

// Add X axis
const x = d3.scaleLinear()
.domain([0, 4000])
.range([ 0, width ]);
svg.append("g")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(x));

// Add Y axis
const y = d3.scaleLinear()
.domain([0, 1000])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Add a scale for bubble size
const z = d3.scaleLinear()
.domain([200000, 1310000000])
.range([ 1, 40]);

// Add dots
svg.append('g')
.selectAll("dot")
.data(data)
.join("circle")
.attr("cx", d => x(d.x))
.attr("cy", d => y(d.y))
.attr("r", d => z(d.z))
.style("fill", "#69b3a2")
.style("opacity", "0.7")
.attr("stroke", "black")

//** END BUBBLE***

// End if for option ID row selected of samples
      }
    // End samples for loop
      }

  // DEMOGRAPHICS: Loop through metadata list (b) of id objects
  for (let i = 0; i < b.length; i++) {
    let row = b[i];
     if (row.id==option) {
      console.log(`Id ${option} metadata id found! ${row.ethnicity}`);
      //Appends html metadate for row selected
      var dbody = d3.select("div#sample-metadata.panel-body").append("tbody").append("tr");
        Object.entries(row).forEach(([key, value]) => {
        console.log(`Key: ${key} and Value: ${value}`);
        var cell = dbody.append("td");
        cell.text(` ${key} : ${value} .`);
        });
  }};


// optionSelect id function end brackets 
}

// Then end brackets 
});
