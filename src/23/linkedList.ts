export class LinkedList {
    private nodes: Map<number, Node>;

    private _head: Node;
    public get head(): Node {
        return this._head;
    }
    public set head(v: Node) {
        this._head = v;
    }

    private _tail: Node;
    public get tail(): Node {
        return this._tail;
    }
    public set tail(v: Node) {
        this._tail = v;
    }

    private _length: number;
    public get length(): number {
        return this._length;
    }
    public set length(v: number) {
        this._length = v;
    }

    constructor(values: number[]) {
        this.nodes = new Map();

        values.forEach(value => this.add(value));
    }

    public add(value: number) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.next = this.head;
            this.tail = node;
        }

        this.nodes.set(value, node);
    }

    public find(value: number): Node {
        return this.nodes.get(value);
    }

    public getNodeList(node: Node): string {
        const nodes: number[] = [];
        for (const _ of Array(this.nodes.size)) {
            nodes.push(node.value);
            node = node.next;
        }

        return nodes.join(',');
    }

    public print(node: Node) {
        console.log(this.getNodeList(node));
    }

    public getHead(): Node {
        return this.head;
    }

    public getMaxValue(): number {
        return [...this.nodes.values()]
            .map(node => node.value)
            .reduce((max, current) => (current > max ? current : max));
    }
}

export class Node {
    private _next: Node;
    public get next(): Node {
        return this._next;
    }
    public set next(v: Node) {
        this._next = v;
    }

    private _value: number;
    public get value(): number {
        return this._value;
    }
    public set value(v: number) {
        this._value = v;
    }

    constructor(value: number, next: Node = undefined) {
        this.value = value;
        this.next = next;
    }
}
