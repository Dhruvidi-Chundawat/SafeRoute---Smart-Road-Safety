import React from 'react';
import { StatBox } from '../../../components/UI';
import styles from './KPIRow.module.css';

const KPIS = [
  { value:'5,400',   label:'Total Accidents (2024)', delta:'+3.2% vs last yr', deltaUp:true  },
  { value:'634',     label:'Fatalities',              delta:'-1.8% vs last yr', deltaUp:false },
  { value:'12,840',  label:'Injuries',                delta:'+2.1% vs last yr', deltaUp:true  },
  { value:'8.3 min', label:'Avg Response Time',       delta:'-0.4 min improved',deltaUp:false },
];

export default function KPIRow() {
  return (
    <div className={styles.grid}>
      {KPIS.map((k, i) => (
        <StatBox key={i} value={k.value} label={k.label} delta={k.delta} deltaUp={k.deltaUp} />
      ))}
    </div>
  );
}