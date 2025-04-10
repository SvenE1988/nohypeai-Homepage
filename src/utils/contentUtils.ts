
/**
 * Utility functions for content verification and consistency
 */

// Function to verify if a URL is valid
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// Function to verify if a URL is internal to the app
export function isInternalUrl(url: string): boolean {
  if (url.startsWith('/') && !url.startsWith('//')) {
    return true;
  }
  
  try {
    const currentHost = window.location.hostname;
    const urlHost = new URL(url).hostname;
    return urlHost === currentHost;
  } catch (e) {
    return false;
  }
}

// Function to verify if all links in a document are valid
export function verifyLinksInDocument(): { valid: boolean; invalidLinks: string[] } {
  const links = document.querySelectorAll('a');
  const invalidLinks: string[] = [];
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href === 'javascript:void(0)') {
      invalidLinks.push(`Empty or javascript link: ${link.textContent || 'Unnamed Link'}`);
    } else if (!isValidUrl(href) && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      invalidLinks.push(`Invalid URL format: ${href}`);
    }
  });
  
  return {
    valid: invalidLinks.length === 0,
    invalidLinks
  };
}

// Function to check for placeholder content
export function checkForPlaceholderContent(): string[] {
  const placeholders = [
    'Lorem ipsum',
    'TODO:',
    'FIXME:',
    'xxx-xxx-xxxx',
    'example.com',
    'sample text'
  ];
  
  const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, li');
  const foundPlaceholders: string[] = [];
  
  elements.forEach(element => {
    const text = element.textContent?.toLowerCase() || '';
    placeholders.forEach(placeholder => {
      if (text.includes(placeholder.toLowerCase())) {
        foundPlaceholders.push(`Found "${placeholder}" in: ${element.textContent?.substring(0, 50)}...`);
      }
    });
  });
  
  return foundPlaceholders;
}

// Function to check for spelling errors (basic implementation)
export function checkForCommonTypos(text: string, language: 'de' | 'en' = 'de'): string[] {
  const commonTypos = {
    de: [
      { typo: 'ueber', correct: 'über' },
      { typo: 'fuer', correct: 'für' },
      { typo: 'implementierung', correct: 'Implementierung' },
      { typo: 'implementieren', correct: 'implementieren' },
      { typo: 'erfolg', correct: 'Erfolg' }
    ],
    en: [
      { typo: 'teh', correct: 'the' },
      { typo: 'adn', correct: 'and' },
      { typo: 'thier', correct: 'their' },
      { typo: 'recieve', correct: 'receive' },
      { typo: 'seperate', correct: 'separate' }
    ]
  };
  
  const typos = commonTypos[language];
  const foundTypos: string[] = [];
  
  typos.forEach(({ typo, correct }) => {
    // Look for word boundaries to avoid partial matches
    const regex = new RegExp(`\\b${typo}\\b`, 'gi');
    if (regex.test(text)) {
      foundTypos.push(`"${typo}" should be "${correct}"`);
    }
  });
  
  return foundTypos;
}
