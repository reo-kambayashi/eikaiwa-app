import os

import google.generativeai as genai
from dotenv import load_dotenv

# 環境変数を読み込み
load_dotenv()


class GeminiClient:
    def __init__(self):
        # APIキーを設定
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        # モデルを初期化
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def generate_response(self, prompt: str) -> str:
        """
        Gemini APIにプロンプトを送信してレスポンスを取得
        """
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"エラーが発生しました: {str(e)}"

    def chat_response(self, message: str) -> str:
        prompt = f"""
        あなたは英会話の練習相手です。以下のメッセージに対して、
        自然で親しみやすい英語で返答してください。
        
        ユーザーのメッセージ: {message}aa
        """

        return self.generate_response(prompt)


# インスタンスを作成
gemini_client = GeminiClient()
