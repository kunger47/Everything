export default class ToDoBoard {
    id: number = 0;
    name: string | null = null;
    createdDate: Date | null = null;
    description: string = '';
    boardFolderId: number | null = null;

    constructor(init?: Partial<ToDoBoard>) {
        Object.assign(this, init);
    }
}