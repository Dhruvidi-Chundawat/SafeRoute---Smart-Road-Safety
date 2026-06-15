import React from 'react';
import { Card } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './HomeComponents.module.css';

const TIPS = [
  { icon:'car',     title:'Speed Compliance',    color:'#dc2626', bg:'#fef2f2', desc:'Over-speeding is the #1 killer on Indian roads. Every 10 km/h increase doubles crash severity.' },
  { icon:'warning', title:'Avoid Distractions',  color:'#d97706', bg:'#fffbeb', desc:'Phone use while driving raises crash risk 4×. Eyes on road, hands on wheel — always.' },
  { icon:'shield',  title:'Seatbelts Save Lives', color:'#059669', bg:'#f0fdf4', desc:'Seatbelts reduce fatal injury risk by 45%. Buckle up every trip, every seat.' },
  { icon:'alert',   title:'Drunk Driving Kills',  color:'#dc2626', bg:'#fef2f2', desc:'Even small amounts of alcohol impair judgment. Never drink and drive.' },
  { icon:'map',     title:'Know Your Route',      color:'#1d5cf4', bg:'#eff6ff', desc:'Plan ahead, check road conditions, avoid high-risk zones during fog, rain and night.' },
  { icon:'hospital',title:'Learn First Aid',      color:'#7c3aed', bg:'#ede9fe', desc:'Basic first aid knowledge can save lives. Quick response in the golden hour is critical.' },
];

export function AwarenessTips() {
  return (
    <div className={styles.tipsGrid}>
      {TIPS.map((t, i) => (
        <Card key={i} style={{ borderTop: `3px solid ${t.color}` }}>
          <div className={styles.tipHeader}>
            <div className={styles.tipIcon} style={{ background: t.bg }}>
              <Icon name={t.icon} size={20} color={t.color} />
            </div>
            <div className={styles.tipTitle}>{t.title}</div>
          </div>
          <p className={styles.tipDesc}>{t.desc}</p>
        </Card>
      ))}
    </div>
  );
}

export function LiveTicker() {
  return (
    <div className={styles.ticker}>
      <span className={`${styles.liveTag} pulse`}>● LIVE</span>
      <span className={styles.tickerText}>
        Last 24 hours: 47 accidents detected on national highways — NH48, NH44, NH16 flagged HIGH RISK
      </span>
    </div>
  );
}

export function CTABanner({ onNavigate }) {
  return (
    <div className={styles.ctaBanner}>
      <div>
        <h3 className={styles.ctaTitle}>Start predicting road risks with AI today</h3>
        <p className={styles.ctaSub}>
          Sign in to access full ML-powered risk prediction, personalised alerts, and emergency response tools.
        </p>
      </div>
      <div className={styles.ctaActions}>
        <button className={styles.ctaBtnWhite} onClick={() => onNavigate('/login')}>
          <Icon name="lock" size={15} color="var(--navy)" /> Get Started Free
        </button>
        <button className={styles.ctaBtnOutline} onClick={() => onNavigate('/dashboard')}>
          <Icon name="chart" size={15} color="#fff" /> View Analytics
        </button>
      </div>
    </div>
  );
}
