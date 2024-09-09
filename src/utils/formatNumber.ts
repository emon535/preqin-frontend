// utils/formatNumber.ts
export const formatNumber = (num: number|string): string => {
    if (typeof num === 'string') {
      num = parseFloat(num);
    }
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(1)}B`;
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1)}M`;
    } else {
      return num.toLocaleString();
    }
  };
  