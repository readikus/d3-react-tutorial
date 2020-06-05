export const dateDomain = (series, startField = 'start', endField) => {

  // implement memonization...
  if (!series || series.length === 0) {
      return []
  }
  const starts = series.map(d => d[startField])
  const ends = endField ? series.map(d => d[endField]) : []
  const sorted = starts.concat(ends).sort((a,b) => a - b)

  console.log('date domain', [sorted[0], sorted[sorted.length - 1]], sorted)
  return [sorted[0], sorted[sorted.length - 1]]
}

export const valueDomain = (series, valueField) => {

  // implement memonization...
  if (!series || series.length === 0) {
      return []
  }
  const values = Array.from(new Set(series.map(entry => entry[valueField]))).sort((a,b) => a - b);
  console.log('values:', [values[0], values[values.length - 1]])
  return [values[0], values[values.length - 1]]
}

const DEFAULT_COLOUR_SERIES = ['#FD7FFF',  '#F3A525', '#0EF59E', '#8AD8D7', '#CCEC00', '#30BB14', '#FF5A49', '#B8F091', '#FF95FC'];

export const mapColourSeries = (series, seriesField, colours = DEFAULT_COLOUR_SERIES) => {

  const uniqueValues = new Set(...[series.map(entry => entry[seriesField])])
  return Array.from(uniqueValues).sort().reduce((acc, value, index) => ({
    ...acc,
    [value]: colours[index]
  }), {})

}
