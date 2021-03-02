import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const DepthChart = (props) => {
    let x;
    let y;
    let height;
    let svg;
    let chartHeight = 650;
    let maxPoints = 100;
    const chart = useRef();
    useEffect(() => {
      createChart();
    }, [props.allData]);

    const init = () => {
        chart.current.innerHTML = "";
        const width = chart.current.offsetWidth;
        height = chartHeight;
        x = d3.scaleBand().range([0, 600]); //.scaleLinear().range([0, width]);
        y = d3.scaleLinear().range([height, 0]);
        svg =  d3
        .select(chart.current)
        .append('svg')
        .attr('width', width)
        .attr('height', 700);
    }

    const createChart = () => {
        if (chart  && props.allData.length > 0) {
            init();
            const data = Object.entries(props.chartValues)
                              .sort(([,a],[,b]) => props.type === 'bid' ? +a - +b  : +b - +a)
                              .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
            x.domain(Object.keys(data).slice(0, maxPoints));
            y.domain([0, d3.max(Object.values(data).slice(0, maxPoints))]);
            svg.selectAll('.bar')
              .data(Object.keys(data).slice(0,maxPoints))
              .enter().append('rect')
              .attr('class', d => `bar ${props.type}`)
              .attr('x', d =>  x(d))
              .attr('y', (d, i) => y(data[d]))
              .attr("width", x.bandwidth() )
              .attr("height", (d,i) => {
                return height
                 - y(data[d]); })
            } else {
                chart.current.innerHTML = "";
            }
    }
    return(
        <>
        <div ref={chart}></div>
        </>
    );
}

export default DepthChart;