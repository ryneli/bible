const ESV = require('./assets/ESV.json');
const ChiUns = require('./assets/ChiUns.json');
const BibleBookIndex = require('./assets/BibleBookIndex.json');

export class VerseCursor {
    constructor(book, chapter, verse) {
        this.book = Number(book);
        this.chapter = Number(chapter);
        this.verse = Number(verse);
        this.verseEnd = this.verse;
        this.verseCn = ChiUns.books[this.book].chapters[this.chapter].verses[this.verse].text;
        this.verseEn = ESV.books[this.book].chapters[this.chapter].verses[this.verse].text;

        this.reviseVerse();
    }

    reviseVerse() {
        const next = this.verse + 1;
        if (next >= ChiUns.books[this.book].chapters[this.chapter].verses[this.verse].length) {
            return;
        }

        console.log('VerseCursor#reviseVerse %o', ChiUns.books[this.book].chapters[this.chapter].verses[next].text);

        if (ChiUns.books[this.book].chapters[this.chapter].verses[next].text === null) {
            this.verseEn += ESV.books[this.book].chapters[this.chapter].verses[next].text;
            this.verseEnd += 1;
        } else if (ESV.books[this.book].chapters[this.chapter].verses[next].text === null) {
            this.verseCn += ChiUns.books[this.book].chapters[this.chapter].verses[next].text;
            this.verseEnd += 1;
        }
    }
    
    equals(that) {
        return this.book === that.book 
        && this.chapter === that.chapter 
        && this.verse === that.verse
        && this.verseEnd === that.verseEnd;
    }

    getVerseNumber() {
        if (this.verseEnd === this.verse) {
            return (this.chapter + 1) + ':' + (this.verse + 1);
        } else {
            return (this.chapter + 1) + ':' + (this.verse + 1) + '-' + (this.verseEnd + 1);
        }
    }

    getVerse() {
        return this.verseCn
        + '\n' + this.verseEn;
    }

    getVerseCn() {
        return this.verseCn;
    }

    getVerseEn() {
        return this.verseEn;
    }

    next() {
        if (ChiUns.books[this.book].chapters[this.chapter].verses.length > this.verseEnd + 1) {
            return new VerseCursor(this.book, this.chapter, this.verseEnd + 1);
        } else if (ChiUns.books[this.book].chapters.length > this.chapter + 1) {
            return new VerseCursor(this.book, this.chapter + 1, 0);
        } else if (ChiUns.books.length > this.book+1) {
            return new VerseCursor(this.book + 1, 0, 0);
        } else {
            return null;
        }
    }

    static fromOsis(osisText) {
        let [bookName, chapter, verse] = osisText.split('.');
        chapter = Number(chapter) - 1;
        verse = Number(verse) - 1;
        if (!verse) {
            verse = '0';
        }
        return new VerseCursor(BibleBookIndex[bookName.toLowerCase()], chapter, verse);
    }
}