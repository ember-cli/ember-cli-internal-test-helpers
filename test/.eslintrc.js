module.exports = {
  env: {
    mocha: true,
  },
  plugins: [
    'chai-expect',
  ],
  rules: {
    // disabled due to chai expect assertions
    'no-unused-expressions': 0,

    'chai-expect/missing-assertion': 2,
    'chai-expect/terminating-properties': 2,
    'chai-expect/no-inner-compare': 2,
  }
};
