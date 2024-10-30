import React, { useState } from 'react';

const CommunicationHub = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock data for chats
  const chats = [
    {
      id: 1,
      name: 'Development Team',
      platform: 'Slack',
      lastMessage: 'New features deployed',
      time: '2:30 PM',
      unread: 3,
    },
    {
      id: 2,
      name: 'Client Meeting',
      platform: 'Teams',
      lastMessage: 'Meeting scheduled for tomorrow',
      time: '11:20 AM',
      unread: 1,
    },
    {
      id: 3,
      name: 'Project Group',
      platform: 'WhatsApp',
      lastMessage: 'I\'ve uploaded the files',
      time: '10:45 AM',
      unread: 0,
    },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      content: newMessage,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Chats</h2>
        </div>
        <div className="overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                activeChat === chat.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{chat.name}</h3>
                  <p className="text-sm text-gray-600">{chat.platform}</p>
                  <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{chat.time}</p>
                  {chat.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1 inline-block">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <h2 className="text-xl font-semibold">
                {chats.find((c) => c.id === activeChat)?.name}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${
                    message.sender === 'You' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.sender === 'You'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-l focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationHub;
