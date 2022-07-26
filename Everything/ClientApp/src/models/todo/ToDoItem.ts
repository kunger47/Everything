import SequencedItem from "models/SequencedItem";

export default class ToDoItem extends SequencedItem {
    id: number = 0;
    toDoColumnId: number = 0;
    name: string | null = null;
    createdDate?: Date;
    dueDate?: Date;
    description: string = '';

    constructor(init?: Partial<ToDoItem>) {
        super();
        Object.assign(this, init);
    }
}