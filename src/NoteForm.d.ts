import { NoteData, Tag } from "./App";
type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
} & Partial<NoteData>;
export declare function NoteForm({ onSubmit, onAddTag, availableTags, title, markdown, tags, }: NoteFormProps): import("react/jsx-runtime").JSX.Element;
export {};
