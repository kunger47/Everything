import TravelTag from "./TravelTag";

export default class PackingItem {
    id: number = 0;
    name: string | null = null;
    description: string = '';
    isActive: boolean = false;
    // sequence: number = 0;
    tags: TravelTag[] = [];

    constructor(init?: Partial<PackingItem>) {
        Object.assign(this, init);
    }
}