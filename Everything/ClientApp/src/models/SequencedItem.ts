export default class SequencedItem {
    sequence: number = 0;

    constructor(init?: Partial<SequencedItem>) {
        Object.assign(this, init);
    }
}