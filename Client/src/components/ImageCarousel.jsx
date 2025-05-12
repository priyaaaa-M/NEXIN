import React, { useState, useEffect } from 'react';
import { Twitter, MessageSquare, Linkedin } from 'lucide-react';

const ImageCarousel = () => {
  const [activeFeedback, setActiveFeedback] = useState(0);

  const feedbacks = [
    {
      id: 1,
      platform: 'twitter',
      content: "The V3 launch of TUF+ is a game-changer for engineering students. The new project tracking features have streamlined my workflow significantly!",
      author: "@CodeWithArjun",
      time: "2h ago",
      icon: <Twitter className="h-5 w-5 text-blue-400" />
    },
    {
      id: 2,
      platform: 'discord',
      content: "Been using TUF+ since the beta and the V3 update is phenomenal. The new visualization tools help me understand my progress in ways I couldn't before. Highly recommend to all my fellow CS students!",
      author: "DevGuru#1234",
      time: "Yesterday",
      icon: <MessageSquare className="h-5 w-5 text-indigo-400" />
    },
    {
      id: 3,
      platform: 'linkedin',
      content: "As an engineering educator, I've been recommending TUF+ to my students. The V3 release with its enhanced analytics and journal integration is exactly what they need to stay organized and motivated throughout their academic journey.",
      author: "Dr. Priya Sharma",
      time: "1 week ago",
      icon: <Linkedin className="h-5 w-5 text-blue-600" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeedback(prev => (prev + 1) % feedbacks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 bg-midnight-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2 text-white">
          What users have to say about the V3 launch of TUF+
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Hear from students and educators about their experience with our platform.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Feedback Cards */}
        <div className="overflow-hidden h-[300px]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeFeedback * 100}%)` }}
          >
            {feedbacks.map((feedback, index) => (
              <div
                key={feedback.id}
                className={`min-w-full p-8 rounded-2xl ${feedback.platform === 'twitter' ? 'bg-blue-400/10 border border-blue-400/30' :
                  feedback.platform === 'discord' ? 'bg-indigo-400/10 border border-indigo-400/30' :
                    'bg-blue-600/10 border border-blue-600/30'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${feedback.platform === 'twitter' ? 'bg-blue-400/20' :
                    feedback.platform === 'discord' ? 'bg-indigo-400/20' : 'bg-blue-600/20'}`}>
                    {feedback.icon}
                  </div>
                  <div>
                    <p className="text-white text-lg mb-4">{feedback.content}</p>
                    <div className="flex justify-between text-gray-300">
                      <span className="font-medium">{feedback.author}</span>
                      <span>{feedback.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveFeedback(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === activeFeedback ? 'bg-electric-400 w-6' : 'bg-gray-400/50'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;