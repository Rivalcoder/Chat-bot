"use client";
import '../../styles/style.css';
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const cleanMessage = (content) => {
    // Replace asterisks and other unwanted formatting
    return content.replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
                  .replace(/\*(.*?)\*/g, '$1')   // Remove italics
                  .replace(/\n/g, '<br />');      // Convert new lines to <br />
  };

  return (
    <div className='diq'>
      <h1 className='ing'>Chat-Bot</h1>

      <div className='textcontent'>
        {/* Check if messages array is empty */}
        {messages.length === 0 ? (
          <div className="no-messages">No messages yet. Start chatting!</div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`messages ${m.role === "user" ? "user-message" : "ai-message"}`}>
              <div className="message-heading">{m.role === "user" ? "User :" : "AI :"}</div>
              <div dangerouslySetInnerHTML={{ __html: cleanMessage(m.content) }} />
              <br />
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="box"
          value={input}
          placeholder="Ask Question Here......"
          onChange={handleInputChange}
        />
        <button type='submit' className='sub'>Submit</button>
      </form>
    </div>
  );
}
