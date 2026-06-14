import { useRef, useState } from "react";
import api from "../api";

function UploadImage({ onUploadSuccess }) {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      await api.post("/images/upload", formData);

      setFile(null);
      setPreview("");
      onUploadSuccess();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 border border-white/10 rounded-3xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Upload Image</h2>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleChooseFile}
        className="bg-slate-800 hover:bg-slate-700 border border-white/10 px-6 py-3 rounded-xl font-semibold mb-4"
      >
        Choose Image
      </button>

      {file && (
        <p className="text-sm text-slate-300 mb-4">
          Selected: {file.name}
        </p>
      )}

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-64 rounded-2xl mb-4 border border-white/10"
        />
      )}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || loading}
        className="block bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-3 rounded-xl font-semibold"
      >
        {loading ? "Uploading..." : "Upload to Gallery"}
      </button>
    </div>
  );
}

export default UploadImage;