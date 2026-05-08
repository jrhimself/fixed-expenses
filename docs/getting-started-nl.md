# Aan de slag — Fixed Expenses

## Wat is Fixed Expenses?

Fixed Expenses is een persoonlijke financiën-app waarmee je je vaste maandelijkse kosten bijhoudt — huur, abonnementen, verzekeringen, energierekeningen en alles wat regelmatig van je rekening wordt afgeschreven.

Het idee is eenvoudig: je voert je vaste lasten één keer in, importeert je bankafschrift als CSV, en de app koppelt transacties automatisch aan de juiste last. In één oogopslag zie je wat er betaald is, wat nog open staat en of er bedragen afwijken van wat je verwacht.

---

## Eerste keer opstarten

Wanneer je de app voor het eerst opent, worden automatisch 12 periodes aangemaakt voor het huidige jaar op basis van salarisdag 25. Een periode loopt van de ene salarisdatum tot de dag vóór de volgende — doorgaans één kalendermaand.

De salarisdag kun je aanpassen via **⚙ Instellingen**.

---

## Periodes begrijpen

Een **periode** staat voor één salariscyclus. Deze heeft een startdatum (je salarisdatum) en een einddatum (de dag vóór de volgende salarisdatum). Alle geïmporteerde transacties worden toegewezen aan de periode waarin ze vallen.

Voorbeelden:
- 25 jan → 24 feb
- 25 feb → 24 mrt

Wanneer het december wordt, herinnert de app je eraan om periodes voor het volgende jaar aan te maken.

---

## Stap 1 — Voer je vaste lasten in

Voordat je bankdata importeert, voer je eerst al je vaste lasten in. Ga naar het dashboard en klik op **+ Vaste Last**.

### Toelichting per veld

| Veld | Omschrijving |
|---|---|
| **Naam** | Een herkenbaar label, bijv. *Netflix* of *Huur* |
| **Bedrag (€)** | Het verwachte maandbedrag |
| **Verwachte dag (1–31)** | De dag van de maand waarop de afschrijving normaal plaatsvindt |
| **Categorie** | Optionele groepering, bijv. *Wonen*, *Abonnementen* |
| **IBAN tegenrekening** | Het IBAN waarvan de afschrijving afkomstig is — de betrouwbaarste manier om te matchen |
| **Omschrijving patroon** | Een tekst of reguliere expressie die voorkomt in de transactieomschrijving van de bank |
| **Toegestane afwijking bedrag (€)** | Hoeveel euro het werkelijke bedrag mag afwijken van het verwachte bedrag voordat de rij geel wordt |
| **Variabel bedrag** | Vink aan als het bedrag elke maand verschilt (bijv. een creditcardrekening) — de rij wordt dan nooit geel |

### Match volgorde

De app probeert elke geïmporteerde transactie te koppelen aan een vaste last in deze volgorde:

1. **Omschrijving patroon** — hoogste prioriteit; een regex- of tekstvergelijking met de transactieomschrijving
2. **IBAN tegenrekening** — exacte match op IBAN; bij meerdere matches wordt bedrag toegevoegd aan criteria
3. **Naam** — de naam van de vaste last wordt gezocht in de transactieomschrijving
4. **Bedrag + verwachte dag** — het dichtstbijzijnde bedrag binnen een venster van 15 dagen rondom de verwachte dag

**Tip:** Het IBAN is de betrouwbaarste methode. Je kunt de app dit automatisch laten leren: na het handmatig koppelen van een transactie vraagt de app of het IBAN opgeslagen mag worden voor toekomstige imports — maar alleen als er nog geen IBAN is ingesteld voor die vaste last.

---

## Stap 2 — CSV exporteren vanuit je bank

Elke bank biedt een manier om je transactiegeschiedenis te exporteren als CSV-bestand. De exacte stappen verschillen per bank, maar de algemene werkwijze is:

1. Log in op de internetbankieren-omgeving of app van je bank
2. Ga naar je betaalrekening / hoofdrekening
3. Zoek naar een optie zoals *Downloaden*, *Exporteren*, *Transacties* of *Afschrift*
4. Kies het **CSV**-formaat (soms aangeduid als *Excel* of *Kommagescheiden*)
5. Selecteer het datumbereik dat overeenkomt met de periode die je wilt importeren
6. Download het bestand naar je computer

**Ondersteunde banken:** ING, ABN AMRO, Rabobank, Sparkasse. Andere banken werken mogelijk ook als hun CSV een standaardformaat heeft (datum, omschrijving, bedrag, tegenrekening).

**Let op:** Exporteer bij voorkeur één periode tegelijk. Transacties die buiten alle bekende periodes vallen, worden automatisch overgeslagen.

---

## Stap 3 — CSV importeren

1. Klik op **Importeer CSV** in de zijbalk
2. Klik op *Bestand kiezen* en selecteer de gedownloade CSV
3. Klik op **Bekijk preview** — de app toont alle transacties die gevonden zijn in het bestand
4. Controleer de lijst en klik op **Importeren & matchen**

De app zal:
- Alle geldige transacties opslaan in de huidige periode
- Zo veel mogelijk transacties automatisch koppelen aan vaste lasten
- Dubbele transacties overslaan (hetzelfde bestand mag dus veilig twee keer geïmporteerd worden)
- Transacties overslaan die buiten alle bekende periodes vallen

Na het importeren wordt het dashboard direct bijgewerkt. Gematchte lasten tonen een **Betaald**-badge met de werkelijke afschrijfdatum en het werkelijke bedrag.

---

## Het dashboard

Het dashboard is je hoofdoverzicht. Het toont alle vaste lasten voor de geselecteerde periode.

### Status-badges

| Status | Betekenis |
|---|---|
| **Open** | Er is nog geen passende transactie gevonden |
| **Verwacht** | De verwachte dag nadert, maar er is nog geen transactie binnengekomen |
| **Betaald** | Er is een passende transactie gevonden (of handmatig gemarkeerd) |
| **Inactief** | Deze last is niet actief in deze periode |

### Totaalregel

Bovenaan het dashboard zie je drie totalen:
- **Totaal verwacht** — som van alle actieve vaste lasten voor deze periode
- **Afgeschreven** — som van alle gematchte transacties
- **Nog open** — het verschil (wat nog niet gematcht is)

### Filters

Gebruik de filters bovenaan om te filteren op jaar, periode, categorie, status of een zoekterm.

### Grafieken

Klik op **Grafieken** om een visueel overzicht uit te klappen:
- **Verdeling per categorie** — een taartdiagram van verwachte kosten per categorie
- **Verwacht vs betaald per periode** — een staafdiagram dat verwachte en werkelijke afschrijvingen vergelijkt over alle periodes van het jaar

---

## Matches beheren

### Match bekijken

Klik op **•••** → **Bekijk match** bij een betaalde last om te zien welke transactie er gekoppeld is en via welke regel (IBAN, omschrijving patroon of bedrag + dag).

### Bedragafwijkingen

Als het gematchte bedrag meer afwijkt van het verwachte bedrag dan de ingestelde tolerantie, wordt de rij **geel** gemarkeerd. Vanuit het match-detailscherm kun je:
- **Accepteer als nieuw bedrag** — werkt het verwachte bedrag permanent bij voor dit jaar
- **Accepteer eenmalig** — accepteert de afwijking alleen voor deze periode, zonder het verwachte bedrag te wijzigen

### Handmatig koppelen

Als de automatische match een last heeft gemist, klik dan op **•••** → **Zoek transactie** om alle ongekoppelde transacties te doorzoeken en er handmatig een te koppelen.

Na het koppelen vraagt de app of het IBAN opgeslagen mag worden voor toekomstige automatische matching — maar alleen als er nog geen IBAN is ingesteld voor die vaste last.

### Hermatchen

Klik op **•••** → **Hermatchen** om de automatische matching opnieuw uit te voeren voor één last. Handig nadat je een IBAN of omschrijving patroon hebt toegevoegd of gewijzigd.

### Match ongedaan maken

Klik vanuit het match-detailscherm op **Match ongedaan maken** om de koppeling te verwijderen en de last terug op Open te zetten.

---

## Instellingen

Open **⚙ Instellingen** vanuit de zijbalk.

### Salarisdag

Stel de dag van de maand in waarop je salaris binnenkomt. Dit wordt gebruikt bij het automatisch aanmaken van periodes. De standaardwaarde is de 25e.

### Periodes genereren voor jaar

Vul een jaar in en klik op **Genereer 12 periodes**. De app maakt 12 opeenvolgende periodes aan vanaf de salarisdag. Al bestaande periodes worden overgeslagen.

### Jaar verwijderen

Vul een jaar in en klik op **Verwijder jaar** om alle periodes en bijbehorende transacties voor dat jaar te verwijderen. Deze actie kan niet ongedaan worden gemaakt.

### Bestaande periodes

Het instellingenpaneel toont alle periodes met een verwijderknop (×) per periode.

---

## Taal

De app ondersteunt **Nederlands**, **Engels** en **Duits**. Gebruik de knoppen **NL / EN / DE** onderaan de zijbalk om te wisselen. De voorkeur wordt opgeslagen in je browser en onthouden bij een volgend bezoek.

---

## Tips

- **Begin met IBAN.** Vul het IBAN in voor zoveel mogelijk lasten. Het is de betrouwbaarste koppelmethode en voorkomt ambiguïteit.
- **Gebruik omschrijving patronen voor lasten zonder vast IBAN.** Een huurafschrijving van een privérekening bevat bijvoorbeeld altijd het woord *Huur* of een kenmerk in de omschrijving.
- **Stel een bedragafwijking in** voor lasten die licht variëren (bijv. ±€1 afrondingsverschillen).
- **Vink Variabel bedrag aan** voor kosten zoals een creditcardrekening waarbij het bedrag elke maand anders is — zo voorkom je onterechte gele markeringen.
- **Importeer regelmatig.** Hoe vaker je importeert, hoe makkelijker het is om openstaande posten en onverwachte afschrijvingen te signaleren.
