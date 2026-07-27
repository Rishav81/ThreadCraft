const BrandVideo = () => {
  return (
    <section className="relative h-[60vh] lg:h-[50vh] overflow-hidden">
      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/Images/video.mp4" type="video/mp4" loading="lazy" />
      </video>
      Overlay
      <div className="absolute inset-0 bg-black/50" />
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 ">
        <p className="uppercase tracking-[0.4em] text-[#C19A6B] text-sm">
          Brand Story
        </p>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
          Crafted For Every Moment
        </h2>

        <p className="mt-5 max-w-2xl text-gray-200">
          Experience timeless fashion where quality meets elegance. Every thread
          is designed to inspire confidence.
        </p>

        <button className="mt-8 rounded-full border border-[#C19A6B] px-8 py-3 text-[#C19A6B] transition hover:bg-[#C19A6B] hover:text-black">
          Explore Collection
        </button>
      </div>
    </section>
  );
};

export default BrandVideo;
