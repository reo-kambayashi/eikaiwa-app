import React, { useState } from 'react';
import './Textbox.css';

function Textbox(){
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setIsLoading(true);
        setError('');
        setResponse('');

        try {
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'サーバーエラーが発生しました');
            }

            const data = await response.json();
            setResponse(data.response);
        } catch (err) {
            console.error('API呼び出しエラー:', err);
            setError(err.message || 'エラーが発生しました。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="textbox-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="textbox"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="質問を入力してください"
                    disabled={isLoading}
                />
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading || !text.trim()}
                >
                    {isLoading ? '送信中...' : '送信'}
                </button>
            </form>
            
            {error && (
                <div className="error-message">
                    エラー: {error}
                </div>
            )}
            
            {response && (
                <div className="response-container">
                    <h3>Geminiの返答:</h3>
                    <div className="response-text">
                        {response}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Textbox;