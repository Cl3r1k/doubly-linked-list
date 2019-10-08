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
            // console.log('this._tail: ', this._tail);
            newNodeHead = this._tail;
        }

        const node = new Node(data, newNodeHead);

        // console.log('doublyLinkedList: ', this.doublyLinkedList);
        if (this._tail !== null) {
            // console.log('this._tail: ', this._tail);
            // console.log('new node: ', node);
            // console.log('this.length: ', this.length);
            // console.log('this.doublyLinkedList[this.length][next]: ', this.doublyLinkedList[this.length - 1]);
            this.doublyLinkedList[this.length - 1]['next'] = node;
        }
        // console.log('doublyLinkedList: ', this.doublyLinkedList);

        if (!this._head) {
            this._head = node;
        }

        // if (!this.tail) {
        //     this._tail = node;
        // } else {
        //     this._tail = node;
        // }

        this._tail = node;

        this.doublyLinkedList[this.length] = node;

        this.length++;

        return this;

        // console.log('doublyLinkedList: ', this.doublyLinkedList);
        // console.log('_head: ', this._head);
        // console.log('_tail: ', this._tail);
    }

    head() {
        return this._head === null ? null : this._head.data;
    }

    tail() {
        return this._tail === null ? null : this._tail.data;
    }

    at(index) {
        // console.log('index: ', index);
        // const id = Number(index);
        // console.log('id: ', id);
        // console.log('doublyLinkedList: ', this.doublyLinkedList);
        // console.log('this.doublyLinkedList[index]: ', this.doublyLinkedList[index]);
        // console.log('this.doublyLinkedList[index][data]: ', this.doublyLinkedList[index]['data']);
        // console.log('this.doublyLinkedList[id]: ', this.doublyLinkedList[id]);
        // console.log('this.doublyLinkedList[1]: ', this.doublyLinkedList[1]);
        // return this.doublyLinkedList[index];
        return this.doublyLinkedList[index]['data'];
    }

    insertAt(index, data) {
        // console.log('Object.keys: ', Object.keys(this.doublyLinkedList));

        const listKeys = Object.keys(this.doublyLinkedList);
        for (let i = listKeys.length - 1; i >= index; i--) {
            // console.log('for %s item: ', i, this.doublyLinkedList[i]);
            this.doublyLinkedList[i + 1] = this.doublyLinkedList[i];
            this.doublyLinkedList[i] = {};
        }
        this.length++;
        // console.log('doublyLinkedList: ', this.doublyLinkedList);

        let newNodeHead = null;
        let newNodeTail = null;
        if (index > 0) {
            newNodeHead = this.doublyLinkedList[index - 1];
            // console.log('newNodeHead: ', newNodeHead);
        }
        if (index < this.length - 1) {
            newNodeTail = this.doublyLinkedList[index + 1];
            // console.log('newNodeTail: ', newNodeTail);
        }

        const newNode = new Node(data, newNodeHead, newNodeTail);
        this.doublyLinkedList[index] = newNode;

        if (index > 0) {
            this.doublyLinkedList[index - 1].next = newNode;
        }
        if (index < this.length - 1) {
            this.doublyLinkedList[index + 1].prev = newNode;
        }

        // console.log('newNode: ', newNode);
        // console.log('doublyLinkedList NEW+++++: ', this.doublyLinkedList);
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
        // console.log('doublyLinkedList: ', this.doublyLinkedList);
        // console.log('_head: ', this._head);
        // console.log('_tail: ', this._tail);
        // console.log('length: ', this.length);
        return this;
    }

    deleteAt(index) {

        // console.log('1. deleteAt() BEFORE doublyLinkedList : ', this.doublyLinkedList);
        const listKeys = Object.keys(this.doublyLinkedList);

        if (index > 0) {
            // console.log('index > 0, index: ', index);
            if (this.length > 2) {
                // console.log('this.length > 2');
                // console.log('PREV doublyLinkedList[index - 1].next', this.doublyLinkedList[index - 1]);
                // console.log('PREV NEW doublyLinkedList[index + 1]', this.doublyLinkedList[index + 1]);
                // console.log('doublyLinkedList[i - 1].next', this.doublyLinkedList[i - 1].next);
                this.doublyLinkedList[index - 1].next = this.doublyLinkedList[index + 1];
                // console.log('NEW NEXT doublyLinkedList[index - 1].next', this.doublyLinkedList[index - 1]);
            } else {
                this.doublyLinkedList[index - 1].next = null;
            }
        } // else consider as deleted First node

        if (index < this.length - 1) {
            if (index > 0) {
                // console.log('NEXT doublyLinkedList[index + 1].next', this.doublyLinkedList[index + 1]);
                // console.log('NEXT NEW doublyLinkedList[index - 1]', this.doublyLinkedList[index - 1]);
                this.doublyLinkedList[index + 1].prev = this.doublyLinkedList[index - 1];
                // console.log('NEW PREV doublyLinkedList[index - 1].prev', this.doublyLinkedList[index + 1]);
            } else {
                this.doublyLinkedList[index + 1].prev = null;
            }
        } // else consider as deleted Last node

        for (let i = index; i < listKeys.length - 1; i++) {
            // console.log('for %s item: ', i, this.doublyLinkedList[i]);
            this.doublyLinkedList[i] = this.doublyLinkedList[i + 1];
        }
        // console.log('2. deleteAt() BEFORE doublyLinkedList : ', this.doublyLinkedList);
        delete this.doublyLinkedList[this.length];
        this.length--;
        // console.log('3. deleteAt() doublyLinkedList : ', this.doublyLinkedList);

        return this;
    }

    reverse() {
        const listKeys = Object.keys(this.doublyLinkedList);

        const newDoublyLinkedList = {};
        let y = 0;
        for (let i = listKeys.length - 1; i >= 0; i--, y++) {
            // console.log('1. for index[%s] item: ', i, this.doublyLinkedList[i]);
            // if (i === listKeys.length - 1) {
            //     console.log('1.1 i === listKeys.length - 1');
            //     this._head = this.doublyLinkedList[i];
            //     this.doublyLinkedList[i].prev = null;
            // }
            // if (i === 0) {
            //     console.log('1.2 i === 0');
            //     this._tail = this.doublyLinkedList[i];
            //     console.log('1.2.1 this._tail', this._tail);
            //     this.doublyLinkedList[i].next = null;
            // }

            newDoublyLinkedList[y] = this.doublyLinkedList[i];
            // console.log('2. newDoublyLinkedList[%s]: ', y, newDoublyLinkedList[y]);
            // if (i - 1 > 0) {
            //     newDoublyLinkedList[y].next = this.doublyLinkedList[i - 1];
            // }
            if (y - 1 >= 0) {
                newDoublyLinkedList[y].prev = newDoublyLinkedList[y - 1];
                newDoublyLinkedList[y - 1].next = newDoublyLinkedList[y];
            }
            // console.log('3. newDoublyLinkedList[%s] updated: ', y, newDoublyLinkedList[y]);
        }

        newDoublyLinkedList[0].prev = null;
        newDoublyLinkedList[listKeys.length - 1].next = null;

        this._head = newDoublyLinkedList[0];
        this._tail = newDoublyLinkedList[listKeys.length - 1];

        // console.log('1. this.doublyLinkedList: ', this.doublyLinkedList);
        // console.log('2. newDoublyLinkedList: ', newDoublyLinkedList);
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