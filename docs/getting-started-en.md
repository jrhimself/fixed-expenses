# Getting Started — Fixed Expenses

## What is Fixed Expenses?

Fixed Expenses is a personal finance app that helps you track your recurring monthly costs — rent, subscriptions, insurance, utilities, and anything else that gets debited from your bank account on a regular basis.

The core idea is simple: you define your fixed expenses once, import your bank statement as a CSV, and the app automatically matches transactions to the right expense. At a glance you can see what has been paid, what is still open, and whether any amounts deviate from what you expected.

---

## First Launch

When you open the app for the first time, it automatically generates 12 periods for the current year based on a salary day of the 25th. Each period runs from one salary date to the day before the next — typically covering one calendar month.

You can adjust the salary day under **⚙ Settings**.

---

## Understanding Periods

A **period** represents one pay cycle. It has a start date (your salary date) and an end date (the day before the next salary date). All imported transactions are assigned to the period they fall within.

Examples:
- 25 Jan → 24 Feb
- 25 Feb → 24 Mar

When December arrives, the app reminds you to generate periods for the next year.

---

## Step 1 — Add Your Fixed Expenses

Before importing any bank data, enter all your recurring costs. Go to the dashboard and click **+ Fixed expense**.

### Fields explained

| Field | Description |
|---|---|
| **Name** | A recognisable label, e.g. *Netflix* or *Rent* |
| **Amount (€)** | The expected monthly amount |
| **Expected day (1–31)** | The day of the month the debit usually occurs |
| **Category** | Optional grouping, e.g. *Housing*, *Subscriptions* |
| **IBAN counter account** | The IBAN that the debit comes from — the most reliable way to match |
| **Description pattern** | A text fragment or regular expression that appears in the bank transaction description |
| **Allowed amount deviation (€)** | How many euros the actual debit may differ from the expected amount before the row is highlighted yellow |
| **Variable amount** | Tick this if the amount varies every month (e.g. a credit card bill) — the row will never be highlighted yellow |

### Matching priority

The app tries to match each imported transaction to a fixed expense in this order:

1. **Description pattern** — highest priority; a regex or text match against the transaction description
2. **IBAN counter account** — exact match on IBAN; if multiple expenses share the same IBAN, the amount is added to the criteria
3. **Name** — the expense name is searched in the transaction description
4. **Amount + expected day** — the closest amount within a 15-day window around the expected day

**Tip:** The IBAN is the most reliable matching method. You can let the app learn it automatically: after manually linking a transaction, the app will ask whether to save the IBAN for future imports — but only if no IBAN has been set yet for that expense.

---

## Step 2 — Export a CSV From Your Bank

Every bank offers a way to export your transaction history as a CSV file. The exact steps differ per bank, but the general process is:

1. Log in to your bank's online portal or app
2. Navigate to your current account / main account
3. Look for an option such as *Download*, *Export*, *Transactions*, or *Statement*
4. Choose the **CSV** format (sometimes called *Excel* or *Comma-separated*)
5. Select the date range that matches the period you want to import
6. Download the file to your computer

**Supported banks:** ING, ABN AMRO, Rabobank, Sparkasse. Other banks may work if their CSV uses a standard format (date, description, amount, counter account).

**Note:** Only export one period at a time to keep things clean. Transactions that fall outside all known periods are skipped automatically.

---

## Step 3 — Import the CSV

1. Click **Import CSV** in the sidebar
2. Click *Choose file* and select the CSV you downloaded
3. Click **Preview** — the app shows all transactions it found in the file
4. Review the list, then click **Import & match**

The app will:
- Save all valid transactions to the current period
- Automatically match as many transactions to fixed expenses as possible
- Skip duplicate transactions (safe to import the same file twice)
- Skip transactions that fall outside all known periods

After import, the dashboard updates immediately. Matched expenses show a **Paid** badge and the actual debit date and amount.

---

## The Dashboard

The dashboard is your main view. It shows all fixed expenses for the selected period.

### Status badges

| Status | Meaning |
|---|---|
| **Open** | No matching transaction found yet |
| **Expected** | The expected day is coming up but no transaction has arrived yet |
| **Paid** | A matching transaction was found (or manually marked) |
| **Inactive** | This expense does not apply in this period |

### Totals bar

At the top of the dashboard you see three totals:
- **Total expected** — sum of all active fixed expenses for this period
- **Debited** — sum of all matched transactions
- **Still open** — the difference (what has not been matched yet)

### Filters

Use the filters at the top to narrow down by year, period, category, status, or a search term.

### Charts

Click **Charts** to expand a visual overview:
- **Distribution by category** — a donut chart of expected costs per category
- **Expected vs paid per period** — a bar chart comparing expected and actual debits across all periods of the year

---

## Handling Matches

### Viewing a match

Click **•••** → **View match** on a paid expense to see exactly which transaction was matched and by which rule (IBAN, description pattern, or amount + day).

### Amount deviations

If the matched amount differs from the expected amount by more than the allowed deviation, the row is highlighted **yellow**. From the match detail screen you can:
- **Accept as new amount** — permanently updates the expected amount for this year
- **Accept once** — accepts the deviation for this period only, without changing the expected amount

### Manual linking

If the automatic match missed an expense, click **•••** → **Find transaction** to search all unlinked transactions and manually link one.

After linking, the app asks if it should save the IBAN for future automatic matching — but only if no IBAN has been set yet for that expense.

### Rematching

Click **•••** → **Rematch** to re-run the automatic matching for a single expense. Useful after you have added or updated an IBAN or description pattern.

### Undo a match

From the match detail screen, click **Undo match** to unlink the transaction and set the expense back to Open.

---

## Settings

Open **⚙ Settings** from the sidebar.

### Salary day

Set the day of the month your salary arrives. This is used when generating periods automatically. The default is the 25th.

### Generate periods for year

Enter a year and click **Generate 12 periods**. The app creates 12 consecutive periods starting from the salary day. Already existing periods are skipped.

### Delete year

Enter a year and click **Delete year** to remove all periods and associated transactions for that year. This action cannot be undone.

### Existing periods

The settings panel shows all periods with a delete button (×) for each one.

---

## Language

The app supports **English**, **Dutch**, and **German**. Use the **EN / NL / DE** buttons at the bottom of the sidebar to switch. The preference is saved in your browser and remembered on next visit.

---

## Tips

- **Start with IBAN.** Fill in the IBAN counter account for as many expenses as possible. It is the most reliable matching method and eliminates ambiguity.
- **Use description patterns for expenses without a fixed IBAN.** For example, a rent payment from a landlord's personal account might always contain the word *Rent* or a reference number in the description.
- **Set an amount deviation** for expenses that fluctuate slightly (e.g. ±€1 rounding differences).
- **Tick Variable amount** for costs like a credit card bill where the amount changes every month — this prevents false yellow highlights.
- **Import regularly.** The more often you import, the easier it is to spot gaps and unexpected charges.
