export default (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  return /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)|black|green|silver|gray|olive|white|yellow|maroon|navy|red|blue|purple|teal|fuchsia|aqua|wheat/ig.test(value);
};