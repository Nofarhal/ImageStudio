import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <nav className="flex justify-between items-center mb-20">
          <h1 className="text-2xl font-bold">ImageStudio 🚀</h1>

          <div className="flex gap-4">
            <Link to="/login" className="text-slate-300 hover:text-white">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl font-semibold"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <section className="text-center">
          <p className="text-purple-400 font-semibold mb-4">
            AI Creative Studio
          </p>

          <h2 className="text-6xl font-bold mb-6">
            Create Professional Headshots with AI
          </h2>

          <p className="text-slate-300 text-xl max-w-3xl mx-auto mb-10">
            Upload your image and transform it into a LinkedIn-ready professional
            portrait or creative AI style.
          </p>

          <Link
            to="/register"
            className="inline-block bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl font-bold text-lg"
          >
            Start Creating
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-3">💼 LinkedIn Headshots</h3>
            <p className="text-slate-300">
              Generate studio-quality professional profile photos.
            </p>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-3">🎨 Creative Styles</h3>
            <p className="text-slate-300">
              Try anime, fantasy, cyberpunk, oil painting and more.
            </p>
          </div>

          <div className="bg-white/10 border border-white/10 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-3">🖼 Personal Gallery</h3>
            <p className="text-slate-300">
              Save your uploads and generated images in one place.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Landing;