
import { Link } from 'react-router-dom';

const LandingPage = ({ user }) => {
  const shoeDesigns = [
    { 
      id: 1, 
      name: "Urban Runner", 
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", 
      category: "Sneakers",
      designer: "@streetstylist",
      likes: 142
    },
    { 
      id: 2, 
      name: "Classic Leather", 
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop", 
      category: "Formal",
      designer: "@elegance_by_emma",
      likes: 89
    },
    { 
      id: 3, 
      name: "Sport Pro", 
      image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop", 
      category: "Sports",
      designer: "@athlete_designs",
      likes: 203
    },
    { 
      id: 4, 
      name: "Street Style", 
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop", 
      category: "Casual",
      designer: "@urban_vibes",
      likes: 156
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero - More personal opening */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Tired of wearing the same shoes as everyone else?
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We get it. You want footwear that's as unique as you are. That's why we built ShoeCreatify—a place where your imagination is the only limit.
            </p>
            <p className="text-xl text-gray-900 mb-8 font-medium">
              Design. Visualize. Wear your story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={user ? "/designer" : "/signup"} 
                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Start Creating - It's Free
              </Link>
              <Link 
                to="/gallery" 
                className="px-8 py-3.5 bg-white text-gray-800 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-gray-50 transition-all duration-300"
              >
                See What Others Made
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              No design experience needed. Seriously.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Designs - More authentic feel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Fresh from the Community
            </h2>
            <p className="text-gray-600">
              Real designs by real people. Get inspired or remix these creations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shoeDesigns.map((shoe) => (
              <div key={shoe.id} className="group bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  <img 
                    src={shoe.image} 
                    alt={shoe.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      {shoe.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{shoe.name}</h3>
                    <div className="flex items-center text-gray-500">
                      <span className="text-sm">❤️ {shoe.likes}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    By {shoe.designer}
                  </p>
                  <Link 
                    to="/designer"
                    className="block w-full py-2.5 text-center bg-gray-50 hover:bg-blue-50 text-gray-800 hover:text-blue-700 font-medium text-sm rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-300"
                  >
                    Make it yours →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/gallery" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              See more community designs 
              <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - More conversational */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              How does this actually work?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              It's simpler than you think. Here's what you can do:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Pick a base design",
                description: "Start from scratch or choose from our templates. Don't worry—you can change everything later.",
                emoji: "📝"
              },
              {
                step: "2",
                title: "Make it yours",
                description: "Choose materials, colors, and patterns. Add personal touches that matter to you.",
                emoji: "🎨"
              },
              {
                step: "3",
                title: "See it in 3D",
                description: "Rotate, zoom, and check out every angle. Make sure it's exactly what you imagined.",
                emoji: "👀"
              },
              {
                step: "4",
                title: "Order & share",
                description: "Get them delivered or show off your creation in our community gallery.",
                emoji: "📦"
              }
            ].map((feature) => (
              <div key={feature.step} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {feature.step}
                  </div>
                  <div className="text-2xl">{feature.emoji}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial - Real human voice */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-6">"</div>
            <p className="text-xl text-gray-800 italic mb-6 leading-relaxed">
              I designed my wedding shoes on ShoeCreatify. Everyone asked where I got them—the look on their faces when I said 'I made them myself' was priceless.
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Jamie L.</p>
                <p className="text-sm text-gray-600">First-time designer from Portland</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - More encouraging */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What will you create today?
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Join 12,843 people who've already designed their perfect pair.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={user ? "/designer" : "/signup"} 
                className="px-8 py-4 bg-white text-blue-700 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              >
                Yeah, I'm ready to design
              </Link>
              <Link 
                to="/gallery" 
                className="px-8 py-4 bg-transparent border-2 border-white/70 text-white text-lg font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Show me examples first
              </Link>
            </div>
            <p className="text-sm text-white/80 mt-8">
              P.S. Your first design is free to create. No credit card needed to start.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ snippet */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Quick questions, quick answers
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "How much does it cost?",
                a: "Designing is always free. You only pay when you decide to order your custom shoes."
              },
              {
                q: "How long does shipping take?",
                a: "Typically 2-3 weeks for custom orders. We'll keep you updated every step of the way."
              },
              {
                q: "Can I save and edit later?",
                a: "Absolutely! Save unlimited designs and come back anytime to make changes."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-5 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;