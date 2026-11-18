/**
 * Netto Home Attendance — Google Sheet sync
 * Paste into a Google Sheet's Apps Script (signed in as jonathannetto2003@gmail.com).
 * Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone.
 * Copy the /exec URL into the app (Settings > Google Sheet sync) together with SYNC_KEY.
 */
const SYNC_KEY = 'change-this-key';   // choose any secret word; enter the same in the app
const OWNER = 'jonathannetto2003@gmail.com';
const CHUNK = 40000;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const p = JSON.parse(e.postData.contents);
    if (p.key !== SYNC_KEY) return out({ ok: false, error: 'Bad sync key' });
    if (p.action !== 'save' || !p.data) return out({ ok: false, error: 'Bad request' });
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    writeBackup(ss, JSON.stringify(p.data));
    writeStaff(ss, p.data.staff || []);
    writeAttendance(ss, p.data);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const q = e.parameter || {};
  if (q.action === 'load') {
    if (q.key !== SYNC_KEY) return out({ ok: false, error: 'Bad sync key' });
    return out({ ok: true, data: readBackup(SpreadsheetApp.getActiveSpreadsheet()) });
  }
  return out({ ok: true, msg: 'Netto Home Attendance sync is running for ' + OWNER });
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function sheet(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function writeBackup(ss, json) {
  const sh = sheet(ss, '_backup');
  sh.clear();
  const rows = [];
  for (let i = 0; i < json.length; i += CHUNK) rows.push([json.slice(i, i + CHUNK)]);
  if (rows.length) sh.getRange(1, 1, rows.length, 1).setValues(rows);
  sh.hideSheet();
}

function readBackup(ss) {
  const sh = ss.getSheetByName('_backup');
  if (!sh || sh.getLastRow() < 1) return null;
  const json = sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(r => r[0]).join('');
  return json ? JSON.parse(json) : null;
}

function forLabel(st) {
  return st.forWho === 'Other' ? (st.forOther || 'Other') : (st.forWho || '');
}

function writeStaff(ss, staff) {
  const sh = sheet(ss, 'Personnel');
  sh.clear();
  const rows = [['Sr No.', 'Name of Staff', 'Nature of work', 'For who', 'Start Date', 'End Date', 'Salary/month']];
  staff.slice().sort((a, b) => a.sr - b.sr).forEach(st =>
    rows.push([st.sr, st.name, st.work || '', forLabel(st), st.start || '', st.end || '', st.salary || '']));
  sh.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
  sh.getRange(1, 1, 1, rows[0].length).setFontWeight('bold');
  sh.setFrozenRows(1);
}

function writeAttendance(ss, data) {
  const sh = sheet(ss, 'Attendance');
  sh.clear();
  const byId = {};
  (data.staff || []).forEach(st => byId[st.id] = st);
  const rows = [['Date', 'Sr No.', 'Name of Staff', 'Nature of work', 'For who', 'In', 'Out', 'Hours']];
  Object.keys(data.att || {}).sort().forEach(ds => {
    const day = data.att[ds];
    Object.keys(day).forEach(id => {
      const st = byId[id]; if (!st) return;
      const r = day[id];
      rows.push([ds, st.sr, st.name, st.work || '', forLabel(st), r.in || '', r.out || '', hours(r.in, r.out)]);
    });
  });
  sh.getRange(1, 1, rows.length, rows[0].length).setNumberFormat('@').setValues(rows);
  sh.getRange(1, 1, 1, rows[0].length).setFontWeight('bold');
  sh.setFrozenRows(1);
}

function hours(a, b) {
  if (!a || !b) return '';
  const m = s => { const p = s.split(':'); return +p[0] * 60 + +p[1]; };
  let x = m(b) - m(a); if (x < 0) x += 1440;
  return (x / 60).toFixed(2);
}
