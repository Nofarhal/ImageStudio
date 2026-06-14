import { useEffect, useState } from "react";
import api from "../api";
import UploadImage from "../components/UploadImage";
import StyleSelector from "../components/StyleSelector";
import Navbar from "../components/Navbar";
import InspirationGallery from "../components/InspirationGallery";

function Dashboard() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [generating, setGenerating] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchImages = async () => {
    try {
      const res = await api.get("/images/my-images");
      setImages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleGenerate = async () => {
    if (!selectedImage || !selectedStyle) return;

    setGenerating(true);

    try {
      await api.post(`/images/${selectedImage._id}/transform`, {
        style: selectedStyle.id,
        prompt: selectedStyle.prompt,
      });

      await fetchImages();
      setSelectedImage(null);
      setSelectedStyle(null);

      alert("Image transformed successfully!");
    } catch (error) {
      console.error(error);
      alert("Transform failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (imageId) => {
    const confirmDelete = window.confirm("Delete this image?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/images/${imageId}`);
      await fetchImages();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
            <Navbar />
            <section className="mb-12">
            <div className="bg-gradient-to-r from-pink-700 to-indigo-700 rounded-3xl p-10">

                <p className="text-yellow-200 font-semibold mb-3">
                Welcome {user?.name}
                </p>

                <h1 className="text-6xl font-bold mb-6">
                Create Professional AI Headshots
                </h1>

                <p className="text-xl text-purple-100 max-w-3xl">
                Upload your photo and transform it into a LinkedIn-ready professional portrait
                or stunning creative styles using AI.
                </p>

            </div>
            </section>
            <InspirationGallery />

        <UploadImage onUploadSuccess={fetchImages} />

        <section className="bg-white/10 border border-white/10 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-6">Your Gallery</h2>

          {images.length === 0 ? (
            <p className="text-slate-300">
              No images yet. Upload your first image.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div
                  key={image._id}
                  className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden"
                >
                  <img
                    src={image.originalImageUrl}
                    alt="Uploaded"
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-5">
                    <p className="text-sm text-slate-400 mb-3">
                      Status: {image.status}
                    </p>

                    {image.style && (
                      <p className="text-sm text-purple-300 mb-3">
                        Style: {image.style}
                      </p>
                    )}

                    {image.generatedImageUrl && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold mb-3">
                          Before / After
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                            <p className="text-xs text-slate-400 mb-1">
                              Original
                            </p>
                            <img
                              src={image.originalImageUrl}
                              alt="Original"
                              className="w-full h-32 object-cover rounded-2xl border border-white/10"
                            />
                          </div>

                          <div>
                            <p className="text-xs text-purple-300 mb-1">
                              Generated
                            </p>
                            <img
                              src={image.generatedImageUrl}
                              alt="Generated"
                              className="w-full h-32 object-cover rounded-2xl border border-purple-500/30"
                            />
                          </div>
                        </div>

                        <a
                          href={image.generatedImageUrl}
                          target="_blank"
                          rel="noreferrer"
                          download
                          className="block text-center w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold mb-4"
                        >
                          Download Generated Image
                        </a>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setSelectedImage(image);
                        setSelectedStyle(null);
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold"
                    >
                      {image.status === "completed"
                        ? "Transform Again"
                        : "Transform with AI"}
                    </button>

                    <button
                      onClick={() => handleDelete(image._id)}
                      className="w-full mt-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"
                    >
                      Delete Image
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {selectedImage && (
          <section className="mt-8 bg-white/10 border border-white/10 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-4">Transform Image</h2>

            <img
              src={selectedImage.originalImageUrl}
              alt="Selected"
              className="w-72 rounded-2xl mb-6 border border-white/10"
            />

            <h3 className="text-xl font-bold mb-4">Choose AI Style</h3>

            <StyleSelector
              selectedStyle={selectedStyle}
              onSelect={setSelectedStyle}
            />

            {selectedStyle && (
              <div className="mt-6 bg-slate-900 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold mb-2">Prompt Preview</h3>

                <p className="text-slate-300 text-sm mb-4">
                  {selectedStyle.prompt}
                </p>

                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-3 rounded-xl font-semibold"
                >
                  {generating
                    ? "Creating your AI image..."
                    : `Generate ${selectedStyle.title}`}
                </button>

                {generating && (
                  <p className="text-purple-300 mt-4 animate-pulse">
                    ✨ Creating your professional AI portrait. This may take a few
                    seconds...
                  </p>
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;