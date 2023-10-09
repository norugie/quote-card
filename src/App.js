import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';

function App() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [count, setCount] = useState(1);

    const getQuote = useCallback ( async () => {
        const settings = {
            method: 'GET',
            headers: { 'x-api-key': 'pkfMES5tg+if6Etza7JmVA==5IoTAx0r60T2ycdi' }
        }
        const res = await fetch("https://api.api-ninjas.com/v1/quotes", settings);
        const data = await res.json();

        setQuote(data[0].quote);
        setAuthor(data[0].author);
    }, []);

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
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <QuoteMessage quote={quote} />
                <QuoteAuthor author={author} />
                <button className="App-button" onClick={getQuoteAndCount }>Get quote!</button>
                <QuoteCount count={count} />
            </header>
        </div>
    );
}

function QuoteMessage({quote}) {
    return <p>{quote}</p>;
}

function QuoteAuthor({author}) {
    return <p>{author}</p>
}

function QuoteCount({count}) {
    return (
        <p>You have read <strong>{count}</strong> piece(s) of quote.</p>
    );
}

export default App;
