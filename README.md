# Fixed Expenses

A personal finance web app to track recurring monthly costs, import bank statements, and manage your budget per salary period.

> **Language support:** The app interface is available in **English**, **Dutch (Nederlands)** and **German (Deutsch)**. Switch at any time using the EN | NL | DE buttons in the sidebar.

---

## Screenshot

![Fixed Expenses dashboard](docs/screenshot.png)

---

## Getting Started

New to Fixed Expenses? The getting started guides walk you through setting up your expenses, exporting a CSV from your bank, and importing transactions.

| Language | Guide |
|---|---|
| English | [docs/getting-started-en.md](docs/getting-started-en.md) |
| Nederlands | [docs/getting-started-nl.md](docs/getting-started-nl.md) |
| Deutsch | [docs/getting-started-de.md](docs/getting-started-de.md) |

---

## Features

- **Dashboard** — Overview of recurring costs per period with status (paid, open, expected, inactive)
- **Deviation marking** — Rows are highlighted yellow when the debited amount deviates from the expected amount
- **Variable costs** — Mark costs as variable to skip deviation highlighting
- **Bank import** — CSV import from ING, ABN AMRO, Rabobank and Sparkasse with automatic format detection
- **Auto-matching** — Transactions are matched to recurring costs based on description pattern, IBAN, name, or amount + expected day
- **Boundary matching** — Transactions up to 20 days outside a period can still be matched to that period
- **Periods** — Budget periods based on your salary day; auto-generated on first launch and per year
- **Delete year** — Bulk-remove all periods and transactions for a given year from Settings
- **Year overview** — Aggregated view across all periods in a year
- **Year overrides** — Per-year customization of cost name, amount, category, and expected day
- **Categories** — Group recurring costs and view the distribution in charts
- **Charts** — Donut chart by category and bar chart comparing expected vs paid per period
- **Three languages** — Full interface in English, Dutch and German; preference saved in browser

---

## Installation options

There are two ways to run this app:

| | Local | Cloudflare |
|---|---|---|
| **Setup** | Install Node.js and Git | Cloudflare account required |
| **Cost** | Free | Free (within Cloudflare's free tier) |
| **Access** | Your machine only | Accessible from anywhere |
| **Data** | Stored locally as a file | Stored in Cloudflare D1 |
| **Updates** | `git pull && npm start` | Automatic on push to `main` |

- **Local** — Runs on your own computer (Windows or Linux). No account needed. See [Running locally](#running-locally-without-cloudflare).
- **Cloudflare** — Hosted in the cloud, accessible from any device. See [Cloudflare hosting](#cloudflare-hosting).

---

## Running locally (without Cloudflare)

No Cloudflare account needed. The app runs entirely on your own machine with a local SQLite database. Choose your operating system below.

### Windows

#### Step 1 — Install Node.js

Go to [nodejs.org](https://nodejs.org/) and download the **LTS** version. Run the installer with the default settings.

Or via [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/):

```
winget install OpenJS.NodeJS.LTS
```

#### Step 2 — Install Git

Go to [git-scm.com/downloads](https://git-scm.com/downloads/win) and download Git for Windows. Run the installer with the default settings.

#### Step 3 — Verify the installation

Open **Command Prompt** or **PowerShell** and run:

```
node --version
git --version
```

Both commands should print a version number. If they do, continue.

#### Step 4 — Download the app

```
git clone https://github.com/jrhimself/fixed-expenses.git
cd fixed-expenses
npm install
```

#### Step 5 — Set a password (optional)

Create a file named `.env` in the project folder. Open Notepad, paste the lines below, and save as `.env` (make sure it is not saved as `.env.txt`):

```
AUTH_PASSWORD=choose-a-password
AUTH_SECRET=some-random-secret-string
```

> No password needed? Skip this step — the app will be accessible without login.

#### Step 6 — Start the app

```
npm start
```

Open your browser at **http://localhost:3000**.

---

### Linux (Ubuntu / Debian / Raspberry Pi)

#### Step 1 — Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Or via [nvm](https://github.com/nvm-sh/nvm):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 22
```

#### Step 2 — Install Git

Git is pre-installed on most Linux systems. If not:

```bash
sudo apt-get install -y git
```

#### Step 3 — Verify the installation

```bash
node --version
git --version
```

#### Step 4 — Download the app

```bash
git clone https://github.com/jrhimself/fixed-expenses.git
cd fixed-expenses
npm install
```

#### Step 5 — Set a password (optional)

```bash
cp .env.example .env
nano .env
```

Edit the values, then save with `Ctrl+O`, `Enter`, and exit with `Ctrl+X`.

#### Step 6 — Start the app

```bash
npm start
```

Open your browser at **http://localhost:3000**.

On a headless server (e.g. Raspberry Pi): open the app on another device via `http://<ip-address>:3000`. Find the IP address with `hostname -I`.

---

### Updating to a new version

```bash
git pull
npm install
npm start
```

Your data is preserved.

---

### FAQ

**Different port?** Add `PORT=4000` to your `.env` file.

**Stop the app?** Press `Ctrl + C` in the terminal.

**App won't start?** Make sure `node --version` shows version 22 or higher and that you have run `npm install`.

---

## Cloudflare hosting

Host the app in the cloud so it's accessible from any device. Requires a free [Cloudflare account](https://dash.cloudflare.com/sign-up) and the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

**1. Create a D1 database**

```bash
npx wrangler d1 create fixed-expenses-db
```

Copy the `database_id` from the output and update `wrangler.toml`.

**2. Apply the schema**

```bash
npx wrangler d1 execute fixed-expenses-db --remote --file=schema.sql
```

**3. Connect the repository to Cloudflare Pages**

Go to the Cloudflare dashboard → Pages → Create a project → Connect to Git. Select this repository and set the build output directory to `public`. The app will be deployed automatically on every push to `main`.

---

## License

MIT
