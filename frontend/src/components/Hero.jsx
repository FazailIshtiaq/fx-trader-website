import heroImage from "../assets/hero-photo.png"; // 👈 your uploaded image goes here

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden px-4 pb-10 pt-16 sm:px-8 lg:px-10 min-h-[480px] sm:min-h-[560px] lg:min-h-[700px]"
    >
      <img
        src={heroImage}
        alt="Trader background"
        className="absolute inset-0 h-full w-full scale-105 object-cover object-center sm:scale-100 sm:object-[center_15%] md:object-[center_20%] lg:object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/75 to-black/35" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-xl">
          <p className="mb-3 flex items-center gap-2 text-sm uppercase tracking-wide text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Forex Trader & Educator
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Master the Markets.
            <br />
            <span className="text-accent">Trade With Confidence.</span>
          </h1>

          <p className="mt-4 max-w-lg text-gray-300">
            I share my trading knowledge, market insights and strategies to help
            traders develop better skills and discipline.
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Forex Trader &nbsp;|&nbsp; Market Analyst &nbsp;|&nbsp; Trading Educator
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <a href="#courses" className="rounded-full bg-accent px-6 py-3 text-center font-semibold text-black">
              View Courses →
            </a>
            <a href="#contact" className="rounded-full border border-accent px-6 py-3 text-center font-semibold text-white">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}