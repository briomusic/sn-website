[![Deploy website via FTP](https://github.com/briomusic/sn-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/briomusic/sn-website/actions/workflows/deploy.yml)

# Seelen Navigatoren Website

Dies ist der Quellcode der [Seelen Navigatoren Website](https://www.seelen-navigatoren.de).

## Inhalte
- **HTML** – statische Seiten (`index.html`, `datenschutz.html`, usw.)
- **CSS** – globales Styling (`main.css`)
- **JS/JSON** – Event-Daten (`events.json`, `events.js`)
- **Images** – Bilder für die Website

## Deployment

Die Website wird automatisch über **GitHub Actions** per FTP zu DomainFactory deployed.

### Secrets (in GitHub → Settings → Secrets and variables → Actions)
- `DF_FTP_SERVER` – z. B. `ftp.briomusic.net`
- `DF_FTP_USER` – FTP Benutzername
- `DF_FTP_PASSWORD` – FTP Passwort
- `DF_FTP_PATH` – Zielverzeichnis, z. B. `/webseiten/`

### Manuelles Deployment
Wenn nötig, können Dateien auch direkt per FTP (z. B. FileZilla, Transmit) hochgeladen werden.

## Datenschutz
Die Datenschutzerklärung befindet sich in [`datenschutz.html`](datenschutz.html).

## Lizenz
© 2025 Seelen Navigatoren – Inhalte dürfen nicht ohne Erlaubnis kopiert oder weiterverwendet werden.
