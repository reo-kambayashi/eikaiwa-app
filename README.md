# Eikaiwa App - Gemini AI チャットアプリ

このアプリは、Textboxの入力に対してGemini AIからの返答を返すシンプルなチャットアプリケーションです。

## 構成

- **フロントエンド**: React (ポート 3002)
- **バックエンド**: Node.js + Express (ポート 3001)
- **AI**: Google Gemini API

## セットアップ手順

### 1. リポジトリをクローン

```bash
git clone <repository-url>
cd eikaiwa-app
```

### 2. バックエンドのセットアップ

```bash
cd backend
npm install
```

`.env` ファイルを作成して、Gemini API キーを設定：

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3001
```

### 3. フロントエンドのセットアップ

```bash
cd ../frontend
npm install
```

## 起動方法

### バックエンドサーバーを起動

```bash
cd backend
npm run dev
```

### フロントエンドを起動

```bash
cd frontend
PORT=3002 npm start
```

## 使用方法

1. ブラウザで `http://localhost:3002` を開く
2. テキストボックスに質問を入力
3. 「送信」ボタンをクリック
4. Gemini AIからの返答が表示される

## API エンドポイント

### POST /api/chat

質問を送信してGemini AIから返答を取得

**リクエスト:**
```json
{
  "message": "こんにちは"
}
```

**レスポンス:**
```json
{
  "response": "こんにちは！何かお手伝いできることはありますか？"
}
```

## 注意事項

- Gemini API キーが必要です
- バックエンドとフロントエンドの両方を起動する必要があります
- CORS設定により、フロントエンドからバックエンドへのAPIコールが可能になっています

## トラブルシューティング

### API エラーが発生する場合

1. Gemini API キーが正しく設定されているか確認
2. バックエンドサーバーが起動しているか確認（ポート 3001）
3. フロントエンドがバックエンドに正しく接続できているか確認

### ポート競合の場合

- フロントエンド: `PORT=3002 npm start`
- バックエンド: `.env` ファイルで `PORT=3001` を設定
