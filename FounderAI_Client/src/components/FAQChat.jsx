import React, { useState, useRef, useEffect } from "react";

const faqResponses = {
  "hello": "Hi there! 👋 How can I help you with UAE Free Zone setup today?",
  "local sponsor": "Free zone companies allow 100% foreign ownership. No local sponsor is required.",
  "visa time": "Visa processing usually takes 7–14 working days depending on the free zone.",
  "operate outside uae": "Yes, free zone companies can operate internationally.",
  "minimum capital": "Most UAE free zones do not require paid-up capital upfront, but it depends on the activity.",
  "office required": "Most free zones offer flexi-desk options instead of mandatory physical office space."
};

const faqSuggestions = Object.keys(faqResponses);

export default function FAQChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Generate dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning! ☀️ Ready to set up your UAE company?";
    else if (hour < 18) return "Good afternoon! 🏙 How can I help with your free zone setup?";
    else return "Good evening! 🌙 Let’s get your company started!";
  };

  // Show greeting when chat opens
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ sender: "bot", text: getGreeting() }]);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (customInput) => {
    const question = customInput || input;
    if (!question.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: question }]);

    let response = "Sorry, I don't have that information yet. 😅";
    const lowerInput = question.toLowerCase();
    for (let key in faqResponses) {
      if (lowerInput.includes(key)) {
        response = faqResponses[key];
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: response }]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Floating Bot Button */}
      <div
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl text-white shadow-2xl cursor-pointer animate-bounce"
        onClick={() => setOpen(!open)}
      >
        🤖
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 rounded-3xl shadow-2xl overflow-hidden border bg-white flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl animate-pulse">
              🤖
            </div>
            <div>
              <h3 className="font-semibold text-sm">FounderAI Assistant</h3>
              <p className="text-xs opacity-80">Your UAE Free Zone Guide</p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="h-64 overflow-y-auto p-4 bg-gray-50 space-y-2 flex-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 p-3 bg-gray-100 border-t">
            {faqSuggestions.map((q) => (
              <span
                key={q}
                className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs cursor-pointer hover:bg-blue-600 hover:text-white hover:scale-105 transition transform"
                onClick={() => handleSend(q)}
              >
                {q}
              </span>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t bg-white">
            <input
              type="text"
              placeholder="Type your question..."
              className="flex-1 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-2xl"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={() => handleSend()}
              className="bg-blue-600 text-white px-6 rounded-r-2xl hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}