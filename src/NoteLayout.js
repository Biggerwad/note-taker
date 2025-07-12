import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
export function NoteLayout({ notes }) {
    const { id } = useParams();
    const note = notes.find(n => n.id === id);
    if (note == null)
        return _jsx(Navigate, { to: "/", replace: true });
    return _jsx(Outlet, { context: note });
}
export function useNote() {
    return useOutletContext();
}
