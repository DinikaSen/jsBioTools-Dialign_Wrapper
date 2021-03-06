/*
This tests require dialign2-2 binary executable to be installed in util/bin/dialign_package/src
and DIALIGN2_DIR environment variable to be set pointing to util/bin/dialign_package/dialign2_dir

To download dialign2-2 binary executable and build in the target location run following file :
                    util/downloaderDialign.js

NOTE : The environment variable paths are set by default unless user has changed them manually
*/

require('mocha');
const assert = require('assert');
import { expect } from 'chai';
import {should} from 'chai';
import {stdout} from "test-console";
import {resolve} from 'path';

let restoreStdout;

import dialign from '../lib/dialign';


describe('#Set custom execution path', function () {

    it('customExecLocation should be set', function (done) {
        let location = 'src/util/bin/dialign_package/src';
        restoreStdout = stdout.ignore();
        dialign.setCustomLocation(location);
        restoreStdout();
        assert.deepEqual(dialign.customExecLocation, resolve(location));
        done();
    });
    it('CustomExecLocation should not be set', function (done) {
        let location = 'lib';
        restoreStdout = stdout.ignore();
        dialign.setCustomLocation(location);
        restoreStdout();
        assert.notDeepEqual(dialign.customExecLocation, resolve(location));
        done();
    });
});

describe('#Set custom environment variable path', function () {

    it('customEnvVarPath should be set', function (done) {
        let location = 'src/util/bin/dialign_package/dialign2_dir';
        restoreStdout = stdout.ignore();
        dialign.setEnvironmentVar(location);
        restoreStdout();
        assert.deepEqual(dialign.customEnvVarPath, resolve(location));
        done();
    });
    it('customEnvVarPath should not be set', function (done) {
        let location = 'util';
        restoreStdout = stdout.ignore();
        dialign.setEnvironmentVar(location);
        restoreStdout();
        assert.notDeepEqual(dialign.customEnvVarPath, resolve(location));
        done();
    });
});

describe('#Align an unaligned sequence file', function () {
    it('should execute dialign command (output format = fasta)', function (done) {
        let inspect = stdout.inspect();
        dialign.alignSeqFile('src/test/samples/example.fasta', 'fasta', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });

    it('should execute dialign command (output format = clustalW)', function (done) {
        let inspect = stdout.inspect();
        dialign.alignSeqFile('src/test/samples/example.fasta', 'clustalW', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
});

describe('#Align a string input of sequences', function () {
    it('should execute dialign command (output format = fasta)', function (done) {
        let inspect = stdout.inspect();
        let input = '>test1\n' +
            'ACDEFGHIKLMNPQRSTVWY\n' +
            '>test2\n' +
            'XXXXACDEFGHIMNXXXPQRSTVWY\n' +
            '>test3\n' +
            'ACDEFGHILMNXXXXXPQRSTVWYXXXX\n' +
            '>test4\n' +
            'XXXACDEFGHIKLMNPQRSTVWYXXX';
        dialign.alignSeqString(input, 'fasta', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
    it('should execute dialign command (output format = clustalW)', function (done) {
        let inspect = stdout.inspect();
        let input = '>test1\n' +
            'ACDEFGHIKLMNPQRSTVWY\n' +
            '>test2\n' +
            'XXXXACDEFGHIMNXXXPQRSTVWY\n' +
            '>test3\n' +
            'ACDEFGHILMNXXXXXPQRSTVWYXXXX\n' +
            '>test4\n' +
            'XXXACDEFGHIKLMNPQRSTVWYXXX';
        dialign.alignSeqString(input, 'clustalW', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
});

