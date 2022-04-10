export default class ToDoItemTask {
    id: number = 0;
    toDoItemId: number = 0;
    name: string | null = null;
    description: string = '';
    sequence: number = 0;

    constructor(init?: Partial<ToDoItemTask>) {
        Object.assign(this, init);
    }
}