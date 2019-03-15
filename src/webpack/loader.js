module.exports = function loader(source) {
  console.log('LOADER: ', source)

  return `/* cssup loader */`
}
