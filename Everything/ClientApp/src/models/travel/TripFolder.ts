export default class TripFolder {
    id: number = 0;
    name: string | null = null;
    description: string = '';
    folderId: number | null = null;

    constructor(init?: Partial<TripFolder>) {
        Object.assign(this, init);
    }
}