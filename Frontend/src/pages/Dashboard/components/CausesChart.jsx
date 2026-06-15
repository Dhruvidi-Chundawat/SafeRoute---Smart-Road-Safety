import React from 'react';
import { Card, RiskBar } from '../../../components/UI';
import styles from './CausesChart.module.css';

const CAUSES = [
  { label:'Over Speeding',       pct:42, color:'#dc2626' },
  { label:'Drunk Driving',       pct:28, color:'#ea580c' },
  { label:'Distracted Driving',  pct:16, color:'#d97706' },
  { label:'Road Defects',        pct:9,  color:'#1d5cf4' },
  { label:'Weather',             pct:5,  color:'#059669' },
];

export default function CausesChart() {
  return (
    <Card>
      <div className={styles.title}>Accident Causes (%)</div>
      <div className={styles.list}>
        {CAUSES.map((c, i) => (
          <div key={i} className={styles.row}>
            <div className={styles.top}>
              <span className={styles.label}>{c.label}</span>
              <span className={styles.pct} style={{ color:c.color }}>{c.pct}%</span>
            </div>
            <RiskBar percent={c.pct} color={c.color} />
          </div>
        ))}
      </div>
    </Card>
  );
}