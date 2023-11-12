import data from './Treemap1.json' assert { type: 'json' };

import data1 from './Treemap2.json' assert {type : 'json'};

import data2 from './Treemap3.json' assert {type : 'json'};

// Set up the width and height of the treemap container
const width = window.innerWidth-20;
const height = 680;

// Create the treemap layout
const treemap = d3.treemap()
    .size([width, height]);
    
const color = d3.scaleOrdinal(d3.schemeTableau10);

const root = d3.hierarchy(data);

const svg = d3.select("#treemap")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
        

const treemap1 = d3.treemap()
        .size([width, height]);
    
const color1 = d3.scaleOrdinal(d3.schemeTableau10);

const root1 = d3.hierarchy(data1);
// Append an SVG element to the container
const svg1 = d3.select("#treemap1")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const treemap2 = d3.treemap()
    .size([width, height]);

const color2 = d3.scaleOrdinal(d3.schemeTableau10);

const root2 = d3.hierarchy(data2);
// Append an SVG element to the container
const svg2 = d3.select("#treemap2")
.append("svg")
.attr("width", width)
.attr("height", height);

function handlechange(){
    const x = document.getElementById('tiles').value

    const tileMethod=eval(x)
    
    treemap.tile(tileMethod);
    treemap.padding(2);

    root.sum((d) => d.value);
    treemap(root);

    const cell = svg.selectAll(".cell")
                .data(root.leaves());

    cell.enter()
        .append("rect")
        .attr("class", "cell")
        .merge(cell)
        .transition()
        .duration(1000)
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => color(d.parent.data.name))

    cell.exit().remove();


    const text = svg.selectAll("text")
                .data(root.leaves());
    text.enter()
        .append("text")
        .merge(text)
        .transition()
        .duration(1000)
        .attr("x", (d) => (d.x0 + d.x1) / 2)
        .attr("y", (d) => (d.y0 + d.y1) / 2)
        .text((d) => `${d.data.name}`)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("style", "font-size: 10px;white-space: pre-wrap;");
    
    text.exit().remove();
    
        
}

handlechange()

document.getElementById('tiles').addEventListener('change',handlechange)


function handlechange1(){
    const x = document.getElementById('tiles1').value

    const tileMethod=eval(x)
    treemap1.tile(tileMethod);
    treemap1.padding(2);

    // Calculate the layout
    root1.sum((d) => d.value);
    treemap1(root1);

    const cell = svg1.selectAll(".cell")
                .data(root1.leaves());

    cell.enter()
        .append("rect")
        .attr("class", "cell")
        .merge(cell)
        .transition()
        .duration(1000)
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => color1(d.parent.data.name))

    cell.exit().remove();


    const text = svg1.selectAll("text")
                .data(root1.leaves());
    text.enter()
        .append("text")
        .merge(text)
        .transition()
        .duration(1000)
        .attr("x", (d) => (d.x0 + d.x1) / 2)
        .attr("y", (d) => (d.y0 + d.y1) / 2)
        .text((d) => `${d.data.name} `)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("style", "font-size: 10px;");
    
    text.exit().remove();

}

handlechange1()

document.getElementById('tiles1').addEventListener('change',handlechange1)


function handlechange2(){
    const x = document.getElementById('tiles2').value

    const tileMethod=eval(x)
    treemap2.tile(tileMethod);
    treemap2.padding(2);

    // Calculate the layout
    root2.sum((d) => d.value);
    treemap2(root2);

    const cell = svg2.selectAll(".cell")
                .data(root2.leaves());

    cell.enter()
        .append("rect")
        .attr("class", "cell")
        .merge(cell)
        .transition()
        .duration(1000)
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => color2(d.parent.data.name))

    cell.exit().remove();


    const text = svg2.selectAll("text")
                .data(root2.leaves());
    text.enter()
        .append("text")
        .merge(text)
        .transition()
        .duration(1000)
        .attr("x", (d) => (d.x0 + d.x1) / 2)
        .attr("y", (d) => (d.y0 + d.y1) / 2)
        .text((d) => `${d.data.name} `)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("style", "font-size: 10px;word-wrap: break-word; white-space: pre-wrap;");
    
    text.exit().remove();

}

handlechange2()

document.getElementById('tiles2').addEventListener('change',handlechange2)


