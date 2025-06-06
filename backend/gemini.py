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
        会話が続くように話題の定期も積極的に行なってください。
        また返答の日本語訳もしてください。
        返答のフォーマットにある出力以外は出力しないでください。
        
        ユーザーのメッセージ: {message}
        
        # 返答のフォーマット
        English: [英語の返答]
        日本語: [日本語訳]
        """

        return self.generate_response(prompt)


# インスタンスを作成
gemini_client = GeminiClient()
