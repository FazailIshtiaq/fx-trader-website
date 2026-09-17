import heroImage from "../assets/hero-photo.png"; // 👈 your uploaded image goes here

export default function Hero() {
  return (
    <section
      id="home"
      className="relative left-1/2 -translate-x-1/2 w-screen px-8 pt-16 pb-10 aspect-[16/9] min-h-[420px] max-h-[750px] flex items-start overflow-hidden"
    >
      {/* Full-bleed background image */}
      <img
        src={heroImage}
        alt="Trader background"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Dark gradient so the left-side text stays readable over the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/80 to-transparent" />

      {/* Text content sits above the image/gradient */}
      <div className="relative z-10 max-w-xl">
        <p className="text-accent uppercase tracking-wide text-sm mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-accent rounded-full" />
          Forex Trader & Educator
        </p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Master the Markets.
          <br />
          <span className="text-accent">Trade With Confidence.</span>
        </h1>
        <p className="text-gray-300 mt-4">
          I share my trading knowledge, market insights and strategies to help
          traders develop better skills and discipline.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Forex Trader &nbsp;|&nbsp; Market Analyst &nbsp;|&nbsp; Trading Educator
        </p>
        <div className="flex gap-4 mt-6">
          <a href="#courses" className="bg-accent text-black px-6 py-3 rounded-full font-semibold">
            View Courses →
          </a>
          <a href="#contact" className="border border-accent px-6 py-3 rounded-full font-semibold">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}