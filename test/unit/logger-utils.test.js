const {assert} = require('chai');
const utils = require('../../lib');

describe('logger-utils', function() {

  it('#createLogger()', function() {
      const logger = utils.createLogger({filePath: __dirname + '/log/test.log'});
      assert.isOk(!!logger, "Logger created");
  });

});
