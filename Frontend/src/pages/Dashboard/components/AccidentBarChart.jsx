import React from 'react';
import { Card } from '../../../components/UI';
import styles from './AccidentBarChart.module.css';

const MONTHS     = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ACCIDENTS  = [420, 380, 510, 465, 390, 355, 430, 480, 520, 445, 495, 510];
const FATALITIES = [48,  39,  62,  55,  44,  38,  50,  58,  65,  52,  60,  63 ];
const MAX_A = Math.max(...ACCIDENTS);
const MAX_F = Math.max(...FATALITIES);

export default function AccidentBarChart() {
  return (
    <Card>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Monthly Accident Trend — 2024</div>
          <div className={styles.sub}>Accidents vs Fatalities</div>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.dot} style={{ background:'var(--accent)' }} /> Accidents
          </span>
          <span className={styles.legendItem}>
            <span className={styles.dot} style={{ background:'var(--danger)' }} /> Fatalities
          </span>
        </div>
      </div>
      <div className={styles.chart}>
        {MONTHS.map((m, i) => (
          <div key={i} className={styles.col}>
            <div className={styles.bars}>
              <div className={styles.bar}
                style={{ height:`${(ACCIDENTS[i] / MAX_A) * 100}%`, background:'var(--accent)', opacity:0.75 }} />
              <div className={styles.bar}
                style={{ height:`${(FATALITIES[i] / MAX_F) * 100}%`, background:'var(--danger)', opacity:0.75 }} />
            </div>
            <div className={styles.month}>{m}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}