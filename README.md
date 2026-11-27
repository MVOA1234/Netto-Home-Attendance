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

## 3. Google Sheet sync — shares data between phones
Every phone that has the same Apps Script URL and sync key sees the same personnel and attendance.
Changes are **merged** (newest change wins per person per day), so two phones can enter data at the same time.
The app syncs when it opens, after every entry and about every minute while open. Today screen shows "☁ Synced hh:mm".

Setup (once, on the computer):
1. Sign in to the Google account that will hold the data and create a new Google Sheet.
2. Extensions → Apps Script → paste `Code.gs`, change `SYNC_KEY` to a secret word, Save.
3. Deploy → New deployment → **Web app** → Execute as **Me**, Who has access **Anyone** → Deploy → Authorize.
4. Copy the **Web app URL** ending in `/exec`.
5. Share the Sheet with jonathannetto2003@gmail.com if he should see it.

After changing `Code.gs`: Deploy → Manage deployments → ✏️ → Version: **New version** → Deploy (URL stays the same).

On each phone: Settings → Google Sheet sync → paste URL + same sync key → **Save**.

Advanced (Settings → "Advanced: replace instead of merge"): *Replace this phone with Sheet copy* / *Replace Sheet with this phone's data* — only for fixing duplicates or a wrong setup.

## Rules built into the app
- In/Out times can be entered or edited for today and the previous 7 days; older days are locked (view only in Month/Reports).
- A day counts as **P** when an In time is recorded, **A** when not (only within each person's start/end dates, up to today).
- Pro-rata salary = monthly salary ÷ days in month × present days (estimate only).

## PIN lock
- On first open the app asks you to create a 4–6 digit PIN (entered twice).
- The PIN is asked every time the app opens and after it has been in the background for more than 1 minute.
- Settings → Security: *Change PIN*, *Lock now*.
- 5 wrong tries → 30-second wait.
- *Forgot PIN?* erases the data on that phone (so the PIN can't be bypassed); with sync set up the data comes back automatically after a new PIN is set.
- The PIN is stored only on the phone (hashed) and is not included in backups or Sheet sync.
