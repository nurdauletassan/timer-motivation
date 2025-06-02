import { useState, useEffect } from 'react';
import quotesData from '../data/quotes.json';
import './Quote.css';

const Quote = ({ onTryAgain }) => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRandomQuote = () => {
    const quotes = quotesData.quotes;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  useEffect(() => {
    setQuote(getRandomQuote());
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="quote-container loading">Loading quote...</div>;
  }

  if (!quote) {
    return <div className="quote-container error">Failed to load quote</div>;
  }

  return (
    <div className="quote-container">
      <div className="quote-content">
        <p className="quote-text">"{quote.text}"</p>
        <p className="quote-author">— {quote.author}</p>
      </div>
      <button className="try-again-btn" onClick={onTryAgain}>
        Try Again
      </button>
    </div>
  );
};

export default Quote; 