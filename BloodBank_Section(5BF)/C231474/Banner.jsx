const Banner = () => {
  return (
    <div
      className="hero md:h-[300px] h-[280px] lg:h-[400px]"
      style={{ backgroundImage: "url(https://i.ibb.co/fNS4cBJ/banner.jpg)" }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 md:text-4xl text-3xl lg:text-5xl font-bold text-white">
            Be a Lifesaver:{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-cyan-600 to-cyan-200 text-transparent bg-clip-text">
              {" "}
              Donate Blood Today!
            </span>
          </h1>
          <p className="mb-5 md:text-lg text-sm text-gray-300">
            Save Lives Today: Donate Blood! Join Us in the Lifesaving Mission.
            Every Drop Counts. Be a Hero, Donate Blood Now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
