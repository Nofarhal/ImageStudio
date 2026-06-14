const styles = [
  {
    id: "linkedin",
    title: "💼 LinkedIn Headshot",
    prompt:
      "Transform the uploaded image into a professional LinkedIn headshot. Preserve facial features and identity. Add studio lighting, business attire, clean background, realistic style, high quality corporate portrait photography.",
  },
  {
    id: "cyberpunk",
    title: "🌃 Cyberpunk",
    prompt:
      "Transform the uploaded image into a futuristic cyberpunk style with neon lights, dramatic atmosphere, high detail and cinematic lighting.",
  },
  {
    id: "fantasy",
    title: "🏰 Fantasy",
    prompt:
      "Transform the uploaded image into a fantasy character portrait with magical atmosphere, detailed costume, cinematic lighting.",
  },
  {
    id: "oil",
    title: "🖼 Oil Painting",
    prompt:
      "Transform the uploaded image into a classic oil painting portrait, rich texture, dramatic lighting, elegant composition.",
  },
];

function StyleSelector({ selectedStyle, onSelect }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelect(style)}
          className={`rounded-2xl p-4 text-left border transition ${
            selectedStyle?.id === style.id
              ? "bg-purple-600 border-purple-400"
              : "bg-slate-900 border-white/10 hover:bg-slate-800"
          }`}
        >
          <h3 className="font-bold mb-2">{style.title}</h3>
          <p className="text-sm text-slate-300 line-clamp-3">
            {style.prompt}
          </p>
        </button>
      ))}
    </div>
  );
}

export default StyleSelector;