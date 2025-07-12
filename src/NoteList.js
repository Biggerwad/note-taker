import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Modal, Row, Stack, } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import styles from "./NoteList.module.css";
export function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag, }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [title, setTitle] = useState("");
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return ((title === "" ||
                note.title.toLocaleLowerCase().includes(title.toLowerCase()) &&
                    (selectedTags.length === 0 ||
                        selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))));
        });
    }, [title, selectedTags, notes]);
    return (_jsxs(_Fragment, { children: [_jsxs(Row, { className: "align-items-center mb-4", children: [_jsx(Col, { children: _jsx("h1", { children: "Notes" }) }), _jsx(Col, { xs: "auto", children: _jsxs(Stack, { gap: 2, direction: "horizontal", children: [_jsx(Link, { to: "/new", children: _jsx(Button, { variant: "primary", children: "Create" }) }), _jsx(Button, { onClick: () => setEditTagsModalIsOpen(true), variant: "outline-secondary", children: "Edit Tags" })] }) })] }), _jsx(Form, { children: _jsxs(Row, { className: "mb-4", children: [_jsx(Col, { children: _jsxs(Form.Group, { controlId: "title", children: [_jsx(Form.Label, { children: "Title" }), _jsx(Form.Control, { type: "text", value: title, onChange: e => setTitle(e.target.value) })] }) }), _jsx(Col, { children: _jsxs(Form.Group, { controlId: "tags", children: [_jsx(Form.Label, { children: "Tags" }), _jsx(ReactSelect, { value: selectedTags.map(tag => {
                                            return { label: tag.label, value: tag.id };
                                        }), options: availableTags.map(tag => {
                                            return { label: tag.label, value: tag.id };
                                        }), onChange: tags => {
                                            setSelectedTags(tags.map(tag => {
                                                return { label: tag.label, id: tag.value };
                                            }));
                                        }, isMulti: true })] }) })] }) }), _jsx(Row, { xs: 1, sm: 2, lg: 3, xl: 4, className: "g-3", children: filteredNotes.map(note => (_jsx(Col, { children: _jsx(NoteCard, { id: note.id, title: note.title, tags: note.tags }) }, note.id))) }), _jsx(EditTagsModal, { onUpdateTag: onUpdateTag, onDeleteTag: onDeleteTag, show: editTagsModalIsOpen, handleClose: () => setEditTagsModalIsOpen(false), availableTags: availableTags })] }));
}
function NoteCard({ id, title, tags }) {
    return (_jsx(Card, { as: Link, to: `/${id}`, className: `h-100 text-reset text-decoration-none ${styles.card}`, children: _jsx(Card.Body, { children: _jsxs(Stack, { gap: 2, className: "align-items-center justify-content-center h-100", children: [_jsx("span", { className: "fs-5", children: title }), tags.length > 0 && (_jsx(Stack, { gap: 1, direction: "horizontal", className: "justify-content-center flex-wrap", children: tags.map(tag => (_jsx(Badge, { className: "text-truncate", children: tag.label }, tag.id))) }))] }) }) }));
}
function EditTagsModal({ availableTags, handleClose, show, onDeleteTag, onUpdateTag, }) {
    return (_jsxs(Modal, { show: show, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Edit Tags" }) }), _jsx(Modal.Body, { children: _jsx(Form, { children: _jsx(Stack, { gap: 2, children: availableTags.map(tag => (_jsxs(Row, { children: [_jsx(Col, { children: _jsx(Form.Control, { type: "text", value: tag.label, onChange: e => onUpdateTag(tag.id, e.target.value) }) }), _jsx(Col, { xs: "auto", children: _jsx(Button, { onClick: () => onDeleteTag(tag.id), variant: "outline-danger", children: "\u00D7" }) })] }, tag.id))) }) }) })] }));
}
