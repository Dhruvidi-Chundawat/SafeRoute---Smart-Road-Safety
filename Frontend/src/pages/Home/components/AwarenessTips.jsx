import React from 'react';
import { Card } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './AwarenessTips.module.css';

const TIPS = [
  { icon:'car',      title:'Speed Compliance',    color:'#dc2626', bg:'#fef2f2', desc:'Over-speeding is the #1 killer on Indian roads. Every 10 km/h increase doubles crash severity — stay within limits.' },
  { icon:'warning',  title:'Avoid Distractions',  color:'#d97706', bg:'#fffbeb', desc:'Phone use while driving raises crash risk 4×. Eyes on road, hands on wheel — always, no exceptions.' },
  { icon:'shield',   title:'Seatbelts Save Lives', color:'#059669', bg:'#f0fdf4', desc:'Seatbelts reduce fatal injury risk by 45% for front-seat passengers. Buckle up every trip, every seat.' },
  { icon:'alert',    title:'Drunk Driving Kills',  color:'#dc2626', bg:'#fef2f2', desc:'Even small amounts of alcohol impair judgment and reaction time. Never drink and drive — use a cab or designate a driver.' },
  { icon:'map',      title:'Know Your Route',      color:'#1d5cf4', bg:'#eff6ff', desc:'Plan ahead, check road conditions, and avoid high-risk zones during fog, rain, and night driving.' },
  { icon:'hospital', title:'Learn First Aid',      color:'#7c3aed', bg:'#ede9fe', desc:'Basic first aid knowledge can save lives at accident sites. Quick response in the golden hour is absolutely critical.' },
];

export default function AwarenessTips() {
  return (
    <div className={styles.grid}>
      {TIPS.map((t, i) => (
        <Card key={i} accentTop={t.color}>
          <div className={styles.header}>
            <div className={styles.icon} style={{ background: t.bg }}>
              <Icon name={t.icon} size={20} color={t.color} />
            </div>
            <div className={styles.title}>{t.title}</div>
          </div>
          <p className={styles.desc}>{t.desc}</p>
        </Card>
      ))}
    </div>
  );
}
