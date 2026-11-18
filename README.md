# Netto Home Attendance

Installable mobile app (PWA) for marking attendance of home personnel.

## Files
- `index.html` – the app
- `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png` – needed for "Install / Add to Home screen" and offline use
- `Code.gs` – optional Google Sheet sync (Apps Script) for navindewaji@gmail.com

## 1. Host the app (GitHub Pages)
1. Create a new repo, e.g. `Netto-Attendance`, and upload all files (except `Code.gs` and this README if you like).
2. Settings → Pages → Branch `main` / root → Save.
3. Open `https://<username>.github.io/Netto-Attendance/` on the phone.

## 2. Install on mobile
- **Android (Chrome):** menu ⋮ → *Install app* / *Add to Home screen*.
- **iPhone (Safari):** Share → *Add to Home Screen*.

Data is saved on the phone (works offline).

## 3. Optional: Google Sheet sync with navindewaji@gmail.com
1. Sign in to Google as **navindewaji@gmail.com** and create a new Google Sheet named "Netto Home Attendance Data".
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
