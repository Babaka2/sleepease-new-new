import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Heart, Share2, MoreVertical } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import PhoneFrame from './PhoneFrame';
import { Language, translations } from '../translations';

interface GratitudeNote {
  id: string;
  text: string;
  author: string;
  likes: number;
  color: string;
}

interface GratitudeWallProps {
  navigate: (screen: any) => void;
  currentLanguage: Language;
  mode: 'general' | 'islamic';
}

export default function GratitudeWall({ navigate, currentLanguage, mode }: GratitudeWallProps) {
  const t = translations[currentLanguage][mode === 'general' ? 'generalHome' : 'islamicHome'];
  const [notes, setNotes] = useState<GratitudeNote[]>([
    { id: '1', text: "Grateful for the peace I felt during Fajr today.", author: "Ahmad", likes: 12, color: "bg-emerald-500/20" },
    { id: '2', text: "Thankful for a good night's sleep after weeks of insomnia.", author: "Sarah", likes: 8, color: "bg-blue-500/20" },
    { id: '3', text: "Blessed to have a supportive family.", author: "User123", likes: 15, color: "bg-purple-500/20" },
    { id: '4', text: "The meditation tracks really helped me relax tonight.", author: "John", likes: 5, color: "bg-amber-500/20" },
  ]);

  const bgColor = mode === 'general' ? 'from-slate-700 via-slate-800 to-blue-900' : 'from-emerald-950 via-slate-950 to-emerald-900';

  return (
    <PhoneFrame>
      <div className={`absolute inset-0 bg-gradient-to-b ${bgColor}`} />
      
      <div className="relative w-full h-full flex flex-col p-6 pt-14 pb-28">
        <div className="flex items-center gap-3 mb-6">
          <button 
            className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center"
            onClick={() => navigate(mode === 'general' ? 'general-home' : 'islamic-home')}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white text-xl font-medium">{t.gratitudeWall}</h1>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2 }}>
            <Masonry gutter="12px">
              {notes.map((note) => (
                <div key={note.id} className={`${note.color} backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-3 transition-all hover:scale-[1.02]`}>
                  <p className="text-white/90 text-sm leading-relaxed italic">"{note.text}"</p>
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <span className="text-white/40 text-[10px] font-medium">{note.author}</span>
                    <div className="flex items-center gap-2">
                       <button className="flex items-center gap-1 text-white/50 hover:text-red-400 transition-colors">
                         <Heart className="w-3.5 h-3.5" />
                         <span className="text-[10px]">{note.likes}</span>
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>

        <button className="absolute bottom-32 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg shadow-blue-500/40 flex items-center justify-center active:scale-95 transition-all">
          <Plus className="w-7 h-7 text-white" />
        </button>
      </div>
    </PhoneFrame>
  );
}
