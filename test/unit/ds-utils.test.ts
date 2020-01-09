import {assert} from "chai";
import "mocha";
import * as utils from "../../src";

describe('ds-utils', function () {

    it('#flatToHierarchy()', function () {
        let flat = [{id: 1}, {id: 2, parent: 1}];
        let output = utils.flatToHierarchy(flat);
        assert.equal(output[0].id, 1);
        assert.equal(output[0].children[0].id, 2);
    });

});
