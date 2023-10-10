import './App.css';
import { useCallback, useEffect, useState } from 'react';

const styles = [
    'orange-peel',
    'notepaper',
    'gradient',
    'cursive-bubble',
    'typewriter'
];

function App() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [count, setCount] = useState(1);
    const [style, setStyle] = useState("");

    const getQuote = useCallback(async () => {
        const settings = {
            method: 'GET',
            headers: { 'x-api-key': 'pkfMES5tg+if6Etza7JmVA==5IoTAx0r60T2ycdi' }
        }
        const res = await fetch("https://api.api-ninjas.com/v1/quotes", settings);
        const data = await res.json();

        setQuote(data[0].quote);
        setAuthor(data[0].author);

        const random = Math.floor(Math.random() * styles.length);
        setStyle(styles[random]);
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
        console.log('i fire once');
    }, [getQuote]);

    return (
        <div className={style}>
            <div className="main">
                <span className="left">❝</span>
                <QuoteMessage quote={quote} />
                {/* <div className="quote">Etiam dictum finibus ligula, quis vulputate elit sodales porttitor. In fringilla laoreet faucibus. Fusce in diam ut magna eleifend iaculis in posuere eros.</div> */}
                <span className="right">❞</span>
                <QuoteAuthor author={author} />
                {/* <div className="author">John Smith</div> */}
            </div>
            <div className="btn-group">
                <button className="btn-reload" onClick={getQuoteAndCount}>&#x21bb; Get new quote!</button>
                <button className="btn-save">&#x1F4BE; Save</button>
            </div>
            <QuoteCount count={count} />
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
