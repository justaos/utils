const del = require('del');

function cleanOutput() {
  return del(['lib/']);
}

cleanOutput();
