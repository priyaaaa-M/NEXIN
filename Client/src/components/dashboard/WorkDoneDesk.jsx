import React, { useState } from 'react';
import { Send, Mail, Smartphone, Clock, CheckCircle } from 'lucide-react';

const MessageAutomation = () => {
  const [activeTab, setActiveTab] = useState('whatsapp');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [sentMessages, setSentMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      destination: activeTab === 'whatsapp' ? phone : email,
      message,
      isScheduled,
      scheduleTime: isScheduled ? scheduleTime : null,
      type: activeTab
    };

    try {
      const response = await fetch('http://localhost:5000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setSentMessages([...sentMessages, {
          id: Date.now(),
          destination: payload.destination,
          message,
          time: new Date().toLocaleString(),
          status: isScheduled ? 'Scheduled' : 'Sent'
        }]);
        alert(result.message);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-400 p-6 text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Message Automator</h1>
        <p className="text-gray-400">Schedule and send messages automatically via WhatsApp or Email</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-midnight-500 rounded-xl p-6">
          <div className="flex border-b border-midnight-300 mb-6">
            <button
              className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'whatsapp' ? 'text-electric-400 border-b-2 border-electric-400' : 'text-gray-400'}`}
              onClick={() => setActiveTab('whatsapp')}
            >
              <Smartphone className="h-4 w-4" />
              WhatsApp
            </button>
            <button
              className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'email' ? 'text-electric-400 border-b-2 border-electric-400' : 'text-gray-400'}`}
              onClick={() => setActiveTab('email')}
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'whatsapp' ? (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md bg-midnight-300 text-gray-400 border border-r-0 border-midnight-200">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-midnight-300 text-white border border-midnight-200 rounded-r-md px-3 py-2 focus:ring-electric-400 focus:border-electric-400"
                    placeholder="9812345678"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-midnight-300 text-white border border-midnight-200 rounded-md px-3 py-2 focus:ring-electric-400 focus:border-electric-400"
                  placeholder="recipient@example.com"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                className="w-full bg-midnight-300 text-white border border-midnight-200 rounded-md px-3 py-2 focus:ring-electric-400 focus:border-electric-400"
                placeholder="Type your message here..."
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="schedule"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="h-4 w-4 text-electric-400 focus:ring-electric-400 border-midnight-200 rounded"
              />
              <label htmlFor="schedule" className="ml-2 text-sm text-gray-300 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Schedule for later
              </label>
            </div>

            {isScheduled && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Schedule Time</label>
                <input
                  type="datetime-local"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full bg-midnight-300 text-white border border-midnight-200 rounded-md px-3 py-2 focus:ring-electric-400 focus:border-electric-400"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-electric-500 hover:bg-electric-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="h-4 w-4" />
              {isScheduled ? 'Schedule Message' : 'Send Message Now'}
            </button>
          </form>
        </div>

        <div className="bg-midnight-500 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            Sent Messages
          </h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {sentMessages.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No messages sent yet</p>
            ) : (
              sentMessages.map((msg) => (
                <div key={msg.id} className="bg-midnight-400 rounded-lg p-4 border border-midnight-300">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">{msg.destination}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${msg.status === 'Sent' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{msg.message}</p>
                  <p className="text-gray-400 text-xs">{msg.time}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageAutomation;