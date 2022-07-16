export default class ToDoBoardFolder {
    id: number = 0;
    name: string | null = null;
    createdDate: Date | null = null;
    description: string = '';
    boardFolderId: number | null = null;

    constructor(init?: Partial<ToDoBoardFolder>) {
        Object.assign(this, init);
    }
}