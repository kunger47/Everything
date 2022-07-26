import SequencedItem from "models/SequencedItem";
import { Dispatch, SetStateAction } from "react";
import { DropResult } from "react-beautiful-dnd";
import { copyObject } from "./object-helper";

export function getNextSequence(items: SequencedItem[]): number {
    var seqs = items.map(i => i.sequence);
    if (seqs.length < 1)
        return 0;
    return Math.max(...seqs) + 1;
}

export const onSimpleListDragEnd = (result: DropResult, array: SequencedItem[], arraySetter: (Dispatch<SetStateAction<any[]>>)): any | null => {
    let { destination, source } = result;

    if (!destination)
        return null;
    if (destination.index === source.index)
        return null;

    let arrayCopy = copyObject(array);
    let item = arrayCopy.splice(source.index, 1)[0];
    arrayCopy.splice(destination.index, 0, item);
    arraySetter(arrayCopy);
    item.sequence = destination.index;

    return item;
};