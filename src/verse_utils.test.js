import {getOsisList, formatQueryToOsis} from './verse_utils';

describe('test getOsisList', function() {
    it('filter out empty string', () => {
        var real = getOsisList('');
        expect(real).toStrictEqual([]);
    });
    it('verses from one chapter', () => {
        var real = getOsisList('John 3:16-20');
        expect(real).toStrictEqual(['John 3:16-20']);
    });
    it('verses from multiple chapter', () => {
        var real = getOsisList('John 3:16-17, Colossians 1:1-2');
        expect(real).toStrictEqual(['John 3:16-17', 'Colossians 1:1-2']);
    });
});

describe('test formatQueryToOsis', function() {
    it('empty string', () => {
        var real = formatQueryToOsis('');
        expect(real).toStrictEqual('');
    });
    it('single verse', () => {
        var real = formatQueryToOsis('John 3:16');
        expect(real).toStrictEqual('John.3.16');
    });
    it('single verse range', () => {
        var real = formatQueryToOsis('Colossians 1:1-10');
        expect(real).toStrictEqual('Col.1.1-Col.1.10');
    });
    it('single verse range overflow', () => {
        var real = formatQueryToOsis('John 1:1-100');
        expect(real).toStrictEqual('John.1');
    });
    it('single verse range underflow', () => {
        var real = formatQueryToOsis('John 1:0-10');
        expect(real).toStrictEqual('John.1.10');
    });
    it('multiple verse range', () => {
        var real = formatQueryToOsis('John 1:1-16, Colossians 3:5-10');
        expect(real).toStrictEqual('John.1.1-John.1.16,Col.3.5-Col.3.10');
    })
});
