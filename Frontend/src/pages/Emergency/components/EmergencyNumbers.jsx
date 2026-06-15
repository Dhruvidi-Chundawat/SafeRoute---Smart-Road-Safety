import React from 'react';
import styles from './EmergencyNumbers.module.css';

const CONTACTS = [
  { name:'National Emergency', number:'112',  type:'Police / Ambulance',  color:'#dc2626' },
  { name:'Ambulance',          number:'108',  type:'Medical Emergency',   color:'#ea580c' },
  { name:'Police Control',     number:'100',  type:'Law Enforcement',     color:'#1d5cf4' },
  { name:'Fire Brigade',       number:'101',  type:'Fire Emergency',      color:'#d97706' },
  { name:'Highway Patrol',     number:'1033', type:'Road Incidents',      color:'#0f2461' },
  { name:'Women Helpline',     number:'1091', type:'Women Safety',        color:'#7c3aed' },
];

export default function EmergencyNumbers() {
  return (
    <div className={styles.grid}>
      {CONTACTS.map((c, i) => (
        <a key={i} href={`tel:${c.number}`} className={styles.card} style={{ borderTop:`3px solid ${c.color}` }}>
          <div className={styles.number} style={{ color:c.color }}>{c.number}</div>
          <div className={styles.name}>{c.name}</div>
          <div className={styles.type}>{c.type}</div>
        </a>
      ))}
    </div>
  );
}