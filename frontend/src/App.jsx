import React, { useState } from 'react';
import axios from 'axios';
import Textbox from './components/Textbox';

function App() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const url = "http://127.0.0.1:8000";

    const sendMessage = async () => {
        if (!message.trim()) return;
        
        setLoading(true);
        try {
            const res = await axios.post(`${url}/chat`, {
                message: message
            });
            setResponse(res.data.response);
        } catch (error) {
            setResponse('エラーが発生しました');
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>英会話練習アプリ</h1>
            <div>
                <Textbox 
                    placeholder="メッセージを入力してください"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? '送信中...' : '送信'}
                </button>
            </div>
            {response && (
                <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
                    <h3>Geminiの返答:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}

export default App;
