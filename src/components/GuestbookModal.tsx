import React, { useEffect, useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Star, 
  Send, 
  MapPin, 
  User, 
  Globe, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { api, GuestbookEntry } from '../utils/api';
import { LOCATIONS_DATA } from '../data/locations';
import confetti from 'canvas-confetti';

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLocationId?: number;
}

export const GuestbookModal: React.FC<GuestbookModalProps> = ({
  isOpen,
  onClose,
  defaultLocationId = 1
}) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [locationOrigin, setLocationOrigin] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [selectedPointId, setSelectedPointId] = useState(defaultLocationId);

  const loadEntries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getGuestbook();
      setEntries(data);
    } catch (err) {
      console.error('Failed to load guestbook entries:', err);
      setError('Unable to load visitor entries from Node.js server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadEntries();
      setSelectedPointId(defaultLocationId);
    }
  }, [isOpen, defaultLocationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Please fill in your name and message.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newEntry = await api.postGuestbook({
        name,
        locationOrigin: locationOrigin || 'Highland Trekker',
        rating,
        message,
        locationPointId: selectedPointId,
      });

      setEntries([newEntry, ...entries]);
      setName('');
      setLocationOrigin('');
      setMessage('');
      setShowSuccess(true);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit log entry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 leading-tight">
                Hiker Logbook & Guestbook
              </h3>
              <p className="text-xs text-stone-500">
                Live visitor memories stored via Node.js backend
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadEntries}
              disabled={isLoading}
              title="Refresh logs"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6">
          {/* Submit New Entry Form */}
          <form onSubmit={handleSubmit} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-1.5">
              <span>Sign the Expedition Guestbook</span>
            </h4>

            {showSuccess && (
              <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your trail note has been saved to the Node.js server! Thank you!</span>
              </div>
            )}

            {error && (
              <div className="mb-3 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">Your Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Samara & David"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">Hometown / Country</label>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={locationOrigin}
                    onChange={(e) => setLocationOrigin(e.target.value)}
                    placeholder="e.g. Melbourne, Australia"
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">Favorite Point</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <select
                    value={selectedPointId}
                    onChange={(e) => setSelectedPointId(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {LOCATIONS_DATA.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        #{loc.id} {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">Expedition Rating</label>
                <div className="flex items-center gap-1.5 h-9">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating
                            ? 'text-amber-500 fill-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-stone-600 ml-1">
                    {rating} / 5
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-[11px] font-bold text-stone-600 mb-1">Your Trail Note or Tip</label>
              <textarea
                required
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your impression of the trail, river crossing, or viewpoints..."
                className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Saving Note...' : 'Post to Guestbook'}</span>
              </button>
            </div>
          </form>

          {/* Existing Entries List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Recent Visitor Logs ({entries.length})
            </h4>

            {entries.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
                No visitor logs yet. Be the first to leave a message!
              </div>
            ) : (
              <div className="space-y-3">
                {entries.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-stone-200/90 rounded-2xl shadow-xs hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-stone-900">{item.name}</span>
                          <span className="text-[11px] text-stone-500 font-normal">from {item.locationOrigin}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span className="text-[11px] font-semibold text-emerald-800">
                            #{item.locationPointId} {item.locationName}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < item.rating
                                ? 'text-amber-500 fill-amber-400'
                                : 'text-stone-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      "{item.message}"
                    </p>

                    <div className="mt-2 text-[10px] text-stone-400 text-right">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
