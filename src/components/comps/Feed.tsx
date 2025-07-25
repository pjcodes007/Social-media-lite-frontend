import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface EXIF {
  camera?: string;
  aperture?: string;
  iso?: string;
  shutterSpeed?: string;
  location?: string;
}

interface Author {
  username: string;
  avatar?: string;
}

interface Photo {
  _id: string;
  image: string;
  caption?: string;
  exif?: EXIF;
  createdAt?: string;
  updatedAt?: string;
  categories?: string[];
  author: Author;
}

const Feed = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<Photo | null>(null);
  const [showEXIF, setShowEXIF] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const res = await axios.get("https://social-media-lite-f238.onrender.com/photos/");
        setPhotos(res.data);
      } catch (err) {
        console.error("Error loading photos:", err);
      }
    };
    loadImage();
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    setShowEXIF(direction === "left");
  };

  return (
    <div className="min-h-screen text-white p-6 pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {photos.map((photo) => (
          <div
            key={photo._id}
            onClick={() => {
              setSelected(photo);
              setShowEXIF(false);
            }}
            className="cursor-pointer bg-gray-200 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="p-3">
              <img
                src={photo.image}
                alt={photo.caption}
                className="rounded-lg border border-gray-800 w-full object-cover aspect-square"
              />
            </div>
            <div className="px-4 pb-4 text-black">
              <h3 className="text-lg font-semibold mb-1">{photo.author?.username}</h3>
              <p className="text-sm text-gray-700 mb-2">{photo.caption}</p>
              {Array.isArray(photo.categories) && photo.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {photo.categories.map((category, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-white text-black border border-white/50"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) handleSwipe("left");
                else if (info.offset.x > 100) handleSwipe("right");
              }}
              className="bg-white text-black w-full max-w-4xl h-[80vh] rounded-xl overflow-hidden flex flex-col shadow-lg"
            >
              {/* Image on top */}
              <div className="flex-shrink-0 h-[60%] bg-black">
                <img
                  src={selected.image}
                  alt={selected.caption}
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              {/* Bottom Info Section */}
              <div className="flex-grow flex w-full overflow-hidden">
                {showEXIF ? (
                  <div className="w-full p-6 text-sm flex flex-col gap-2">
                    <h2 className="text-lg font-semibold mb-2">📷 EXIF Info</h2>
                    {selected.exif?.camera && <p><b>Camera:</b> {selected.exif.camera}</p>}
                    {selected.exif?.aperture && <p><b>Aperture:</b> {selected.exif.aperture}</p>}
                    {selected.exif?.iso && <p><b>ISO:</b> {selected.exif.iso}</p>}
                    {selected.exif?.shutterSpeed && <p><b>Shutter:</b> {selected.exif.shutterSpeed}</p>}
                    {selected.exif?.location && <p><b>Location:</b> {selected.exif.location}</p>}
                    {!selected.exif && <p className="text-gray-500">No EXIF data provided.</p>}
                  </div>
                ) : (
                  <div className="w-full p-6 text-sm flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={selected.author?.avatar || "https://i.pravatar.cc/100"}
                        alt="Author"
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="text-black font-semibold">{selected.author.username}</p>
                    </div>
                    <p className="text-gray-800 mt-3">{selected.caption}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selected.categories?.map((cat, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-gray-100 border"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
