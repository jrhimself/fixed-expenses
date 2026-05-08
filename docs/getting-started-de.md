# Erste Schritte — Fixed Expenses

## Was ist Fixed Expenses?

Fixed Expenses ist eine persönliche Finanz-App, mit der du deine wiederkehrenden monatlichen Kosten im Blick behältst — Miete, Abonnements, Versicherungen, Nebenkosten und alles andere, was regelmäßig von deinem Konto abgebucht wird.

Das Prinzip ist einfach: Du erfasst deine Fixkosten einmalig, importierst deinen Kontoauszug als CSV-Datei, und die App ordnet Transaktionen automatisch den richtigen Kosten zu. Auf einen Blick siehst du, was bezahlt wurde, was noch offen ist und ob Beträge von deinen Erwartungen abweichen.

---

## Erster Start

Beim ersten Öffnen der App werden automatisch 12 Perioden für das aktuelle Jahr erstellt, basierend auf dem Gehaltsdatum 25. Eine Periode läuft vom einen Gehaltsdatum bis zum Tag vor dem nächsten — in der Regel ein Kalendermonat.

Das Gehaltsdatum kannst du unter **⚙ Einstellungen** anpassen.

---

## Perioden verstehen

Eine **Periode** entspricht einem Gehaltsintervall. Sie hat ein Startdatum (dein Gehaltsdatum) und ein Enddatum (der Tag vor dem nächsten Gehaltsdatum). Alle importierten Transaktionen werden der Periode zugeordnet, in die sie fallen.

Beispiele:
- 25. Jan → 24. Feb
- 25. Feb → 24. Mär

Wenn der Dezember beginnt, erinnert dich die App daran, Perioden für das nächste Jahr zu erstellen.

---

## Schritt 1 — Fixkosten erfassen

Bevor du Bankdaten importierst, erfasse zunächst alle deine wiederkehrenden Kosten. Gehe zum Dashboard und klicke auf **+ Fixkosten**.

### Felder erklärt

| Feld | Beschreibung |
|---|---|
| **Name** | Ein erkennbares Label, z. B. *Netflix* oder *Miete* |
| **Betrag (€)** | Der erwartete monatliche Betrag |
| **Erwarteter Tag (1–31)** | Der Tag im Monat, an dem die Abbuchung normalerweise erfolgt |
| **Kategorie** | Optionale Gruppierung, z. B. *Wohnen*, *Abonnements* |
| **IBAN Gegenkonto** | Die IBAN, von der die Abbuchung stammt — die zuverlässigste Matching-Methode |
| **Beschreibungsmuster** | Ein Textfragment oder regulärer Ausdruck, der in der Transaktionsbeschreibung vorkommt |
| **Zulässige Betragsabweichung (€)** | Wie viel Euro der tatsächliche Betrag vom erwarteten abweichen darf, bevor die Zeile gelb markiert wird |
| **Variabler Betrag** | Aktivieren, wenn der Betrag monatlich variiert (z. B. eine Kreditkartenabrechnung) — die Zeile wird dann nie gelb markiert |

### Matching-Priorität

Die App versucht, jede importierte Transaktion in dieser Reihenfolge einer Fixkosten-Position zuzuordnen:

1. **Beschreibungsmuster** — höchste Priorität; ein Regex- oder Textvergleich mit der Transaktionsbeschreibung
2. **IBAN Gegenkonto** — exakte Übereinstimmung mit der IBAN; teilen sich mehrere Einträge dieselbe IBAN, wird der Betrag als zusätzliches Kriterium herangezogen
3. **Name** — der Name der Fixkosten-Position wird in der Transaktionsbeschreibung gesucht
4. **Betrag + erwarteter Tag** — der nächstgelegene Betrag in einem 15-Tage-Fenster um den erwarteten Tag

**Tipp:** Die IBAN ist die zuverlässigste Matching-Methode. Du kannst die App das IBAN automatisch lernen lassen: Nach dem manuellen Verknüpfen einer Transaktion fragt die App, ob die IBAN für zukünftige Imports gespeichert werden soll — jedoch nur, wenn für diese Fixkosten-Position noch keine IBAN hinterlegt ist.

---

## Schritt 2 — CSV aus deiner Bank exportieren

Jede Bank bietet eine Möglichkeit, den Transaktionsverlauf als CSV-Datei zu exportieren. Die genauen Schritte unterscheiden sich je nach Bank, der allgemeine Ablauf ist jedoch:

1. Melde dich im Online-Banking-Portal oder der App deiner Bank an
2. Navigiere zu deinem Girokonto / Hauptkonto
3. Suche nach einer Option wie *Herunterladen*, *Exportieren*, *Transaktionen* oder *Kontoauszug*
4. Wähle das **CSV**-Format (manchmal als *Excel* oder *Kommagetrennt* bezeichnet)
5. Wähle den Datumsbereich, der der Periode entspricht, die du importieren möchtest
6. Lade die Datei auf deinen Computer herunter

**Unterstützte Banken:** ING, ABN AMRO, Rabobank, Sparkasse. Andere Banken funktionieren möglicherweise ebenfalls, wenn ihre CSV ein Standardformat verwendet (Datum, Beschreibung, Betrag, Gegenkonto).

**Hinweis:** Exportiere möglichst immer nur eine Periode auf einmal. Transaktionen, die außerhalb aller bekannten Perioden liegen, werden automatisch übersprungen.

---

## Schritt 3 — CSV importieren

1. Klicke auf **CSV importieren** in der Seitenleiste
2. Klicke auf *Datei auswählen* und wähle die heruntergeladene CSV-Datei
3. Klicke auf **Vorschau** — die App zeigt alle Transaktionen, die in der Datei gefunden wurden
4. Überprüfe die Liste und klicke auf **Importieren & zuordnen**

Die App wird:
- Alle gültigen Transaktionen in der aktuellen Periode speichern
- So viele Transaktionen wie möglich automatisch Fixkosten zuordnen
- Doppelte Transaktionen überspringen (die gleiche Datei kann gefahrlos zweimal importiert werden)
- Transaktionen überspringen, die außerhalb aller bekannten Perioden liegen

Nach dem Import wird das Dashboard sofort aktualisiert. Zugeordnete Kosten zeigen ein **Bezahlt**-Badge mit dem tatsächlichen Abbuchungsdatum und -betrag.

---

## Das Dashboard

Das Dashboard ist deine Hauptansicht. Es zeigt alle Fixkosten für die ausgewählte Periode.

### Status-Badges

| Status | Bedeutung |
|---|---|
| **Offen** | Noch keine passende Transaktion gefunden |
| **Erwartet** | Der erwartete Tag nähert sich, aber noch keine Transaktion eingegangen |
| **Bezahlt** | Eine passende Transaktion wurde gefunden (oder manuell markiert) |
| **Inaktiv** | Diese Kostenposition ist in dieser Periode nicht aktiv |

### Summenleiste

Oben im Dashboard siehst du drei Summen:
- **Gesamt erwartet** — Summe aller aktiven Fixkosten für diese Periode
- **Abgebucht** — Summe aller zugeordneten Transaktionen
- **Noch offen** — die Differenz (was noch nicht zugeordnet wurde)

### Filter

Verwende die Filter oben, um nach Jahr, Periode, Kategorie, Status oder einem Suchbegriff einzuschränken.

### Diagramme

Klicke auf **Diagramme**, um eine visuelle Übersicht aufzuklappen:
- **Verteilung nach Kategorie** — ein Donut-Diagramm der erwarteten Kosten pro Kategorie
- **Erwartet vs. bezahlt pro Periode** — ein Balkendiagramm, das erwartete und tatsächliche Abbuchungen über alle Perioden des Jahres vergleicht

---

## Zuordnungen verwalten

### Zuordnung anzeigen

Klicke bei einer bezahlten Position auf **•••** → **Zuordnung anzeigen**, um zu sehen, welche Transaktion zugeordnet wurde und nach welcher Regel (IBAN, Beschreibungsmuster oder Betrag + Tag).

### Betragsabweichungen

Wenn der zugeordnete Betrag mehr als die zulässige Abweichung vom erwarteten Betrag abweicht, wird die Zeile **gelb** markiert. Über den Detailbereich der Zuordnung kannst du:
- **Als neuen Betrag akzeptieren** — aktualisiert den erwarteten Betrag dauerhaft für dieses Jahr
- **Einmalig akzeptieren** — akzeptiert die Abweichung nur für diese Periode, ohne den erwarteten Betrag zu ändern

### Manuelles Verknüpfen

Wenn die automatische Zuordnung eine Position verfehlt hat, klicke auf **•••** → **Transaktion suchen**, um alle nicht verknüpften Transaktionen zu durchsuchen und manuell eine zu verknüpfen.

Nach dem Verknüpfen fragt die App, ob die IBAN für zukünftige automatische Zuordnung gespeichert werden soll — jedoch nur, wenn für diese Fixkosten-Position noch keine IBAN hinterlegt ist.

### Erneut zuordnen

Klicke auf **•••** → **Erneut zuordnen**, um die automatische Zuordnung für eine einzelne Position neu durchzuführen. Nützlich, nachdem du eine IBAN oder ein Beschreibungsmuster hinzugefügt oder geändert hast.

### Zuordnung aufheben

Klicke im Detailbereich der Zuordnung auf **Zuordnung aufheben**, um die Verknüpfung zu entfernen und die Position wieder auf Offen zu setzen.

---

## Einstellungen

Öffne **⚙ Einstellungen** aus der Seitenleiste.

### Gehaltsdatum

Lege den Tag des Monats fest, an dem dein Gehalt eingeht. Dieser wird beim automatischen Erstellen von Perioden verwendet. Der Standardwert ist der 25.

### Perioden für Jahr generieren

Gib ein Jahr ein und klicke auf **12 Perioden generieren**. Die App erstellt 12 aufeinanderfolgende Perioden ab dem Gehaltsdatum. Bereits vorhandene Perioden werden übersprungen.

### Jahr löschen

Gib ein Jahr ein und klicke auf **Jahr löschen**, um alle Perioden und zugehörigen Transaktionen für dieses Jahr zu entfernen. Diese Aktion kann nicht rückgängig gemacht werden.

### Vorhandene Perioden

Das Einstellungspanel zeigt alle Perioden mit einer Löschtaste (×) für jede einzelne.

---

## Sprache

Die App unterstützt **Englisch**, **Niederländisch** und **Deutsch**. Verwende die Schaltflächen **EN / NL / DE** unten in der Seitenleiste zum Wechseln. Die Einstellung wird in deinem Browser gespeichert und beim nächsten Besuch berücksichtigt.

---

## Tipps

- **Beginne mit der IBAN.** Trage für möglichst viele Positionen das IBAN-Gegenkonto ein. Es ist die zuverlässigste Matching-Methode und vermeidet Mehrdeutigkeiten.
- **Verwende Beschreibungsmuster für Kosten ohne feste IBAN.** Eine Mietzahlung vom privaten Konto des Vermieters enthält beispielsweise immer das Wort *Miete* oder eine Referenznummer in der Beschreibung.
- **Lege eine Betragsabweichung fest** für Kosten, die leicht schwanken (z. B. ±€1 Rundungsdifferenzen).
- **Aktiviere Variabler Betrag** für Kosten wie eine Kreditkartenabrechnung, bei der der Betrag jeden Monat variiert — so vermeidest du falsche gelbe Markierungen.
- **Importiere regelmäßig.** Je öfter du importierst, desto leichter fällt es, Lücken und unerwartete Abbuchungen zu erkennen.
