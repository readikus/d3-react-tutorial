import React, { useEffect, useState, useRef } from 'react'
import { scaleTime, scaleLinear } from 'd3-scale'
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

import { dateDomain, mapColourSeries } from '../../lib/util'

import './timeline.css'

// helper functions:
const lineClassHelper = (index, popup) => {
  if (!popup) {
    return
  }
  return popup.index === index ? 'selected' : 'unselected' 
}
// not sure about this function...
const sorter = (a, b) => {
  const startDiff = b['start'] - a['start']
  return startDiff === 0 ? a['end'] - b['end'] : startDiff
}

const calculateXScale = (data, margins, width) => scaleTime()
  .domain(dateDomain(data))
  .range([margins.left, width - margins.right])
  .nice()
const calculateYScale = (data, margins, height) => scaleLinear()
  .domain([0, data.length + 1])
  .range([height - margins.bottom, margins.top])

export default function Timeline({
    data = [],
    height = 550,
    margins = { top: 50, right: 40, bottom: 350, left: 40 },
    width = 900,
    colourSeriesField,
    startField,
    endField }) {

  const xAxis = React.createRef()
  const yAxis = React.createRef()

  const [popup, setPopup] = useState();

  let xScale = calculateXScale(data, margins, width)
  let yScale = calculateYScale(data, margins, height)

  const xScaleRef = useRef();
  const yScaleRef = useRef();

  xScaleRef.current = calculateXScale(data, margins, width)
  yScaleRef.current = calculateYScale(data, margins, height)

  // this is buggy and annoying - some sort of async issue, but it should be async
  // the refs seem wrong/ugly
  const [xScaleState, setXScale] = useState(calculateXScale(data, margins, width))
  const [yScaleState, setYScale] = useState('abc')

  useEffect(() => {
    // render the axis once the components are on screen

    // only recompute the scales when data changes
    xScaleRef.current = calculateXScale(data, margins, width)

    const d3xAxis = d3Axis.axisBottom(xScaleRef.current)
      .tickPadding(5)
    d3Select(xAxis.current).call(d3xAxis)
    yScaleRef.current = calculateYScale(data, margins, height)
  }, [data, margins, width, height, xAxis]);

  // handlers for mouse events on the lines
  let mouseLeaveTimer = undefined
  const onMouseEnter = ({ index, entry }) => (event) => {
    setPopup({ index, entry, x: event.clientX, y: event.clientY })
    if (mouseLeaveTimer && mouseLeaveTimer.clearTimeout) {
      mouseLeaveTimer.clearTimeout()
    }
  }
  const onMouseLeave = () => (event) => {
    mouseLeaveTimer = setTimeout(() => {
      setPopup(undefined)
    }, 1000)
  }

  const colourMap = mapColourSeries(data, colourSeriesField)

  return (
    <>
      <svg width={width} height={height}>
        <defs>
          <marker id="markerCircle" markerWidth="2" markerHeight="2" refX="5" refY="5" viewBox="0 0 10 10">
              <circle cx="5" cy="5" r="3" className="markerCircle" />
          </marker>

        </defs>
        <g
          className={`axis x-axis`}
          ref={xAxis}
          transform={`translate(0, ${height - margins.bottom})`}
        />
        <g
          className={`axis y-axis`}
          ref={yAxis}
          transform={`translate(${margins.left}, 0)`}
        />
        <g className="lines">
          {data.sort(sorter).map((entry, index) =>
            <line
              key={index}
              x1={xScaleRef.current(entry[startField])}
              y1={yScaleRef.current(index + 1)}
              x2={xScaleRef.current(entry[endField])}
              y2={yScaleRef.current(index + 1)}
              stroke={colourMap[entry[colourSeriesField]]}
              onMouseOver={onMouseEnter({ index, entry })}
              onMouseLeave={onMouseLeave({ index })}
              className={lineClassHelper(index, popup)}
            />
          )}
        </g>
        
        {popup &&
          <g>
            <line className="axisGuide"
              x1={xScale(popup.entry[startField])}
              y1={yScale(popup.index + 1)}
              x2={xScale(popup.entry[startField])}
              y2={yScale(0)} />
            <line className="axisGuide"
              x1={xScale(popup.entry[endField])}
              y1={yScale(popup.index + 1)}
              x2={xScale(popup.entry[endField])}
              y2={yScale(0)}
            />
          </g>
        }
      </svg>
      {popup &&
        <div className="popup" style={{ top: popup.y - 40, left: popup.x + 10}}>
          <span className="feature">{popup.entry.feature}</span> <span className="epic">({popup.entry.epic})</span>
        </div>}
  </>      
  )
}