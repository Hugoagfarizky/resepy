"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Star, Plus, Check, MessageSquareHeart, X, UserCheck } from "lucide-react";

interface CooksnapItem {
  id: string;
  userName: string;
  userCity: string;
  userAvatar?: string;
  imageUrl: string;
  comment: string;
  rating: number;
  date: string;
}

const INITIAL_COOKSNAPS: Record<string, CooksnapItem[]> = {
  "rendang-daging-sapi-otentik": [
    {
      id: "cs_1",
      userName: "Nadia Saraswati",
      userCity: "Bandung",
      imageUrl:
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      comment:
        "Rendangnya beneran legit dan medok banget! Tips dari saya: waktu masuk fase kalio kecilkan api sekecil mungkin biar minyaknya terbit sempurna.",
      rating: 5,
      date: "2 hari yang lalu",
    },
    {
      id: "cs_2",
      userName: "Budi Santoso",
      userCity: "Surabaya",
      imageUrl:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
      comment:
        "Saya bikin versi 2 porsi pakai scaler porsi di web ini, takarannya pas banget tanpa ribet ngitung manual. Keluarga suka!",
      rating: 5,
      date: "1 minggu yang lalu",
    },
  ],
  "japanese-chicken-katsu-curry": [
    {
      id: "cs_3",
      userName: "Kevin Wijaya",
      userCity: "Jakarta",
      imageUrl:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
      comment:
        "Katsunya beneran renyah garing! Kari Jepangnya kental dan rasa rempahnya pas di lidah.",
      rating: 5,
      date: "3 hari yang lalu",
    },
  ],
};

interface CooksnapsSectionProps {
  recipeSlug: string;
  recipeTitle: string;
}

export function CooksnapsSection({ recipeSlug, recipeTitle }: CooksnapsSectionProps) {
  const [cooksnaps, setCooksnaps] = useState<CooksnapItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  );
  const [submitted, setSubmitted] = useState(false);

  const storageKey = `luminaire_cooksnaps_${recipeSlug}`;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setCooksnaps(JSON.parse(stored));
      } else {
        const defaultItems = INITIAL_COOKSNAPS[recipeSlug] || [];
        setCooksnaps(defaultItems);
      }
    } catch {
      setCooksnaps(INITIAL_COOKSNAPS[recipeSlug] || []);
    }
  }, [recipeSlug, storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newItem: CooksnapItem = {
      id: `cs_${Date.now()}`,
      userName: name.trim(),
      userCity: city.trim() || "Indonesia",
      imageUrl: imageUrl.trim(),
      comment: comment.trim(),
      rating,
      date: "Baru saja",
    };

    const updated = [newItem, ...cooksnaps];
    setCooksnaps(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setName("");
      setCity("");
      setComment("");
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center font-bold">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-neutral-900">
              Cooksnaps Komunitas ({cooksnaps.length})
            </h3>
            <p className="text-xs text-neutral-600 font-medium">
              Foto dan ulasan dari para pengguna yang sudah mempraktekkan resep ini.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow-xs transition-colors self-start sm:self-auto"
        >
          <Camera className="w-4 h-4" />
          <span>+ Unggah Hasil Masakan Saya</span>
        </button>
      </div>

      {/* Grid of Cooksnaps */}
      {cooksnaps.length === 0 ? (
        <div className="text-center py-10 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
          <Camera className="w-8 h-8 text-neutral-400 mx-auto" />
          <p className="text-sm font-bold text-neutral-800">Belum ada Cooksnap untuk resep ini</p>
          <p className="text-xs text-neutral-500">
            Jadilah orang pertama yang membagikan foto hasil masakan Anda!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cooksnaps.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* User Info & Rating */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-sm text-neutral-900 block">
                      {item.userName}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {item.userCity} • {item.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                </div>

                {/* Photo Snap */}
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300">
                  <Image
                    src={item.imageUrl}
                    alt={`Hasil masak oleh ${item.userName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>

                {/* Comment */}
                <p className="text-xs text-neutral-700 leading-relaxed font-normal italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Terverifikasi Mencoba Resep</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Upload Cooksnap */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-neutral-200 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-orange-600" />
                <h4 className="text-base font-black text-neutral-900">
                  Bagikan Cooksnap Masakan Anda
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h5 className="font-extrabold text-base text-neutral-900">
                  Cooksnap Berhasil Diunggah!
                </h5>
                <p className="text-xs text-neutral-500">
                  Terima kasih telah berbagi inspirasi dengan komunitas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Nama Anda *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Rina Melati"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-semibold text-neutral-900 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Kota / Domisili</label>
                  <input
                    type="text"
                    placeholder="Contoh: Yogyakarta"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-semibold text-neutral-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    URL Foto Hasil Masakan *
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-mono text-neutral-900 bg-white text-[11px]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">Rating Kepuasan</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? "fill-amber-400 text-amber-500"
                              : "text-neutral-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 mb-1">
                    Ulasan & Tips Anda *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan rasanya, apakah ada bumbu yang Anda modifikasi?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-medium text-neutral-900 bg-white"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl border border-neutral-300 font-bold text-neutral-700 hover:bg-neutral-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-white shadow-xs"
                  >
                    Kirim Cooksnap
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
