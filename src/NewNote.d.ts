import { NoteData, Tag } from "./App";
type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};
export declare function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps): import("react/jsx-runtime").JSX.Element;
export {};
