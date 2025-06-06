const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 環境変数を読み込み
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ミドルウェア
app.use(cors());
app.use(express.json());

// Gemini AI インスタンスを初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /api/chat エンドポイント
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log('受信したメッセージ:', message);

        if (!message) {
            return res.status(400).json({ error: 'メッセージが必要です' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Gemini API キーが設定されていません' });
        }

        // Gemini モデルを取得
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

        // メッセージを送信して返答を取得
        console.log('Gemini APIにリクエストを送信中...');
        const result = await model.generateContent(message);
        const response = result.response;
        const text = response.text();
        console.log('Gemini APIから返答を受信:', text.substring(0, 100) + '...');

        res.json({ response: text });

    } catch (error) {
        console.error('Gemini API エラー:', error);
        res.status(500).json({ 
            error: 'Gemini APIでエラーが発生しました',
            details: error.message 
        });
    }
});

// ヘルスチェック用エンドポイント
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'サーバーは正常に動作しています' });
});

// サーバーを起動
app.listen(PORT, () => {
    console.log(`サーバーがポート ${PORT} で起動しました`);
    console.log(`http://localhost:${PORT}`);
});

module.exports = app;
