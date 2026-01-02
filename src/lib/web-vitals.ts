import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

interface VitalsReport {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const reportWebVitals = (onPerfEntry?: (metric: VitalsReport) => void) => {
  const vitals = {
    CLS: { name: 'Cumulative Layout Shift', thresholds: [0.1, 0.25] },
    INP: { name: 'Interaction to Next Paint', thresholds: [200, 500] },
    FCP: { name: 'First Contentful Paint', thresholds: [1800, 3000] },
    LCP: { name: 'Largest Contentful Paint', thresholds: [2500, 4000] },
    TTFB: { name: 'Time to First Byte', thresholds: [800, 1800] },
  };

  const getRating = (value: number, thresholds: number[]): 'good' | 'needs-improvement' | 'poor' => {
    if (value <= thresholds[0]) return 'good';
    if (value <= thresholds[1]) return 'needs-improvement';
    return 'poor';
  };

  const onMetric = (metric: any) => {
    const vitalsInfo = vitals[metric.name as keyof typeof vitals];
    const rating = getRating(metric.value, vitalsInfo.thresholds);

    const report: VitalsReport = {
      name: vitalsInfo.name,
      value: metric.value,
      rating,
    };

    if (process.env.NODE_ENV === 'production') {
      if (onPerfEntry) {
        onPerfEntry(report);
      }
    }
  };

  onCLS(onMetric);
  onINP(onMetric);
  onFCP(onMetric);
  onLCP(onMetric);
  onTTFB(onMetric);
};

export default reportWebVitals;
