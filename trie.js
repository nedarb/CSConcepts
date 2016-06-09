"use strict";

class TrieNode {
    constructor(letter, value) {
        this.letter = letter;
        this.value = value;
        this.children = {};
    }
    add(name, value, letterIndex) {
        letterIndex = letterIndex || 0;
        let letter = name[letterIndex];
        let hasMoreLetters = letterIndex + 1 < name.length;
        this.children[letter] = this.children[letter] || new TrieNode(letter);

        if (hasMoreLetters) {
            this.children[letter].add(name, value, letterIndex + 1);
        } else {
            this.children[letter].value = value;
        }
        return this;
    }
    remove(name) {

    }
    isMember(name, letterIndex) {
        letterIndex = letterIndex || 0;
        let letter = name[letterIndex];
        if (this.isTop) {
            return 
        }
    }
    get hasChildren() {
        return Object.keys(this.children).length > 0;
    }
    get hasValue() {
        return typeof this.value !== 'undefined';
    }
    get isTop() {
        return typeof this.letter === 'undefined';
    }
    get childrenAsArray() {
        return Object.keys(this.children).map(key => this.children[key]);
    }
    get letterCount() {
        if (this.hasValue) {
            return 1;
        }
        return this.childrenAsArray.reduce((prev, child) => prev + child.letterCount, 0) + (this.isTop ? 0 : 1);
    }
    print(prefix) {
        debugger;
        let keys = Object.keys(this.children);
        if (this.isTop) {
            console.log(`Letter count: ${this.letterCount}`);
            console.log('Paths: ');
            for (let val of this.getValues()) {
                console.log(val);
            }
        }
    }
    * getValues(prefix) {
        prefix = prefix || '';
        if (this.hasValue) {
            yield prefix + this.letter + ' = ' + this.value;
        } else if (this.hasChildren) {
            for (let key in this.children) {
                yield* this.children[key].getValues(prefix + (this.letter || ''));
            }
        }
    }
}


/****** TESTS ******/
var trie = new TrieNode();
trie.add('abc', 100);
trie.add('abdef', 90);
trie.add('acd', 50);
trie.add('def', 10);
trie.print();