import { useState, useEffect, FormEvent } from 'react'
import { createNote, getAll, updateNote } from './services/notes'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    getAll().then(response => setNotes(response))
  }, [])

  const addNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newNoteObject = {
      content: newNote,
      id: notes.length + 1,
      important: Math.random() > 0.5
    }
    createNote(newNoteObject).then(response => {
      const newNotes = [...notes, response.data]
      setNotes(newNotes)
      setNewNote('')
    })
  }

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewNote(event.target.value)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = (id: number) => {
    let note = notes.find(note => note.id === Number(id))
    if (note) {
      note = {
        ...note,
        important: !note?.important,
      }
      updateNote(id, note)
        .then(response => {
          const updatedNotes = notes.map(note => {
            if (note.id === Number(id)){
              return response.data
            }
            return note
          })
          setNotes(updatedNotes)
        })
    }
  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note?.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App