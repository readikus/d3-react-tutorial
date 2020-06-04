export const dateDomain = (series, startField = 'start', endField = 'end') => {

    // implement memonization...
    if (!series || series.length === 0) {
        return []
    }
    const starts = series.map(d => d[startField])
    const ends = series.map(d => d[endField])
    const sorted = starts.concat(ends).sort((a,b) => a - b)

    return [sorted[0], sorted[sorted.length - 1]]
}

const DEFAULT_COLOUR_SERIES = ['#FD7FFF',  '#F3A525', '#0EF59E', '#8AD8D7', '#CCEC00', '#30BB14', '#FF5A49', '#B8F091', '#FF95FC'];

export const mapColourSeries = (series, seriesField, colours = DEFAULT_COLOUR_SERIES) => {

  const uniqueValues = new Set(...[series.map(entry => entry[seriesField])])
  return Array.from(uniqueValues).sort().reduce((acc, value, index) => ({
    ...acc,
    [value]: colours[index]
  }), {})

}
