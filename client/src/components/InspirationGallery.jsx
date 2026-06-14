const examples = [
  {
    title: "💼 Professional Headshot",
    description: "LinkedIn-ready professional portraits.",
    image: "https://replicate.delivery/xezq/6uiePnzRYGUPQ66Z6zKSdHA03uM1B2rDcZderUPUfGrdqe6aB/tmpcy4kjwgi.png",
  },
  {
    title: "🌃 Cyberpunk",
    description: "Futuristic neon style.",
    image: "PASTE_URL_2",
  },
  {
    title: "🏰 Fantasy",
    description: "Magical cinematic portraits.",
    image: "https://replicate.delivery/xezq/v8WYOC74cp5jLlIh6WFrEDfKWOk6SthcYz3SXUzFAXeYXvuWA/tmpcd6z89ke.png",
  },
  {
    title: "🖼 Oil Painting",
    description: "Classic artistic look.",
    image: "https://replicate.delivery/xezq/9HIavxZgR4rjIB5l6kbaC8fVRyOLLbu7IpIuEaYwUdtxpXXLA/tmpg8a3opot.png",
  },
];

function InspirationGallery() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">
        ✨ Inspiration Gallery
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {examples.map((example) => (
          <div
            key={example.title}
            className="bg-white/10 border border-white/10 rounded-3xl overflow-hidden hover:scale-105 transition duration-300"
          >
            <img
              src={example.image}
              alt={example.title}
              className="h-72 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="font-bold mb-2">
                {example.title}
              </h3>

              <p className="text-slate-300 text-sm">
                {example.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InspirationGallery;