export default class ToDoItem {
    id: number = 0;
    toDoColumnId: number = 0;
    name: string | null = null;
    createdDate?: Date;
    dueDate?: Date;
    description: string = '';
    sequence: number = 0;

    constructor(init?: Partial<ToDoItem>) {
        Object.assign(this, init);
    }
}