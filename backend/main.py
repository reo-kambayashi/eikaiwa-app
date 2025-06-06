from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gemini import gemini_client
from pydantic import BaseModel

app = FastAPI()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# リクエストモデル


class ChatRequest(BaseModel):
    message: str

# レスポンスモデル


class ChatResponse(BaseModel):
    response: str


@app.get("/")
async def root():
    return {"Hello": "World"}


@app.post("/chat")
async def chat(request: ChatRequest):
    """
    ユーザーのメッセージを受け取り、Geminiの返答を返す
    """
    try:
        gemini_response = gemini_client.chat_response(request.message)
        return ChatResponse(response=gemini_response)
    except Exception as e:
        import logging
        logging.error("An error occurred in the chat endpoint", exc_info=True)
        return ChatResponse(response="エラーが発生しました。後でもう一度お試しください。")


@app.get("/test-gemini")
async def test_gemini():
    """
    Gemini APIのテスト用エンドポイント
    """
    test_response = gemini_client.generate_response("Hello, how are you?")
    return {"gemini_response": test_response}
