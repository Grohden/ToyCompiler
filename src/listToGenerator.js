function* listToGenerator(list) {
  for (const item of list) {
    yield item;
  }
}

module.exports = listToGenerator;
