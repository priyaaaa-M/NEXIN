import React, { useState, useEffect } from 'react';
import { Twitter, MessageSquare, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const testimonials = [
  {
    id: 1,
    platform: 'twitter',
    content: "Priyaa Forge helped me rebuild my daily routine from scratch. It's like having a personal productivity coach in my pocket.",
    author: "Riya Verma",
    handle: "@FocusWithRiya",
    time: "1h ago",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    platform: 'discord',
    content: "I've tried dozens of tools, but nothing feels as smooth and motivating as Priyaa Forge. It's built for students who actually want to get things done.",
    author: "LogicBro",
    handle: "#2002",
    time: "Yesterday",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    platform: 'linkedin',
    content: "My students finally found a system they enjoy using. Priyaa Forge encourages consistency without pressure—something rare in academic tools.",
    author: "Dr. Anusha Verma",
    handle: "LinkedIn",
    time: "4 days ago",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    id: 4,
    platform: 'twitter',
    content: "The focus timer and journal combo helped me beat procrastination. It's become part of my daily mindset now.",
    author: "CodeZenDev",
    handle: "@CodeZenDev",
    time: "3 days ago",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  },
];

const platformStyles = {
  twitter: 'border-blue-400/30 bg-blue-400/10 hover:bg-blue-400/20',
  discord: 'border-indigo-400/30 bg-indigo-400/10 hover:bg-indigo-400/20',
  linkedin: 'border-blue-600/30 bg-blue-600/10 hover:bg-blue-600/20',
};

const platformIcons = {
  twitter: <Twitter className="w-4 h-4" />,
  discord: <MessageSquare className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setDirection('right');
        setActiveIndex(prev => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getPosition = (index) => {
    const distance = (index - activeIndex + testimonials.length) % testimonials.length;

    if (distance === 0) return 'center';
    if (distance === 1) return direction === 'right' ? 'right' : 'left';
    if (distance === testimonials.length - 1) return direction === 'right' ? 'left' : 'right';
    return 'hidden';
  };

  return (
    <div className="overflow-hidden #BA29FF-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-sunny-400 to-electric-400 bg-clip-text text-transparent">
              Real Student Feedback
            </span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
            What our users say about Priyaa Forge
          </p>
        </div>

        <div
          className="relative h-[320px] w-full perspective-1000"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {testimonials.map((testimonial, index) => {
            const position = getPosition(index);

            return (
              <div
                key={testimonial.id}
                className={clsx(
                  'absolute inset-0 transition-all duration-500 ease-in-out transform',
                  position === 'center' && 'z-10 translate-x-0 scale-100 opacity-100',
                  position === 'right' && 'z-0 translate-x-1/3 scale-90 opacity-70',
                  position === 'left' && 'z-0 -translate-x-1/3 scale-90 opacity-70',
                  position === 'hidden' && 'opacity-0 scale-75'
                )}
              >
                <div className={clsx(
                  'h-full w-full max-w-md mx-auto p-5 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 flex flex-col',
                  platformStyles[testimonial.platform]
                )}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                      />
                      <div className="absolute -bottom-1 -right-1 p-1 bg-midnight-400 rounded-full">
                        <div className="p-1 rounded-full bg-white">
                          {platformIcons[testimonial.platform]}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{testimonial.author}</h3>
                      <p className="text-gray-300 text-xs">
                        {testimonial.handle} • {testimonial.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p className="text-gray-200 text-sm md:text-base italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={prevTestimonial}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-midnight-400/80 hover:bg-midnight-500 transition-all shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-midnight-400/80 hover:bg-midnight-500 transition-all shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 'right' : 'left');
                  setActiveIndex(index);
                }}
                className={clsx(
                  'w-2 h-2 rounded-full transition-all',
                  index === activeIndex ? 'bg-electric-400 w-4' : 'bg-gray-400/50'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;