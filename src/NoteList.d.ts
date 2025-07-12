import { Tag } from "./App";
type SimplifiedNote = {
    tags: Tag[];
    title: string;
    id: string;
};
type NoteListProps = {
    availableTags: Tag[];
    notes: SimplifiedNote[];
    onDeleteTag: (id: string) => void;
    onUpdateTag: (id: string, label: string) => void;
};
export declare function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag, }: NoteListProps): import("react/jsx-runtime").JSX.Element;
export {};
