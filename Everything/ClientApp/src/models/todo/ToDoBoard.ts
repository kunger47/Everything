export default class ToDoBoard {
    id: number = 0;
    name: string | null = null;
    createdDate: Date | null = null;
    description: string = '';
    sequence: number = 0;

    constructor(init?: Partial<ToDoBoard>) {
        Object.assign(this, init);
    }
}