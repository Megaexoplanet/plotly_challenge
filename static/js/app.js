
init();

// ======================================
function init() {
    var selector = d3.select('select');

    d3.json('samples.json').then(data => {
        data.names.forEach(name => {
            selector
                .append('option')
                .text(name)
                .attr('value', name)
        });

        showPanel(data.names[0]);
        showBars(data.names[0]);
        showBubbles(data.names[0]);
        showGauge(data.names[0]);
    });
};

function optionChanged(name) {
    showPanel(name);
    showBars(name);
    showBubbles(name);
    showGauge(name);
}

function showPanel(name) {
    d3.json('samples.json').then(data => {
        var metadata = data.metadata.filter(obj => obj.id == name)[0];
        var panel = d3.select('#sample-metadata');
        
        panel.html('');

        Object.entries(metadata).forEach(([key, value]) => {
            panel
                .append('h6')
                .text(`${key.toUpperCase()}: ${value}`)
        });
    });
};

var item;

function showBars(name) {
    d3.json('samples.json').then(data => {
        var sample = data.samples.filter(obj => obj.id == name)[0];
        
        var barData = [
            {
                y: sample.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
                x: sample.sample_values.slice(0,10).reverse(),
                text: sample.otu_labels.slice(0,10).reverse(),
                type: 'bar',
                orientation: 'h'
            }
        ];

        var barLayout = {
            title: 'Top 10 Bacteria Cultures Found',
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot('bar', barData, barLayout);
    });
};

function showBubbles(name) {
    d3.json('samples.json').then(data => {
        var sample = data.samples.filter(obj => obj.id == name)[0];

        var bubbleData = [
            {
                y: sample.sample_values,
                x: sample.otu_ids,
                text: sample.otu_labels,
                mode: 'markers',
                marker: {
                    size: sample.sample_values,
                    color: sample.otu_ids,
                    colorscale: 'Earth'
                }
            }
        ];

        var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            margin: { t: 0 },
            hovermode: 'closest',
            xaxis: { title: 'OTU ID' },
            margin: { t: 30 }
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
};

var d;
function showGauge(name) {
    
    d3.json('samples.json').then(data => {
        d = data;
        var frq = data.metadata.filter(obj => obj.id == name)[0].wfreq;
        console.log(frq);

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: frq * 100,
              title: { text: "Belly Button Washing Frequency" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 700] } }
            }
          ];
          
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gauge', data, layout);
        
    });





    
}