import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import ReactMarkdown from "react-markdown";
export function Note({ onDelete }) {
    const note = useNote();
    const navigate = useNavigate();
    return (_jsxs(_Fragment, { children: [_jsxs(Row, { className: "align-items-center mb-4", children: [_jsxs(Col, { children: [_jsx("h1", { children: note.title }), note.tags.length > 0 && (_jsx(Stack, { gap: 1, direction: "horizontal", className: "", children: note.tags.map(tag => (_jsx(Badge, { className: "text-truncate", children: tag.label }, tag.id))) }))] }), _jsx(Col, { xs: 'auto', children: _jsxs(Stack, { gap: 2, direction: "horizontal", children: [_jsx(Link, { to: `/${note.id}/edit`, children: _jsx(Button, { variant: "primary", children: "Edit" }) }), _jsx(Button, { onClick: () => {
                                        onDelete(note.id);
                                        navigate("/");
                                    }, variant: "outline-danger", children: "Delete" }), _jsx(Link, { to: "/", children: _jsx(Button, { variant: "outline-secondary", children: "Back" }) })] }) })] }), _jsx(ReactMarkdown, { children: note.markdown })] }));
}
