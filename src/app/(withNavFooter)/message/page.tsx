'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { AudioOutlined } from '@ant-design/icons';
import { IoIosAttach } from 'react-icons/io';
import { BsEmojiSmile } from 'react-icons/bs';
import { useUser } from '@/context/UserContext';

let socket: Socket;

const MainChatPage = ({ conversationId }: { conversationId: string }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;

    socket = io(process.env.NEXT_PUBLIC_MAIN_API, {
      query: { id: user?.id },
    });

    socket.on('receive_message', msg => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

  useEffect(() => {
    // scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msgData = {
      conversationId,
      text: newMessage,
      sender: user?.id,
    };

    socket.emit('send_message', msgData);
    setNewMessage('');
    setMessages(prev => [...prev, msgData]); // add locally
  };

  return (
    <div className="flex flex-col h-full relative border rounded-lg">
      {/* Messages section */}
      <div className="flex-1 overflow-y-auto px-4 py-2 pb-20">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex mb-2 ${
              m.sender === user?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                m.sender === user?.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="absolute bottom-0 left-0 w-full border-t bg-white px-4 py-2">
        <div className="flex justify-between items-center border rounded-3xl px-4 py-2">
          <div className="flex items-center gap-2 w-[80%]">
            <BsEmojiSmile />
            <input
              type="text"
              placeholder="Type your message here..."
              className="w-full p-2 text-sm border-none outline-none"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
          </div>
          <div className="flex items-center gap-3">
            <AudioOutlined className="text-gray-500 text-lg cursor-pointer" />
            <IoIosAttach />
            <div
              onClick={sendMessage}
              className="bg-primary text-white px-4 py-1.5 rounded-lg"
            >
              Send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChatPage;
