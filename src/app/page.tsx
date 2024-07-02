'use client';
import { useState } from 'react';
import Link from 'next/link';
import './globals.css';

const Home = () => {
  const [currentView, setCurrentView] = useState('flashcards');

  return (
    <div className="app">
      <div className="navigation">
        <Link href="/flashcards"><button>Flashcards</button></Link>
        <Link href="/questions"><button>Questions</button></Link>
      </div>
    </div>
  );
};

export default Home;
