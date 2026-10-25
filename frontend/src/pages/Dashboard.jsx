import { useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['All', 'General', 'Work', 'Study', 'Personal', 'Ideas'];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', category: 'General', isPinned: false });

  const fetchNotes = async () => {
    try {
      const { data } = await API.get('/notes', {
        params: { search, category, page, limit: 6 }
      });
      setNotes(data.notes);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to fetch notes:', err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search, category, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/notes/${editingId}`, formData);
      } else {
        await API.post('/notes', formData);
      }
      setFormData({ title: '', content: '', category: 'General', isPinned: false });
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving note');
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category,
      isPinned: note.isPinned
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">NoteFlow</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Hi, {user?.name}</span>
          <button onClick={logout} className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Create / Edit Note Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit space-y-4">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Note' : 'Create New Note'}</h2>
          <input
            type="text"
            placeholder="Note Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border p-2.5 rounded-lg"
          />
          <textarea
            rows="4"
            placeholder="Write your note..."
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full border p-2.5 rounded-lg"
          />
          <div className="flex justify-between items-center gap-2">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border p-2 rounded-lg text-sm flex-1"
            >
              {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="flex items-center gap-1.5 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
              />
              Pin Note
            </label>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700">
              {editingId ? 'Update Note' : 'Add Note'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setFormData({ title: '', content: '', category: 'General', isPinned: false }); }}
                className="bg-slate-200 px-4 rounded-lg text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Right Column: Search, Filter, Notes Grid & Pagination */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <input
              type="text"
              placeholder="Search notes by title or content..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="flex-1 border px-3 py-2 rounded-lg text-sm"
            />
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="border px-3 py-2 rounded-lg text-sm"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <div key={note._id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                      {note.category}
                    </span>
                    {note.isPinned && <span className="text-xs font-bold text-amber-600">📌 Pinned</span>}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{note.title}</h3>
                  <p className="text-slate-600 text-sm whitespace-pre-line">{note.content}</p>
                </div>
                <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-slate-100 text-sm">
                  <button onClick={() => handleEdit(note)} className="text-indigo-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(note._id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 pt-4">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-1.5 bg-white border rounded-lg disabled:opacity-50 text-sm"
            >
              Previous
            </button>
            <span className="text-sm font-medium">Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-1.5 bg-white border rounded-lg disabled:opacity-50 text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}