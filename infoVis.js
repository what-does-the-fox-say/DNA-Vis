/**
 * This function will be called when <script>start();</script> will show up in the loaded data.
 * All previous HTML will be available, but no body-closing tag or what comes afterwards.
 */
function start()
{
    buildSmallBarCharts(randomData(40,5,10));
}

/**
 * Builds a table of the data-array.
 * @param data 
 *        An array containing array containing numbers.
 */
function buildTable(data)
{
    console.log("constructing data table...");
    var vis = d3.select("#container");
    var table = vis.append("table");
    var tr = table.selectAll("tr").data(data)
                        .enter()                        
                        .append("tr")
    
                        
    var td = tr.selectAll("td").data(function(d){return d;})
                        .enter()
                        .append("td")                        
                        .text(function(d){return d;});
    
}

/**
 * Builds small bar charts for all the charts in data
 * @param data 
 *        An array containing array containing numbers.
 */
function buildSmallBarCharts(data)
{
    // Style and size of the array.
    // Just and css to svg.style.
    // width and height are specifically defined for later calculations
    // and will be automatically added in the next call
    var svg = {
        width: 300,
        height: 301, // should be un-even to add a line at null-value
        style : [
            ["border", "1px solid #000"],
            ["margin", "10px"]
        ]
    }
    
    // The colors for the values
    var color = {
        positive : "#5d9b9b",
        negative : "#fa842b"
    }
    
    // Object later containing all important values and bars in the charts.
    var bar = {};
    
    // gap between border of the svg and between the bars.
    bar.gap = 10;
    
    // Yep, in this call.
    // Add width and height to svg.style by using svg.width and svg.height value.
    svg.style.push(["width", svg.width + "px"]);
    svg.style.push(["height", svg.height + "px"]);
    
    // Get the max number of bar charts in one chart.
    // The function is mapped on "data"
    // So it is the same as
    /*
    bar.maxNr = d3.max(data.map(function (array) { return array.length; }));
    */
    bar.maxNr = d3.max(data, function (array) { 
        // array = one array of the data-array
        return array.length; 
    });
    
    // The greatest value of all values.
    var maxValue = d3.max(data, function (array) { 
        // array = one array of the data-array
        return d3.max(array); 
    });
    
    // Calculate the y-coordinate of the zeroline.
    var zeroLine = Math.floor(svg.height / 2);
    
    // The <div id="container"> from the HTML-File
    var container = d3.select("#container");
    
    // The width of one bar.
    bar.width = (svg.width - (bar.maxNr + 1) * bar.gap) / bar.maxNr;
    
    // The scale for all the bars. Values from minValue to maxValue will become numbers from -height to +height (still respecting the gap)
    var heightScale = d3.scale.linear().domain([-maxValue, maxValue]).range([-zeroLine + bar.gap, zeroLine - bar.gap]);
    
    // Create for each array in data one SVG, bind the (one) data to it and save it in the variable svgs.
    // Saving it in a variable is lateron really important for changing the charts on click.
    var svgs = container.selectAll("div").data(data).enter().append("svg");
    
    // Styling the svgs as given in svg.style
    // selection.style({stroke: "black", "stroke-width": "2px"}); (as specified in the docs)
    // did not work on multiple (stacked) elements. So lets use arrays and a for-loop ;)
    for(var i = 0; i < svg.style.length; i++)
    {
        svgs.style(svg.style[i][0], svg.style[i][1]);
    }
    
    // Add a null-value-line after half of the height of image.
    // Why not using SVG's "line"-Element?
    //  - Now the rect is always one unit high. A line renders different in Firefox and e.g. Chrome
    svgs.append("rect")
        .attr("fill", "#333333")
        .attr("x", 0)
        .attr("width", svg.width)
        .attr("y", zeroLine)
        .attr("height", 1);

    // Create bar.groups so all bars in one chart are grouped together
    bar.groups = svgs.append("g");
    
    // Append the bars to the groups.
    bar.all = bar.groups.selectAll("rect").data(function (d) {
        // d = the value which will be assigned to this rect
        
        return d;
    }).enter().append("rect");
    
    // Style the bars and set the heights.
    bar.all.attr("fill", color.positive)
        .attr("width", bar.width)
        .attr("x", function (d, i) { 
            // d = the data bound to this bar
            // i = the index of the bar
        
            return bar.gap * (i+1) + bar.width * i; 
        })
        .attr("y", function (d) {
            // d = the data bound to this bar
            
            return zeroLine - heightScale(d);
        })
        .attr("height", function (d) {
            // d = the data bound to this bar
            
            return heightScale(d);
        });
        
    // The array wich will contain the reduction-values on comparison with the other charts.
    var reductionArray = [];
    for(var i = 0; i < bar.maxNr; i++)
    {
        reductionArray[i] = 0;
    }
    
    // Contains the last clicked svg object and its index
    var lastsvg = { index : undefined, object : undefined }
    
    // Add onclick event to all the svgs.
    svgs.on("click", function (d, i) {
        // d = the data bound to this (clicked) svg
        // i = the index of this (clicked) svg
        
        // remove the background of the last clicked image if one was clicked previously
        if(lastsvg.object)
            lastsvg.object.style("background", null);
        
        // Set "new" last object
        lastsvg.object = d3.select(this);
        
        // If (last clicked image index == this clicked image index)
        if(lastsvg.index == i)
        {
            // Set all the reduction to 0 so all the svgs get there old style back.
            for(var j = 0; j < reductionArray.length; j++)
            {
                reductionArray[j] = 0;
            }
            
            // There is no last clicked it was taken back. ;)
            lastsvg.index = undefined;
        }
        else
        {
            // Set "new" last index.
            lastsvg.index = i;
            
            // Set the reductionArray, so reductionArray[n] contains the reduction every n-th bar in every svg.
            lastsvg.object.select("g").selectAll("rect").each(function (d, i) {
                // d = the data bound to the bar
                // i = the index of the bar
                
                reductionArray[i] = d;
            });
            
            // Add a transparent-black background to see wich was clicked.
            lastsvg.object.style("background", "rgba(0, 0, 0, .1)");
        }
        
        // Adapt all bars to the new values.
        bar.all.each(function (d, i) {
            // d = the data bound to the bar
            // i = the index of the bar
            
            // guess what ;)
            var newHeight = heightScale(d - reductionArray[i]);
            
            // change the values
            d3.select(this)
                .transition()                                                                 // Lets animate this. :)
                .attr("height", Math.abs(newHeight))
                .attr("y", newHeight < 0 ? zeroLine + 1 : zeroLine - newHeight)
                .attr("fill", newHeight < 0 ? color.negative : color.positive);               // change the color according to the new value
        });
    });
}
