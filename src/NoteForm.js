import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";
export function NoteForm({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [], }) {
    const titleRef = useRef(null);
    const markdownRef = useRef(null);
    const [selectedTags, setSelectedTags] = useState(tags);
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            title: titleRef.current.value,
            markdown: markdownRef.current.value,
            tags: selectedTags,
        });
        navigate("..");
    }
    return (_jsx(Form, { onSubmit: handleSubmit, children: _jsxs(Stack, { children: [_jsxs(Row, { children: [_jsx(Col, { children: _jsxs(Form.Group, { controlId: "title", children: [_jsx(Form.Label, { children: "Title" }), _jsx(Form.Control, { ref: titleRef, required: true, defaultValue: title })] }) }), _jsx(Col, { children: _jsxs(Form.Group, { controlId: "tags", children: [_jsx(Form.Label, { children: "Tags" }), _jsx(CreatableReactSelect, { onCreateOption: label => {
                                            const newTag = { id: uuidv4(), label };
                                            onAddTag(newTag);
                                            setSelectedTags(prev => [...prev, newTag]);
                                        }, value: selectedTags.map(tag => {
                                            return { label: tag.label, value: tag.id };
                                        }), options: availableTags.map(tag => {
                                            return { label: tag.label, value: tag.id };
                                        }), onChange: tags => {
                                            setSelectedTags(
                                            // :)
                                            tags.map(tag => {
                                                return { label: tag.label, id: tag.value };
                                            }));
                                        }, isMulti: true })] }) })] }), _jsxs(Form.Group, { controlId: "markdown", children: [_jsx(Form.Label, { children: "Body" }), _jsx(Form.Control, { defaultValue: markdown, required: true, as: "textarea", ref: markdownRef, rows: 15 })] }), _jsxs(Stack, { direction: "horizontal", gap: 2, className: "justify-content-end", children: [_jsx(Button, { type: "submit", variant: "primary", children: "Save" }), _jsx(Link, { to: "..", children: _jsx(Button, { type: "button", variant: "outline-secondary", children: "Cancel" }) })] })] }) }));
}
