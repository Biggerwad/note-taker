import { NoteData, Tag } from "./App";
type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};
export declare function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps): import("react/jsx-runtime").JSX.Element;
export {};
