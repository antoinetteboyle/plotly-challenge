
//1. Read in `samples.json` with D3
//const samples = ('/plotly-challenge/samples.json');
const samples = ('data/samples.json');
d3.json(samples).then(function(data) {
let a = data.names;
console.log(a);
let b = data.metadata;
console.log(b);
let c = data.samples;
console.log(c)

// Populate drop down list
let drop = d3.select("#selDataset")
a.forEach(item=>drop.append("option").attr("value",item).text(`BB_${item}`));

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

       //** START BARCHART in if statement***   
      console.log(`Barchart Id ${option} otu_ids found! ${row.otu_ids}`);
      console.log(`Barchart Id ${option} sample_values found! ${row.sample_values}`);
      console.log(`Barchart Id ${option} otu_labels found! ${row.otu_labels}`)
      var slicedx = row.sample_values.slice(0, 10).reverse();
      var slicedy = row.otu_ids.slice(0, 10).reverse();
      var slicedz = slicedy.map(item => `OTC# ${item}`);
      var slicedtext = row.otu_labels.slice(0, 10).reverse();
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
  //** END BARCHART in if statement***     
     
  //** START BUBBLE in if statement***
       var trace2 = {x: row.otu_ids,  
                     y: row.sample_values, 
                     text: row.otu_labels,
                     mode: "markers",
                     marker: {
                      size: row.sample_values,
                      color: row.otu_ids,
                      colorscale: "Earth",
                    }};
        console.log(`Bubble chart data x ${trace2.x}, y ${trace2.y}`);
        var bubbledata = [trace2];
        var layout = { title: 'Bubble Chart Hover Text',
                    showlegend: false,
                    height: 600,
                    width: 600};
        Plotly.newPlot('bubble', bubbledata, layout);
   //** END BUBBLE***

// End if option ID row selected of samples
      }
    // End for loop samples option ID selected
      }

  // DEMOGRAPHICS: Loop through metadata list (b) of id objects
  for (let i = 0; i < b.length; i++) {
    //d3.selectAll(td).remove()
    let row = b[i];
     if (row.id==option) {
      console.log(`Id ${option} metadata id found! ${row.ethnicity}`);
      //Appends html metadate for that induvidual/row selected
      var dbody = d3.select("div#sample-metadata.panel-body").append("table").attr("class","table-responsive").append("tbody").append("tr");
        Object.entries(row).forEach(([key, value]) => {
        console.log(`Key: ${key} and Value: ${value}`);
        var cell = dbody.append("tr").append("td");
        cell.text(` ${key} : "${value}" `)
        });
 
  // GAUGE START
  var datagauge = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: row.wfreq,
      title: { text: "Belly button washing frequency" },
      type: "indicator",
      mode: "gauge+number"
    }
  ];
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', datagauge, layout);
  // GAUGE END

  // DEMOGTRAPHIC END if and for loop END
   }};
// optionSelect id function end
}
// Then end
});
