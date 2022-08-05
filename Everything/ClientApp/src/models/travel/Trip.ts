import TravelTag from "./TravelTag";

export default class Trip {
    id: number = 0;
    name: string | null = null;
    description: string = '';
    folderId: number | null = null;
    tags: TravelTag[] = [];

    constructor(init?: Partial<Trip>) {
        Object.assign(this, init);
    }
}