type NotesProps = {
  note: Note
  toggleImportance: () => void
}

const Note = ({ note , toggleImportance }: NotesProps) => {
  const label = (note as Note).important
    ? 'make not important' : 'make important'

  return (
    <>
      <li>{note.content}</li>
      <button onClick={toggleImportance}>{label}</button>
    </>
  )
}

export default Note