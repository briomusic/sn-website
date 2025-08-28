(function () {
  // ---------- CONFIG ----------
  // Use a relative path so it works on subpages, too.
  const JSON_URL = 'data/events.json';

  // ---------- DEBUG UTIL ----------
  const DEBUG = true; // set to false to silence on-page debug notes
  const debugOut = (msg) => {
    if (!DEBUG) return;
    const targets = document.querySelectorAll('.events-list, .termine-list');
    targets.forEach(t => {
      const d = document.createElement('div');
      d.style.cssText = 'opacity:.8;font-style:italic;margin:6px 0;';
      d.textContent = `[events] ${msg}`;
      t.appendChild(d);
    });
    // Also log to console for good measure
    try { console.log(`[events] ${msg}`); } catch {}
  };

  // ---------- HELPERS ----------
  const fmtDateTime = (dateStr, timeStr) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const [hh, mm] = (timeStr || '00:00').split(':').map(Number);
      const dt = new Date(y, m - 1, d, hh, mm);
      const date = new Intl.DateTimeFormat('de-DE', {
        weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric'
      }).format(dt);
      const time = timeStr ? `${timeStr} Uhr` : '';
      return time ? `${date}, ${time}` : date;
    } catch {
      return `${dateStr}${timeStr ? (', ' + timeStr + ' Uhr') : ''}`;
    }
  };

  const link = (href, text) =>
    href ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>` : (text || '');

  const eventLine = (ev) => {
    const title = ev?.title
      ? (ev.detailUrl ? `<a href="${ev.detailUrl}"><b>${ev.title}</b></a>` : `<b>${ev.title}</b>`)
      : '';
    const when = fmtDateTime(ev?.date, ev?.time);
    const location = ev?.location ? link(ev.location.url, ev.location.name) : '';
    const leader = ev?.leader ? ` (geleitet von ${ev.leader})` : '';
    const notes = ev?.notes ? ` — ${ev.notes}` : '';
    return [title, when ? ` — ${when}` : '', location ? ` — ${location}` : '', leader, notes]
      .filter(Boolean).join('');
  };

  const renderList = (container, items) => {
    if (!items.length) {
      container.innerHTML = '<div class="events-empty">Keine Events vorhanden.</div>';
      return;
    }
    const ul = document.createElement('ul');
    ul.className = 'events';
    items.forEach(ev => {
      const li = document.createElement('li');
      li.className = 'event';
      li.innerHTML = eventLine(ev);
      ul.appendChild(li);
    });
    container.innerHTML = '';
    container.appendChild(ul);
  };

  const loadData = async () => {
    debugOut(`lade ${JSON_URL} …`);
    const res = await fetch(JSON_URL, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status} für ${JSON_URL}`);
    const json = await res.json();
    debugOut(`geladen ✓`);
    return json;
  };

  // ---------- MAIN ----------
  const init = async () => {
    const targets = Array.from(document.querySelectorAll('.events-list, .termine-list'));
    if (!targets.length) {
      debugOut('kein Container (.events-list / .termine-list) gefunden');
      return;
    }

    let data;
    try {
      data = await loadData();
    } catch (e) {
      debugOut(`fetch fehlgeschlagen: ${e.message}`);
      targets.forEach(t => t.innerHTML = `<div class="events-error">Events konnten nicht geladen werden (${e.message}).</div>`);
      return;
    }

    if (!data || !Array.isArray(data.events)) {
      debugOut('ungültiges JSON-Format (erwartet { "events": [...] })');
      targets.forEach(t => t.innerHTML = '<div class="events-error">Ungültiges Events-Format.</div>');
      return;
    }

    // Sort ascending by date/time
    const all = data.events.slice().sort((a, b) => {
      const at = new Date(`${a.date || '2100-01-01'}T${(a.time || '00:00')}:00`);
      const bt = new Date(`${b.date || '2100-01-01'}T${(b.time || '00:00')}:00`);
      return at - bt;
    });
    debugOut(`gesamt ${all.length} Events`);

    targets.forEach(container => {
      const cat = container.getAttribute('data-category');      // e.g. "maennergruppe"
      const limit = parseInt(container.getAttribute('data-limit') || '0', 10);
      const fromToday = container.hasAttribute('data-future-only');

      let list = all;

      if (cat) {
        list = list.filter(ev => ev.category === cat);
      }

      if (fromToday) {
        const now = new Date(); now.setHours(0,0,0,0);
        list = list.filter(ev => {
          if (!ev.date) return false;
          const dt = new Date(`${ev.date}T${(ev.time || '00:00')}:00`);
          return dt >= now;
        });
      }

      if (limit > 0) list = list.slice(0, limit);

      debugOut(`render → cat=${cat || '∅'}, future=${fromToday}, limit=${limit || 0} ⇒ ${list.length} Einträge`);
      renderList(container, list);
    });
  };

  document.addEventListener('DOMContentLoaded', init);
})();
