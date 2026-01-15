const Hero = () => {
  return (
    <section className="hero-noise relative overflow-hidden">
      {/* Glow accents */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center text-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Full-Stack E-Commerce Platform
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10">
          A modern full-stack application built with React, Tailwind CSS, and a
          RESTful backend. Features authentication, product management,
          filtering, and a responsive shopping experience.
        </p>

        <a
          href="https://github.com/kattyalice/fakestore-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-slate-900 font-medium hover:bg-slate-100 transition"
        >
          View Source on GitHub
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 0C5.37 0 0 5.37 0 12c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55v-2.17c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.72-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.19a11.1 11.1 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.78.11 3.07.74.81 1.19 1.85 1.19 3.11 0 4.43-2.7 5.4-5.27 5.69.41.35.77 1.04.77 2.1v3.11c0 .3.21.65.79.55C20.71 21.42 24 17.1 24 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
