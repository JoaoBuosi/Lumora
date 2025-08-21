import { useState } from "react";

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Olá! Como posso ajudar?" },
    { sender: "user", text: "Quero criar um chat moderno." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar fixa na esquerda */}
      <div className="w-16 bg-gray-900 flex flex-col items-center p-2">
        {/* Botão + */}
        <button className="mb-4 p-2 rounded-full hover:bg-gray-700 transition">
          {/* SVG minimalista */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Container principal */}
      <div className="flex-1 flex flex-col">
        {/* Área do chat centralizada */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center p-4">
          <div className="w-full max-w-2xl flex flex-col space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] break-words ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-700 text-white rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 flex justify-center">
          <div className="flex w-full max-w-2xl">
            <textarea
              className="flex-1 bg-gray-800 text-white p-3 rounded-l-xl resize-none overflow-hidden"
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Digite sua mensagem..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 px-4 rounded-r-xl text-white hover:bg-blue-600 transition"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

