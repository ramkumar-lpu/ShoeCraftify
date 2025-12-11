import { Link } from 'react-router-dom';

const LandingPage = ({ user }) => {
  const shoeDesigns = [
    { id: 1, name: "Urban Runner", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", category: "Sneakers" },
    { id: 2, name: "Classic Leather", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w-400&h=400&fit=crop", category: "Formal" },
    { id: 3, name: "Sport Pro", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop", category: "Sports" },
    { id: 4, name: "Street Style", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop", category: "Casual" },
  ];

  const features = [
    {
      icon: "🎨",
      title: "3D Design Studio",
      description: "Create shoes from scratch with our advanced 3D editor"
    },
    {
      icon: "👟",
      title: "Custom Materials",
      description: "Choose from hundreds of materials, colors, and textures"
    },
    {
      icon: "⚡",
      title: "Real-Time Preview",
      description: "See your designs come to life instantly in 3D"
    },
    {
      icon: "🚚",
      title: "Worldwide Shipping",
      description: "Get your custom shoes delivered anywhere in the world"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dream Shoes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Create custom shoes with our intuitive 3D editor. From design to delivery, we bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={user ? "/designer" : "/login"} 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Start Designing
              </Link>
              <Link 
                to="/designer" 
                className="px-8 py-4 bg-white text-gray-700 text-lg font-medium rounded-xl border-2 border-gray-300 hover:border-blue-500 transition-all"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Designs
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our community's most creative designs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {shoeDesigns.map((shoe) => (
              <div key={shoe.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="h-64 bg-gray-200">
                  <img 
                    src={shoe.image} 
                    alt={shoe.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/400x400/cccccc/666666?text=${encodeURIComponent(shoe.name)}`;
                    }}
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {shoe.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-3">{shoe.name}</h3>
                  <p className="text-gray-600 mt-2">Custom design by our community</p>
                  <button className="mt-4 w-full py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium rounded-lg transition-colors">
                    Customize This Design
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SHOECREATIFY?
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to create perfect custom shoes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your Masterpiece?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of designers creating unique shoes every day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={user ? "/designer" : "/login"} 
                className="px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Start Designing Free
              </Link>
              <Link 
                to="/designer" 
                className="px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-xl hover:bg-white/10 transition-colors"
              >
                Browse Designs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;