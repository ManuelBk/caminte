/**
 *  Category Unit Test
 *  Created by caminte-cli script
 **/

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
}
var driver = process.env.CAMINTE_DRIVER || 'memory';
var should = require('should');
var caminte = require('../../');
var config = require('./../lib/database');
var dbConf = config[driver];
var CategoryModel = require('./../lib/Category');
var Schema = caminte.Schema;
dbConf.host = process.env.DB_HOST || dbConf.host || '';
var schema = new Schema(dbConf.driver, dbConf);
var Category = CategoryModel(schema);

/**
 * Simple tests for the Article model
 */
describe(driver + ' - Category unit:', function () {
    'use strict';
    var category, id;

    before(function (done) {
        schema.autoupdate(done);
    });

    after(function (done) {
        done();
    });

    describe('create', function () {

        category = new Category();
        it('category should be object', function () {
            category.should.be.type('object');
        });

        it('validate', function (done) {
            category.isValid(function (valid) {
                valid.should.be.true;
                if (!valid) console.log(category.errors);
                done();
            });
        });

    });

    describe('save', function () {

        it('should be have #save', function () {
            category.should.be.have.property('save');
            category.save.should.be.type('function');
        });

        it('call', function (done) {
            category.save(function (err) {
                should.not.exist(err);
                category.should.be.have.property('id');
                category.id.should.not.eql(null);
                id = category.id;
                done();
            });
        });

    });

    describe('destroy', function () {

        it('should be have #destroy', function () {
            category.should.be.have.property('destroy');
            category.destroy.should.be.type('function');
        });

        it('call', function (done) {
            category.destroy(function (err) {
                should.not.exist(err);
                done();
            });
        });

    });

});