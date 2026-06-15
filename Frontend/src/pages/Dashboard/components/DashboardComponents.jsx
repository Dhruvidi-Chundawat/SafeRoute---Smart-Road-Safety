import React from 'react';
import { Card, StatBox, Badge, RiskBar } from '../../../components/UI';
import styles from './DashboardComponents.module.css';

const KPIS=[
  {value:'5,400',   label:'Total Accidents (2024)',delta:'+3.2% vs last yr',deltaUp:true},
  {value:'634',     label:'Fatalities',            delta:'-1.8% vs last yr',deltaUp:false},
  {value:'12,840',  label:'Injuries',              delta:'+2.1% vs last yr',deltaUp:true},
  {value:'8.3 min', label:'Avg Response Time',     delta:'-0.4 min',        deltaUp:false},
];
export function KPIRow() {
  return <div className={styles.kpiRow}>{KPIS.map((k,i)=><StatBox key={i} value={k.value} label={k.label} delta={k.delta} deltaUp={k.deltaUp}/>)}</div>;
}

const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ACCIDENTS=[420,380,510,465,390,355,430,480,520,445,495,510];
const FATALITIES=[48,39,62,55,44,38,50,58,65,52,60,63];
const MAX_A=Math.max(...ACCIDENTS); const MAX_F=Math.max(...FATALITIES);
export function AccidentBarChart() {
  return (
    <Card>
      <div className={styles.chartHeader}>
        <div><div className={styles.chartTitle}>Monthly Accident Trend — 2024</div><div className={styles.chartSub}>Accidents vs Fatalities</div></div>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={styles.dot} style={{background:'var(--accent)'}}/> Accidents</span>
          <span className={styles.legendItem}><span className={styles.dot} style={{background:'var(--danger)'}}/> Fatalities</span>
        </div>
      </div>
      <div className={styles.barChart}>
        {MONTHS.map((m,i)=>(
          <div key={i} className={styles.barCol}>
            <div className={styles.barPair}>
              <div className={styles.bar} style={{height:`${(ACCIDENTS[i]/MAX_A)*100}%`,background:'var(--accent)',opacity:0.75}}/>
              <div className={styles.bar} style={{height:`${(FATALITIES[i]/MAX_F)*100}%`,background:'var(--danger)',opacity:0.75}}/>
            </div>
            <div className={styles.barLabel}>{m}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

const CAUSES=[
  {label:'Over Speeding',      pct:42,color:'#dc2626'},
  {label:'Drunk Driving',      pct:28,color:'#ea580c'},
  {label:'Distracted Driving', pct:16,color:'#d97706'},
  {label:'Road Defects',       pct:9, color:'#1d5cf4'},
  {label:'Weather',            pct:5, color:'#059669'},
];
export function CausesChart() {
  return (
    <Card>
      <div className={styles.chartTitle} style={{marginBottom:18}}>Accident Causes (%)</div>
      <div className={styles.causes}>
        {CAUSES.map((c,i)=>(
          <div key={i} className={styles.causeRow}>
            <div className={styles.causeTop}>
              <span className={styles.causeLabel}>{c.label}</span>
              <span className={styles.causePct} style={{color:c.color}}>{c.pct}%</span>
            </div>
            <RiskBar percent={c.pct} color={c.color}/>
          </div>
        ))}
      </div>
    </Card>
  );
}

const HOTSPOTS=[
  {zone:'NH48 — Delhi–Jaipur',    count:234,risk:'CRITICAL',change:'+12%'},
  {zone:'NH44 — Delhi–Mumbai',    count:198,risk:'HIGH',    change:'+8%'},
  {zone:'NH16 — Kolkata–Chennai', count:167,risk:'HIGH',    change:'-3%'},
  {zone:'NH8  — Mumbai–Pune',     count:143,risk:'MEDIUM',  change:'+5%'},
  {zone:'Ring Road — Delhi',      count:112,risk:'MEDIUM',  change:'-7%'},
];
export function HotspotsTable() {
  return (
    <Card>
      <div className={styles.chartTitle} style={{marginBottom:16}}>🔥 Accident Hotspots</div>
      <table className={styles.table}>
        <thead><tr><th>Zone</th><th>Accidents</th><th>Risk Level</th><th>Change</th></tr></thead>
        <tbody>
          {HOTSPOTS.map((h,i)=>(
            <tr key={i}>
              <td className={styles.tdZone}>{h.zone}</td>
              <td className={styles.tdCount}>{h.count}</td>
              <td><Badge variant={h.risk==='CRITICAL'?'red':h.risk==='HIGH'?'orange':'yellow'}>{h.risk}</Badge></td>
              <td className={styles.tdChange} style={{color:h.change.startsWith('+')?'var(--danger)':'var(--success)'}}>{h.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export function TableauEmbed() {
  return (
    <Card>
      <div className={styles.chartTitle}>📋 Tableau Dashboard</div>
      <div className={styles.chartSub} style={{marginBottom:16}}>Embed your Tableau / Power BI report here</div>
      <div className={styles.tableauBox}>
        <div className={styles.tableauInner}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
          <div className={styles.tableauLabel}>Tableau Embed Area</div>
          <div className={styles.tableauSub}>Replace with &lt;tableau-viz&gt; tag</div>
          <code className={styles.tableauCode}>src="https://public.tableau.com/..."</code>
        </div>
      </div>
    </Card>
  );
}
