# Netto Home Attendance

Installable mobile app (PWA) for marking attendance of home personnel.

## Files
- `index.html` – the app
- `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png` – needed for "Install / Add to Home screen" and offline use
- `Code.gs` – optional Google Sheet sync (Apps Script) for jonathannetto2003@gmail.com

## 1. Host the app (GitHub Pages)
- Repo: https://github.com/MVOA1234/Netto-Home-Attendance
- Settings → Pages → Branch `main` / root → Save.
- App link: **https://mvoa1234.github.io/Netto-Home-Attendance/** (open on the phone)

## 2. Install on mobile
- **Android (Chrome):** menu ⋮ → *Install app* / *Add to Home screen*.
- **iPhone (Safari):** Share → *Add to Home Screen*.

Data is saved on the phone (works offline).

## 3. Optional: Google Sheet sync with jonathannetto2003@gmail.com
1. Sign in to Google as **jonathannetto2003@gmail.com** and create a new Google Sheet named "Netto Home Attendance Data".
2. Extensions → Apps Script → delete the sample code, paste `Code.gs`, change `SYNC_KEY` to a secret word, Save.
3. Deploy → New deployment → type **Web app** → Execute as **Me**, Who has access **Anyone** → Deploy → Authorize.
4. Copy the URL ending in `/exec`.
5. In the app: Settings → Google Sheet sync → paste URL and the same sync key → Save → *Sync now*.

After that, every change syncs to the Sheet automatically (tabs: **Personnel**, **Attendance**, plus a hidden `_backup`).
On a new phone, enter the same URL and key, then tap *Load from Sheet*.

## Rules built into the app
- In/Out times can be entered or edited for today and the previous 7 days; older days are locked (view only in Month/Reports).
- A day counts as **P** when an In time is recorded, **A** when not (only within each person's start/end dates, up to today).
- Pro-rata salary = monthly salary ÷ days in month × present days (estimate only).

## PIN lock
- On first open the app asks you to create a 4–6 digit PIN (entered twice).
- The PIN is asked every time the app opens and after it has been in the background for more than 1 minute.
- Settings → Security: *Change PIN*, *Lock now*.
- 5 wrong tries → 30-second wait.
- *Forgot PIN?* erases the data on that phone (so the PIN can't be bypassed); restore it from the Google Sheet or a backup file afterwards.
- The PIN is stored only on the phone (hashed) and is not included in backups or Sheet sync.
