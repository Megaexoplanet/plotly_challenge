
init();

// ======================================
function init() {
    var selector = d3.select('select');

    d3.json('samples.json').then( data => {
        data.names.forEach(name => {
            selector
                .append('option')
                .text(name)
                .attr('value',name)
        });

        showPanel(data.names[0]);
        showBars(data.names[0]);
        // showBubbles(data.names[0]);
    });
};

function showPanel(name) {
    d3.json('samples.json').then(data => {
        var metadata = data.metadata.filter(obj => obj.id == name)[0];
        var panel = d3.select('#sample-metadata');
        Object.entries(metadata).forEach(([key,value]) => {
            panel   
                .append('h6')
                .text(`${key.toUpperCase()}: ${value}`)
        });
    });
};
