const Node = require('./node');

class LinkedList {
    constructor() {
        this.doublyLinkedList = {};
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {

        let newNodeHead = null;

        if (this._tail !== null) {
            newNodeHead = this._tail;
        }

        const node = new Node(data, newNodeHead);

        if (this._tail !== null) {
            this.doublyLinkedList[this.length - 1]['next'] = node;
        }

        if (!this._head) {
            this._head = node;
        }

        this._tail = node;

        this.doublyLinkedList[this.length] = node;

        this.length++;

        return this;
    }

    head() {
        return this._head === null ? null : this._head.data;
    }

    tail() {
        return this._tail === null ? null : this._tail.data;
    }

    at(index) {
        return this.doublyLinkedList[index]['data'];
    }

    insertAt(index, data) {

        const listKeys = Object.keys(this.doublyLinkedList);
        for (let i = listKeys.length - 1; i >= index; i--) {
            this.doublyLinkedList[i + 1] = this.doublyLinkedList[i];
            this.doublyLinkedList[i] = {};
        }
        this.length++;

        let newNodeHead = null;
        let newNodeTail = null;
        if (index > 0) {
            newNodeHead = this.doublyLinkedList[index - 1];
        }
        if (index < this.length - 1) {
            newNodeTail = this.doublyLinkedList[index + 1];
        }

        const newNode = new Node(data, newNodeHead, newNodeTail);
        this.doublyLinkedList[index] = newNode;

        if (index > 0) {
            this.doublyLinkedList[index - 1].next = newNode;
        }
        if (index < this.length - 1) {
            this.doublyLinkedList[index + 1].prev = newNode;
        }

        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        this.doublyLinkedList = {};
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {

        const listKeys = Object.keys(this.doublyLinkedList);

        if (index > 0) {
            if (this.length > 2) {
                this.doublyLinkedList[index - 1].next = this.doublyLinkedList[index + 1];
            } else {
                this.doublyLinkedList[index - 1].next = null;
            }
        } // else consider as deleted First node

        if (index < this.length - 1) {
            if (index > 0) {
                this.doublyLinkedList[index + 1].prev = this.doublyLinkedList[index - 1];
            } else {
                this.doublyLinkedList[index + 1].prev = null;
            }
        } // else consider as deleted Last node

        for (let i = index; i < listKeys.length - 1; i++) {
            this.doublyLinkedList[i] = this.doublyLinkedList[i + 1];
        }
        delete this.doublyLinkedList[this.length];
        this.length--;

        return this;
    }

    reverse() {
        const listKeys = Object.keys(this.doublyLinkedList);

        const newDoublyLinkedList = {};
        let y = 0;
        for (let i = listKeys.length - 1; i >= 0; i--, y++) {

            newDoublyLinkedList[y] = this.doublyLinkedList[i];
            if (y - 1 >= 0) {
                newDoublyLinkedList[y].prev = newDoublyLinkedList[y - 1];
                newDoublyLinkedList[y - 1].next = newDoublyLinkedList[y];
            }
        }

        newDoublyLinkedList[0].prev = null;
        newDoublyLinkedList[listKeys.length - 1].next = null;

        this._head = newDoublyLinkedList[0];
        this._tail = newDoublyLinkedList[listKeys.length - 1];

        this.doublyLinkedList = newDoublyLinkedList;

        return this;
    }

    indexOf(data) {
        const listKeys = Object.keys(this.doublyLinkedList);

        for (let i = 0; i < listKeys.length; i++) {
            if (this.doublyLinkedList[i].data === data) {
                return i;
            }
        }

        return -1;
    }
}

module.exports = LinkedList;