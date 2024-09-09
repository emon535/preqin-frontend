// utils/formatNumber.ts
export const formatNumber = (num: number | string): string => {
    if (typeof num === 'string') {
      num = parseFloat(num);
    }
  
    if (isNaN(num)) {
      return 'NaN'; // Handle non-numeric strings
    }
  
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    } else {
      return num.toLocaleString();
    }
  };
  