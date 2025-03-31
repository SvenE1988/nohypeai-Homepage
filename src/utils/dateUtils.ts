
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
    
    const date = new Date(year, month, day);
    // Check if the date is valid before returning
    if (isNaN(date.getTime())) {
      console.error(`Ungültiges Datum erstellt: ${dateStr}`);
      return new Date(0);
    }
    
    return date;
  } catch (error) {
    console.error(`Fehler beim Parsen des Datums "${dateStr}":`, error);
    return new Date(0);
  }
};

/**
 * Sorts blog posts by date (newest first)
 * Generic type T allows for sorting any object that has a date property
 */
export const sortPostsByDate = <T extends {date: string}>(posts: T[]): T[] => {
  return [...posts].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};
