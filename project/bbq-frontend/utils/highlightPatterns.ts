const highlightPatterns = ({ text, patterns }: { text: string; patterns: string[] }) => {
  const regexParts = patterns.map(pattern => `(${pattern})`).join('|');
  const regex = new RegExp(regexParts, 'gi');

  const highlightedText = text.replace(regex, '<span style="color: red">$&</span>');

  return highlightedText;
};

export { highlightPatterns };
