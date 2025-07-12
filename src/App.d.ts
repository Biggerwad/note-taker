import "bootstrap/dist/css/bootstrap.min.css";
export type Note = {
    id: string;
} & NoteData;
export type RawNote = {
    id: string;
} & RawNoteData;
export type RawNoteData = {
    title: string;
    markdown: string;
    tagIds: string[];
};
export type Tag = {
    id: string;
    label: string;
};
export type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[];
};
declare function App(): import("react/jsx-runtime").JSX.Element;
export default App;
