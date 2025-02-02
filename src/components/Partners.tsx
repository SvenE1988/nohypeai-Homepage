const Partners = () => {
  return (
    <section className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-gray-400 text-center mb-12 text-xl">Unsere Partner</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 items-center justify-items-center max-w-6xl mx-auto">
          <img 
            src="/lovable-uploads/411e0ec7-a024-4752-ad5e-f20b65973d93.png" 
            alt="Partner logo" 
            className="w-full max-w-[200px] opacity-70 hover:opacity-100 transition-opacity filter grayscale hover:grayscale-0" 
          />
          {/* Placeholder für weitere Partner-Logos */}
          <div className="w-full max-w-[200px] h-20 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg opacity-30" />
          <div className="w-full max-w-[200px] h-20 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg opacity-30" />
          <div className="w-full max-w-[200px] h-20 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg opacity-30" />
        </div>
      </div>
    </section>
  );
};

export default Partners;