const Promotion = () => {
  return (
    <section className="relative h-[45vh] overflow-hidden my-2">
      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/Images/Promotion.mp4" type="video/mp4" loading="lazy" />
      </video>

      {/* Content */}
    </section>
  );
};

export default Promotion;
