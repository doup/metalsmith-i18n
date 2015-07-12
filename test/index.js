'use strict';

var i18n   = require('../lib/index');
var expect = require('chai').expect;
var ms     = require('metalsmith')(__dirname);
var noop   = function () {};
var plugin = i18n({ default: 'es', locales: ['en', 'es'], directory: 'locales' });

describe('/lib/index.js', function () {
    it('should add `__` and `__n` methods to each object', function () {
        var files = { 'en.md': { locale: 'en' }, 'x.md': {} };

        plugin(files, ms, noop);

        expect(files['en.md']).to.have.property('__');
        expect(files['en.md']).to.have.property('__n');
        expect(files['x.md']).to.have.property('__');
        expect(files['x.md']).to.have.property('__n');
    });

    it('should read `locale` property from the file', function () {
       var files = { 'en.md': { locale: 'en' } };

       plugin(files, ms, noop);

       expect(files['en.md'].__('hello')).to.equal('Hello.');
    });

    it('should use the default `locale` if none is defined', function () {
        var files = { 'x.md': {} };

        plugin(files, ms, noop);

        expect(files['x.md'].__('hello')).to.equal('Hola.');
    });

    it('should override `locale` when passed as a parameter', function () {
        var files = { 'x.md': {} };
        var __, __n;

        plugin(files, ms, noop);

        __  = files['x.md'].__;
        __n = files['x.md'].__n;

        expect(__('hello_name', { name: 'Marcus' })).to.equal('Hola Marcus!');
        expect(__('hello_name', { name: 'Marcus', locale: 'en' })).to.equal('Hello Marcus!');
        expect(__('hello_x', 'mundo')).to.equal('Hola mundo!');
        expect(__('hello_x', { locale: 'en' }, 'world')).to.equal('Hello world!');
        expect(__('hello_name_x', { name: 'Marcus' }, 'fin de semana')).to.equal('Hola Marcus, ¿que tal tu fin de semana?');
        expect(__('hello_name_x', { name: 'Marcus', locale: 'en' }, 'weekend')).to.equal('Hello Marcus, how was your weekend?');
        expect(__n('dog_color', 'dog_color', 1, { color: 'verde' })).to.equal('Un perro verde.');
        expect(__n('dog_color', 'dog_color', 3, { color: 'green', locale: 'en' })).to.equal('3 green dogs.');
        expect(__n('dog_x', 'dog_x', 1, 'el parque')).to.equal('Un perro en el parque.');
        expect(__n('dog_x', 'dog_x', 3, { locale: 'en' }, 'park')).to.equal('3 dogs in the park.');
        expect(__n('dog_color_x', 'dog_color_x', 1, { color: 'verde' }, 'el parque')).to.equal('Un perro verde en el parque.');
        expect(__n('dog_color_x', 'dog_color_x', 3, { color: 'green', locale: 'en' }, 'park')).to.equal('3 green dogs in the park.');
    });

    it('should work with `n` unnamed parameters', function () {
        var files = { 'x.md': {} };

        plugin(files, ms, noop);

        expect(files['x.md'].__('n', 'un', 'dos', 'tres')).to.equal('Y… un, dos, tres!');
        expect(files['x.md'].__('n', { locale: 'en' }, 'one', 'two', 'three')).to.equal('And… one, two, three!');
        expect(files['x.md'].__n('n_count', 'n_count', 1, 'perro', 'verde', 'veloz')).to.equal('Un perro verde y veloz.');
        expect(files['x.md'].__n('n_count', 'n_count', 1, { locale: 'en' }, 'green', 'fast', 'dog')).to.equal('One green and fast dog.');
        expect(files['x.md'].__n('n_count', 'n_count', 3, 'perros', 'verdes', 'veloces')).to.equal('3 perros verdes y veloces.');
        expect(files['x.md'].__n('n_count', 'n_count', 3, { locale: 'en' }, 'green', 'fast', 'dogs')).to.equal('3 green and fast dogs.');
    });
});
