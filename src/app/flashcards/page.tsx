import { useState } from 'react';
import Link from 'next/link';
import studyMaterials from '../../../studyMaterial.json';

type StudyMaterial = {
  title: string;
  content: string[];
};

const Flashcards = () => {
  const [materials, setMaterials] = useState<{ title: string, content: string[] }[]>(studyMaterials as StudyMaterial[]);
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const nextCard = () => {
    setCurrentCard(prev => (prev + 1) % materials.length);
  };

  const saveNewMaterial = async (newMaterial: { title: string, content: string[] }) => {
    try {
      const response = await fetch('/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMaterial),
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Failed to save flashcard', error);
    }
  };

  const addNewMaterial = () => {
    if (newTitle && newContent) {
      const newMaterial = {
        title: newTitle,
        content: newContent.split('\n')
      };
      setMaterials([...materials, newMaterial]);
      saveNewMaterial(newMaterial);
      setNewTitle('');
      setNewContent('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="flashcards">
      <div className="navigation">
        <Link href="/"><button>Home</button></Link>
        <Link href="/questions"><button>Questions</button></Link>
      </div>
      <div className="stats-and-flashcard">
        {materials.length > 0 && (
          <div className="card">
            <h2>{materials[currentCard]?.title}</h2>
            <ul>
              {materials[currentCard]?.content.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button onClick={nextCard}>Next</button>
          </div>
        )}
        {!showAddForm && (
          <button className="add-toggle-button" onClick={() => setShowAddForm(true)}>Add New Flashcard</button>
        )}
        {showAddForm && (
          <div className="add-form">
            <input
              type="text"
              placeholder="New title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="New content (separate lines with Enter)"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <button onClick={addNewMaterial}>Submit</button>
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcards;
