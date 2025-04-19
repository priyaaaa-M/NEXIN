import React from 'react';

const testimonials = [
  {
    id: 1,
    quote: "Priyaa Forge has completely transformed how I manage my engineering projects. The UI is intuitive and the features are exactly what I needed.",
    name: "Sophia Chen",
    title: "Computer Science Student",
    avatar: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: 2,
    quote: "As an engineering student juggling multiple projects, this app has been a lifesaver. The project tracker and goal manager keep me on track.",
    name: "Marcus Johnson",
    title: "Mechanical Engineering Student",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: 3,
    quote: "The Work Done Desk feature helps me visualize my progress and stay motivated. This is exactly what I needed for my final year projects.",
    name: "Priya Patel",
    title: "Electrical Engineering Student",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
  },
];

const Testimonials = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-midnight-400/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-sunny-400 to-electric-400 bg-clip-text text-transparent">
            What Students Say
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Join thousands of engineering students who are transforming their academic journey with Priyaa Forge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-midnight-300/80 backdrop-blur-md rounded-xl p-6 border border-midnight-100 transition-all duration-300 hover:shadow-glow-purple"
          >
            <div className="mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sunny-400">★</span>
              ))}
            </div>
            <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="font-medium text-white">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;