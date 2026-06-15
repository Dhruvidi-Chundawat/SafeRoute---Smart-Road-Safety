import React from 'react';
import { Card, Badge, Input } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './HospitalComponents.module.css';

const FILTERS = ['all','trauma','govt','private'];
export function HospitalFilters({ search, filter, onSearch, onFilter }) {
  return (
    <div className={styles.filters}>
      <Input placeholder="Search hospitals..." value={search} onChange={e=>onSearch(e.target.value)} style={{flex:1,minWidth:200}}/>
      {FILTERS.map(f=>(
        <button key={f} onClick={()=>onFilter(f)} className={`${styles.filterBtn} ${filter===f?styles.filterActive:''}`}>
          {f==='all'?'All':f.charAt(0).toUpperCase()+f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export function HospitalList({ hospitals }) {
  if (!hospitals.length) return <div className={styles.empty}><Icon name="hospital" size={40} color="var(--text4)"/><p>No hospitals match your filters.</p></div>;
  return <div className={styles.list}>{hospitals.map((h,i)=><HospitalCard key={i} hospital={h}/>)}</div>;
}

function HospitalCard({ hospital: h }) {
  const bedColor = h.beds>10?'var(--success)':h.beds>4?'var(--warn)':'var(--danger)';
  return (
    <div className={styles.hCard} style={{borderLeft:`4px solid ${h.emergency?'var(--danger)':'var(--border)'}`}}>
      <div className={styles.hIcon}><Icon name="hospital" size={22} color="var(--accent)"/></div>
      <div className={styles.hInfo}>
        <div className={styles.hNameRow}>
          <span className={styles.hName}>{h.name}</span>
          {h.emergency && <Badge variant="red">24/7 ER</Badge>}
          <Badge variant={h.type==='trauma'?'orange':h.type==='private'?'blue':'green'}>{h.type}</Badge>
        </div>
        <div className={styles.hAddress}>{h.address}</div>
        <div className={styles.hMeta}>
          <span style={{color:'var(--accent)'}}>📍 {h.dist}</span>
          <span style={{color:'var(--warn)'}}>⏱ {h.time}</span>
          <span style={{color:bedColor}}>🛏 {h.beds} beds</span>
          <span style={{color:'var(--text3)'}}>⭐ {h.rating}</span>
        </div>
      </div>
      <div className={styles.hActions}>
        <a href={`tel:${h.phone}`} className={styles.callBtn}>CALL</a>
        <button className={styles.navBtn}>NAV</button>
      </div>
    </div>
  );
}

const PINS=[
  {top:'40%',left:'45%',color:'#059669',label:'You'},
  {top:'30%',left:'52%',color:'#dc2626',label:'AIIMS'},
  {top:'55%',left:'38%',color:'#1d5cf4',label:'Apollo'},
  {top:'45%',left:'60%',color:'#d97706',label:'Max'},
  {top:'25%',left:'42%',color:'#1d5cf4',label:'Safdarjung'},
];
export function HospitalMap() {
  return (
    <div className={styles.mapBox}>
      <div className={styles.mapGrid}/>
      <svg className={styles.mapSvg}>
        <line x1="0" y1="42%" x2="100%" y2="42%" stroke="rgba(29,92,244,0.12)" strokeWidth="2"/>
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(29,92,244,0.12)" strokeWidth="2"/>
        <line x1="0" y1="65%" x2="100%" y2="35%" stroke="rgba(29,92,244,0.07)" strokeWidth="1.5"/>
      </svg>
      {PINS.map((p,i)=>(
        <div key={i} className={styles.mapPin} style={{top:p.top,left:p.left}}>
          <div className={styles.pinDot} style={{background:p.color,color:p.color}}/>
          <div className={styles.pinLabel} style={{color:p.color,borderColor:p.color}}>{p.label}</div>
        </div>
      ))}
      <div className={styles.mapOverlay}>
        <Icon name="map" size={30} color="var(--text3)"/>
        <div>Interactive Map</div>
        <div className={styles.mapSub}>Connect Google Maps API</div>
      </div>
    </div>
  );
}

const RESPONSES=[
  {cause:'Head Injury',   action:'Do not move; immobilise cervical spine'},
  {cause:'Chest Trauma',  action:'Semi-reclined position; monitor breathing'},
  {cause:'Limb Fracture', action:'Splint limb; control bleeding with pressure'},
  {cause:'Unconscious',   action:'Recovery position; check airway; call 108'},
];
export function FirstResponseGuide() {
  return (
    <Card>
      <div className={styles.guideTitle}><Icon name="hospital" size={16} color="var(--navy)"/> First Response Guide</div>
      {RESPONSES.map((r,i)=>(
        <div key={i} className={styles.guideRow} style={{borderBottom:i<RESPONSES.length-1?'1px solid var(--border)':'none'}}>
          <span className={styles.guideCause}>{r.cause}: </span>
          <span className={styles.guideAction}>{r.action}</span>
        </div>
      ))}
    </Card>
  );
}
