import './App.css';
import html2canvas from 'html2canvas';
import { useCallback, useEffect, useState } from 'react';

const styles = [
    'orange-peel',
    'notepaper',
    'gradient',
    'cursive-bubble',
    'typewriter'
];

function App() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [count, setCount] = useState(1);
    const [style, setStyle] = useState('');

    const getQuote = useCallback(async () => {
        const settings = {
            method: 'GET',
            headers: { 
                'x-api-key': 'z4n698PUhFuRwC2rG5vHchpEa4yxzS8wBPYv5k2R',
                'content-type': 'application/json'
            }
        }
        const res = await fetch("https://api.api-ninjas.com/v1/quotes", settings);
        const data = await res.json();

        setQuote(data[0].quote);
        setAuthor(data[0].author);

        const random = Math.floor(Math.random() * styles.length);
        setStyle(styles[random]);
    }, []);

    const getQuoteImage = async () => {
        const element = document.getElementById('main'),
        canvas = await html2canvas(element),
        data = canvas.toDataURL('image/png'),
        link = document.createElement('a');
     
        link.href = data;
        link.download = 'downloaded-image.png';
     
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function getCount() {
        setCount((c) => c + 1);
    }

    function getQuoteAndCount() {
        getQuote();
        getCount();
    }

    useEffect(function() {
        getQuote();
    }, [getQuote]);

    return (
        <div className={style}>
            <QuoteCard quote={quote} author={author} />
            <div className="btn-group">
                <button className="btn-reload" onClick={getQuoteAndCount}>&#x21bb; Get new quote!</button>
                <button className="btn-save" onClick={getQuoteImage}>&#x1F4BE; Save</button>
            </div>
            <QuoteCount count={count} />
        </div>
    );
}

function QuoteCard({quote, author}) {
    return (
        <div id="main" className="main">
            <span className="left">❝</span>
            <QuoteMessage quote={quote} />
            <span className="right">❞</span>
            <QuoteAuthor author={author} />
        </div>
    );
}

function QuoteMessage({quote}) {
    return <div className="quote">{quote}</div>;
}

function QuoteAuthor({author}) {
    return <div className="author">{author}</div>;
}

function QuoteCount({count}) {
    return <p style={{paddingTop: '20px', textAlign: 'center'}}>You have read <strong>{count}</strong> piece(s) of quotes.</p>;
}

export default App;
