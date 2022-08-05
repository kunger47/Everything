import SequencedItem from "models/SequencedItem";
import TravelTag from "./TravelTag";

export default class TripPackingItem extends SequencedItem {
    id: number = 0;
    tripId: number = 0;
    packingItemId: number = 0;
    name: string | null = null;
    description: string = '';
    isActive: boolean = false;
    tags: TravelTag[] = [];

    constructor(init?: Partial<TripPackingItem>) {
        super();
        Object.assign(this, init);
    }
}