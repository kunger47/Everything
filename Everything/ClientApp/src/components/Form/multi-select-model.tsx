class MultiSelectModel {
    value: number = 0;
    label: string = '';
    color?: string;

    constructor(init?: Partial<MultiSelectModel>) {
        Object.assign(this, init);
    }
}

export default MultiSelectModel;