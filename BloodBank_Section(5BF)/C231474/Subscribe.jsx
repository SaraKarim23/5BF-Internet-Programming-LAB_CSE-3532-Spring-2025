

const Subscribe = () => {
 
    return (
        <div  className="hero h-[200px]" style={{backgroundImage: 'url(https://i.ibb.co/BjSRJV5/cool-background-1.png)'}} >
  <div className="hero-overlay "></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
        <p className="text-3xl font-semibold mb-3 text-white">Subscribe!!!</p>
      
      <form className="flex justify-center gap-3">
          <div className="">
     
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-800  to-cyan-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-800 text-xl  px-4 py-2 rounded-md "
            >
              Subscribe
            </button>
          </div>
        </form>
     
    </div>
  </div>
</div>
    );
};

export default Subscribe;