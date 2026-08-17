const CURRENT_YEAR = new Date().getFullYear();

export function validateMovie({ title, actors, releaseYear }) {
  const errors = {};

  if (!title || !title.trim()) {
    errors.title = 'Title is required';
  }

  if (!actors || !actors.trim()) {
    errors.actors = 'At least one actor is required';
  }

  if (releaseYear === '' || releaseYear === null || releaseYear === undefined) {
    errors.releaseYear = 'Release year is required';
  } else {
    const year = Number(releaseYear);
    if (!Number.isInteger(year) || year < 1888 || year > CURRENT_YEAR + 1) {
      errors.releaseYear = `Enter a year between 1888 and ${CURRENT_YEAR + 1}`;
    }
  }

  return errors;
}

// "Actor One, Actor Two" -> ["Actor One", "Actor Two"]
export function parseActors(raw) {
  return raw
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}
