const Partners = () => {
  return (
    <section className="w-full bg-black/50 backdrop-blur-sm py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-gray-300 text-center mb-16 text-2xl font-semibold">Unsere Partner</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 items-center justify-items-center max-w-6xl mx-auto">
          {/* Echtes Logo */}
          <div className="group relative">
            <img 
              src="/lovable-uploads/411e0ec7-a024-4752-ad5e-f20b65973d93.png" 
              alt="Partner logo" 
              className="w-full max-w-[240px] opacity-70 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          </div>

          {/* Platzhalter Logos mit modernem Gradient-Design */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="group relative w-full max-w-[240px] h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-lg opacity-30 group-hover:opacity-50 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Partner {index + 1}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;