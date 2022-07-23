
export default class PackingItem {
    id: number = 0;
    name: string | null = null;
    description: string = '';
    isActive: boolean = false;
    // sequence: number = 0;

    constructor(init?: Partial<PackingItem>) {
        Object.assign(this, init);
    }
}