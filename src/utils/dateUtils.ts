
/**
 * Parses a date string in the format "dd. Month yyyy" (e.g., "3. März 2025")
 * @param dateStr The date string to parse
 * @returns A Date object, or epoch date (1970-01-01) if parsing fails
 */
export const parseDate = (dateStr: string): Date => {
  try {
    const parts = dateStr.split('. ');
    if (parts.length !== 3) {
      console.error(`Ungültiges Datumsformat: ${dateStr}`);
      return new Date(0); // Fallback zu Unix Epoch
    }
    
    const day = parseInt(parts[0]);
    const monthMap: {[key: string]: number} = {
      "Januar": 0, "Februar": 1, "März": 2, "April": 3, "Mai": 4, "Juni": 5,
      "Juli": 6, "August": 7, "September": 8, "Oktober": 9, "November": 10, "Dezember": 11
    };
    const month = monthMap[parts[1]];
    const year = parseInt(parts[2]);
    
    if (isNaN(day) || month === undefined || isNaN(year)) {
      console.error(`Fehler beim Parsen des Datums: ${dateStr}, Tag: ${day}, Monat: ${month}, Jahr: ${year}`);
      return new Date(0);
    }
    
    return new Date(year, month, day);
  } catch (error) {
    console.error(`Fehler beim Parsen des Datums "${dateStr}":`, error);
    return new Date(0);
  }
};

/**
 * Sorts blog posts by date (newest first)
 */
export const sortPostsByDate = (posts: Array<{date: string}>) => {
  return [...posts].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};
