import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
import { v4 as uuidv4 } from "uuid"
import { NewNote } from './NewNote'
import { NoteList } from './NoteList'
import { NoteLayout } from './NoteLayout'
import { Note } from './Note'
import { EditNote } from './EditNote'

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type Tag = {
  id: string
  label: string
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  // when user creates a new note, do this
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  // Delete
  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  // when user Updates
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  // Add a tag
  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  // update Tag
  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  // Delete Tag
  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => { tag.id !== id })
    })
  }

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />

        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />

        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags} />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Container>
  )
}

export default App
