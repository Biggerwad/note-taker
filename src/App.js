import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidv4 } from "uuid";
import { NewNote } from './NewNote';
import { NoteList } from './NoteList';
import { NoteLayout } from './NoteLayout';
import { Note } from './Note';
import { EditNote } from './EditNote';
function App() {
    const [notes, setNotes] = useLocalStorage("NOTES", []);
    const [tags, setTags] = useLocalStorage("TAGS", []);
    const notesWithTags = useMemo(() => {
        return notes.map(note => {
            return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) };
        });
    }, [notes, tags]);
    // when user creates a new note, do this
    function onCreateNote({ tags, ...data }) {
        setNotes(prevNotes => {
            return [
                ...prevNotes,
                { ...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) },
            ];
        });
    }
    // Delete
    function onDeleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter(note => note.id !== id);
        });
    }
    // when user Updates
    function onUpdateNote(id, { tags, ...data }) {
        setNotes(prevNotes => {
            return prevNotes.map(note => {
                if (note.id === id) {
                    return { ...note, ...data, tagIds: tags.map(tag => tag.id) };
                }
                else {
                    return note;
                }
            });
        });
    }
    // Add a tag
    function addTag(tag) {
        setTags(prev => [...prev, tag]);
    }
    // update Tag
    function updateTag(id, label) {
        setTags(prevTags => {
            return prevTags.map(tag => {
                if (tag.id === id) {
                    return { ...tag, label };
                }
                else {
                    return tag;
                }
            });
        });
    }
    // Delete Tag
    function deleteTag(id) {
        setTags(prevTags => {
            return prevTags.filter(tag => { tag.id !== id; });
        });
    }
    return (_jsx(Container, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(NoteList, { notes: notesWithTags, availableTags: tags, onUpdateTag: updateTag, onDeleteTag: deleteTag }) }), _jsx(Route, { path: "/new", element: _jsx(NewNote, { onSubmit: onCreateNote, onAddTag: addTag, availableTags: tags }) }), _jsxs(Route, { path: '/:id', element: _jsx(NoteLayout, { notes: notesWithTags }), children: [_jsx(Route, { index: true, element: _jsx(Note, { onDelete: onDeleteNote }) }), _jsx(Route, { path: "edit", element: _jsx(EditNote, { onSubmit: onUpdateNote, onAddTag: addTag, availableTags: tags }) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }));
}
export default App;
