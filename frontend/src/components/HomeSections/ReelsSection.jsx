import React, { useState, useEffect, useRef } from "react";

const ReelsSection = () => {
  const [reelsList, setReelsList] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // Sensor deteksi layar
  const sectionRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // 1. Deteksi apakah section ini sudah muncul di layar pengguna
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Muat Instagram hanya jika sudah di scroll sampai sini
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchReels = () => {
      fetch(`${API_URL}/reels`)
        .then((res) => res.json())
        .then((data) => {
          setReelsList(data.slice(0, 3));
        })
        .catch((err) => console.error("Gagal mengambil data reels:", err));
    };
    fetchReels();
  }, [API_URL]);

  return (
    <section
      ref={sectionRef}
      id="rs-ums-update"
      className="w-full py-16 bg-gray-50 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-600 flex items-center gap-2 mb-2">
            RS UMS Update
          </h2>
          <p className="text-base text-gray-600">
            Lebih dekat dengan Rumah Sakit UMS A.R. Fachrudin, saksikan juga
            reels berikut!
          </p>
        </div>

        <div className="w-full flex flex-wrap justify-center gap-6">
          {reelsList.length > 0 ? (
            reelsList.map((reel, index) => (
              // Ganti bagian ini di ReelsSection.jsx
              <div className="w-[300px] h-[533px] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
                {isVisible ? (
                  <iframe
                    src={reel.link}
                    className="w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency="true"
                    title={`Instagram Reel ${index + 1}`}
                  ></iframe>
                ) : (
                  // Tambahkan style tinggi yang sama agar layout tidak bergeser
                  <div className="w-[300px] h-[533px] flex items-center justify-center bg-gray-100 animate-pulse text-gray-400">
                    Memuat Reels...
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 py-10">
              Belum ada tayangan Reels terbaru.
            </p>
          )}
        </div>
      </div>
      <a
        href="https://www.instagram.com/rsumsarfachrudin/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 block w-fit mx-auto text-sm bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold shadow-md"
      >
        Kunjungi Instagram
      </a>
    </section>
  );
};

export default ReelsSection;
