import React, { useState } from 'react';
import './Textbox.css';

function Textbox(){
    const [text, setText] = useState('');

    return (
        <input
            type="text"
            className='textbox'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="テキストを入力してください"
        />
    );
}

export default Textbox;