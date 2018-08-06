import React, { Component } from 'react';
import * as d3 from "d3";
import moment from 'moment';
import { rupiah } from '../../../../helper/currency';

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillUnmount() {
        let parent = document.body;
        let child = document.getElementById("tooltip");
        parent.removeChild(child);
    }

    componentDidMount() {
        const sales = this.props.data.data.sales.sales;
        const expense = this.props.data.data.sales.expense;
        let rmSvg = d3.select("svg");
        rmSvg.selectAll("*").remove();

        let div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .attr("id", "tooltip")
            .style("opacity", 0);

        let svg = d3.select("#graph").append('svg')
            .attr('width', 1000)
            .attr('height', 420),
            margin = { top: 20, right: 50, bottom: 30, left: 50 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
            v = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let parseTime = d3.timeParse("%d-%b-%y");

        let x = d3.scaleTime()
            .rangeRound([0, width]);

        let y = d3.scaleLinear()
            .rangeRound([height, 0]);

        let line = d3.line()
            .x(function (d) {
                d.month = parseTime(moment(d.month, "YYYY-MM-DD").format("DD-MMM-YY"))
                return x(d.month);
            })
            .y(function (d) { return y(d.total); });

        let totalExpense = 0
        let totalSales = 0
        for (let i = 0; i < sales.length; i++) {
            const element = sales[i];
            totalSales += element.total;
        }
        for (let i = 0; i < expense.length; i++) {
            const element = expense[i];
            totalExpense += element.total;
        }

        if (totalExpense > totalSales) {
            for (let i = 0; i < expense.length; i++) {
                y.domain(d3.extent(expense, function (d) { return d.total; }));
            }
        } else {
            for (let i = 0; i < sales.length; i++) {
                y.domain(d3.extent(sales, function (d) { return d.total; }));
            }
        }

        for (let i = 0; i < sales.length; i++) {

            x.domain(d3.extent(sales, function (d) {
                d.month = parseTime(moment(d.month, "YYYY-MM-DD").format("DD-MMM-YY"))
                return (d.month);
            }));

            g.append("g")
                .attr("transform", "translate(" + 0 + "," + height + ")")
                .call(d3.axisBottom(x).tickFormat(function (date) {
                    return d3.timeFormat('%B, %Y')(date);
                }))
                .select(".domain")
                .remove();

            g.append("g")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Total");

            g.append("path")
                .datum(sales)
                .attr("fill", "none")
                .attr("stroke", "blue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .transition()
                .duration(1050)
                .delay(function (d, i) { return i * 50; })
                .attr("d", line);

            g.selectAll("circle")
                .data(sales)
                .enter().append("circle")
                .attr('stroke', 'white')
                .attr('stroke-width', 0)
                .attr("r", 0)
                .attr("cx", function (d) { return x(d.month); })
                .attr("cy", function (d) { return y(d.total); })
                .on('mouseover', function (d, i) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("<strong>Total Penjualan </strong> <br />" + rupiah(d.total))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .transition()
                .duration(1050)
                .delay(function (d, i) { return (sales.length - 1 - i) * 10; })
                .attr('stroke-width', 3)
                .attr('r', 7)
        }

        let expenseLine = d3.line()
            .x(function (d) {
                d.month = parseTime(moment(d.month, "YYYY-MM-DD").format("DD-MMM-YY"))
                return x(d.month);
            })
            .y(function (d) { return y(d.total); });

        for (let i = 0; i < expense.length; i++) {
            v.append("g")
                .attr("transform", "translate(" + 0 + "," + height + ")")
                .call(d3.axisBottom(x).tickFormat(function (date) {
                    return d3.timeFormat('%B, %Y')(date);
                }))
                .select(".domain")
                .remove();

            v.append("g")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Total");

            v.append("path")
                .datum(expense)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .transition()
                .duration(1050)
                .delay(function (d, i) { return i * 50; })
                .attr("d", expenseLine);

            v.selectAll("circle")
                .data(expense)
                .enter().append("circle")
                .attr('stroke', 'white')
                .attr('stroke-width', 0)
                .attr("r", 0)
                .attr("cx", function (d) { return x(d.month); })
                .attr("cy", function (d) { return y(d.total); })
                .on('mouseover', function (d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("<strong>Total Belanja </strong> <br />" + rupiah(d.total))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .transition()
                .duration(1050)
                .delay(function (d, i) { return (expense.length - 1 - i) * 10; })
                .attr('stroke-width', 3)
                .attr('r', 7)
        }
    }

    render() {
        return (
            <div>
                <div className='row mt-3'>
                    <div id='graph' className='bg-light ml-2'></div>
                </div>
                <div className='row ml-2 mt-2'>
                    <span className='badge badge-pill badge-primary'>Penjualan</span>
                    <span className='badge badge-pill badge-danger ml-1'>Belanja</span>
                </div>
            </div>
        );
    }

}

export default Graph;