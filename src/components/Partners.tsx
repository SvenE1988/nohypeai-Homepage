const Partners = () => {
  return (
    <section className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-gray-400 text-center mb-8 text-lg">Unsere Partner</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          <img src="/lovable-uploads/411e0ec7-a024-4752-ad5e-f20b65973d93.png" alt="Partner logos" className="w-full max-w-[150px] opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </section>
  );
};

export default Partners;