// ============================================================
// SERENE — Daily Journaling App
// Full React JS Application
// Architecture: Context API + Hooks + Component-Based
// ============================================================
 
import { useState, useEffect, useRef, useCallback, createContext, useContext, useMemo } from "react";
 
// ============================================================
// CONSTANTS & DATA
// ============================================================
const QUOTES = [
  { text: "The present moment is the only moment available to us, and it is the door to all moments.", author: "Thich Nhat Hanh" },
  { text: "In the journal I do not just express myself more openly than I could to any person; I create myself.", author: "Susan Sontag" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "Vulnerability is the birthplace of innovation, creativity and change.", author: "Brené Brown" },
  { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Sharon Salzberg" },
  { text: "Writing is the painting of the voice.", author: "Voltaire" },
  { text: "Fill your paper with the breathings of your heart.", author: "William Wordsworth" },
];
 
const PROMPTS = [
  { emoji: "🌅", text: "What made you smile today, even briefly?" },
  { emoji: "🔮", text: "If your future self could send a message, what would it say?" },
  { emoji: "🌊", text: "What emotion are you avoiding right now, and why?" },
  { emoji: "🌿", text: "Describe three things you're grateful for in vivid detail." },
  { emoji: "💭", text: "What belief is holding you back from what you want?" },
  { emoji: "🌙", text: "How did today differ from your expectations?" },
  { emoji: "🦋", text: "What small change could create the biggest positive impact?" },
  { emoji: "🎯", text: "What would you do if you knew you couldn't fail?" },
  { emoji: "🌱", text: "What are you currently learning about yourself?" },
  { emoji: "💫", text: "Describe your ideal day in vivid detail." },
  { emoji: "🔥", text: "What are you most passionate about right now?" },
  { emoji: "🌺", text: "Write a letter of forgiveness — to someone or yourself." },
];
 
const MOODS = [
  { emoji: "😊", label: "Happy", color: "#F7D070" },
  { emoji: "😌", label: "Calm", color: "#B8D4C8" },
  { emoji: "😔", label: "Sad", color: "#BDD8F0" },
  { emoji: "😤", label: "Anxious", color: "#F2C0C0" },
  { emoji: "🤩", label: "Excited", color: "#F7B8E8" },
  { emoji: "😴", label: "Tired", color: "#D4C8E8" },
];
 
const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
 
// ============================================================
// UTILITY FUNCTIONS
// ============================================================
const utils = {
  id: () => `e_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
  today: () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  },
  fmtDate: (d) => {
    const dt = new Date(d);
    return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
  },
  wordCount: (text) => text ? text.trim().split(/\s+/).filter(Boolean).length : 0,
  readTime: (text) => Math.max(1, Math.ceil(utils.wordCount(text) / 200)),
  timeAgo: (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff/60000), h = Math.floor(diff/3600000), d = Math.floor(diff/86400000);
    if (d > 7) return new Date(dateStr).toLocaleDateString('en-US',{month:'short',day:'numeric'});
    if (d > 1) return `${d} days ago`;
    if (d === 1) return 'Yesterday';
    if (h > 0) return `${h}h ago`;
    if (m > 0) return `${m}m ago`;
    return 'Just now';
  },
  calcStreak: (entries) => {
    const dates = [...new Set(entries.map(e => e.date.split('T')[0]))].sort().reverse();
    if (!dates.length) return 0;
    let streak = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const s = utils.fmtDate(d);
      if (dates.includes(s)) streak++;
      else if (i > 0) break;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  },
  greet: () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  },
  formatClock: () => {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = String(now.getMinutes()).padStart(2,'0');
    const ampm = now.getHours() < 12 ? 'AM' : 'PM';
    return `${h}:${m} ${ampm}`;
  },
  formatDate: () => {
    const now = new Date();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return `${days[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  },
};
 
// ============================================================
// CONTEXTS
// ============================================================
 
// — Auth Context —
const AuthContext = createContext(null);
function useAuth() { return useContext(AuthContext); }
 
function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { const s = localStorage.getItem('serene_user'); return s ? JSON.parse(s) : null; } catch { return null; }
  });
 
  const login = useCallback((email, password, remember) => {
    const users = JSON.parse(localStorage.getItem('serene_users') || '[]');
    let found = users.find(u => u.email === email && u.pass === password);
    if (!found) {
      found = { id: utils.id(), name: email.split('@')[0], email, pass: password };
      localStorage.setItem('serene_users', JSON.stringify([...users, found]));
    }
    if (remember) localStorage.setItem('serene_user', JSON.stringify(found));
    setUser(found);
    return found;
  }, []);
 
  const signup = useCallback((name, email, password) => {
    const users = JSON.parse(localStorage.getItem('serene_users') || '[]');
    const newUser = { id: utils.id(), name, email, pass: password };
    localStorage.setItem('serene_users', JSON.stringify([...users, newUser]));
    localStorage.setItem('serene_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }, []);
 
  const logout = useCallback(() => {
    localStorage.removeItem('serene_user');
    setUser(null);
  }, []);
 
  const updateUser = useCallback((updates) => {
    const updated = { ...user, ...updates };
    localStorage.setItem('serene_user', JSON.stringify(updated));
    const users = JSON.parse(localStorage.getItem('serene_users') || '[]');
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx > -1) { users[idx] = updated; localStorage.setItem('serene_users', JSON.stringify(users)); }
    setUser(updated);
  }, [user]);
 
  return <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>{children}</AuthContext.Provider>;
}
 
// — Journal Context —
const JournalContext = createContext(null);
function useJournal() { return useContext(JournalContext); }
 
function JournalProvider({ children }) {
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem('serene_entries') || '[]'); } catch { return []; }
  });
  const [todayMood, setTodayMood] = useState(null);
  const [moodIntensity, setMoodIntensity] = useState(5);
 
  const persist = useCallback((newEntries) => {
    localStorage.setItem('serene_entries', JSON.stringify(newEntries));
    setEntries(newEntries);
  }, []);
 
  const addEntry = useCallback((data) => {
    const entry = { id: utils.id(), date: new Date().toISOString(), favorite: false, ...data };
    const updated = [entry, ...entries];
    persist(updated);
    return entry;
  }, [entries, persist]);
 
  const updateEntry = useCallback((id, data) => {
    const updated = entries.map(e => e.id === id ? { ...e, ...data, updatedAt: new Date().toISOString() } : e);
    persist(updated);
  }, [entries, persist]);
 
  const deleteEntry = useCallback((id) => {
    persist(entries.filter(e => e.id !== id));
  }, [entries, persist]);
 
  const toggleFavorite = useCallback((id) => {
    const updated = entries.map(e => e.id === id ? { ...e, favorite: !e.favorite } : e);
    persist(updated);
  }, [entries, persist]);
 
  const stats = useMemo(() => ({
    total: entries.length,
    totalWords: entries.reduce((s,e) => s + utils.wordCount(e.content), 0),
    streak: utils.calcStreak(entries),
    topMood: (() => {
      const moods = entries.map(e=>e.mood).filter(Boolean);
      return moods.length ? moods.sort((a,b) => moods.filter(m=>m===b).length - moods.filter(m=>m===a).length)[0] : null;
    })(),
    moodCounts: MOODS.reduce((acc, m) => {
      acc[m.emoji] = entries.filter(e=>e.mood===m.emoji).length;
      return acc;
    }, {}),
  }), [entries]);
 
  return (
    <JournalContext.Provider value={{ entries, addEntry, updateEntry, deleteEntry, toggleFavorite, todayMood, setTodayMood, moodIntensity, setMoodIntensity, stats }}>
      {children}
    </JournalContext.Provider>
  );
}
 
// — Theme Context —
const ThemeContext = createContext(null);
function useTheme() { return useContext(ThemeContext); }
 
function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('serene_dark') === 'true');
  const [accent, setAccent] = useState(() => localStorage.getItem('serene_accent') || 'lavender');
 
  const ACCENTS = {
    lavender: { deep:'#9B7DD4', light:'#EDE8F7', mid:'#C8B8E8' },
    blush:    { deep:'#D46888', light:'#FDE8EF', mid:'#F2CDD6' },
    sage:     { deep:'#5A9A78', light:'#E8F5EE', mid:'#B8D4C8' },
    amber:    { deep:'#C07838', light:'#FFF0E0', mid:'#F7CCA0' },
  };
 
  useEffect(() => {
    const a = ACCENTS[accent] || ACCENTS.lavender;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
    document.documentElement.style.setProperty('--accent-deep', a.deep);
    document.documentElement.style.setProperty('--accent-light', a.light);
    document.documentElement.style.setProperty('--accent-mid', a.mid);
    localStorage.setItem('serene_dark', dark);
    localStorage.setItem('serene_accent', accent);
  }, [dark, accent]);
 
  return (
    <ThemeContext.Provider value={{ dark, setDark, accent, setAccent, ACCENTS }}>
      {children}
    </ThemeContext.Provider>
  );
}
 
// ============================================================
// CUSTOM HOOKS
// ============================================================
 
function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : initial; } catch { return initial; }
  });
  const set = useCallback((v) => {
    const next = typeof v === 'function' ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  }, [key, val]);
  return [val, set];
}
 
function useClock() {
  const [clock, setClock] = useState(utils.formatClock());
  const [dateStr, setDateStr] = useState(utils.formatDate());
  useEffect(() => {
    const t = setInterval(() => { setClock(utils.formatClock()); setDateStr(utils.formatDate()); }, 1000);
    return () => clearInterval(t);
  }, []);
  return { clock, dateStr };
}
 
function useAutosave(saveFn, delay = 1800) {
  const timer = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | saving | saved
  const trigger = useCallback(() => {
    setStatus('saving');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { saveFn(); setStatus('saved'); setTimeout(() => setStatus('idle'), 2000); }, delay);
  }, [saveFn, delay]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return { trigger, status };
}
 
function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = 'info') => {
    const id = utils.id();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);
  return { toasts, add };
}
 
// ============================================================
// GLOBAL STYLES (injected via <style> tag approach)
// ============================================================
const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
:root {
  --accent-deep: #9B7DD4;
  --accent-light: #EDE8F7;
  --accent-mid: #C8B8E8;
  --blush: #F2CDD6;
  --blush-deep: #E8A0B4;
  --sage: #B8D4C8;
  --sage-deep: #7AAF98;
  --sky: #BDD8F0;
  --sky-deep: #7AAED4;
  --cream: #FDFBF8;
  --warm: #FAF6F0;
  --card-bg: rgba(255,255,255,0.72);
  --card-border: rgba(200,184,232,0.25);
  --shadow: 0 4px 24px rgba(155,125,212,0.10);
  --shadow-md: 0 8px 40px rgba(155,125,212,0.15);
  --shadow-lg: 0 16px 48px rgba(155,125,212,0.22);
  --text-1: #2A2A3D; --text-2: #6B6B85; --text-3: #9898B0;
  --r-sm:12px; --r-md:18px; --r-lg:24px; --r-xl:32px;
  --t: all 0.28s cubic-bezier(0.4,0,0.2,1);
  --bg: linear-gradient(135deg,#F5F0FF 0%,#FFF0F5 35%,#F0F8FF 65%,#F5FFF0 100%);
  --font-body: 'DM Sans', sans-serif;
  --font-serif: 'Lora', serif;
  --font-display: 'Playfair Display', serif;
}
[data-theme="dark"] {
  --card-bg: rgba(28,26,46,0.88); --card-border: rgba(155,125,212,0.18);
  --cream: #14131E; --warm: #18172A;
  --text-1:#E8E8F2; --text-2:#A8A8C0; --text-3:#6868A0;
  --shadow: 0 4px 24px rgba(0,0,0,0.35); --shadow-md: 0 8px 40px rgba(0,0,0,0.45); --shadow-lg: 0 16px 60px rgba(0,0,0,0.55);
  --bg: linear-gradient(135deg,#0D0B18 0%,#160C16 35%,#0B0F18 65%,#0B170F 100%);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body,#root{min-height:100vh;width:100%}
body{font-family:var(--font-body);background:var(--bg);color:var(--text-1);overflow-x:hidden;transition:background 0.5s ease,color 0.3s ease}
button{cursor:pointer;font-family:inherit;border:none;background:none;color:inherit}
input,textarea,select{font-family:inherit;color:var(--text-1)}
textarea{resize:none}
a{text-decoration:none;color:inherit}
/* scrollbar */
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--accent-mid);border-radius:10px}
/* Blobs */
.blob-bg{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:0}
.blob{position:absolute;border-radius:50%;filter:blur(80px);opacity:0.35;animation:blobFloat 14s ease-in-out infinite}
.b1{width:520px;height:520px;background:var(--accent-mid);top:-120px;left:-120px;animation-delay:0s}
.b2{width:420px;height:420px;background:var(--blush);top:30%;right:-100px;animation-delay:3s}
.b3{width:380px;height:380px;background:var(--sage);bottom:-80px;left:28%;animation-delay:6s}
.b4{width:320px;height:320px;background:var(--sky);bottom:20%;left:-80px;animation-delay:9s}
@keyframes blobFloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-28px) scale(1.06)}66%{transform:translate(-18px,18px) scale(0.96)}}
/* Glass */
.glass{background:var(--card-bg);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--card-border);border-radius:var(--r-lg);box-shadow:var(--shadow)}
/* Nav */
.nav{position:fixed;top:14px;left:50%;transform:translateX(-50%);width:calc(100% - 32px);max-width:940px;display:flex;align-items:center;justify-content:space-between;padding:11px 18px;z-index:1000;border-radius:var(--r-xl);transition:var(--t)}
.nav-brand{font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--accent-deep);letter-spacing:-0.5px;cursor:pointer}
.nav-links{display:flex;gap:2px}
.nav-link{padding:8px 13px;border-radius:var(--r-sm);font-size:13.5px;font-weight:500;color:var(--text-2);transition:var(--t);cursor:pointer;border:none;background:none}
.nav-link:hover,.nav-link.active{background:var(--accent-light);color:var(--accent-deep)}
.btn-icon{width:37px;height:37px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--accent-light);color:var(--accent-deep);font-size:17px;transition:var(--t);cursor:pointer;flex-shrink:0}
.btn-icon:hover{background:var(--accent-mid);transform:scale(1.08)}
/* Page container */
.page-wrap{position:relative;z-index:1;min-height:100vh}
/* Auth */
.auth-wrap{display:grid;grid-template-columns:1fr 1fr;max-width:880px;width:100%;min-height:560px;border-radius:var(--r-xl);overflow:hidden;box-shadow:var(--shadow-md)}
.auth-panel{padding:52px 44px;background:linear-gradient(135deg,var(--accent-deep) 0%,#7B5DD4 50%,var(--sky-deep) 100%);display:flex;flex-direction:column;justify-content:center;color:#fff}
.auth-panel h1{font-family:var(--font-display);font-size:36px;font-weight:700;line-height:1.25;margin-bottom:18px}
.auth-panel p{font-size:15px;line-height:1.75;opacity:.85;margin-bottom:28px}
.auth-panel .quote{font-family:var(--font-serif);font-style:italic;font-size:14px;opacity:.7;border-left:3px solid rgba(255,255,255,.35);padding-left:14px}
.auth-form{padding:44px;background:var(--card-bg);backdrop-filter:blur(20px);display:flex;flex-direction:column;justify-content:center}
.auth-form h2{font-family:var(--font-display);font-size:26px;font-weight:600;margin-bottom:6px}
.auth-form>p{font-size:13px;color:var(--text-2);margin-bottom:28px}
.form-group{margin-bottom:16px}
.form-label{display:block;font-size:12.5px;font-weight:500;color:var(--text-2);margin-bottom:5px}
.form-input{width:100%;padding:11px 14px;border-radius:var(--r-sm);border:1.5px solid var(--card-border);background:var(--cream);font-size:14px;color:var(--text-1);outline:none;transition:var(--t)}
.form-input:focus{border-color:var(--accent-deep);box-shadow:0 0 0 3px rgba(155,125,212,.14)}
.form-input-wrap{position:relative}
.eye-btn{position:absolute;right:11px;top:50%;transform:translateY(-50%);cursor:pointer;color:var(--text-3);background:none;border:none;font-size:15px;padding:2px}
.err{font-size:11.5px;color:#E24B4A;margin-top:3px;min-height:16px}
.form-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;font-size:13px;color:var(--text-2)}
.check-label{display:flex;align-items:center;gap:7px;cursor:pointer}
.link{color:var(--accent-deep);cursor:pointer;font-size:13px}
.link:hover{text-decoration:underline}
.btn-primary{width:100%;padding:13px;border-radius:var(--r-md);background:linear-gradient(135deg,var(--accent-deep),var(--sky-deep));color:#fff;font-size:14.5px;font-weight:600;letter-spacing:.3px;transition:var(--t);box-shadow:0 4px 18px rgba(155,125,212,.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 26px rgba(155,125,212,.42)}
.btn-primary:active{transform:translateY(0)}
.auth-switch{text-align:center;margin-top:18px;font-size:13px;color:var(--text-2)}
/* Dashboard */
.dash-wrap{padding:100px 24px 90px;max-width:1100px;margin:0 auto}
.hero{margin-bottom:36px}
.greeting{font-family:var(--font-display);font-size:40px;font-weight:700;line-height:1.2}
.greeting span{color:var(--accent-deep)}
.hero-sub{font-size:15px;color:var(--text-2);margin-top:7px}
.hero-date{font-size:13px;color:var(--text-3);margin-top:4px}
.clock{font-family:var(--font-serif);font-size:44px;font-weight:400;color:var(--accent-deep);margin-top:6px;letter-spacing:-1px}
/* Stats */
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px}
.stat-card{padding:20px 20px;background:var(--card-bg);backdrop-filter:blur(16px);border:1px solid var(--card-border);border-radius:var(--r-md);box-shadow:var(--shadow);transition:var(--t);cursor:default}
.stat-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}
.stat-icon{font-size:22px;margin-bottom:9px}
.stat-val{font-size:30px;font-weight:600;color:var(--text-1);font-family:var(--font-serif)}
.stat-lbl{font-size:12.5px;color:var(--text-2);margin-top:2px}
/* Dash grid */
.dash-grid{display:grid;grid-template-columns:1fr 330px;gap:22px}
.dash-main,.dash-side{display:flex;flex-direction:column;gap:20px}
/* Section card */
.section-card{background:var(--card-bg);backdrop-filter:blur(20px);border:1px solid var(--card-border);border-radius:var(--r-lg);box-shadow:var(--shadow);padding:26px;transition:var(--t)}
.sec-title{font-size:11.5px;font-weight:600;color:var(--text-3);letter-spacing:.8px;text-transform:uppercase;margin-bottom:18px}
.sec-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.sec-header .sec-title{margin-bottom:0}
/* Mood */
.mood-grid{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
.mood-btn{padding:10px 14px;border-radius:var(--r-md);background:var(--accent-light);border:2px solid transparent;cursor:pointer;transition:var(--t);display:flex;flex-direction:column;align-items:center;gap:3px}
.mood-btn span.em{font-size:26px}
.mood-btn span.lb{font-size:10.5px;color:var(--text-2);font-weight:500}
.mood-btn:hover{transform:scale(1.09);border-color:var(--accent-mid)}
.mood-btn.sel{border-color:var(--accent-deep);background:var(--accent-mid)}
.slider-row{display:flex;align-items:center;gap:12px}
.intensity-slider{flex:1;accent-color:var(--accent-deep);height:4px}
.intensity-lbl{font-size:12px;color:var(--text-3)}
/* Quote */
.quote-card{position:relative;overflow:hidden}
.quote-mark{font-family:var(--font-display);font-size:76px;color:var(--accent-mid);line-height:.6;position:absolute;top:18px;left:16px;opacity:.5;user-select:none}
.quote-text{font-family:var(--font-serif);font-style:italic;font-size:16px;line-height:1.75;color:var(--text-1);position:relative;z-index:1;padding-top:6px}
.quote-author{font-size:12.5px;color:var(--text-3);margin-top:10px}
.quote-nav{display:flex;gap:6px;margin-top:14px}
.q-dot{width:6px;height:6px;border-radius:50%;background:var(--accent-mid);cursor:pointer;transition:var(--t)}
.q-dot.active{background:var(--accent-deep);width:16px;border-radius:3px}
/* Streak */
.streak-card{text-align:center}
.streak-num{font-family:var(--font-display);font-size:52px;color:var(--accent-deep);font-weight:700;line-height:1}
.streak-lbl{font-size:13px;color:var(--text-2);margin-top:4px}
.streak-days{display:flex;gap:5px;justify-content:center;margin-top:14px}
.sday{width:30px;height:30px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:600}
.sday.filled{background:var(--accent-deep);color:#fff}
.sday.partial{background:var(--accent-mid);color:var(--accent-deep)}
.sday.empty{background:var(--accent-light);color:var(--text-3)}
/* Bar chart */
.bars{display:flex;align-items:flex-end;gap:5px;height:100px}
.bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px}
.bar{width:100%;border-radius:5px 5px 0 0;background:linear-gradient(180deg,var(--accent-deep),var(--sky-deep));min-height:4px;transition:height 0.5s ease;animation:barGrow .6s ease}
@keyframes barGrow{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1)}}
.bar-lbl{font-size:9.5px;color:var(--text-3)}
/* Prompts */
.prompts-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
.prompt-card{padding:14px;border-radius:var(--r-md);cursor:pointer;border:1.5px solid var(--card-border);background:var(--card-bg);font-size:13px;color:var(--text-2);line-height:1.55;transition:var(--t)}
.prompt-card:hover{border-color:var(--accent-deep);color:var(--accent-deep);background:var(--accent-light);transform:translateY(-2px)}
.prompt-em{font-size:22px;margin-bottom:7px}
/* Entry preview */
.entry-list{display:flex;flex-direction:column;gap:12px}
.entry-card{padding:16px 18px;background:var(--card-bg);backdrop-filter:blur(12px);border:1px solid var(--card-border);border-radius:var(--r-md);cursor:pointer;transition:var(--t);position:relative;overflow:hidden}
.entry-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:3px 0 0 3px;background:var(--accent-deep)}
.entry-card:hover{transform:translateX(4px);box-shadow:var(--shadow-lg)}
.entry-title{font-size:14.5px;font-weight:600;color:var(--text-1);margin-bottom:3px}
.entry-meta{display:flex;gap:10px;font-size:11.5px;color:var(--text-3);align-items:center;flex-wrap:wrap}
.entry-snippet{font-size:12.5px;color:var(--text-2);margin-top:5px;line-height:1.5;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.tag{display:inline-block;padding:2px 9px;background:var(--accent-light);color:var(--accent-deep);border-radius:100px;font-size:11px;font-weight:500}
.entry-tags{display:flex;gap:5px;margin-top:7px;flex-wrap:wrap}
/* Empty state */
.empty{text-align:center;padding:48px 20px}
.empty-icon{font-size:48px;margin-bottom:14px;opacity:.6}
.empty h3{font-family:var(--font-display);font-size:22px;margin-bottom:7px}
.empty p{font-size:14px;color:var(--text-2);line-height:1.6;max-width:280px;margin:0 auto}
/* FAB */
.fab{position:fixed;bottom:30px;right:30px;width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,var(--accent-deep),var(--sky-deep));color:#fff;font-size:28px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 30px rgba(155,125,212,.4);cursor:pointer;transition:var(--t);z-index:500;animation:fabPulse 3s ease infinite}
.fab:hover{transform:scale(1.12) rotate(45deg);box-shadow:0 12px 38px rgba(155,125,212,.55);animation:none}
@keyframes fabPulse{0%,100%{box-shadow:0 8px 30px rgba(155,125,212,.4)}50%{box-shadow:0 8px 38px rgba(155,125,212,.6),0 0 0 8px rgba(155,125,212,.1)}}
/* Journal page */
.journal-wrap{padding:100px 24px 90px;max-width:1100px;margin:0 auto}
.page-title{font-family:var(--font-display);font-size:32px;font-weight:700;margin-bottom:6px}
.page-sub{font-size:14px;color:var(--text-2);margin-bottom:28px}
.toolbar{display:flex;align-items:center;gap:10px;margin-bottom:22px;flex-wrap:wrap}
.search-wrap{position:relative;flex:1;min-width:200px}
.search-inp{width:100%;padding:10px 14px 10px 38px;background:var(--card-bg);border:1.5px solid var(--card-border);border-radius:var(--r-md);font-size:13.5px;color:var(--text-1);backdrop-filter:blur(12px);outline:none;transition:var(--t)}
.search-inp:focus{border-color:var(--accent-deep)}
.search-icon{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:15px;color:var(--text-3);pointer-events:none}
.filter-btn{padding:10px 14px;background:var(--card-bg);border:1.5px solid var(--card-border);border-radius:var(--r-md);font-size:13px;font-weight:500;color:var(--text-2);cursor:pointer;transition:var(--t);backdrop-filter:blur(12px)}
.filter-btn:hover,.filter-btn.active{border-color:var(--accent-deep);color:var(--accent-deep);background:var(--accent-light)}
.btn-new{padding:10px 18px;border-radius:var(--r-md);background:linear-gradient(135deg,var(--accent-deep),var(--sky-deep));color:#fff;font-size:13.5px;font-weight:600;cursor:pointer;transition:var(--t);box-shadow:0 3px 14px rgba(155,125,212,.28);white-space:nowrap}
.btn-new:hover{transform:translateY(-2px);box-shadow:0 7px 22px rgba(155,125,212,.4)}
.timeline-sec{margin-bottom:28px}
.tl-label{font-size:11.5px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px;display:flex;align-items:center;gap:9px}
.tl-label::after{content:'';flex:1;height:1px;background:var(--card-border)}
/* Editor */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.28);backdrop-filter:blur(8px);z-index:900;display:flex;align-items:flex-end;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s ease}
.overlay.open{opacity:1;pointer-events:all}
.editor-sheet{background:var(--cream);width:100%;max-width:780px;border-radius:var(--r-xl) var(--r-xl) 0 0;box-shadow:0 -20px 60px rgba(0,0,0,.18);transform:translateY(100%);transition:transform .4s cubic-bezier(0.4,0,0.2,1);max-height:92vh;overflow-y:auto;display:flex;flex-direction:column}
.overlay.open .editor-sheet{transform:translateY(0)}
.editor-hd{padding:18px 26px 0;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:var(--cream);z-index:10;border-bottom:1px solid var(--card-border);padding-bottom:14px}
.editor-meta{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.ed-date{font-size:12.5px;color:var(--text-3)}
.mood-picks{display:flex;gap:6px}
.mpick{font-size:19px;cursor:pointer;opacity:.45;transition:var(--t);background:none;border:none;padding:2px 3px}
.mpick:hover,.mpick.sel{opacity:1;transform:scale(1.25)}
.autosave-st{font-size:11.5px;color:#5A9A78}
.ed-actions{display:flex;gap:6px}
.editor-body{padding:18px 26px 32px;flex:1}
.ed-title{width:100%;border:none;outline:none;background:transparent;font-family:var(--font-display);font-size:28px;font-weight:700;color:var(--text-1);line-height:1.3;margin-bottom:14px;resize:none;overflow:hidden;min-height:44px}
.ed-title::placeholder{color:var(--text-3)}
.ed-content{width:100%;border:none;outline:none;background:transparent;font-family:var(--font-serif);font-size:16.5px;color:var(--text-1);line-height:1.95;resize:none;min-height:280px}
.ed-content::placeholder{color:var(--text-3);font-style:italic}
.tags-row{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin-top:14px;padding-top:14px;border-top:1px solid var(--card-border)}
.tag-input{border:none;outline:none;background:transparent;font-size:12.5px;color:var(--text-2);min-width:70px}
.editor-ft{display:flex;justify-content:space-between;align-items:center;padding:12px 26px;border-top:1px solid var(--card-border);background:var(--cream);position:sticky;bottom:0}
.wc-label{font-size:11.5px;color:var(--text-3)}
.save-btn{padding:9px 22px;border-radius:var(--r-md);background:linear-gradient(135deg,var(--accent-deep),var(--sky-deep));color:#fff;font-size:13.5px;font-weight:600;cursor:pointer;transition:var(--t);box-shadow:0 3px 12px rgba(155,125,212,.28)}
.save-btn:hover{transform:translateY(-1px)}
/* Focus mode */
.focus-ov{position:fixed;inset:0;background:var(--cream);z-index:1100;display:flex;flex-direction:column;opacity:0;pointer-events:none;transition:opacity .5s ease}
.focus-ov.open{opacity:1;pointer-events:all}
.focus-hd{padding:18px 36px;display:flex;justify-content:space-between;align-items:center}
.focus-body{flex:1;padding:0 40px 32px;display:flex;flex-direction:column;max-width:720px;margin:0 auto;width:100%}
.focus-title{width:100%;border:none;outline:none;background:transparent;font-family:var(--font-display);font-size:36px;font-weight:700;color:var(--text-1);text-align:center;margin-bottom:8px;resize:none;overflow:hidden}
.focus-title::placeholder{color:var(--text-3)}
.focus-area{flex:1;border:none;outline:none;background:transparent;resize:none;font-family:var(--font-serif);font-size:19px;line-height:2.05;color:var(--text-1);width:100%}
.focus-area::placeholder{color:var(--text-3);font-style:italic}
.focus-ft{padding:14px 40px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--card-border)}
/* Calendar */
.cal-wrap{padding:100px 24px 90px;max-width:860px;margin:0 auto}
.cal-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:26px}
.cal-month{font-family:var(--font-display);font-size:30px;font-weight:700}
.cal-nav{display:flex;gap:7px}
.cal-btn{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--card-bg);border:1px solid var(--card-border);cursor:pointer;font-size:17px;transition:var(--t);color:var(--text-2)}
.cal-btn:hover{background:var(--accent-light);color:var(--accent-deep)}
.cal-grid-wrap{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
.cal-dname{text-align:center;font-size:11.5px;font-weight:600;color:var(--text-3);letter-spacing:.5px;padding:6px 0}
.cal-cell{aspect-ratio:1;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:13.5px;cursor:pointer;transition:var(--t);position:relative;color:var(--text-2);background:transparent;border:none}
.cal-cell:hover{background:var(--accent-light);color:var(--accent-deep)}
.cal-cell.today{background:var(--accent-light);color:var(--accent-deep);font-weight:600}
.cal-cell.has-entry{color:var(--text-1);font-weight:600}
.cal-cell.has-entry::after{content:'';position:absolute;bottom:4px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:var(--accent-deep)}
.cal-cell.other-m{opacity:.28}
.cal-cell.sel{background:var(--accent-deep);color:#fff}
.cal-cell.sel.has-entry::after{background:#fff}
.cal-preview{margin-top:22px;padding:22px;background:var(--card-bg);backdrop-filter:blur(20px);border:1px solid var(--card-border);border-radius:var(--r-lg);min-height:100px;box-shadow:var(--shadow)}
.cal-empty{font-family:var(--font-serif);font-style:italic;color:var(--text-3);font-size:14px}
/* Analytics */
.analytics-wrap{padding:100px 24px 90px;max-width:1000px;margin:0 auto}
.an-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.an-card{padding:22px;background:var(--card-bg);backdrop-filter:blur(20px);border:1px solid var(--card-border);border-radius:var(--r-lg);box-shadow:var(--shadow)}
.an-card h3{font-size:11.5px;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.7px;margin-bottom:18px}
.mood-hist{display:flex;gap:7px;align-items:flex-end;height:90px}
.mh-bar-wrap{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1}
.mh-bar{width:28px;border-radius:5px 5px 0 0;transition:height .5s ease;min-height:3px}
.mh-em{font-size:17px;margin-top:4px}
.mh-cnt{font-size:11px;color:var(--text-3)}
.insight-list{display:flex;flex-direction:column;gap:11px}
.insight{display:flex;gap:11px;align-items:flex-start;padding:13px;background:var(--accent-light);border-radius:var(--r-sm)}
.insight-ic{font-size:20px}
.insight-txt{font-size:13.5px;color:var(--text-2);line-height:1.55}
.insight-txt strong{color:var(--text-1)}
.heatmap{display:grid;grid-template-columns:repeat(15,1fr);gap:3px}
.hm-cell{aspect-ratio:1;border-radius:2px;cursor:pointer;transition:var(--t)}
.hm-cell:hover{transform:scale(1.4)}
.hm-0{background:var(--accent-light)}.hm-1{background:var(--accent-mid)}.hm-2{background:var(--accent-deep);opacity:.7}.hm-3{background:var(--accent-deep)}
/* Settings */
.settings-wrap{padding:100px 24px 90px;max-width:680px;margin:0 auto}
.settings-sec{margin-bottom:28px;padding:26px;background:var(--card-bg);backdrop-filter:blur(20px);border:1px solid var(--card-border);border-radius:var(--r-lg);box-shadow:var(--shadow)}
.settings-sec h3{font-size:16px;font-weight:600;margin-bottom:18px;color:var(--text-1)}
.setting-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--card-border)}
.setting-row:last-child{border-bottom:none}
.setting-info h4{font-size:14.5px;font-weight:500;color:var(--text-1)}
.setting-info p{font-size:12.5px;color:var(--text-3);margin-top:2px}
.toggle{width:46px;height:25px;border-radius:13px;background:var(--accent-light);border:1px solid var(--card-border);cursor:pointer;position:relative;transition:background .3s ease;flex-shrink:0}
.toggle.on{background:var(--accent-deep)}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:17px;height:17px;border-radius:50%;background:#fff;transition:transform .3s ease;box-shadow:0 1px 4px rgba(0,0,0,.15)}
.toggle.on::after{transform:translateX(21px)}
.avatar{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,var(--accent-deep),var(--sky-deep));display:flex;align-items:center;justify-content:center;color:#fff;font-size:22px;font-weight:600;flex-shrink:0}
.profile-row{display:flex;gap:14px;align-items:center;margin-bottom:18px}
.swatch{width:34px;height:34px;border-radius:50%;cursor:pointer;border:3px solid transparent;transition:var(--t)}
.swatch.active{border-color:var(--accent-deep);transform:scale(1.16)}
.swatch-row{display:flex;gap:8px}
.btn-danger{width:100%;padding:11px;border-radius:var(--r-md);border:1.5px solid #E24B4A;color:#E24B4A;font-size:14px;font-weight:600;cursor:pointer;transition:var(--t);margin-top:7px;background:transparent}
.btn-danger:hover{background:#E24B4A;color:#fff}
/* Toast */
.toast-wrap{position:fixed;bottom:90px;right:22px;z-index:9999;display:flex;flex-direction:column;gap:7px;pointer-events:none}
.toast{padding:11px 18px;border-radius:var(--r-md);background:var(--text-1);color:#fff;font-size:13.5px;font-weight:500;box-shadow:var(--shadow-md);animation:toastIn .3s ease;display:flex;align-items:center;gap:8px;pointer-events:all}
.toast.success{background:var(--sage-deep,#5A9A78)}.toast.error{background:#E24B4A}
@keyframes toastIn{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:translateX(0)}}
/* Responsive */
@media(max-width:780px){
  .auth-panel{display:none}.auth-wrap{grid-template-columns:1fr}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .dash-grid{grid-template-columns:1fr}
  .an-grid{grid-template-columns:1fr}
  .nav-links{display:none}
  .greeting{font-size:28px}.clock{font-size:34px}
  .focus-title{font-size:26px}.focus-area{font-size:16px}
  .focus-body{padding:0 20px 24px}
  .focus-hd,.focus-ft{padding:14px 20px}
  .dash-wrap,.journal-wrap,.cal-wrap,.analytics-wrap,.settings-wrap{padding:88px 16px 80px}
}
@media(max-width:480px){.stats-grid{grid-template-columns:1fr 1fr}.heatmap{grid-template-columns:repeat(10,1fr)}}
`;
 
// ============================================================
// TOAST CONTEXT (global)
// ============================================================
const ToastContext = createContext(null);
function useToastCtx() { return useContext(ToastContext); }
 
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = '') => {
    const id = utils.id();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);
  return (
    <ToastContext.Provider value={add}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
}
 
// ============================================================
// SMALL REUSABLE COMPONENTS
// ============================================================
 
function BlobBackground() {
  return (
    <div className="blob-bg" aria-hidden>
      <div className="blob b1" /><div className="blob b2" />
      <div className="blob b3" /><div className="blob b4" />
    </div>
  );
}
 
function ToastContainer({ toasts }) {
  return (
    <div className="toast-wrap" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'} {t.msg}
        </div>
      ))}
    </div>
  );
}
 
function Toggle({ on, onChange }) {
  return (
    <button
      className={`toggle ${on ? 'on' : ''}`}
      onClick={() => onChange(!on)}
      role="switch" aria-checked={on}
    />
  );
}
 
function Tag({ label, onRemove }) {
  return (
    <span className="tag" style={{ cursor: onRemove ? 'pointer' : 'default' }} onClick={onRemove}>
      {label} {onRemove ? '×' : ''}
    </span>
  );
}
 
function MoodBadge({ mood }) {
  return <span title={mood}>{mood}</span>;
}
 
function EmptyState({ icon, title, desc, action }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}
 
// ============================================================
// ENTRY CARD COMPONENT
// ============================================================
function EntryCard({ entry, onOpen }) {
  const snippet = entry.content.replace(/#+\s/g,'').substring(0, 110) + (entry.content.length > 110 ? '…' : '');
  return (
    <div className="entry-card" onClick={() => onOpen(entry.id)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen(entry.id)}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div className="entry-title">{entry.title || 'Untitled Entry'}</div>
        {entry.favorite && <span style={{ color:'var(--blush-deep)', fontSize: 14 }}>♥</span>}
      </div>
      <div className="entry-meta">
        {entry.mood && <MoodBadge mood={entry.mood} />}
        <span>{utils.timeAgo(entry.date)}</span>
        <span>{utils.wordCount(entry.content)} words</span>
        <span>{utils.readTime(entry.content)} min read</span>
      </div>
      {snippet && <div className="entry-snippet">{snippet}</div>}
      {entry.tags?.length > 0 && (
        <div className="entry-tags">
          {entry.tags.slice(0,4).map(t => <Tag key={t} label={t} />)}
        </div>
      )}
    </div>
  );
}
 
// ============================================================
// MOOD TRACKER COMPONENT
// ============================================================
function MoodTracker() {
  const { todayMood, setTodayMood, moodIntensity, setMoodIntensity } = useJournal();
  const toast = useToastCtx();
  const handleMood = (mood) => {
    setTodayMood(mood);
    toast(`Mood logged ${mood}`, 'success');
  };
  return (
    <div className="section-card">
      <div className="sec-title">Today's Mood</div>
      <div className="mood-grid">
        {MOODS.map(m => (
          <button key={m.emoji} className={`mood-btn ${todayMood === m.emoji ? 'sel' : ''}`}
            onClick={() => handleMood(m.emoji)} title={m.label}>
            <span className="em">{m.emoji}</span>
            <span className="lb">{m.label}</span>
          </button>
        ))}
      </div>
      <div className="slider-row">
        <span className="intensity-lbl">Intensity</span>
        <input type="range" min="1" max="10" value={moodIntensity} className="intensity-slider"
          onChange={e => setMoodIntensity(Number(e.target.value))} />
        <span className="intensity-lbl">{moodIntensity}/10</span>
      </div>
    </div>
  );
}
 
// ============================================================
// QUOTE COMPONENT
// ============================================================
function QuoteCard() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i+1) % QUOTES.length), 12000);
    return () => clearInterval(t);
  }, []);
  const q = QUOTES[idx];
  return (
    <div className="section-card quote-card">
      <div className="quote-mark">"</div>
      <div className="quote-text">"{q.text}"</div>
      <div className="quote-author">— {q.author}</div>
      <div className="quote-nav">
        {QUOTES.slice(0,5).map((_, i) => (
          <div key={i} className={`q-dot ${i === idx % 5 ? 'active' : ''}`} onClick={() => setIdx(i)} />
        ))}
      </div>
    </div>
  );
}
 
// ============================================================
// STREAK WIDGET
// ============================================================
function StreakWidget() {
  const { entries, stats } = useJournal();
  const today = new Date();
  const entryDates = new Set(entries.map(e => e.date.split('T')[0]));
  return (
    <div className="section-card streak-card">
      <div className="streak-num">{stats.streak}</div>
      <div className="streak-lbl">Day Streak 🔥</div>
      <div className="streak-days">
        {Array.from({length:7}, (_,i) => {
          const d = new Date(today); d.setDate(d.getDate() - (6-i));
          const s = utils.fmtDate(d);
          const filled = entryDates.has(s);
          return (
            <div key={i} className={`sday ${filled ? 'filled' : i===6 ? 'partial' : 'empty'}`}
              title={s}>{DAYS_SHORT[d.getDay()][0]}</div>
          );
        })}
      </div>
    </div>
  );
}
 
// ============================================================
// BAR CHART COMPONENT
// ============================================================
function BarChart({ entries, label = true }) {
  const today = new Date();
  const entryByDate = entries.reduce((acc, e) => {
    const d = e.date.split('T')[0];
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});
  const bars = Array.from({length:7}, (_,i) => {
    const d = new Date(today); d.setDate(d.getDate() - (6-i));
    const s = utils.fmtDate(d);
    return { day: DAYS_SHORT[d.getDay()][0], count: entryByDate[s] || 0, date: s };
  });
  const max = Math.max(...bars.map(b => b.count), 1);
  return (
    <div className="bars">
      {bars.map((b,i) => (
        <div className="bar-wrap" key={i} title={`${b.date}: ${b.count} entries`}>
          <div className="bar" style={{ height: `${Math.max(b.count/max*90,b.count>0?16:6)}px`, animationDelay:`${i*0.07}s` }} />
          {label && <div className="bar-lbl">{b.day}</div>}
        </div>
      ))}
    </div>
  );
}
 
// ============================================================
// PROMPT CARDS COMPONENT
// ============================================================
function PromptCards({ onSelect }) {
  const [active, setActive] = useState(() => [...PROMPTS].sort(()=>Math.random()-.5).slice(0,4));
  const refresh = () => setActive([...PROMPTS].sort(()=>Math.random()-.5).slice(0,4));
  return (
    <div className="section-card">
      <div className="sec-header">
        <span className="sec-title">Writing Prompts</span>
        <button className="link" onClick={refresh} style={{fontSize:12}}>↻ Refresh</button>
      </div>
      <div className="prompts-grid">
        {active.map((p, i) => (
          <div key={i} className="prompt-card" onClick={() => onSelect(p.text)}
            role="button" tabIndex={0} onKeyDown={e => e.key==='Enter' && onSelect(p.text)}>
            <div className="prompt-em">{p.emoji}</div>
            {p.text}
          </div>
        ))}
      </div>
    </div>
  );
}
 
// ============================================================
// STATS GRID
// ============================================================
function StatsGrid() {
  const { stats, todayMood } = useJournal();
  const cards = [
    { icon:'📖', val: stats.total, label:'Total Entries' },
    { icon:'🔥', val: stats.streak, label:'Day Streak' },
    { icon:'✍️', val: stats.totalWords > 999 ? `${(stats.totalWords/1000).toFixed(1)}k` : stats.totalWords, label:'Words Written' },
    { icon:'💜', val: todayMood || '—', label:"Today's Mood" },
  ];
  return (
    <div className="stats-grid">
      {cards.map((c, i) => (
        <div key={i} className="stat-card">
          <div className="stat-icon">{c.icon}</div>
          <div className="stat-val">{c.val}</div>
          <div className="stat-lbl">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
 
// ============================================================
// EDITOR COMPONENT
// ============================================================
function Editor({ entryId, onClose, initialPrompt }) {
  const { entries, addEntry, updateEntry, deleteEntry, toggleFavorite, todayMood } = useJournal();
  const toast = useToastCtx();
  const existing = entryId ? entries.find(e => e.id === entryId) : null;
 
  const [title, setTitle] = useState(existing?.title || '');
  const [content, setContent] = useState(existing?.content || '');
  const [tags, setTags] = useState(existing?.tags || []);
  const [mood, setMood] = useState(existing?.mood || todayMood || null);
  const [tagInput, setTagInput] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
 
  const currentId = useRef(entryId);
 
  // Auto-resize title
  const resizeTitle = useCallback((el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, []);
 
  useEffect(() => {
    if (titleRef.current) resizeTitle(titleRef.current);
    setTimeout(() => titleRef.current?.focus(), 400);
  }, []);
 
  const saveNow = useCallback(() => {
    const c = content.trim(), t = title.trim();
    if (!c && !t) return;
    if (currentId.current) {
      updateEntry(currentId.current, { title: t, content: c, tags, mood });
    } else {
      const entry = addEntry({ title: t, content: c, tags, mood });
      currentId.current = entry.id;
    }
  }, [title, content, tags, mood, addEntry, updateEntry]);
 
  const { trigger: autosaveTrigger, status: saveStatus } = useAutosave(saveNow);
 
  const handleSave = () => {
    saveNow();
    toast(currentId.current && entryId ? 'Entry updated ✓' : 'Entry saved ✨', 'success');
    onClose();
  };
 
  const handleDelete = () => {
    if (!currentId.current) { onClose(); return; }
    if (!window.confirm('Delete this entry permanently?')) return;
    deleteEntry(currentId.current);
    toast('Entry deleted', 'error');
    onClose();
  };
 
  const handleTagKey = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const val = tagInput.trim().replace(',','');
      if (val && !tags.includes(val)) setTags([...tags, val]);
      setTagInput('');
    }
    if (e.key === 'Backspace' && !tagInput && tags.length) setTags(tags.slice(0,-1));
  };
 
  const toggleFav = () => {
    if (!currentId.current) { toast('Save the entry first', ''); return; }
    toggleFavorite(currentId.current);
    const entry = entries.find(e => e.id === currentId.current);
    toast(entry?.favorite ? 'Removed from favorites' : 'Added to favorites ♥', 'success');
  };
 
  const isFav = existing?.favorite;
  const wc = utils.wordCount(content);
 
  return (
    <>
      {/* Focus Mode */}
      <div className={`focus-ov ${isFocus ? 'open' : ''}`} role="dialog" aria-label="Focus writing mode">
        <div className="focus-hd">
          <FocusClock />
          <span style={{fontFamily:'var(--font-display)',fontSize:17,color:'var(--accent-deep)'}}>Serene</span>
          <button className="btn-icon" onClick={() => setIsFocus(false)} title="Exit focus mode" style={{fontSize:13,width:'auto',padding:'8px 14px',borderRadius:'var(--r-md)',gap:6}}>✕ Exit</button>
        </div>
        <div className="focus-body">
          <textarea className="focus-title" placeholder="Title…" value={title}
            onChange={e => { setTitle(e.target.value); resizeTitle(e.target); autosaveTrigger(); }} rows={1} />
          <textarea className="focus-area" placeholder="Let your thoughts flow freely…" value={content}
            onChange={e => { setContent(e.target.value); autosaveTrigger(); }} />
        </div>
        <div className="focus-ft">
          <span style={{fontSize:12.5,color:'var(--text-3)'}}>{wc} words</span>
          <button className="save-btn" onClick={() => { handleSave(); setIsFocus(false); }}>Save & Close</button>
        </div>
      </div>
 
      {/* Editor Sheet */}
      <div className="editor-hd">
        <div className="editor-meta">
          <span className="ed-date">{new Date(existing?.date || Date.now()).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
          <div className="mood-picks">
            {MOODS.map(m => (
              <button key={m.emoji} className={`mpick ${mood === m.emoji ? 'sel' : ''}`}
                onClick={() => { setMood(m.emoji); autosaveTrigger(); }} title={m.label}>{m.emoji}</button>
            ))}
          </div>
          <span className="autosave-st">
            {saveStatus === 'saving' ? '…saving' : saveStatus === 'saved' ? '✓ Autosaved' : ''}
          </span>
        </div>
        <div className="ed-actions">
          <button className="btn-icon" onClick={() => setIsFocus(true)} title="Focus mode" style={{fontSize:15}}>✏️</button>
          <button className="btn-icon" onClick={toggleFav} title="Favorite"
            style={{background:'var(--blush)',color:'var(--blush-deep)',fontSize:15}}>{isFav ? '♥' : '♡'}</button>
          {(currentId.current) && (
            <button className="btn-icon" onClick={handleDelete} title="Delete"
              style={{color:'#E24B4A',fontSize:15}}>🗑</button>
          )}
          <button className="btn-icon" onClick={onClose} title="Close" style={{fontSize:15}}>✕</button>
        </div>
      </div>
      <div className="editor-body">
        <textarea ref={titleRef} className="ed-title" placeholder="Give your entry a title…" value={title}
          rows={1} onChange={e => { setTitle(e.target.value); resizeTitle(e.target); autosaveTrigger(); }} />
        <textarea ref={contentRef} className="ed-content"
          placeholder={initialPrompt || "What's on your mind today? Write freely, without judgment…"}
          value={content}
          onChange={e => { setContent(e.target.value); autosaveTrigger(); }} />
        <div className="tags-row">
          <span style={{fontSize:13,color:'var(--text-3)'}}>🏷</span>
          {tags.map((t,i) => <Tag key={i} label={t} onRemove={() => setTags(tags.filter((_,j) => j!==i))} />)}
          <input className="tag-input" placeholder="Add tag…" value={tagInput}
            onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKey} />
        </div>
      </div>
      <div className="editor-ft">
        <span className="wc-label">{wc} words · {utils.readTime(content)} min read</span>
        <button className="save-btn" onClick={handleSave}>Save Entry</button>
      </div>
    </>
  );
}
 
function FocusClock() {
  const { clock } = useClock();
  return <span style={{fontSize:13,color:'var(--text-3)'}}>{clock}</span>;
}
 
// ============================================================
// EDITOR OVERLAY (wrapper)
// ============================================================
function EditorOverlay({ open, entryId, onClose, initialPrompt }) {
  const overlayRef = useRef(null);
  const handleBg = (e) => { if (e.target === overlayRef.current) onClose(); };
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && open) onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);
 
  return (
    <div className={`overlay ${open ? 'open' : ''}`} ref={overlayRef} onClick={handleBg}
      role="dialog" aria-modal="true" aria-label="Journal entry editor">
      <div className="editor-sheet">
        {open && <Editor entryId={entryId} onClose={onClose} initialPrompt={initialPrompt} />}
      </div>
    </div>
  );
}
 
// ============================================================
// NAVBAR COMPONENT
// ============================================================
function Navbar({ page, setPage }) {
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();
  const toast = useToastCtx();
 
  const handleLogout = () => { logout(); toast('Signed out', ''); };
 
  if (!user) return null;
  return (
    <nav className="nav glass" role="navigation" aria-label="Main navigation">
      <div className="nav-brand" onClick={() => setPage('dashboard')} role="button" tabIndex={0}>Serene</div>
      <div className="nav-links" role="menubar">
        {[['dashboard','Home'],['journal','Journal'],['calendar','Calendar'],['analytics','Insights'],['settings','Settings']].map(([p,l]) => (
          <button key={p} className={`nav-link ${page===p?'active':''}`} onClick={() => setPage(p)} role="menuitem">{l}</button>
        ))}
      </div>
      <div style={{display:'flex',gap:7,alignItems:'center'}}>
        <button className="btn-icon" onClick={() => setDark(!dark)} title={dark?'Light mode':'Dark mode'}>{dark?'☀️':'🌙'}</button>
        <div className="avatar" style={{width:35,height:35,fontSize:14,cursor:'pointer'}} onClick={handleLogout} title="Sign out">
          {(user.name||'A')[0].toUpperCase()}
        </div>
      </div>
    </nav>
  );
}
 
// ============================================================
// AUTH PAGES
// ============================================================
function AuthPage({ onSuccess }) {
  const [mode, setMode] = useState('login');
  return mode === 'login'
    ? <LoginPage onSuccess={onSuccess} onSwitch={() => setMode('signup')} />
    : <SignupPage onSuccess={onSuccess} onSwitch={() => setMode('login')} />;
}
 
function LoginPage({ onSuccess, onSwitch }) {
  const { login } = useAuth();
  const toast = useToastCtx();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
 
  const validate = () => {
    const e = {};
    if (!email || !email.includes('@')) e.email = 'Please enter a valid email';
    if (pass.length < 6) e.pass = 'Password must be at least 6 characters';
    setErrors(e);
    return !Object.keys(e).length;
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    login(email, pass, remember);
    toast('Welcome back! ✨', 'success');
    onSuccess();
  };
 
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div className="auth-wrap glass">
        <div className="auth-panel">
          <h1>Your safe space to think, feel, and grow.</h1>
          <p>Serene is your private journaling companion — designed to help you reflect, track moods, and discover patterns in your life.</p>
          <div className="quote">"Writing in a journal reminds you of your goals and your learning in life." — Robin Sharma</div>
        </div>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h2>Welcome back</h2>
          <p>Sign in to your journal</p>
          <div className="form-group">
            <label className="form-label" htmlFor="loginEmail">Email</label>
            <input id="loginEmail" type="email" className="form-input" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
            <div className="err">{errors.email}</div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="loginPass">Password</label>
            <div className="form-input-wrap">
              <input id="loginPass" type={showPass?'text':'password'} className="form-input" placeholder="••••••••"
                value={pass} onChange={e => setPass(e.target.value)} autoComplete="current-password" />
              <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)} aria-label={showPass?'Hide password':'Show password'}>
                {showPass?'🙈':'👁'}
              </button>
            </div>
            <div className="err">{errors.pass}</div>
          </div>
          <div className="form-row">
            <label className="check-label"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label>
            <span className="link">Forgot password?</span>
          </div>
          <button type="submit" className="btn-primary">Sign In</button>
          <div className="auth-switch">Don't have an account? <span className="link" onClick={onSwitch}>Create one</span></div>
        </form>
      </div>
    </div>
  );
}
 
function SignupPage({ onSuccess, onSwitch }) {
  const { signup } = useAuth();
  const toast = useToastCtx();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
 
  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Please enter your name';
    if (!email || !email.includes('@')) e.email = 'Please enter a valid email';
    if (pass.length < 6) e.pass = 'Min. 6 characters';
    if (pass !== pass2) e.pass2 = 'Passwords do not match';
    setErrors(e);
    return !Object.keys(e).length;
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    signup(name, email, pass);
    toast(`Welcome to Serene, ${name}! 🌟`, 'success');
    onSuccess();
  };
 
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div className="auth-wrap glass">
        <div className="auth-panel" style={{background:'linear-gradient(135deg,#5A9A78,#3A7080,#2A5060)'}}>
          <h1>Begin your journey of self-discovery.</h1>
          <p>Join thousands of people who use Serene to journal daily, track emotions, and build mindful habits.</p>
          <div className="quote">"The journey of a thousand miles begins with a single step." — Lao Tzu</div>
        </div>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <h2>Create account</h2>
          <p>Start your journaling journey</p>
          {[
            {id:'sName',label:'Your Name',type:'text',val:name,set:setName,err:'name',ph:'Alex Morgan'},
            {id:'sEmail',label:'Email',type:'email',val:email,set:setEmail,err:'email',ph:'you@example.com'},
          ].map(f => (
            <div className="form-group" key={f.id}>
              <label className="form-label" htmlFor={f.id}>{f.label}</label>
              <input id={f.id} type={f.type} className="form-input" placeholder={f.ph}
                value={f.val} onChange={e => f.set(e.target.value)} />
              <div className="err">{errors[f.err]}</div>
            </div>
          ))}
          <div className="form-group">
            <label className="form-label" htmlFor="sPass">Password</label>
            <div className="form-input-wrap">
              <input id="sPass" type={showPass?'text':'password'} className="form-input" placeholder="Min. 6 characters"
                value={pass} onChange={e => setPass(e.target.value)} />
              <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                {showPass?'🙈':'👁'}
              </button>
            </div>
            <div className="err">{errors.pass}</div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="sPass2">Confirm Password</label>
            <input id="sPass2" type="password" className="form-input" placeholder="Repeat password"
              value={pass2} onChange={e => setPass2(e.target.value)} />
            <div className="err">{errors.pass2}</div>
          </div>
          <button type="submit" className="btn-primary">Create Account</button>
          <div className="auth-switch">Already have an account? <span className="link" onClick={onSwitch}>Sign in</span></div>
        </form>
      </div>
    </div>
  );
}
 
// ============================================================
// DASHBOARD PAGE
// ============================================================
function DashboardPage({ onOpenEditor }) {
  const { user } = useAuth();
  const { entries } = useJournal();
  const { clock, dateStr } = useClock();
  const recent = useMemo(() => [...entries].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,5), [entries]);
 
  return (
    <div className="dash-wrap">
      <div className="hero">
        <div className="greeting">{utils.greet()}, <span>{(user?.name||'Friend').split(' ')[0]}</span> ✨</div>
        <div className="hero-sub">How are you feeling today?</div>
        <div className="hero-date">{dateStr}</div>
        <div className="clock">{clock}</div>
      </div>
 
      <StatsGrid />
 
      <div className="dash-grid">
        <div className="dash-main">
          <MoodTracker />
          <PromptCards onSelect={(text) => onOpenEditor(null, text)} />
          <div className="section-card">
            <div className="sec-header">
              <span className="sec-title">Recent Entries</span>
            </div>
            {recent.length === 0
              ? <EmptyState icon="📝" title="Start your story" desc="Your first journal entry is just a tap away. What's on your mind today?" />
              : <div className="entry-list">{recent.map(e => <EntryCard key={e.id} entry={e} onOpen={(id) => onOpenEditor(id)} />)}</div>
            }
          </div>
        </div>
        <div className="dash-side">
          <QuoteCard />
          <StreakWidget />
          <div className="section-card">
            <div className="sec-title">Weekly Activity</div>
            <BarChart entries={entries} />
          </div>
        </div>
      </div>
 
      <button className="fab" onClick={() => onOpenEditor(null)} aria-label="New journal entry" title="New entry">+</button>
    </div>
  );
}
 
// ============================================================
// JOURNAL PAGE
// ============================================================
function JournalPage({ onOpenEditor }) {
  const { entries } = useJournal();
  const [search, setSearch] = useState('');
  const [moodFilter, setMoodFilter] = useState('all');
 
  const filtered = useMemo(() => {
    let list = [...entries].sort((a,b) => new Date(b.date)-new Date(a.date));
    if (moodFilter !== 'all') list = list.filter(e => e.mood === moodFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e => [e.title, e.content, ...(e.tags||[])].join(' ').toLowerCase().includes(q));
    }
    return list;
  }, [entries, moodFilter, search]);
 
  const grouped = useMemo(() => {
    const now = new Date(), today = utils.today();
    const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate()-7);
    const monthAgo = new Date(now); monthAgo.setDate(monthAgo.getDate()-30);
    const groups = { Today:[], 'This Week':[], 'This Month':[], Older:[] };
    filtered.forEach(e => {
      const d = e.date.split('T')[0];
      if (d === today) groups['Today'].push(e);
      else if (new Date(d) > weekAgo) groups['This Week'].push(e);
      else if (new Date(d) > monthAgo) groups['This Month'].push(e);
      else groups['Older'].push(e);
    });
    return groups;
  }, [filtered]);
 
  return (
    <div className="journal-wrap">
      <div className="page-title">My Journal</div>
      <div className="page-sub">Your thoughts, captured beautifully.</div>
 
      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-inp" type="search" placeholder="Search entries…" value={search}
            onChange={e => setSearch(e.target.value)} aria-label="Search journal entries" />
        </div>
        <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
          {[['all','All'], ...MOODS.map(m=>[m.emoji,m.emoji])].map(([f,l]) => (
            <button key={f} className={`filter-btn ${moodFilter===f?'active':''}`}
              onClick={() => setMoodFilter(f)}>{l}</button>
          ))}
        </div>
        <button className="btn-new" onClick={() => onOpenEditor(null)}>+ New Entry</button>
      </div>
 
      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="No entries found" desc="Try a different search or mood filter, or write something new!" />
      ) : (
        Object.entries(grouped).filter(([,v]) => v.length > 0).map(([group, items]) => (
          <div className="timeline-sec" key={group}>
            <div className="tl-label">{group}</div>
            <div className="entry-list">{items.map(e => <EntryCard key={e.id} entry={e} onOpen={onOpenEditor} />)}</div>
          </div>
        ))
      )}
 
      <button className="fab" onClick={() => onOpenEditor(null)} aria-label="New journal entry">+</button>
    </div>
  );
}
 
// ============================================================
// CALENDAR PAGE
// ============================================================
function CalendarPage({ onOpenEditor }) {
  const { entries } = useJournal();
  const [month, setMonth] = useState(() => new Date());
  const [selected, setSelected] = useState(utils.today());
 
  const entryDates = useMemo(() => {
    const set = new Set();
    entries.forEach(e => set.add(e.date.split('T')[0]));
    return set;
  }, [entries]);
 
  const calDays = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const daysInMonth = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
    const daysInPrev = new Date(month.getFullYear(), month.getMonth(), 0).getDate();
    const startDay = first.getDay();
    const today = utils.today();
    const cells = [];
    for (let i = startDay-1; i >= 0; i--)
      cells.push({ day: daysInPrev-i, other: true });
    for (let i = 1; i <= daysInMonth; i++) {
      const ds = `${month.getFullYear()}-${String(month.getMonth()+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
      cells.push({ day: i, ds, today: ds===today, hasEntry: entryDates.has(ds), sel: ds===selected });
    }
    const remaining = (7 - cells.length % 7) % 7;
    for (let i = 1; i <= remaining; i++) cells.push({ day: i, other: true });
    return cells;
  }, [month, entryDates, selected]);
 
  const selectedEntries = useMemo(() => entries.filter(e => e.date.startsWith(selected)), [entries, selected]);
 
  const changeMonth = (dir) => setMonth(m => new Date(m.getFullYear(), m.getMonth()+dir, 1));
 
  return (
    <div className="cal-wrap">
      <div className="page-title">Calendar</div>
      <div className="page-sub">Your journaling journey, at a glance.</div>
 
      <div className="section-card">
        <div className="cal-hd">
          <div className="cal-nav">
            <button className="cal-btn" onClick={() => changeMonth(-1)} aria-label="Previous month">‹</button>
            <button className="cal-btn" onClick={() => changeMonth(1)} aria-label="Next month">›</button>
          </div>
          <div className="cal-month">{MONTHS[month.getMonth()]} {month.getFullYear()}</div>
          <button className="filter-btn" onClick={() => { setMonth(new Date()); setSelected(utils.today()); }}>Today</button>
        </div>
        <div className="cal-grid-wrap" role="grid" aria-label="Calendar">
          {DAYS_SHORT.map(d => <div key={d} className="cal-dname" role="columnheader">{d}</div>)}
          {calDays.map((c, i) => (
            <button key={i} className={[
              'cal-cell',
              c.other?'other-m':'',c.today?'today':'',c.hasEntry?'has-entry':'',c.sel?'sel':''
            ].filter(Boolean).join(' ')}
              onClick={() => !c.other && setSelected(c.ds)}
              disabled={c.other}
              role="gridcell"
              aria-label={c.ds ? `${c.ds}${c.hasEntry?' has entries':''}` : ''}
              aria-selected={c.sel}
            >{c.day}</button>
          ))}
        </div>
      </div>
 
      <div className="cal-preview">
        <div style={{fontSize:13,color:'var(--text-3)',marginBottom:12}}>
          {selected ? new Date(selected+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}) : 'Select a date'}
        </div>
        {selectedEntries.length === 0
          ? <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <span className="cal-empty">No entries on this day.</span>
              <span className="link" onClick={() => onOpenEditor(null)} style={{fontSize:13}}>Write one →</span>
            </div>
          : <div className="entry-list">{selectedEntries.map(e => <EntryCard key={e.id} entry={e} onOpen={onOpenEditor} />)}</div>
        }
      </div>
    </div>
  );
}
 
// ============================================================
// ANALYTICS PAGE
// ============================================================
function AnalyticsPage() {
  const { entries, stats } = useJournal();
 
  const heatmap = useMemo(() => {
    const counts = {};
    entries.forEach(e => { const d = e.date.split('T')[0]; counts[d]=(counts[d]||0)+1; });
    const today = new Date();
    return Array.from({length:90}, (_,i) => {
      const d = new Date(today); d.setDate(d.getDate()-(89-i));
      const s = utils.fmtDate(d); const c = counts[s]||0;
      return { s, c, lvl: c===0?0:c===1?1:c===2?2:3 };
    });
  }, [entries]);
 
  const moodMax = Math.max(...MOODS.map(m => stats.moodCounts[m.emoji]||0), 1);
 
  const insights = [
    { icon:'📖', text: <>You've written <strong>{stats.total} {stats.total===1?'entry':'entries'}</strong> totalling <strong>{stats.totalWords} words</strong>. That's {Math.round(stats.totalWords/250)} pages of your life story!</> },
    { icon:'🔥', text: stats.streak > 0 ? <>You're on a <strong>{stats.streak}-day streak</strong>! Consistency is the key to a reflective life.</> : <>Start your streak today — even one sentence counts!</> },
    { icon:'💜', text: stats.topMood ? <>Your most frequent mood is <strong>{stats.topMood}</strong>. Your emotional landscape tells a story of who you are.</> : <>Log moods when writing to unlock emotional pattern insights.</> },
    { icon:'✍️', text: stats.totalWords > 0 ? <>Your average entry is <strong>{Math.round(stats.totalWords/Math.max(stats.total,1))} words</strong>. Reflective writers are the most self-aware.</> : <>Start writing to discover your unique journaling style!</> },
  ];
 
  return (
    <div className="analytics-wrap">
      <div className="page-title">Insights</div>
      <div className="page-sub">Understanding your inner world through data.</div>
      <div className="an-grid">
 
        <div className="an-card">
          <h3>Writing Activity (Last 7 Days)</h3>
          <BarChart entries={entries} />
          <div style={{fontSize:11,color:'var(--text-3)',marginTop:7,textAlign:'center'}}>Entries per day</div>
        </div>
 
        <div className="an-card">
          <h3>Mood Distribution</h3>
          <div className="mood-hist">
            {MOODS.map(m => {
              const cnt = stats.moodCounts[m.emoji]||0;
              const h = Math.round((cnt/moodMax)*80);
              return (
                <div className="mh-bar-wrap" key={m.emoji}>
                  <div style={{height:80-h}} />
                  <div className="mh-bar" style={{height:h,background:m.color}} title={`${m.label}: ${cnt}`} />
                  <div className="mh-em">{m.emoji}</div>
                  <div className="mh-cnt">{cnt}</div>
                </div>
              );
            })}
          </div>
        </div>
 
        <div className="an-card" style={{gridColumn:'1/-1'}}>
          <h3>Activity Heatmap (Last 90 Days)</h3>
          <div className="heatmap" role="grid" aria-label="Activity heatmap">
            {heatmap.map((cell, i) => (
              <div key={i} className={`hm-cell hm-${cell.lvl}`} title={`${cell.s}: ${cell.c} entries`} role="gridcell" aria-label={`${cell.s}: ${cell.c} entries`} />
            ))}
          </div>
          <div style={{display:'flex',gap:7,alignItems:'center',marginTop:11,fontSize:11.5,color:'var(--text-3)'}}>
            <span>Less</span>
            {[0,1,2,3].map(l => <div key={l} className={`hm-cell hm-${l}`} style={{width:12,height:12}} />)}
            <span>More</span>
          </div>
        </div>
 
        <div className="an-card" style={{gridColumn:'1/-1'}}>
          <h3>Emotional Insights</h3>
          <div className="insight-list">
            {insights.map((ins,i) => (
              <div key={i} className="insight">
                <span className="insight-ic">{ins.icon}</span>
                <span className="insight-txt">{ins.text}</span>
              </div>
            ))}
          </div>
        </div>
 
      </div>
    </div>
  );
}
 
// ============================================================
// SETTINGS PAGE
// ============================================================
function SettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const { dark, setDark, accent, setAccent, ACCENTS } = useTheme();
  const { entries, stats } = useJournal();
  const toast = useToastCtx();
  const [settings, setSettings] = useLocalStorage('serene_prefs', { autosave:true, reminder:false, sound:false, focusBlur:true });
  const [nameInput, setNameInput] = useState(user?.name || '');
 
  const togglePref = (key) => {
    setSettings(s => ({...s, [key]: !s[key]}));
    toast(`${key} ${!settings[key] ? 'enabled' : 'disabled'}`, 'success');
  };
 
  const saveProfile = () => {
    if (!nameInput.trim()) { toast('Name cannot be empty', 'error'); return; }
    updateUser({ name: nameInput.trim() });
    toast('Profile updated ✓', 'success');
  };
 
  const exportEntries = () => {
    if (!entries.length) { toast('No entries to export', ''); return; }
    const text = entries.map(e => [
      `# ${e.title||'Untitled'}`,
      `Date: ${new Date(e.date).toLocaleString()}`,
      `Mood: ${e.mood||'—'}`,
      `Tags: ${(e.tags||[]).join(', ')||'—'}`,
      '', e.content, '---',
    ].join('\n')).join('\n\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text],{type:'text/plain'}));
    a.download = 'serene-journal.txt';
    a.click();
    toast('Journal exported ✓', 'success');
  };
 
  const ACCENT_LIST = [
    { key:'lavender', bg:'linear-gradient(135deg,#9B7DD4,#7AAED4)', label:'Lavender' },
    { key:'blush',    bg:'linear-gradient(135deg,#D46888,#F0A0A0)', label:'Blush' },
    { key:'sage',     bg:'linear-gradient(135deg,#5A9A78,#4A8090)', label:'Sage' },
    { key:'amber',    bg:'linear-gradient(135deg,#C07838,#C0A038)', label:'Amber' },
  ];
 
  return (
    <div className="settings-wrap">
      <div className="page-title">Settings</div>
      <div className="page-sub">Customize your Serene experience.</div>
 
      <div className="settings-sec">
        <h3>Profile</h3>
        <div className="profile-row">
          <div className="avatar">{(user?.name||'A')[0].toUpperCase()}</div>
          <div>
            <div style={{fontSize:17,fontWeight:600}}>{user?.name}</div>
            <div style={{fontSize:13,color:'var(--text-3)'}}>{user?.email}</div>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="settName">Display Name</label>
          <input id="settName" type="text" className="form-input" value={nameInput}
            onChange={e => setNameInput(e.target.value)} placeholder="Your name" />
        </div>
        <button className="btn-primary" style={{width:'auto',padding:'10px 22px',fontSize:14}} onClick={saveProfile}>
          Save Changes
        </button>
      </div>
 
      <div className="settings-sec">
        <h3>Appearance</h3>
        <div className="setting-row">
          <div className="setting-info"><h4>Dark Mode</h4><p>Switch between light and dark themes</p></div>
          <Toggle on={dark} onChange={setDark} />
        </div>
        <div className="setting-row">
          <div className="setting-info"><h4>Color Accent</h4><p>Choose your preferred color theme</p></div>
          <div className="swatch-row">
            {ACCENT_LIST.map(a => (
              <div key={a.key} className={`swatch ${accent===a.key?'active':''}`}
                style={{background:a.bg}} onClick={() => setAccent(a.key)} title={a.label} role="button" aria-label={a.label} tabIndex={0} />
            ))}
          </div>
        </div>
      </div>
 
      <div className="settings-sec">
        <h3>Journal Preferences</h3>
        {[
          { key:'autosave', label:'Auto-save Drafts', desc:'Automatically save as you type' },
          { key:'reminder', label:'Daily Reminder', desc:'Get reminded to journal each day' },
          { key:'sound',    label:'Typing Sounds',   desc:'Subtle typewriter sound effects' },
          { key:'focusBlur',label:'Focus Mode Blur', desc:'Blur background in focus mode' },
        ].map(s => (
          <div key={s.key} className="setting-row">
            <div className="setting-info"><h4>{s.label}</h4><p>{s.desc}</p></div>
            <Toggle on={!!settings[s.key]} onChange={() => togglePref(s.key)} />
          </div>
        ))}
      </div>
 
      <div className="settings-sec">
        <h3>Data</h3>
        <div className="setting-row">
          <div className="setting-info">
            <h4>Export All Entries</h4>
            <p>{entries.length} entries · {stats.totalWords} total words</p>
          </div>
          <button className="filter-btn" onClick={exportEntries}>Export .txt</button>
        </div>
        <div className="setting-row">
          <div className="setting-info"><h4>Storage Used</h4><p>Stored in your browser's localStorage</p></div>
          <span style={{fontSize:13,color:'var(--text-3)'}}>Local</span>
        </div>
        <button className="btn-danger" onClick={() => { logout(); }}>Sign Out of Serene</button>
      </div>
    </div>
  );
}
 
// ============================================================
// MAIN APP (Router + Editor Orchestration)
// ============================================================
function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editorPrompt, setEditorPrompt] = useState('');
 
  const openEditor = useCallback((id = null, prompt = '') => {
    setEditingId(id);
    setEditorPrompt(prompt);
    setEditorOpen(true);
  }, []);
 
  const closeEditor = useCallback(() => {
    setEditorOpen(false);
    setEditingId(null);
    setEditorPrompt('');
  }, []);
 
  const handleLoginSuccess = () => setPage('dashboard');
 
  if (!user) {
    return <AuthPage onSuccess={handleLoginSuccess} />;
  }
 
  const pages = {
    dashboard: <DashboardPage onOpenEditor={openEditor} />,
    journal:   <JournalPage onOpenEditor={openEditor} />,
    calendar:  <CalendarPage onOpenEditor={openEditor} />,
    analytics: <AnalyticsPage />,
    settings:  <SettingsPage />,
  };
 
  return (
    <div className="page-wrap">
      <Navbar page={page} setPage={setPage} />
      {pages[page] || pages.dashboard}
      <EditorOverlay open={editorOpen} entryId={editingId} onClose={closeEditor} initialPrompt={editorPrompt} />
    </div>
  );
}
 
// ============================================================
// ROOT APP (Providers + Styles)
// ============================================================
export default function App() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = GLOBAL_STYLES;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
 
  return (
    <ThemeProvider>
      <AuthProvider>
        <JournalProvider>
          <ToastProvider>
            <BlobBackground />
            <AppContent />
          </ToastProvider>
        </JournalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}