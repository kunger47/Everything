import SequencedItem from "models/SequencedItem";
import TravelTag from "./TravelTag";

export default class PackingItem extends SequencedItem {
    id: number = 0;
    name: string | null = null;
    description: string = '';
    isActive: boolean = false;
    tags: TravelTag[] = [];

    constructor(init?: Partial<PackingItem>) {
        super();
        Object.assign(this, init);
    }
}