module.exports = function(fn) {
  try {
    fn();
  } catch (err) {
    return err;
  }
};
