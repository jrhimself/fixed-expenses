export function autoMatch(transactie, lasten, periode) {
  // Only match debits (afschrijvingen); credits (bijschrijvingen) are never fixed expenses
  if (transactie.bedrag >= 0) return null;

  // Omschrijving heeft hoogste prioriteit
  for (const last of lasten) {
    if (last.omschrijving_patroon && transactie.omschrijving) {
      try {
        const re = new RegExp(last.omschrijving_patroon, 'i');
        if (re.test(transactie.omschrijving)) return last.id;
      } catch {
        if (transactie.omschrijving.toLowerCase().includes(last.omschrijving_patroon.toLowerCase())) return last.id;
      }
    }
  }

  if (transactie.tegenrekening) {
    const ibanLasten = lasten.filter(l =>
      l.iban_tegenrekening &&
      l.iban_tegenrekening.replace(/\s/g, '') === transactie.tegenrekening.replace(/\s/g, '')
    );
    if (ibanLasten.length === 1) return ibanLasten[0].id;
    if (ibanLasten.length > 1) {
      const match = ibanLasten.find(l => Math.abs(Math.abs(transactie.bedrag) - l.bedrag) < 0.02);
      return match ? match.id : ibanLasten[0].id;
    }
  }

  // Naam-match: alleen als last geen IBAN en geen omschrijving_patroon heeft, min 4 chars to avoid false positives
  for (const last of lasten) {
    if (!last.iban_tegenrekening && !last.omschrijving_patroon && last.naam && last.naam.length >= 4 && transactie.omschrijving) {
      if (transactie.omschrijving.toLowerCase().includes(last.naam.toLowerCase())) return last.id;
    }
  }

  // Bedrag-matching: verwachte_dag is een indicatie, geen harde beperking.
  // Als het bedrag uniek is → altijd matchen. Bij meerdere → dichtstbijzijnde dag wint.
  // Lasten met een IBAN worden uitgesloten: als IBAN niet matcht, is bedrag geen geldige fallback.
  const bedragMatches = lasten.filter(last =>
    !last.iban_tegenrekening &&
    last.bedrag != null && transactie.bedrag != null &&
    Math.abs(Math.abs(transactie.bedrag) - last.bedrag) < 0.02
  );

  if (bedragMatches.length === 1) {
    // Verify date proximity if we have enough info (max 15 days from expected day)
    const match = bedragMatches[0];
    if (match.verwachte_dag && transactie.datum && periode.start_datum) {
      const start = new Date(periode.start_datum);
      let verwacht = new Date(start);
      verwacht.setDate(match.verwachte_dag);
      if (verwacht < start) verwacht.setMonth(verwacht.getMonth() + 1);
      const daysDiff = Math.abs(new Date(transactie.datum) - verwacht) / (1000 * 60 * 60 * 24);
      if (daysDiff > 15) return null;
    }
    return match.id;
  }

  if (bedragMatches.length > 1 && transactie.datum && periode.start_datum) {
    const start = new Date(periode.start_datum);
    const tDatum = new Date(transactie.datum);
    const metDiff = bedragMatches
      .filter(l => l.verwachte_dag)
      .map(last => {
        let verwacht = new Date(start);
        verwacht.setDate(last.verwachte_dag);
        if (verwacht < start) verwacht.setMonth(verwacht.getMonth() + 1);
        return { id: last.id, diff: Math.abs(tDatum - verwacht) };
      });
    if (metDiff.length > 0) {
      metDiff.sort((a, b) => a.diff - b.diff);
      return metDiff[0].id;
    }
    return bedragMatches[0].id;
  }

  return null;
}
