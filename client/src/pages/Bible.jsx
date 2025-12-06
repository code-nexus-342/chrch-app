import { useState, useEffect } from 'react';

function Bible() {
  const [book, setBook] = useState('John');
  const [chapter, setChapter] = useState('3');
  const [verses, setVerses] = useState(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-load initial chapter
  useEffect(() => {
    fetchVerses();
  }, []);

  const fetchVerses = async () => {
    if (!book || !chapter) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/${book} ${chapter}`);
      const data = await response.json();
      setVerses(data);
      
      // Load saved notes
      const savedNotes = localStorage.getItem(`bible-notes-${book}-${chapter}`);
      if (savedNotes) {
        setNotes(savedNotes);
      } else {
        setNotes('');
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
      alert('Notes saved successfully!');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">Bible & Notebook</h1>
          <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-md mx-auto">
            Read, reflect, and take notes on your spiritual journey.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Controls & Notes Panel */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 order-2 lg:order-1">
             <div className="bg-indigo-50 rounded-2xl p-6 mb-8 border border-indigo-100">
                <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📖</span> Select Passage
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Book</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" 
                      value={book}
                      onChange={(e) => setBook(e.target.value)}
                      placeholder="e.g., John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chapter</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" 
                      value={chapter}
                      onChange={(e) => setChapter(e.target.value)}
                      placeholder="e.g., 3"
                    />
                  </div>
                </div>
                <button 
                  className={`w-full mt-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-1 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  onClick={fetchVerses} 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span> Loading...
                    </span>
                  ) : 'Read Chapter'}
                </button>
             </div>
             
             <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">✍️</span> Personal Notes
                </h3>
                <textarea 
                  className="w-full h-64 px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none bg-yellow-50/50 text-gray-700 leading-relaxed notebook-lines" 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record your reflections, prayers, and insights here..."
                  style={{
                    backgroundImage: 'linear-gradient(transparent, transparent 29px, #e5e7eb 30px)',
                    backgroundSize: '100% 30px',
                    lineHeight: '30px'
                  }}
                ></textarea>
                <button 
                  className="w-full mt-4 py-3 rounded-xl font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition" 
                  onClick={saveNotes}
                >
                  Save Notes
                </button>
             </div>
          </div>
          
          {/* Scripture Display Panel */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 order-1 lg:order-2 min-h-[600px] relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-indigo-400"></div>
            
            {verses ? (
              <div className="prose prose-lg max-w-none">
                <div className="border-b border-gray-100 pb-6 mb-6">
                   <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{verses.reference}</h2>
                   <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-500"></span>
                     New International Version (Coming soon)
                   </div>
                </div>
                
                <div className="font-serif text-gray-700 leading-loose text-lg">
                   {verses.verses ? (
                     <div>
                       {verses.verses.map((verse) => (
                         <span key={verse.verse} className="inline">
                           <sup className="text-xs font-bold text-indigo-500 mr-1">{verse.verse}</sup>
                           <span className="mr-1 hover:bg-yellow-100 transition-colors rounded px-0.5 cursor-pointer">{verse.text}</span>
                         </span>
                       ))}
                     </div>
                   ) : (
                     <p>{verses.text}</p>
                   )}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 text-center text-gray-400 text-sm italic">
                  "Your word is a lamp for my feet, a light on my path." - Psalm 119:105
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400 text-center">
                <span className="text-6xl mb-4 opacity-30">📚</span>
                <p className="text-xl font-medium">Select a book and chapter to begin reading.</p>
                <p className="text-sm mt-2 opacity-60">Try searching for "John 3" or "Psalm 23"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Bible;
