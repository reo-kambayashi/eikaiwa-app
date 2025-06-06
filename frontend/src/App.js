import './App.css';
import Textbox from './components/Textbox/Textbox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gemini AI チャットアプリ</h1>
        <p>質問を入力してGeminiと対話してみましょう</p>
      </header>
      <main>
        <Textbox />
      </main>
    </div>
  );
}

export default App;
