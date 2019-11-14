import {getOsisList} from './verse_utils';


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
})
