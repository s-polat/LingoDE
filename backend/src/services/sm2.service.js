/**
 * SM-2 Spaced Repetition algoritması
 * quality: 0-5 arası değer (0-2 = yanlış, 3-5 = doğru)
 */
export function calculateSM2(word, quality) {
  let { sm2_repetitions, sm2_interval, sm2_easiness } = word;

  if (quality >= 3) {
    if (sm2_repetitions === 0) sm2_interval = 1;
    else if (sm2_repetitions === 1) sm2_interval = 6;
    else sm2_interval = Math.round(sm2_interval * sm2_easiness);

    sm2_repetitions += 1;
  } else {
    sm2_repetitions = 0;
    sm2_interval = 1;
  }

  sm2_easiness = Math.max(1.3, sm2_easiness + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  const next = new Date();
  next.setDate(next.getDate() + sm2_interval);

  return { sm2_repetitions, sm2_interval, sm2_easiness, sm2_next_review: next };
}
