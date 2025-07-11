import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:3000/notes';

const SecureNotes = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  // Fetch notes from backend
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(() => toast.error('Failed to load notes'));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveNote = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Please fill in both fields');
      return;
    }

    const newNote = {
      ...form,
      id: uuidv4(),
      date: new Date().toLocaleString()
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
      });

      const result = await res.json();
      if (result.success) {
        setNotes([newNote, ...notes]);
        setForm({ title: '', content: '' });
        toast.success('Note saved successfully!');
      } else {
        toast.error('Failed to save note');
      }
    } catch {
      toast.error('Error saving note');
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm('Delete this note?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) {
        setNotes(notes.filter(note => note.id !== id));
        toast.info('Note deleted');
      } else {
        toast.error('Failed to delete note');
      }
    } catch {
      toast.error('Error deleting note');
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">📝 Secure Notes</h2>

      {/* Note Form */}
      <div className="mb-6">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Note Title"
          className="w-full border p-2 mb-2 rounded"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Note Content"
          className="w-full border p-2 mb-2 rounded h-32"
        ></textarea>
        <button
          onClick={saveNote}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save Note
        </button>
      </div>

      {/* Notes List */}
      <div className="grid md:grid-cols-2 gap-4">
        {notes.length === 0 && <p className="text-gray-600">No secure notes found.</p>}
        {notes.map(note => (
          <div key={note.id} className="border rounded p-4 bg-yellow-50 shadow-sm relative">
            <h3 className="font-semibold text-lg">{note.title}</h3>
            <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{note.content}</p>
            <p className="text-xs text-gray-500 mt-2">Saved: {note.date}</p>
            <button
              className="absolute top-2 right-2 text-red-600"
              onClick={() => deleteNote(note.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecureNotes;



// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SecureNotes = () => {
//   const [notes, setNotes] = useState([]);
//   const [form, setForm] = useState({ title: '', content: '' });

//   // Fetch from backend later, currently from localStorage
//   useEffect(() => {
//     const storedNotes = localStorage.getItem('secureNotes');
//     if (storedNotes) {
//       setNotes(JSON.parse(storedNotes));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('secureNotes', JSON.stringify(notes));
//   }, [notes]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const saveNote = () => {
//     if (form.title.trim() && form.content.trim()) {
//       const newNote = { ...form, id: uuidv4(), date: new Date().toLocaleString() };
//       setNotes([newNote, ...notes]);
//       setForm({ title: '', content: '' });
//       toast.success('Note saved successfully!');
//     } else {
//       toast.error('Please fill in both fields');
//     }
//   };

//   const deleteNote = (id) => {
//     if (confirm('Delete this note?')) {
//       const updatedNotes = notes.filter(note => note.id !== id);
//       setNotes(updatedNotes);
//       toast.info('Note deleted');
//     }
//   };

//   return (
//     <div className="p-6">
//       <ToastContainer />
//       <h2 className="text-2xl font-bold mb-4">📝 Secure Notes</h2>

//       {/* Note Form */}
//       <div className="mb-6">
//         <input
//           type="text"
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholder="Note Title"
//           className="w-full border p-2 mb-2 rounded"
//         />
//         <textarea
//           name="content"
//           value={form.content}
//           onChange={handleChange}
//           placeholder="Note Content"
//           className="w-full border p-2 mb-2 rounded h-32"
//         ></textarea>
//         <button
//           onClick={saveNote}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Save Note
//         </button>
//       </div>

//       {/* Notes List */}
//       <div className="grid md:grid-cols-2 gap-4">
//         {notes.length === 0 && <p className="text-gray-600">No secure notes found.</p>}
//         {notes.map(note => (
//           <div key={note.id} className="border rounded p-4 bg-yellow-50 shadow-sm relative">
//             <h3 className="font-semibold text-lg">{note.title}</h3>
//             <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{note.content}</p>
//             <p className="text-xs text-gray-500 mt-2">Saved: {note.date}</p>
//             <button
//               className="absolute top-2 right-2 text-red-600"
//               onClick={() => deleteNote(note.id)}
//             >
//               🗑️
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SecureNotes;
