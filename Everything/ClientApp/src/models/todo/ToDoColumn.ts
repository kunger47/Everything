import ToDoItem from "./ToDoItem";

export default class ToDoColumn {
    id: number = 0;
    toDoBoardId: number = 0;
    name: string | null = null;
    createdDate: Date | null = null;
    description: string = '';
    sequence: number = 0;
    toDoItems: ToDoItem[] = [];

    constructor(init?: Partial<ToDoColumn>) {
        Object.assign(this, init);
    }
}