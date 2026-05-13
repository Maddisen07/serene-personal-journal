[index.html](https://github.com/user-attachments/files/27705758/index.html)
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Serene — Your Daily Journal</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
  :root {
    --lavender: #C8B8E8;
    --lavender-light: #EDE8F7;
    --lavender-deep: #9B7DD4;
    --blush: #F2CDD6;
    --blush-deep: #E8A0B4;
    --sage: #B8D4C8;
    --sage-deep: #7AAF98;
    --sky: #BDD8F0;
    --sky-deep: #7AAED4;
    --peach: #F7E0CC;
    --warm-beige: #FAF6F0;
    --cream: #FDFBF8;
    --charcoal: #2D2D3A;
    --charcoal-soft: #3D3D50;
    --text-primary: #2A2A3D;
    --text-secondary: #6B6B85;
    --text-muted: #9898B0;
    --white: #FFFFFF;
    --card-bg: rgba(255,255,255,0.72);
    --card-border: rgba(200,184,232,0.25);
    --shadow-soft: 0 4px 24px rgba(155,125,212,0.10);
    --shadow-medium: 0 8px 40px rgba(155,125,212,0.15);
    --shadow-hover: 0 16px 48px rgba(155,125,212,0.22);
    --radius-sm: 12px;
    --radius-md: 18px;
    --radius-lg: 24px;
    --radius-xl: 32px;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --nav-h: 68px;
    --bg-gradient: linear-gradient(135deg, #F5F0FF 0%, #FFF0F5 35%, #F0F8FF 65%, #F5FFF0 100%);
  }
  [data-theme="dark"] {
    --lavender: #7B5EA7;
    --lavender-light: #2A2040;
    --lavender-deep: #A882D8;
    --blush: #5C3044;
    --blush-deep: #C47095;
    --sage: #2A4038;
    --sage-deep: #5A8C78;
    --sky: #1C3348;
    --sky-deep: #5A8AB0;
    --peach: #3D2A1C;
    --warm-beige: #1A1A24;
    --cream: #16161E;
    --charcoal: #E8E8F0;
    --charcoal-soft: #C8C8D8;
    --text-primary: #E8E8F2;
    --text-secondary: #A8A8C0;
    --text-muted: #6868808;
    --white: #1E1E2A;
    --card-bg: rgba(30,28,48,0.85);
    --card-border: rgba(155,125,212,0.20);
    --shadow-soft: 0 4px 24px rgba(0,0,0,0.30);
    --shadow-medium: 0 8px 40px rgba(0,0,0,0.40);
    --shadow-hover: 0 16px 48px rgba(0,0,0,0.50);
    --bg-gradient: linear-gradient(135deg, #0E0C18 0%, #180C18 35%, #0C1018 65%, #0C1810 100%);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg-gradient);
    min-height: 100vh;
    color: var(--text-primary);
    transition: background 0.5s ease, color 0.3s ease;
    overflow-x: hidden;
  }
  button { cursor: pointer; font-family: inherit; border: none; background: none; }
  input, textarea { font-family: inherit; }
  a { text-decoration: none; color: inherit; }

  /* ═══ GLASS CARD ═══ */
  .glass {
    background: var(--card-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-soft);
  }
  .glass:hover { box-shadow: var(--shadow-hover); }

  /* ═══ FLOATING BLOBS ═══ */
  .blob-bg {
    position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0;
  }
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.35;
    animation: blobFloat 12s ease-in-out infinite;
  }
  .blob-1 { width: 500px; height: 500px; background: var(--lavender); top: -100px; left: -100px; animation-delay: 0s; }
  .blob-2 { width: 400px; height: 400px; background: var(--blush); top: 30%; right: -80px; animation-delay: 3s; }
  .blob-3 { width: 350px; height: 350px; background: var(--sage); bottom: -80px; left: 30%; animation-delay: 6s; }
  .blob-4 { width: 300px; height: 300px; background: var(--sky); bottom: 20%; left: -60px; animation-delay: 9s; }
  @keyframes blobFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }

  /* ═══ APP SHELL ═══ */
  #app { position: relative; z-index: 1; min-height: 100vh; }
  .page { display: none; animation: pageFadeIn 0.5s ease; }
  .page.active { display: block; }
  @keyframes pageFadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  /* ═══ NAV ═══ */
  .nav {
    position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
    width: calc(100% - 40px); max-width: 900px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 20px;
    background: var(--card-bg);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--card-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-medium);
    z-index: 1000;
    transition: var(--transition);
  }
  .nav-brand { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--lavender-deep); letter-spacing: -0.5px; }
  .nav-links { display: flex; gap: 4px; align-items: center; }
  .nav-link {
    padding: 8px 14px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 500;
    color: var(--text-secondary); transition: var(--transition); cursor: pointer;
  }
  .nav-link:hover, .nav-link.active { background: var(--lavender-light); color: var(--lavender-deep); }
  .nav-actions { display: flex; gap: 8px; align-items: center; }
  .btn-icon {
    width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    background: var(--lavender-light); color: var(--lavender-deep); font-size: 18px;
    transition: var(--transition); cursor: pointer;
  }
  .btn-icon:hover { background: var(--lavender); transform: scale(1.08); }

  /* ═══ AUTH PAGES ═══ */
  .auth-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 20px;
  }
  .auth-wrap { display: grid; grid-template-columns: 1fr 1fr; max-width: 900px; width: 100%; min-height: 560px; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-medium); }
  .auth-panel {
    padding: 56px 48px;
    background: linear-gradient(135deg, var(--lavender-deep) 0%, #7B5DD4 50%, var(--sky-deep) 100%);
    display: flex; flex-direction: column; justify-content: center; color: white;
  }
  .auth-panel h1 { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; line-height: 1.2; margin-bottom: 20px; }
  .auth-panel p { font-size: 16px; line-height: 1.7; opacity: 0.85; margin-bottom: 32px; }
  .auth-panel .quote { font-family: 'Lora', serif; font-style: italic; font-size: 15px; opacity: 0.75; border-left: 3px solid rgba(255,255,255,0.4); padding-left: 16px; }
  .auth-form-panel { padding: 48px; background: var(--card-bg); backdrop-filter: blur(20px); display: flex; flex-direction: column; justify-content: center; }
  .auth-form-panel h2 { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
  .auth-form-panel p { font-size: 14px; color: var(--text-secondary); margin-bottom: 32px; }
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 13px; font-weight: 500; color: var(--text-secondary); margin-bottom: 6px; }
  .form-input {
    width: 100%; padding: 12px 16px; border-radius: var(--radius-sm);
    border: 1.5px solid var(--card-border); background: var(--cream);
    font-size: 15px; color: var(--text-primary); outline: none;
    transition: var(--transition);
  }
  .form-input:focus { border-color: var(--lavender-deep); box-shadow: 0 0 0 3px rgba(155,125,212,0.15); }
  .form-input-wrap { position: relative; }
  .input-eye { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); cursor: pointer; color: var(--text-muted); font-size: 16px; }
  .form-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; font-size: 13px; }
  .form-check { display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-secondary); }
  .form-link { color: var(--lavender-deep); cursor: pointer; }
  .form-link:hover { text-decoration: underline; }
  .btn-primary {
    width: 100%; padding: 14px; border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--lavender-deep), var(--sky-deep));
    color: white; font-size: 15px; font-weight: 600; letter-spacing: 0.3px;
    transition: var(--transition); box-shadow: 0 4px 20px rgba(155,125,212,0.35);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(155,125,212,0.45); }
  .btn-primary:active { transform: translateY(0); }
  .auth-switch { text-align: center; margin-top: 20px; font-size: 13px; color: var(--text-secondary); }
  .error-msg { font-size: 12px; color: #E24B4A; margin-top: 4px; display: none; }
  .error-msg.show { display: block; }

  /* ═══ DASHBOARD ═══ */
  .dashboard { padding: calc(var(--nav-h) + 32px) 24px 100px; max-width: 1100px; margin: 0 auto; }
  .hero-section { margin-bottom: 40px; }
  .greeting { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 700; color: var(--text-primary); line-height: 1.2; }
  .greeting span { color: var(--lavender-deep); }
  .hero-sub { font-size: 16px; color: var(--text-secondary); margin-top: 8px; }
  .hero-date { font-size: 14px; color: var(--text-muted); margin-top: 4px; }
  .hero-clock { font-family: 'Lora', serif; font-size: 48px; font-weight: 400; color: var(--lavender-deep); margin-top: 8px; letter-spacing: -1px; }

  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
  .stat-card {
    padding: 20px 22px; background: var(--card-bg); backdrop-filter: blur(20px);
    border: 1px solid var(--card-border); border-radius: var(--radius-md);
    box-shadow: var(--shadow-soft); transition: var(--transition);
  }
  .stat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
  .stat-icon { font-size: 24px; margin-bottom: 10px; }
  .stat-val { font-size: 32px; font-weight: 600; color: var(--text-primary); font-family: 'Lora', serif; }
  .stat-label { font-size: 13px; color: var(--text-secondary); margin-top: 2px; }

  .dash-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; }
  .dash-main { display: flex; flex-direction: column; gap: 24px; }
  .dash-side { display: flex; flex-direction: column; gap: 20px; }

  .section-card {
    background: var(--card-bg); backdrop-filter: blur(20px);
    border: 1px solid var(--card-border); border-radius: var(--radius-lg);
    box-shadow: var(--shadow-soft); padding: 28px; transition: var(--transition);
  }
  .section-title { font-size: 15px; font-weight: 600; color: var(--text-secondary); letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 20px; }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  .section-header .section-title { margin-bottom: 0; }

  /* Mood Tracker */
  .mood-grid { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
  .mood-btn {
    padding: 10px 16px; border-radius: var(--radius-md); background: var(--lavender-light);
    border: 2px solid transparent; font-size: 20px; cursor: pointer; transition: var(--transition);
    display: flex; flex-direction: column; align-items: center; gap: 4px;
  }
  .mood-btn span { font-size: 11px; color: var(--text-secondary); font-weight: 500; }
  .mood-btn:hover { transform: scale(1.1); border-color: var(--lavender); }
  .mood-btn.selected { border-color: var(--lavender-deep); background: var(--lavender); }
  .mood-slider-wrap { display: flex; align-items: center; gap: 12px; }
  .mood-slider { flex: 1; accent-color: var(--lavender-deep); height: 4px; }
  .mood-intensity { font-size: 13px; color: var(--text-muted); }

  /* Quote */
  .quote-card { position: relative; overflow: hidden; }
  .quote-mark { font-family: 'Playfair Display', serif; font-size: 80px; color: var(--lavender); line-height: 0.6; position: absolute; top: 20px; left: 20px; opacity: 0.4; }
  .quote-text { font-family: 'Lora', serif; font-style: italic; font-size: 17px; line-height: 1.7; color: var(--text-primary); position: relative; z-index: 1; padding-top: 8px; }
  .quote-author { font-size: 13px; color: var(--text-muted); margin-top: 12px; }
  .quote-nav { display: flex; gap: 8px; margin-top: 16px; }
  .quote-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--lavender); cursor: pointer; transition: var(--transition); }
  .quote-dot.active { background: var(--lavender-deep); width: 18px; border-radius: 3px; }

  /* Streak */
  .streak-card { text-align: center; padding: 24px; }
  .streak-num { font-family: 'Playfair Display', serif; font-size: 56px; color: var(--lavender-deep); font-weight: 700; line-height: 1; }
  .streak-label { font-size: 14px; color: var(--text-secondary); margin-top: 4px; }
  .streak-days { display: flex; gap: 6px; justify-content: center; margin-top: 16px; }
  .streak-day { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; }
  .streak-day.filled { background: var(--lavender-deep); color: white; }
  .streak-day.partial { background: var(--lavender); color: var(--lavender-deep); }
  .streak-day.empty { background: var(--lavender-light); color: var(--text-muted); }

  /* Recent entries */
  .entry-list { display: flex; flex-direction: column; gap: 14px; }
  .entry-preview {
    padding: 18px 20px; background: var(--card-bg); backdrop-filter: blur(12px);
    border: 1px solid var(--card-border); border-radius: var(--radius-md);
    cursor: pointer; transition: var(--transition); position: relative; overflow: hidden;
  }
  .entry-preview::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
    border-radius: 4px 0 0 4px; background: var(--lavender-deep);
  }
  .entry-preview:hover { transform: translateX(4px); box-shadow: var(--shadow-hover); }
  .entry-preview-title { font-size: 15px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
  .entry-preview-meta { display: flex; gap: 12px; font-size: 12px; color: var(--text-muted); align-items: center; }
  .entry-preview-mood { font-size: 16px; }
  .entry-preview-snippet { font-size: 13px; color: var(--text-secondary); margin-top: 6px; line-height: 1.5; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .tag { display: inline-block; padding: 3px 10px; background: var(--lavender-light); color: var(--lavender-deep); border-radius: 100px; font-size: 11px; font-weight: 500; }
  .entry-tags { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }

  /* FAB */
  .fab {
    position: fixed; bottom: 32px; right: 32px; width: 60px; height: 60px;
    border-radius: 50%; background: linear-gradient(135deg, var(--lavender-deep), var(--sky-deep));
    color: white; font-size: 28px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 32px rgba(155,125,212,0.4); cursor: pointer;
    transition: var(--transition); z-index: 500;
    animation: fabPulse 3s ease-in-out infinite;
  }
  .fab:hover { transform: scale(1.12) rotate(45deg); box-shadow: 0 12px 40px rgba(155,125,212,0.55); animation: none; }
  @keyframes fabPulse {
    0%, 100% { box-shadow: 0 8px 32px rgba(155,125,212,0.4); }
    50% { box-shadow: 0 8px 40px rgba(155,125,212,0.6), 0 0 0 8px rgba(155,125,212,0.1); }
  }

  /* ═══ JOURNAL PAGE ═══ */
  .journal-page { padding: calc(var(--nav-h) + 32px) 24px 100px; max-width: 1100px; margin: 0 auto; }
  .journal-toolbar {
    display: flex; align-items: center; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;
  }
  .search-wrap { position: relative; flex: 1; min-width: 220px; }
  .search-input {
    width: 100%; padding: 11px 16px 11px 40px;
    background: var(--card-bg); border: 1.5px solid var(--card-border);
    border-radius: var(--radius-md); font-size: 14px; color: var(--text-primary);
    backdrop-filter: blur(12px); outline: none; transition: var(--transition);
  }
  .search-input:focus { border-color: var(--lavender-deep); }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 16px; color: var(--text-muted); }
  .filter-btn {
    padding: 11px 16px; background: var(--card-bg); border: 1.5px solid var(--card-border);
    border-radius: var(--radius-md); font-size: 13px; font-weight: 500; color: var(--text-secondary);
    cursor: pointer; transition: var(--transition); backdrop-filter: blur(12px);
  }
  .filter-btn:hover, .filter-btn.active { border-color: var(--lavender-deep); color: var(--lavender-deep); background: var(--lavender-light); }
  .btn-new-entry {
    padding: 11px 20px; border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--lavender-deep), var(--sky-deep));
    color: white; font-size: 14px; font-weight: 600; cursor: pointer;
    transition: var(--transition); box-shadow: 0 4px 16px rgba(155,125,212,0.3);
  }
  .btn-new-entry:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(155,125,212,0.4); }

  .timeline-section { margin-bottom: 32px; }
  .timeline-label { font-size: 13px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
  .timeline-label::after { content: ''; flex: 1; height: 1px; background: var(--card-border); }

  /* ═══ EDITOR ═══ */
  .editor-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.3); backdrop-filter: blur(8px);
    z-index: 900; display: flex; align-items: flex-end; justify-content: center;
    padding: 0 0 0 0; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
  }
  .editor-overlay.open { opacity: 1; pointer-events: all; }
  .editor-sheet {
    background: var(--cream); width: 100%; max-width: 780px;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    box-shadow: 0 -20px 60px rgba(0,0,0,0.2);
    transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
    max-height: 92vh; overflow-y: auto;
  }
  .editor-overlay.open .editor-sheet { transform: translateY(0); }
  .editor-header {
    padding: 20px 28px 0; display: flex; justify-content: space-between; align-items: center;
    position: sticky; top: 0; background: var(--cream); z-index: 10;
    border-bottom: 1px solid var(--card-border); padding-bottom: 16px;
  }
  .editor-meta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .editor-date { font-size: 13px; color: var(--text-muted); }
  .editor-mood-pick { display: flex; gap: 8px; }
  .mood-pick-btn { font-size: 20px; cursor: pointer; opacity: 0.5; transition: var(--transition); }
  .mood-pick-btn:hover, .mood-pick-btn.selected { opacity: 1; transform: scale(1.2); }
  .editor-actions { display: flex; gap: 8px; }
  .editor-body { padding: 20px 28px 40px; }
  .editor-title-input {
    width: 100%; border: none; outline: none; background: transparent;
    font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700;
    color: var(--text-primary); line-height: 1.3; margin-bottom: 16px;
    resize: none; overflow: hidden;
  }
  .editor-title-input::placeholder { color: var(--text-muted); }
  .editor-content-input {
    width: 100%; border: none; outline: none; background: transparent;
    font-family: 'Lora', serif; font-size: 17px; color: var(--text-primary);
    line-height: 1.9; resize: none; min-height: 300px;
  }
  .editor-content-input::placeholder { color: var(--text-muted); font-style: italic; }
  .editor-tags-input { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--card-border); }
  .tag-input {
    border: none; outline: none; background: transparent;
    font-size: 13px; color: var(--text-secondary); min-width: 80px;
  }
  .editor-footer { display: flex; justify-content: space-between; align-items: center; padding: 14px 28px; border-top: 1px solid var(--card-border); background: var(--cream); }
  .word-count { font-size: 12px; color: var(--text-muted); }
  .editor-save-btn {
    padding: 10px 24px; border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--lavender-deep), var(--sky-deep));
    color: white; font-size: 14px; font-weight: 600; cursor: pointer;
    transition: var(--transition); box-shadow: 0 4px 14px rgba(155,125,212,0.3);
  }
  .editor-save-btn:hover { transform: translateY(-1px); }
  .autosave-status { font-size: 12px; color: var(--sage-deep); }

  /* ═══ CALENDAR ═══ */
  .calendar-page { padding: calc(var(--nav-h) + 32px) 24px 100px; max-width: 900px; margin: 0 auto; }
  .cal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
  .cal-month { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; }
  .cal-nav { display: flex; gap: 8px; }
  .cal-btn {
    width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    background: var(--card-bg); border: 1px solid var(--card-border); cursor: pointer;
    font-size: 18px; transition: var(--transition); color: var(--text-secondary);
  }
  .cal-btn:hover { background: var(--lavender-light); color: var(--lavender-deep); }
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
  .cal-day-name { text-align: center; font-size: 12px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.5px; padding: 8px 0; }
  .cal-cell {
    aspect-ratio: 1; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center;
    font-size: 14px; cursor: pointer; transition: var(--transition); position: relative;
    color: var(--text-secondary);
  }
  .cal-cell:hover { background: var(--lavender-light); color: var(--lavender-deep); }
  .cal-cell.today { background: var(--lavender); color: var(--lavender-deep); font-weight: 600; }
  .cal-cell.has-entry { color: var(--text-primary); font-weight: 600; }
  .cal-cell.has-entry::after {
    content: ''; position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%);
    width: 5px; height: 5px; border-radius: 50%; background: var(--lavender-deep);
  }
  .cal-cell.other-month { opacity: 0.3; }
  .cal-cell.selected { background: var(--lavender-deep); color: white; }

  .cal-preview {
    margin-top: 24px; padding: 24px; background: var(--card-bg); backdrop-filter: blur(20px);
    border: 1px solid var(--card-border); border-radius: var(--radius-lg);
    min-height: 120px; box-shadow: var(--shadow-soft);
  }
  .cal-preview-date { font-size: 14px; color: var(--text-muted); margin-bottom: 12px; }
  .cal-empty { font-family: 'Lora', serif; font-style: italic; color: var(--text-muted); font-size: 15px; }

  /* ═══ ANALYTICS ═══ */
  .analytics-page { padding: calc(var(--nav-h) + 32px) 24px 100px; max-width: 1000px; margin: 0 auto; }
  .analytics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .analytics-card { padding: 24px; background: var(--card-bg); backdrop-filter: blur(20px); border: 1px solid var(--card-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-soft); }
  .analytics-card h3 { font-size: 14px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; }
  .chart-bars { display: flex; align-items: flex-end; gap: 6px; height: 120px; }
  .chart-bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .chart-bar {
    width: 100%; border-radius: 6px 6px 0 0;
    background: linear-gradient(180deg, var(--lavender-deep), var(--sky-deep));
    transition: all 0.5s ease; cursor: pointer;
    animation: barGrow 0.6s ease forwards; transform-origin: bottom;
  }
  @keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
  .chart-bar-label { font-size: 10px; color: var(--text-muted); }
  .mood-histogram { display: flex; gap: 8px; flex-wrap: wrap; }
  .mood-hist-item { flex: 1; min-width: 60px; text-align: center; }
  .mood-hist-bar-wrap { height: 80px; display: flex; align-items: flex-end; justify-content: center; }
  .mood-hist-bar { width: 28px; border-radius: 6px 6px 0 0; transition: height 0.5s ease; }
  .mood-hist-emoji { font-size: 18px; margin-top: 6px; }
  .mood-hist-count { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .insight-list { display: flex; flex-direction: column; gap: 12px; }
  .insight-item { display: flex; gap: 12px; align-items: flex-start; padding: 14px; background: var(--lavender-light); border-radius: var(--radius-sm); }
  .insight-icon { font-size: 22px; }
  .insight-text { font-size: 14px; color: var(--text-secondary); line-height: 1.5; }
  .insight-text strong { color: var(--text-primary); }
  .heatmap-grid { display: grid; grid-template-columns: repeat(15, 1fr); gap: 4px; }
  .heatmap-cell { aspect-ratio: 1; border-radius: 3px; transition: var(--transition); cursor: pointer; }
  .heatmap-cell:hover { transform: scale(1.3); }
  .heatmap-0 { background: var(--lavender-light); }
  .heatmap-1 { background: var(--lavender); }
  .heatmap-2 { background: var(--lavender-deep); opacity: 0.7; }
  .heatmap-3 { background: var(--lavender-deep); }

  /* ═══ SETTINGS ═══ */
  .settings-page { padding: calc(var(--nav-h) + 32px) 24px 100px; max-width: 700px; margin: 0 auto; }
  .settings-section { margin-bottom: 32px; padding: 28px; background: var(--card-bg); backdrop-filter: blur(20px); border: 1px solid var(--card-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-soft); }
  .settings-section h3 { font-size: 17px; font-weight: 600; margin-bottom: 20px; color: var(--text-primary); }
  .setting-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--card-border); }
  .setting-row:last-child { border-bottom: none; }
  .setting-info h4 { font-size: 15px; font-weight: 500; color: var(--text-primary); }
  .setting-info p { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
  .toggle {
    width: 48px; height: 26px; border-radius: 13px; background: var(--lavender-light);
    border: 1px solid var(--card-border); cursor: pointer; position: relative;
    transition: background 0.3s ease;
  }
  .toggle.on { background: var(--lavender-deep); }
  .toggle::after {
    content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px;
    border-radius: 50%; background: white; transition: transform 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
  }
  .toggle.on::after { transform: translateX(22px); }
  .theme-picker { display: flex; gap: 10px; }
  .theme-swatch {
    width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
    border: 3px solid transparent; transition: var(--transition);
  }
  .theme-swatch.active { border-color: var(--lavender-deep); transform: scale(1.15); }
  .settings-profile { display: flex; gap: 16px; align-items: center; margin-bottom: 20px; }
  .avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, var(--lavender-deep), var(--sky-deep)); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: 600; }
  .profile-name { font-size: 18px; font-weight: 600; }
  .profile-email { font-size: 14px; color: var(--text-muted); }
  .btn-logout { width: 100%; padding: 12px; border-radius: var(--radius-md); border: 1.5px solid #E24B4A; color: #E24B4A; font-size: 14px; font-weight: 600; cursor: pointer; transition: var(--transition); margin-top: 8px; }
  .btn-logout:hover { background: #E24B4A; color: white; }

  /* ═══ TOAST ═══ */
  .toast-container { position: fixed; bottom: 100px; right: 24px; z-index: 9000; display: flex; flex-direction: column; gap: 8px; }
  .toast {
    padding: 12px 20px; border-radius: var(--radius-md);
    background: var(--charcoal); color: white; font-size: 14px; font-weight: 500;
    box-shadow: var(--shadow-medium); animation: toastIn 0.3s ease;
    display: flex; align-items: center; gap: 10px;
  }
  .toast.success { background: var(--sage-deep); }
  .toast.error { background: #E24B4A; }
  @keyframes toastIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }

  /* ═══ EMPTY STATE ═══ */
  .empty-state { text-align: center; padding: 60px 24px; }
  .empty-state .empty-icon { font-size: 56px; margin-bottom: 16px; opacity: 0.6; }
  .empty-state h3 { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--text-primary); margin-bottom: 8px; }
  .empty-state p { font-size: 15px; color: var(--text-secondary); line-height: 1.6; max-width: 320px; margin: 0 auto; }

  /* ═══ FOCUS MODE ═══ */
  .focus-overlay {
    position: fixed; inset: 0; background: var(--cream);
    z-index: 1100; display: flex; flex-direction: column;
    opacity: 0; pointer-events: none; transition: opacity 0.5s ease;
  }
  .focus-overlay.open { opacity: 1; pointer-events: all; }
  .focus-header { padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; }
  .focus-title-input {
    width: 100%; border: none; outline: none; background: transparent;
    font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700;
    color: var(--text-primary); text-align: center; margin-bottom: 8px;
  }
  .focus-title-input::placeholder { color: var(--text-muted); }
  .focus-content {
    flex: 1; padding: 0 40px 40px; display: flex; flex-direction: column; max-width: 720px; margin: 0 auto; width: 100%;
  }
  .focus-area {
    flex: 1; border: none; outline: none; background: transparent; resize: none;
    font-family: 'Lora', serif; font-size: 20px; line-height: 2; color: var(--text-primary);
    width: 100%;
  }
  .focus-area::placeholder { color: var(--text-muted); font-style: italic; }
  .focus-footer { padding: 16px 40px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--card-border); }

  /* ═══ PROMPT CARDS ═══ */
  .prompts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
  .prompt-card {
    padding: 16px; border-radius: var(--radius-md); cursor: pointer;
    border: 1.5px solid var(--card-border); background: var(--card-bg);
    font-size: 14px; color: var(--text-secondary); line-height: 1.5;
    transition: var(--transition); backdrop-filter: blur(12px);
  }
  .prompt-card:hover { border-color: var(--lavender-deep); color: var(--lavender-deep); background: var(--lavender-light); transform: translateY(-2px); }
  .prompt-emoji { font-size: 24px; margin-bottom: 8px; }

  /* ═══ UTIL ═══ */
  .hidden { display: none !important; }
  .page-title { font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; margin-bottom: 8px; }
  .page-sub { font-size: 15px; color: var(--text-secondary); margin-bottom: 32px; }
  .flex { display: flex; }
  .gap-8 { gap: 8px; }
  .mt-auto { margin-top: auto; }
  .text-center { text-align: center; }
  @media (max-width: 768px) {
    .auth-wrap { grid-template-columns: 1fr; }
    .auth-panel { display: none; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .dash-grid { grid-template-columns: 1fr; }
    .analytics-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    .greeting { font-size: 28px; }
    .hero-clock { font-size: 36px; }
    .focus-title-input { font-size: 28px; }
    .focus-area { font-size: 17px; }
  }
</style>
</head>
<body>
<div class="blob-bg">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
  <div class="blob blob-4"></div>
</div>

<!-- TOAST -->
<div class="toast-container" id="toastContainer"></div>

<!-- NAV -->
<nav class="nav" id="mainNav" style="display:none">
  <div class="nav-brand">Serene</div>
  <div class="nav-links">
    <div class="nav-link active" data-page="dashboard">Home</div>
    <div class="nav-link" data-page="journal">Journal</div>
    <div class="nav-link" data-page="calendar">Calendar</div>
    <div class="nav-link" data-page="analytics">Insights</div>
    <div class="nav-link" data-page="settings">Settings</div>
  </div>
  <div class="nav-actions">
    <div class="btn-icon" id="themeToggle" title="Toggle theme">🌙</div>
    <div class="btn-icon" id="focusModeBtn" title="Focus mode">✏️</div>
  </div>
</nav>

<!-- APP -->
<div id="app">

<!-- ═══ LOGIN ═══ -->
<div class="page active" id="page-login">
  <div class="auth-page">
    <div class="auth-wrap glass">
      <div class="auth-panel">
        <h1>Your safe space to think, feel, and grow.</h1>
        <p>Serene is your private journaling companion — beautifully designed to help you reflect, track your moods, and uncover meaningful patterns in your life.</p>
        <div class="quote">"Writing in a journal reminds you of your goals and your learning in life." — Robin Sharma</div>
      </div>
      <div class="auth-form-panel">
        <h2>Welcome back</h2>
        <p>Sign in to your journal</p>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="loginEmail" placeholder="you@example.com">
          <div class="error-msg" id="loginEmailErr">Please enter a valid email</div>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="form-input-wrap">
            <input type="password" class="form-input" id="loginPass" placeholder="••••••••">
            <span class="input-eye" onclick="togglePwd('loginPass', this)">👁</span>
          </div>
          <div class="error-msg" id="loginPassErr">Password must be at least 6 characters</div>
        </div>
        <div class="form-row">
          <label class="form-check"><input type="checkbox" id="rememberMe"> Remember me</label>
          <span class="form-link">Forgot password?</span>
        </div>
        <button class="btn-primary" onclick="handleLogin()">Sign In</button>
        <div class="auth-switch">Don't have an account? <span class="form-link" onclick="goPage('signup')">Create one</span></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ SIGNUP ═══ -->
<div class="page" id="page-signup">
  <div class="auth-page">
    <div class="auth-wrap glass">
      <div class="auth-panel" style="background: linear-gradient(135deg, #7B9D7A 0%, #4A8070 50%, #2A6060 100%)">
        <h1>Begin your journey of self-discovery.</h1>
        <p>Join thousands of people who use Serene to journal daily, track their emotions, and build mindful habits that transform their lives.</p>
        <div class="quote">"The journey of a thousand miles begins with a single step." — Lao Tzu</div>
      </div>
      <div class="auth-form-panel">
        <h2>Create account</h2>
        <p>Start your journaling journey</p>
        <div class="form-group">
          <label class="form-label">Your Name</label>
          <input type="text" class="form-input" id="signupName" placeholder="Alex Morgan">
          <div class="error-msg" id="signupNameErr">Please enter your name</div>
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="signupEmail" placeholder="you@example.com">
          <div class="error-msg" id="signupEmailErr">Please enter a valid email</div>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="form-input-wrap">
            <input type="password" class="form-input" id="signupPass" placeholder="Min. 6 characters">
            <span class="input-eye" onclick="togglePwd('signupPass', this)">👁</span>
          </div>
          <div class="error-msg" id="signupPassErr">Password must be at least 6 characters</div>
        </div>
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <div class="form-input-wrap">
            <input type="password" class="form-input" id="signupPass2" placeholder="Repeat password">
            <span class="input-eye" onclick="togglePwd('signupPass2', this)">👁</span>
          </div>
          <div class="error-msg" id="signupPass2Err">Passwords do not match</div>
        </div>
        <button class="btn-primary" onclick="handleSignup()">Create Account</button>
        <div class="auth-switch">Already have an account? <span class="form-link" onclick="goPage('login')">Sign in</span></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ DASHBOARD ═══ -->
<div class="page" id="page-dashboard">
  <div class="dashboard">
    <div class="hero-section">
      <div id="heroGreeting" class="greeting">Good morning, <span id="heroName">Friend</span> ✨</div>
      <div class="hero-sub" id="heroSub">How are you feeling today?</div>
      <div class="hero-date" id="heroDate">Monday, January 1, 2025</div>
      <div class="hero-clock" id="heroClock">12:00</div>
    </div>

    <div class="stats-grid" id="statsGrid">
      <div class="stat-card">
        <div class="stat-icon">📖</div>
        <div class="stat-val" id="statEntries">0</div>
        <div class="stat-label">Total Entries</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🔥</div>
        <div class="stat-val" id="statStreak">0</div>
        <div class="stat-label">Day Streak</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">✍️</div>
        <div class="stat-val" id="statWords">0</div>
        <div class="stat-label">Words Written</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💜</div>
        <div class="stat-val" id="statMood">—</div>
        <div class="stat-label">Today's Mood</div>
      </div>
    </div>

    <div class="dash-grid">
      <div class="dash-main">

        <div class="section-card">
          <div class="section-title">Today's Mood</div>
          <div class="mood-grid" id="moodGrid">
            <button class="mood-btn" data-mood="😊" data-label="Happy" onclick="selectMood(this)"><span style="font-size:28px">😊</span><span>Happy</span></button>
            <button class="mood-btn" data-mood="😌" data-label="Calm" onclick="selectMood(this)"><span style="font-size:28px">😌</span><span>Calm</span></button>
            <button class="mood-btn" data-mood="😔" data-label="Sad" onclick="selectMood(this)"><span style="font-size:28px">😔</span><span>Sad</span></button>
            <button class="mood-btn" data-mood="😤" data-label="Anxious" onclick="selectMood(this)"><span style="font-size:28px">😤</span><span>Anxious</span></button>
            <button class="mood-btn" data-mood="🤩" data-label="Excited" onclick="selectMood(this)"><span style="font-size:28px">🤩</span><span>Excited</span></button>
            <button class="mood-btn" data-mood="😴" data-label="Tired" onclick="selectMood(this)"><span style="font-size:28px">😴</span><span>Tired</span></button>
          </div>
          <div class="mood-slider-wrap">
            <span style="font-size:13px;color:var(--text-muted)">Intensity</span>
            <input type="range" min="1" max="10" value="5" class="mood-slider" id="moodSlider" oninput="updateMoodIntensity(this.value)">
            <span class="mood-intensity" id="moodIntensityVal">5 / 10</span>
          </div>
        </div>

        <div class="section-card">
          <div class="section-header">
            <span class="section-title">Writing Prompts</span>
            <span style="font-size:12px;color:var(--lavender-deep);cursor:pointer" onclick="refreshPrompts()">↻ Refresh</span>
          </div>
          <div class="prompts-grid" id="promptsGrid"></div>
        </div>

        <div class="section-card">
          <div class="section-header">
            <span class="section-title">Recent Entries</span>
            <span style="font-size:13px;color:var(--lavender-deep);cursor:pointer" onclick="goPage('journal')">View all →</span>
          </div>
          <div id="recentEntries">
            <div class="empty-state">
              <div class="empty-icon">📝</div>
              <h3>Start your story</h3>
              <p>Your first journal entry is just a tap away. What's on your mind today?</p>
            </div>
          </div>
        </div>

      </div>
      <div class="dash-side">

        <div class="section-card quote-card" id="quoteCard">
          <div class="quote-mark">"</div>
          <div class="quote-text" id="quoteText">Loading your daily inspiration...</div>
          <div class="quote-author" id="quoteAuthor">— Serene</div>
          <div class="quote-nav" id="quoteNav"></div>
        </div>

        <div class="section-card streak-card">
          <div class="streak-num" id="streakNum">0</div>
          <div class="streak-label">Day Streak 🔥</div>
          <div class="streak-days" id="streakDays"></div>
        </div>

        <div class="section-card">
          <div class="section-title">Weekly Activity</div>
          <div class="chart-bars" id="weeklyChart"></div>
        </div>

      </div>
    </div>
  </div>
  <button class="fab" onclick="openEditor(null)">+</button>
</div>

<!-- ═══ JOURNAL ═══ -->
<div class="page" id="page-journal">
  <div class="journal-page">
    <div class="page-title">My Journal</div>
    <div class="page-sub">Your thoughts, captured beautifully.</div>
    <div class="journal-toolbar">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input type="text" class="search-input" placeholder="Search entries…" id="journalSearch" oninput="renderJournal()">
      </div>
      <div id="moodFilterBtns" style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="filter-btn active" data-filter="all" onclick="setMoodFilter(this, 'all')">All</button>
        <button class="filter-btn" data-filter="😊" onclick="setMoodFilter(this, '😊')">😊</button>
        <button class="filter-btn" data-filter="😌" onclick="setMoodFilter(this, '😌')">😌</button>
        <button class="filter-btn" data-filter="😔" onclick="setMoodFilter(this, '😔')">😔</button>
        <button class="filter-btn" data-filter="😤" onclick="setMoodFilter(this, '😤')">😤</button>
        <button class="filter-btn" data-filter="🤩" onclick="setMoodFilter(this, '🤩')">🤩</button>
        <button class="filter-btn" data-filter="😴" onclick="setMoodFilter(this, '😴')">😴</button>
      </div>
      <button class="btn-new-entry" onclick="openEditor(null)">+ New Entry</button>
    </div>
    <div id="journalTimeline"></div>
  </div>
</div>

<!-- ═══ CALENDAR ═══ -->
<div class="page" id="page-calendar">
  <div class="calendar-page">
    <div class="page-title">Calendar</div>
    <div class="page-sub">Your journaling journey, at a glance.</div>
    <div class="section-card">
      <div class="cal-header">
        <button class="cal-btn" onclick="changeCalMonth(-1)">‹</button>
        <div class="cal-month" id="calMonthLabel">January 2025</div>
        <button class="cal-btn" onclick="changeCalMonth(1)">›</button>
      </div>
      <div class="cal-grid">
        <div class="cal-day-name">Sun</div><div class="cal-day-name">Mon</div><div class="cal-day-name">Tue</div><div class="cal-day-name">Wed</div><div class="cal-day-name">Thu</div><div class="cal-day-name">Fri</div><div class="cal-day-name">Sat</div>
        <div id="calCells"></div>
      </div>
    </div>
    <div class="cal-preview" id="calPreview">
      <div class="cal-preview-date" id="calPreviewDate">Select a date to view entries</div>
      <div id="calPreviewContent"><div class="cal-empty">Nothing here yet ✨</div></div>
    </div>
  </div>
</div>

<!-- ═══ ANALYTICS ═══ -->
<div class="page" id="page-analytics">
  <div class="analytics-page">
    <div class="page-title">Insights</div>
    <div class="page-sub">Understanding your inner world through data.</div>
    <div class="analytics-grid">

      <div class="analytics-card">
        <h3>Writing Activity</h3>
        <div class="chart-bars" id="analyticsWeeklyBars"></div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:8px;text-align:center">Entries per day (last 7 days)</div>
      </div>

      <div class="analytics-card">
        <h3>Mood Distribution</h3>
        <div class="mood-histogram" id="moodHistogram"></div>
      </div>

      <div class="analytics-card" style="grid-column:1/-1">
        <h3>Activity Heatmap (Last 90 Days)</h3>
        <div class="heatmap-grid" id="heatmapGrid"></div>
        <div style="display:flex;gap:8px;align-items:center;margin-top:12px;font-size:12px;color:var(--text-muted)">
          <span>Less</span>
          <div style="width:12px;height:12px;border-radius:2px;background:var(--lavender-light)"></div>
          <div style="width:12px;height:12px;border-radius:2px;background:var(--lavender)"></div>
          <div style="width:12px;height:12px;border-radius:2px;background:var(--lavender-deep);opacity:0.7"></div>
          <div style="width:12px;height:12px;border-radius:2px;background:var(--lavender-deep)"></div>
          <span>More</span>
        </div>
      </div>

      <div class="analytics-card" style="grid-column:1/-1">
        <h3>Emotional Insights</h3>
        <div class="insight-list" id="insightList"></div>
      </div>

    </div>
  </div>
</div>

<!-- ═══ SETTINGS ═══ -->
<div class="page" id="page-settings">
  <div class="settings-page">
    <div class="page-title">Settings</div>
    <div class="page-sub">Customize your Serene experience.</div>

    <div class="settings-section">
      <h3>Profile</h3>
      <div class="settings-profile">
        <div class="avatar" id="settingsAvatar">A</div>
        <div>
          <div class="profile-name" id="settingsName">Alex</div>
          <div class="profile-email" id="settingsEmail">alex@example.com</div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Display Name</label>
        <input type="text" class="form-input" id="settingsNameInput" placeholder="Your name">
      </div>
      <button class="btn-primary" style="width:auto;padding:10px 24px;font-size:14px" onclick="saveProfile()">Save Changes</button>
    </div>

    <div class="settings-section">
      <h3>Appearance</h3>
      <div class="setting-row">
        <div class="setting-info">
          <h4>Dark Mode</h4>
          <p>Switch between light and dark themes</p>
        </div>
        <div class="toggle" id="darkModeToggle" onclick="toggleDarkMode()"></div>
      </div>
      <div class="setting-row">
        <div class="setting-info">
          <h4>Color Accent</h4>
          <p>Choose your preferred color theme</p>
        </div>
        <div class="theme-picker">
          <div class="theme-swatch active" style="background:linear-gradient(135deg,#9B7DD4,#7AAED4)" onclick="setAccent('lavender', this)" title="Lavender"></div>
          <div class="theme-swatch" style="background:linear-gradient(135deg,#E8A0B4,#F7C0A0)" onclick="setAccent('blush', this)" title="Blush"></div>
          <div class="theme-swatch" style="background:linear-gradient(135deg,#7AAF98,#5A9AAF)" onclick="setAccent('sage', this)" title="Sage"></div>
          <div class="theme-swatch" style="background:linear-gradient(135deg,#D4A040,#C07050)" onclick="setAccent('amber', this)" title="Amber"></div>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h3>Journal Preferences</h3>
      <div class="setting-row">
        <div class="setting-info"><h4>Auto-save Drafts</h4><p>Automatically save as you type</p></div>
        <div class="toggle on" id="autosaveToggle" onclick="toggleSetting('autosave', this)"></div>
      </div>
      <div class="setting-row">
        <div class="setting-info"><h4>Daily Reminder</h4><p>Get reminded to journal each day</p></div>
        <div class="toggle" id="reminderToggle" onclick="toggleSetting('reminder', this)"></div>
      </div>
      <div class="setting-row">
        <div class="setting-info"><h4>Typing Sounds</h4><p>Subtle typewriter sound effects</p></div>
        <div class="toggle" id="soundToggle" onclick="toggleSetting('sound', this)"></div>
      </div>
      <div class="setting-row">
        <div class="setting-info"><h4>Focus Mode Blur</h4><p>Blur everything except the editor in focus mode</p></div>
        <div class="toggle on" id="focusBlurToggle" onclick="toggleSetting('focusBlur', this)"></div>
      </div>
    </div>

    <div class="settings-section">
      <h3>Data</h3>
      <div class="setting-row">
        <div class="setting-info"><h4>Export All Entries</h4><p>Download your journal as a text file</p></div>
        <button class="filter-btn" onclick="exportEntries()">Export</button>
      </div>
      <div class="setting-row">
        <div class="setting-info"><h4>Clear All Data</h4><p>Permanently delete all journal entries</p></div>
        <button class="filter-btn" style="border-color:#E24B4A;color:#E24B4A" onclick="clearAllData()">Clear</button>
      </div>
      <button class="btn-logout" onclick="handleLogout()">Sign Out</button>
    </div>

  </div>
</div>

</div><!-- /app -->

<!-- ═══ EDITOR SHEET ═══ -->
<div class="editor-overlay" id="editorOverlay" onclick="closeEditorOutside(event)">
  <div class="editor-sheet">
    <div class="editor-header">
      <div class="editor-meta">
        <span class="editor-date" id="editorDate">Today</span>
        <div class="editor-mood-pick">
          <span class="mood-pick-btn" data-mood="😊" onclick="pickEditorMood(this)">😊</span>
          <span class="mood-pick-btn" data-mood="😌" onclick="pickEditorMood(this)">😌</span>
          <span class="mood-pick-btn" data-mood="😔" onclick="pickEditorMood(this)">😔</span>
          <span class="mood-pick-btn" data-mood="😤" onclick="pickEditorMood(this)">😤</span>
          <span class="mood-pick-btn" data-mood="🤩" onclick="pickEditorMood(this)">🤩</span>
          <span class="mood-pick-btn" data-mood="😴" onclick="pickEditorMood(this)">😴</span>
        </div>
        <div class="autosave-status" id="autosaveStatus">✓ Autosaved</div>
      </div>
      <div class="editor-actions">
        <button class="btn-icon" style="font-size:16px" onclick="toggleFocusMode()" title="Focus mode">✏️</button>
        <button class="btn-icon" style="font-size:16px;background:var(--blush);color:var(--blush-deep)" onclick="toggleFavorite()" id="favBtn" title="Favorite">♡</button>
        <button class="btn-icon" style="font-size:16px;color:#E24B4A" onclick="deleteCurrentEntry()" id="delBtn" title="Delete">🗑</button>
        <button class="btn-icon" style="font-size:16px" onclick="closeEditor()" title="Close">✕</button>
      </div>
    </div>
    <div class="editor-body">
      <textarea class="editor-title-input" id="editorTitle" placeholder="Give your entry a title…" rows="1" oninput="autoResize(this); debouncedAutosave();"></textarea>
      <textarea class="editor-content-input" id="editorContent" placeholder="What's on your mind today? Write freely, without judgment…" oninput="debouncedAutosave(); updateWordCount();"></textarea>
      <div class="editor-tags-input">
        <span style="font-size:13px;color:var(--text-muted)">🏷</span>
        <div id="editorTagsDisplay"></div>
        <input type="text" class="tag-input" id="editorTagInput" placeholder="Add tag…" onkeydown="handleTagInput(event)">
      </div>
    </div>
    <div class="editor-footer">
      <div class="word-count" id="editorWordCount">0 words · 0 min read</div>
      <button class="editor-save-btn" onclick="saveEntry()">Save Entry</button>
    </div>
  </div>
</div>

<!-- ═══ FOCUS MODE ═══ -->
<div class="focus-overlay" id="focusOverlay">
  <div class="focus-header">
    <span style="font-size:14px;color:var(--text-muted)" id="focusClock">12:00</span>
    <span style="font-family:'Playfair Display',serif;font-size:18px;color:var(--lavender-deep)">Serene</span>
    <button class="btn-icon" onclick="toggleFocusMode()" title="Exit focus mode" style="font-size:14px">✕ Exit</button>
  </div>
  <div class="focus-content">
    <textarea class="focus-title-input" id="focusTitle" placeholder="Title…" rows="1" oninput="syncFocusToEditor()"></textarea>
    <textarea class="focus-area" id="focusArea" placeholder="Let your thoughts flow freely…" oninput="syncFocusToEditor()"></textarea>
  </div>
  <div class="focus-footer">
    <span style="font-size:13px;color:var(--text-muted)" id="focusWordCount">0 words</span>
    <button class="editor-save-btn" onclick="saveEntry(); toggleFocusMode()">Save & Close</button>
  </div>
</div>

<script>
// ═══════════════════════════════════════
// STATE
// ═══════════════════════════════════════
let state = {
  user: null,
  entries: [],
  todayMood: null,
  moodIntensity: 5,
  currentEntry: null,
  calMonth: new Date(),
  calSelected: null,
  moodFilter: 'all',
  focusMode: false,
  darkMode: false,
  settings: { autosave: true, reminder: false, sound: false, focusBlur: true },
  autosaveTimer: null,
  quoteIndex: 0,
};

const QUOTES = [
  { text: "The present moment is the only moment available to us, and it is the door to all moments.", author: "Thich Nhat Hanh" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "Vulnerability is the birthplace of innovation, creativity and change.", author: "Brené Brown" },
  { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Sharon Salzberg" },
  { text: "In the journal I do not just express myself more openly than I could to any person; I create myself.", author: "Susan Sontag" },
];

const PROMPTS = [
  { emoji: "🌅", text: "What made you smile today, even briefly?" },
  { emoji: "🔮", text: "If your future self could send a message, what would it say?" },
  { emoji: "🌊", text: "What emotion are you avoiding right now, and why?" },
  { emoji: "🌿", text: "Describe three things you're grateful for in detail." },
  { emoji: "💭", text: "What belief is holding you back from what you want?" },
  { emoji: "🌙", text: "How did today differ from your expectations?" },
  { emoji: "🦋", text: "What small change could create the biggest positive impact in your life?" },
  { emoji: "🎯", text: "What would you do if you knew you couldn't fail?" },
  { emoji: "🌱", text: "What are you currently learning about yourself?" },
  { emoji: "💫", text: "Describe your ideal day in vivid detail." },
  { emoji: "🔥", text: "What are you most passionate about right now, and why?" },
  { emoji: "🌺", text: "Write a letter of forgiveness to someone — or yourself." },
];

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MOOD_COLORS = { '😊': '#F7D070', '😌': '#B8D4C8', '😔': '#BDD8F0', '😤': '#F2C0C0', '🤩': '#F7B8E8', '😴': '#D4C8E8' };
let activePrompts = [];
let editorTags = [];
let editorMood = null;

// ═══════════════════════════════════════
// STORAGE
// ═══════════════════════════════════════
function save() {
  try { localStorage.setItem('serene_entries', JSON.stringify(state.entries)); } catch(e){}
  try { localStorage.setItem('serene_settings', JSON.stringify(state.settings)); } catch(e){}
  try { localStorage.setItem('serene_darkMode', state.darkMode); } catch(e){}
}
function loadData() {
  try { const e = localStorage.getItem('serene_entries'); if(e) state.entries = JSON.parse(e); } catch(e) { state.entries = []; }
  try { const s = localStorage.getItem('serene_settings'); if(s) state.settings = {...state.settings, ...JSON.parse(s)}; } catch(e){}
  try { state.darkMode = localStorage.getItem('serene_darkMode') === 'true'; } catch(e){}
  if(state.darkMode) applyDarkMode(true);
}

// ═══════════════════════════════════════
// AUTH
// ═══════════════════════════════════════
function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPass').value;
  let valid = true;
  if(!email || !email.includes('@')) { showErr('loginEmailErr', true); valid=false; } else showErr('loginEmailErr', false);
  if(pass.length < 6) { showErr('loginPassErr', true); valid=false; } else showErr('loginPassErr', false);
  if(!valid) return;
  const users = JSON.parse(localStorage.getItem('serene_users') || '[]');
  const user = users.find(u => u.email === email && u.pass === pass);
  if(!user) {
    const demo = { name: email.split('@')[0], email, pass };
    users.push(demo);
    localStorage.setItem('serene_users', JSON.stringify(users));
    state.user = demo;
  } else { state.user = user; }
  if(document.getElementById('rememberMe').checked) localStorage.setItem('serene_user', JSON.stringify(state.user));
  enterApp();
}
function handleSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pass = document.getElementById('signupPass').value;
  const pass2 = document.getElementById('signupPass2').value;
  let valid = true;
  if(!name) { showErr('signupNameErr', true); valid=false; } else showErr('signupNameErr', false);
  if(!email || !email.includes('@')) { showErr('signupEmailErr', true); valid=false; } else showErr('signupEmailErr', false);
  if(pass.length < 6) { showErr('signupPassErr', true); valid=false; } else showErr('signupPassErr', false);
  if(pass !== pass2) { showErr('signupPass2Err', true); valid=false; } else showErr('signupPass2Err', false);
  if(!valid) return;
  const users = JSON.parse(localStorage.getItem('serene_users') || '[]');
  const user = { name, email, pass };
  users.push(user);
  localStorage.setItem('serene_users', JSON.stringify(users));
  state.user = user;
  localStorage.setItem('serene_user', JSON.stringify(user));
  enterApp();
  toast('Welcome to Serene, ' + name + '! 🌟', 'success');
}
function handleLogout() {
  localStorage.removeItem('serene_user');
  state.user = null;
  document.getElementById('mainNav').style.display = 'none';
  goPage('login');
}
function showErr(id, show) {
  document.getElementById(id).className = 'error-msg' + (show ? ' show' : '');
}
function enterApp() {
  loadData();
  document.getElementById('mainNav').style.display = 'flex';
  goPage('dashboard');
  initDashboard();
  renderJournal();
  renderCalendar();
  renderAnalytics();
  initSettings();
  startClock();
}

// ═══════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════
function goPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + id);
  if(el) el.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === id);
  });
  if(id === 'analytics') renderAnalytics();
  if(id === 'calendar') renderCalendar();
}
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => { if(state.user) goPage(l.dataset.page); });
});

// ═══════════════════════════════════════
// CLOCK
// ═══════════════════════════════════════
function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}
function updateClock() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  const hh = h % 12 || 12, mm = String(m).padStart(2,'0'), ampm = h < 12 ? 'AM' : 'PM';
  const clockEl = document.getElementById('heroClock');
  if(clockEl) clockEl.textContent = `${hh}:${mm} ${ampm}`;
  const focusClock = document.getElementById('focusClock');
  if(focusClock) focusClock.textContent = `${hh}:${mm}`;
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const dateEl = document.getElementById('heroDate');
  if(dateEl) dateEl.textContent = `${days[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

// ═══════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════
function initDashboard() {
  const now = new Date(), h = now.getHours();
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const name = state.user?.name || 'Friend';
  document.getElementById('heroGreeting').innerHTML = `${greet}, <span id="heroName">${name.split(' ')[0]}</span> ✨`;
  const subs = ['How are you feeling today?', 'Ready to capture your thoughts?', 'Your story continues here.', 'What will you discover today?'];
  document.getElementById('heroSub').textContent = subs[Math.floor(Math.random()*subs.length)];
  updateStats();
  renderQuote();
  renderStreakWidget();
  renderWeeklyChart('weeklyChart');
  renderRecentEntries();
  renderPrompts();
}
function updateStats() {
  document.getElementById('statEntries').textContent = state.entries.length;
  const totalWords = state.entries.reduce((s,e) => s + wordCount(e.content), 0);
  document.getElementById('statWords').textContent = totalWords > 999 ? (totalWords/1000).toFixed(1)+'k' : totalWords;
  document.getElementById('statStreak').textContent = calcStreak();
  document.getElementById('streakNum').textContent = calcStreak();
  const today = todayStr();
  const todayEntry = state.entries.find(e => e.date.startsWith(today));
  document.getElementById('statMood').textContent = state.todayMood || (todayEntry?.mood) || '—';
}
function calcStreak() {
  const dates = [...new Set(state.entries.map(e => e.date.split('T')[0]))].sort().reverse();
  if(!dates.length) return 0;
  let streak = 0, d = new Date();
  for(let i=0; i<365; i++) {
    const s = fmtDate(d);
    if(dates.includes(s)) streak++;
    else if(i > 0) break;
    d.setDate(d.getDate()-1);
  }
  return streak;
}
function fmtDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function todayStr() { return fmtDate(new Date()); }

function renderQuote() {
  const q = QUOTES[state.quoteIndex];
  document.getElementById('quoteText').textContent = q.text;
  document.getElementById('quoteAuthor').textContent = '— ' + q.author;
  const nav = document.getElementById('quoteNav');
  nav.innerHTML = QUOTES.slice(0,5).map((_, i) =>
    `<div class="quote-dot ${i===state.quoteIndex%5?'active':''}" onclick="state.quoteIndex=${i};renderQuote()"></div>`
  ).join('');
}
function renderStreakWidget() {
  const streak = calcStreak();
  document.getElementById('streakNum').textContent = streak;
  const days = DAYS;
  const today = new Date();
  const entryDates = new Set(state.entries.map(e => e.date.split('T')[0]));
  let html = '';
  for(let i=6; i>=0; i--) {
    const d = new Date(today); d.setDate(d.getDate()-i);
    const s = fmtDate(d);
    const cls = entryDates.has(s) ? 'filled' : (i===0 ? 'partial' : 'empty');
    html += `<div class="streak-day ${cls}">${days[d.getDay()][0]}</div>`;
  }
  document.getElementById('streakDays').innerHTML = html;
}
function renderWeeklyChart(containerId) {
  const container = document.getElementById(containerId);
  if(!container) return;
  const today = new Date();
  const entryDates = state.entries.reduce((acc,e) => {
    const d = e.date.split('T')[0]; acc[d]=(acc[d]||0)+1; return acc;
  }, {});
  let html = '';
  for(let i=6; i>=0; i--) {
    const d = new Date(today); d.setDate(d.getDate()-i);
    const s = fmtDate(d); const count = entryDates[s]||0;
    const h = Math.max(count*40, count>0?20:8);
    html += `<div class="chart-bar-wrap">
      <div class="chart-bar" style="height:${h}px;animation-delay:${(6-i)*0.07}s"></div>
      <div class="chart-bar-label">${DAYS[d.getDay()][0]}</div>
    </div>`;
  }
  container.innerHTML = html;
}
function renderRecentEntries() {
  const el = document.getElementById('recentEntries');
  if(!el) return;
  const recent = [...state.entries].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);
  if(!recent.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">📝</div><h3>Start your story</h3><p>Your first journal entry is just a tap away.</p></div>`;
    return;
  }
  el.innerHTML = `<div class="entry-list">${recent.map(e => entryPreviewHTML(e)).join('')}</div>`;
}
function entryPreviewHTML(e) {
  const d = new Date(e.date);
  const timeAgo = getTimeAgo(d);
  const mood = e.mood || '📝';
  const tags = (e.tags||[]).slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('');
  const snippet = e.content.replace(/#+\s/g,'').substring(0,120) + (e.content.length>120?'…':'');
  return `<div class="entry-preview" onclick="openEditor('${e.id}')">
    <div style="display:flex;justify-content:space-between;align-items:flex-start">
      <div class="entry-preview-title">${e.title || 'Untitled Entry'}</div>
      ${e.favorite ? '<span style="color:var(--blush-deep)">♥</span>' : ''}
    </div>
    <div class="entry-preview-meta">
      <span class="entry-preview-mood">${mood}</span>
      <span>${timeAgo}</span>
      <span>${wordCount(e.content)} words</span>
    </div>
    <div class="entry-preview-snippet">${snippet}</div>
    ${tags ? `<div class="entry-tags">${tags}</div>` : ''}
  </div>`;
}
function getTimeAgo(d) {
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff/60000), hours = Math.floor(diff/3600000), days = Math.floor(diff/86400000);
  if(days > 7) return d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
  if(days > 1) return `${days} days ago`;
  if(days === 1) return 'Yesterday';
  if(hours > 0) return `${hours}h ago`;
  if(mins > 0) return `${mins}m ago`;
  return 'Just now';
}
function renderPrompts() {
  activePrompts = [...PROMPTS].sort(()=>Math.random()-0.5).slice(0,4);
  const el = document.getElementById('promptsGrid');
  if(!el) return;
  el.innerHTML = activePrompts.map(p =>
    `<div class="prompt-card" onclick="openEditorWithPrompt('${p.text.replace(/'/g,"\\'")}')">
      <div class="prompt-emoji">${p.emoji}</div>
      ${p.text}
    </div>`
  ).join('');
}
function refreshPrompts() { renderPrompts(); }
function openEditorWithPrompt(prompt) {
  openEditor(null);
  setTimeout(() => {
    const ta = document.getElementById('editorContent');
    if(ta) { ta.placeholder = prompt; ta.focus(); }
  }, 400);
}

// ═══════════════════════════════════════
// MOOD
// ═══════════════════════════════════════
function selectMood(btn) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.todayMood = btn.dataset.mood;
  document.getElementById('statMood').textContent = state.todayMood;
  toast('Mood logged ' + state.todayMood, 'success');
}
function updateMoodIntensity(val) {
  state.moodIntensity = parseInt(val);
  document.getElementById('moodIntensityVal').textContent = `${val} / 10`;
}

// ═══════════════════════════════════════
// EDITOR
// ═══════════════════════════════════════
function openEditor(id) {
  const overlay = document.getElementById('editorOverlay');
  editorTags = [];
  editorMood = null;

  if(id) {
    const entry = state.entries.find(e => e.id === id);
    if(!entry) return;
    state.currentEntry = entry;
    document.getElementById('editorTitle').value = entry.title || '';
    document.getElementById('editorContent').value = entry.content || '';
    editorTags = [...(entry.tags||[])];
    editorMood = entry.mood;
    document.getElementById('editorDate').textContent = new Date(entry.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    document.getElementById('favBtn').textContent = entry.favorite ? '♥' : '♡';
    document.getElementById('delBtn').style.display = '';
  } else {
    state.currentEntry = null;
    document.getElementById('editorTitle').value = '';
    document.getElementById('editorContent').value = '';
    document.getElementById('editorDate').textContent = new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
    document.getElementById('favBtn').textContent = '♡';
    document.getElementById('delBtn').style.display = 'none';
  }

  renderEditorTags();
  renderEditorMoodPicker();
  updateWordCount();
  overlay.classList.add('open');
  setTimeout(() => document.getElementById('editorTitle').focus(), 400);
}
function closeEditor() { document.getElementById('editorOverlay').classList.remove('open'); }
function closeEditorOutside(e) { if(e.target === document.getElementById('editorOverlay')) closeEditor(); }

function pickEditorMood(btn) {
  document.querySelectorAll('.mood-pick-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  editorMood = btn.dataset.mood;
}
function renderEditorMoodPicker() {
  document.querySelectorAll('.mood-pick-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.mood === editorMood);
  });
}
function handleTagInput(e) {
  if(e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    const val = e.target.value.trim().replace(',','');
    if(val && !editorTags.includes(val)) {
      editorTags.push(val);
      renderEditorTags();
    }
    e.target.value = '';
  }
  if(e.key === 'Backspace' && !e.target.value && editorTags.length) {
    editorTags.pop();
    renderEditorTags();
  }
}
function renderEditorTags() {
  const el = document.getElementById('editorTagsDisplay');
  el.innerHTML = editorTags.map((t,i) =>
    `<span class="tag" style="cursor:pointer" onclick="removeTag(${i})">${t} ×</span>`
  ).join('');
}
function removeTag(i) { editorTags.splice(i,1); renderEditorTags(); }
function autoResize(el) { el.style.height='auto'; el.style.height=el.scrollHeight+'px'; }
function updateWordCount() {
  const content = document.getElementById('editorContent').value;
  const wc = wordCount(content);
  const mins = Math.max(1, Math.ceil(wc/200));
  document.getElementById('editorWordCount').textContent = `${wc} words · ${mins} min read`;
}
function wordCount(text) {
  return text ? text.trim().split(/\s+/).filter(Boolean).length : 0;
}
function saveEntry() {
  const title = document.getElementById('editorTitle').value.trim();
  const content = document.getElementById('editorContent').value.trim();
  if(!content && !title) { toast('Nothing to save yet ✨', ''); return; }
  const now = new Date().toISOString();
  if(state.currentEntry) {
    const idx = state.entries.findIndex(e => e.id === state.currentEntry.id);
    if(idx > -1) {
      state.entries[idx] = { ...state.entries[idx], title, content, tags: editorTags, mood: editorMood, updatedAt: now };
    }
    toast('Entry updated ✓', 'success');
  } else {
    const entry = { id: 'e_' + Date.now(), title, content, tags: editorTags, mood: editorMood || state.todayMood, date: now, favorite: false };
    state.entries.unshift(entry);
    state.currentEntry = entry;
    document.getElementById('delBtn').style.display = '';
    toast('Entry saved ✨', 'success');
  }
  save();
  updateStats();
  renderRecentEntries();
  renderJournal();
  renderStreakWidget();
  renderWeeklyChart('weeklyChart');
}
function debouncedAutosave() {
  if(!state.settings.autosave) return;
  clearTimeout(state.autosaveTimer);
  document.getElementById('autosaveStatus').textContent = '…';
  state.autosaveTimer = setTimeout(() => {
    saveEntry();
    document.getElementById('autosaveStatus').textContent = '✓ Autosaved';
  }, 1800);
}
function toggleFavorite() {
  if(!state.currentEntry) return;
  const idx = state.entries.findIndex(e => e.id === state.currentEntry.id);
  if(idx > -1) {
    state.entries[idx].favorite = !state.entries[idx].favorite;
    document.getElementById('favBtn').textContent = state.entries[idx].favorite ? '♥' : '♡';
    save();
    toast(state.entries[idx].favorite ? 'Added to favorites ♥' : 'Removed from favorites', 'success');
  }
}
function deleteCurrentEntry() {
  if(!state.currentEntry) return;
  if(!confirm('Delete this entry permanently?')) return;
  state.entries = state.entries.filter(e => e.id !== state.currentEntry.id);
  save();
  closeEditor();
  updateStats();
  renderRecentEntries();
  renderJournal();
  toast('Entry deleted', 'error');
}

// ═══════════════════════════════════════
// FOCUS MODE
// ═══════════════════════════════════════
function toggleFocusMode() {
  state.focusMode = !state.focusMode;
  const overlay = document.getElementById('focusOverlay');
  overlay.classList.toggle('open', state.focusMode);
  if(state.focusMode) {
    document.getElementById('focusTitle').value = document.getElementById('editorTitle').value;
    document.getElementById('focusArea').value = document.getElementById('editorContent').value;
    updateFocusWordCount();
    setTimeout(() => document.getElementById('focusArea').focus(), 300);
  }
}
function syncFocusToEditor() {
  document.getElementById('editorTitle').value = document.getElementById('focusTitle').value;
  document.getElementById('editorContent').value = document.getElementById('focusArea').value;
  updateWordCount();
  updateFocusWordCount();
  debouncedAutosave();
}
function updateFocusWordCount() {
  const wc = wordCount(document.getElementById('focusArea').value);
  document.getElementById('focusWordCount').textContent = `${wc} words`;
}

// ═══════════════════════════════════════
// JOURNAL
// ═══════════════════════════════════════
function setMoodFilter(btn, filter) {
  document.querySelectorAll('#moodFilterBtns .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.moodFilter = filter;
  renderJournal();
}
function renderJournal() {
  const search = (document.getElementById('journalSearch')?.value || '').toLowerCase();
  let entries = [...state.entries].sort((a,b) => new Date(b.date)-new Date(a.date));
  if(state.moodFilter !== 'all') entries = entries.filter(e => e.mood === state.moodFilter);
  if(search) entries = entries.filter(e => (e.title+' '+e.content+' '+(e.tags||[]).join(' ')).toLowerCase().includes(search));

  const container = document.getElementById('journalTimeline');
  if(!container) return;
  if(!entries.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>No entries found</h3><p>Try a different search or mood filter, or write something new!</p></div>`;
    return;
  }

  const groups = {};
  const now = new Date(), todayD = fmtDate(now);
  const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate()-7);
  const monthAgo = new Date(now); monthAgo.setDate(monthAgo.getDate()-30);

  entries.forEach(e => {
    const d = e.date.split('T')[0];
    let group = d === todayD ? 'Today' : new Date(d) > weekAgo ? 'This Week' : new Date(d) > monthAgo ? 'This Month' : 'Older';
    if(!groups[group]) groups[group] = [];
    groups[group].push(e);
  });

  const order = ['Today','This Week','This Month','Older'];
  let html = '';
  order.forEach(g => {
    if(!groups[g]) return;
    html += `<div class="timeline-section">
      <div class="timeline-label">${g}</div>
      <div class="entry-list">${groups[g].map(e => entryPreviewHTML(e)).join('')}</div>
    </div>`;
  });
  container.innerHTML = html;
}

// ═══════════════════════════════════════
// CALENDAR
// ═══════════════════════════════════════
function renderCalendar() {
  const d = state.calMonth;
  document.getElementById('calMonthLabel').textContent = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
  const daysInMonth = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
  const daysInPrev = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
  const today = fmtDate(new Date());
  const entryDates = new Set(state.entries.map(e => e.date.split('T')[0]));

  let cells = '';
  for(let i=firstDay-1; i>=0; i--)
    cells += `<div class="cal-cell other-month">${daysInPrev-i}</div>`;
  for(let i=1; i<=daysInMonth; i++) {
    const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
    const cls = [
      'cal-cell',
      ds===today?'today':'',
      entryDates.has(ds)?'has-entry':'',
      state.calSelected===ds?'selected':'',
    ].filter(Boolean).join(' ');
    cells += `<div class="${cls}" onclick="selectCalDay('${ds}')">${i}</div>`;
  }
  const total = firstDay + daysInMonth;
  const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
  for(let i=1; i<=remaining; i++) cells += `<div class="cal-cell other-month">${i}</div>`;

  document.getElementById('calCells').outerHTML = `<div id="calCells" style="display:contents">${cells}</div>`;
  // Re-apply grid
  const calGrid = document.querySelector('.cal-grid');
  if(calGrid) {
    calGrid.innerHTML = `
      ${DAYS.map(d=>`<div class="cal-day-name">${d}</div>`).join('')}
      ${cells}`;
  }
}
function changeCalMonth(dir) {
  state.calMonth = new Date(state.calMonth.getFullYear(), state.calMonth.getMonth()+dir, 1);
  renderCalendar();
}
function selectCalDay(ds) {
  state.calSelected = ds;
  renderCalendar();
  const entries = state.entries.filter(e => e.date.startsWith(ds));
  const previewDate = document.getElementById('calPreviewDate');
  const previewContent = document.getElementById('calPreviewContent');
  const dateLabel = new Date(ds+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
  previewDate.textContent = dateLabel;
  if(!entries.length) {
    previewContent.innerHTML = `<div class="cal-empty">No entries on this day.
      <span class="form-link" onclick="openEditor(null)" style="margin-left:8px">Write one →</span>
    </div>`;
  } else {
    previewContent.innerHTML = `<div class="entry-list">${entries.map(e=>entryPreviewHTML(e)).join('')}</div>`;
  }
}

// ═══════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════
function renderAnalytics() {
  renderWeeklyChart('analyticsWeeklyBars');
  renderMoodHistogram();
  renderHeatmap();
  renderInsights();
}
function renderMoodHistogram() {
  const el = document.getElementById('moodHistogram');
  if(!el) return;
  const moods = ['😊','😌','😔','😤','🤩','😴'];
  const counts = {};
  state.entries.forEach(e => { if(e.mood) counts[e.mood]=(counts[e.mood]||0)+1; });
  const max = Math.max(...moods.map(m=>counts[m]||0), 1);
  el.innerHTML = moods.map(m => {
    const cnt = counts[m]||0;
    const h = Math.round((cnt/max)*80);
    const color = MOOD_COLORS[m] || '#C8B8E8';
    return `<div class="mood-hist-item">
      <div class="mood-hist-bar-wrap">
        <div class="mood-hist-bar" style="height:${h}px;background:${color};"></div>
      </div>
      <div class="mood-hist-emoji">${m}</div>
      <div class="mood-hist-count">${cnt}</div>
    </div>`;
  }).join('');
}
function renderHeatmap() {
  const el = document.getElementById('heatmapGrid');
  if(!el) return;
  const counts = {};
  state.entries.forEach(e => { const d=e.date.split('T')[0]; counts[d]=(counts[d]||0)+1; });
  let html = '';
  const today = new Date();
  for(let i=89; i>=0; i--) {
    const d = new Date(today); d.setDate(d.getDate()-i);
    const s = fmtDate(d); const cnt = counts[s]||0;
    const lvl = cnt===0?0:cnt===1?1:cnt===2?2:3;
    html += `<div class="heatmap-cell heatmap-${lvl}" title="${s}: ${cnt} entries"></div>`;
  }
  el.innerHTML = html;
}
function renderInsights() {
  const el = document.getElementById('insightList');
  if(!el) return;
  const total = state.entries.length;
  const totalWords = state.entries.reduce((s,e)=>s+wordCount(e.content),0);
  const streak = calcStreak();
  const moods = state.entries.map(e=>e.mood).filter(Boolean);
  const topMood = moods.length ? moods.reduce((a,b,_,arr)=>arr.filter(v=>v===a).length>=arr.filter(v=>v===b).length?a:b,'') : null;

  const insights = [
    { icon:'📖', text: `You've written <strong>${total} ${total===1?'entry':'entries'}</strong> totalling <strong>${totalWords} words</strong>. That's ${Math.round(totalWords/250)} pages of your life story!` },
    { icon:'🔥', text: streak > 0 ? `You're on a <strong>${streak}-day streak</strong>! Consistency is the key to a reflective life. Keep it up!` : `Start your journaling streak today — even one sentence counts. Begin now!` },
    { icon:'💜', text: topMood ? `Your most frequent mood is <strong>${topMood}</strong>. Your emotional landscape tells a story of who you are.` : `Log your moods when writing to unlock emotional pattern insights.` },
    { icon:'✍️', text: totalWords > 0 ? `Your average entry is <strong>${Math.round(totalWords/Math.max(total,1))} words</strong>. The most productive writers are also the most reflective.` : `Start writing to discover your unique journaling style and rhythm.` },
  ];

  el.innerHTML = insights.map(i => `<div class="insight-item"><div class="insight-icon">${i.icon}</div><div class="insight-text">${i.text}</div></div>`).join('');
}

// ═══════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════
function initSettings() {
  const user = state.user;
  if(!user) return;
  document.getElementById('settingsAvatar').textContent = (user.name||'A')[0].toUpperCase();
  document.getElementById('settingsName').textContent = user.name||'';
  document.getElementById('settingsEmail').textContent = user.email||'';
  document.getElementById('settingsNameInput').value = user.name||'';
  syncSettingToggles();
}
function syncSettingToggles() {
  const s = state.settings;
  document.getElementById('autosaveToggle').className = 'toggle' + (s.autosave?' on':'');
  document.getElementById('reminderToggle').className = 'toggle' + (s.reminder?' on':'');
  document.getElementById('soundToggle').className = 'toggle' + (s.sound?' on':'');
  document.getElementById('focusBlurToggle').className = 'toggle' + (s.focusBlur?' on':'');
  document.getElementById('darkModeToggle').className = 'toggle' + (state.darkMode?' on':'');
}
function toggleSetting(key, el) {
  state.settings[key] = !state.settings[key];
  el.className = 'toggle' + (state.settings[key]?' on':'');
  save();
  toast(`${key} ${state.settings[key]?'enabled':'disabled'}`, 'success');
}
function saveProfile() {
  const name = document.getElementById('settingsNameInput').value.trim();
  if(!name) { toast('Name cannot be empty', 'error'); return; }
  state.user.name = name;
  localStorage.setItem('serene_user', JSON.stringify(state.user));
  document.getElementById('settingsName').textContent = name;
  document.getElementById('settingsAvatar').textContent = name[0].toUpperCase();
  const heroName = document.getElementById('heroName');
  if(heroName) heroName.textContent = name.split(' ')[0];
  toast('Profile updated ✓', 'success');
}
function exportEntries() {
  if(!state.entries.length) { toast('No entries to export', ''); return; }
  const text = state.entries.map(e => [
    `# ${e.title||'Untitled'}`,
    `Date: ${new Date(e.date).toLocaleString()}`,
    `Mood: ${e.mood||'—'}`,
    `Tags: ${(e.tags||[]).join(', ')||'—'}`,
    '',
    e.content,
    '---',
  ].join('\n')).join('\n\n');
  const blob = new Blob([text], {type:'text/plain'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='serene-journal.txt'; a.click();
  toast('Journal exported ✓', 'success');
}
function clearAllData() {
  if(!confirm('Delete ALL entries permanently? This cannot be undone.')) return;
  state.entries = [];
  save();
  updateStats();
  renderRecentEntries();
  renderJournal();
  renderAnalytics();
  toast('All data cleared', 'error');
}

// ═══════════════════════════════════════
// THEME
// ═══════════════════════════════════════
function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  applyDarkMode(state.darkMode);
  syncSettingToggles();
  save();
}
function applyDarkMode(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  document.getElementById('themeToggle').textContent = dark ? '☀️' : '🌙';
}
document.getElementById('themeToggle').addEventListener('click', toggleDarkMode);

const ACCENTS = {
  lavender: { deep: '#9B7DD4', light: '#EDE8F7', bg: 'linear-gradient(135deg, #F5F0FF 0%, #FFF0F5 35%, #F0F8FF 65%, #F5FFF0 100%)' },
  blush: { deep: '#D46888', light: '#FDE8EF', bg: 'linear-gradient(135deg, #FFF0F5 0%, #FFF5EE 35%, #FFF0FF 65%, #F5F5FF 100%)' },
  sage: { deep: '#5A9A78', light: '#E8F5EE', bg: 'linear-gradient(135deg, #F0FFF5 0%, #F0FFF8 35%, #F5FFF0 65%, #EEFFF5 100%)' },
  amber: { deep: '#C0783A', light: '#FFF0E0', bg: 'linear-gradient(135deg, #FFF8F0 0%, #FFF5E8 35%, #FFFFF0 65%, #FFF0F0 100%)' },
};
function setAccent(name, el) {
  document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  const a = ACCENTS[name];
  document.documentElement.style.setProperty('--lavender-deep', a.deep);
  document.documentElement.style.setProperty('--lavender-light', a.light);
  document.documentElement.style.setProperty('--bg-gradient', a.bg);
}

// ═══════════════════════════════════════
// TOAST
// ═══════════════════════════════════════
function toast(msg, type='') {
  const container = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast${type?' '+type:''}`;
  t.innerHTML = `${type==='success'?'✓ ':type==='error'?'✕ ':''}${msg}`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(20px)'; t.style.transition='all 0.3s'; setTimeout(()=>t.remove(),300); }, 2800);
}

// ═══════════════════════════════════════
// UTILS
// ═══════════════════════════════════════
function togglePwd(inputId, eye) {
  const input = document.getElementById(inputId);
  if(input.type==='password') { input.type='text'; eye.textContent='🙈'; }
  else { input.type='password'; eye.textContent='👁'; }
}
document.getElementById('focusModeBtn').addEventListener('click', () => {
  if(!state.user) return;
  if(!document.getElementById('editorOverlay').classList.contains('open')) openEditor(null);
  setTimeout(toggleFocusMode, 300);
});

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
(function init() {
  const saved = localStorage.getItem('serene_user');
  if(saved) {
    try {
      state.user = JSON.parse(saved);
      enterApp();
    } catch(e) { goPage('login'); }
  } else {
    goPage('login');
  }
  // Rotate quotes
  setInterval(() => {
    state.quoteIndex = (state.quoteIndex+1) % QUOTES.length;
    renderQuote();
  }, 12000);
})();
</script>
</body>
</html>
