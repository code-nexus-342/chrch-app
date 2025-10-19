import { useState } from 'react';

function Bible() {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verses, setVerses] = useState(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchVerses = async () => {
    if (!book || !chapter) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/${book}${chapter}`);
      const data = await response.json();
      setVerses(data);
      
      // Load saved notes
      const savedNotes = localStorage.getItem(`bible-notes-${book}-${chapter}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
    } catch (error) {
      console.error('Error fetching verses:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveNotes = () => {
    if (book && chapter) {
      localStorage.setItem(`bible-notes-${book}-${chapter}`, notes);
      alert('Notes saved!');
    }
  };

  return (
    <main className="main">
      <section className="divine-section">
        <div className="container">
          <h1>Bible & Notebook</h1>
          
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Book</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
                  placeholder="e.g., John"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Chapter</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="e.g., 3"
                />
              </div>
              <button className="btn-divine" onClick={fetchVerses} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Verses'}
              </button>
            </div>
            
            <div className="col-md-6">
              {verses && (
                <div>
                  <h3>{verses.reference}</h3>
                  <p>{verses.text}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-12">
              <h4>Your Notes</h4>
              <textarea 
                className="form-control" 
                rows="5"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
              ></textarea>
              <button className="btn-divine mt-3" onClick={saveNotes}>Save Notes</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Bible;
