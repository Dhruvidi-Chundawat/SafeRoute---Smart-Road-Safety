import React from 'react';
import styles from './UI.module.css';

/* ─── Badge ─── */
export function Badge({ variant = 'blue', children }) {
  return <span className={`${styles.badge} ${styles[`badge_${variant}`]}`}>{children}</span>;
}

/* ─── Button ─── */
export function Button({ variant = 'primary', children, onClick, disabled, fullWidth, type = 'button', style }) {
  const cls = [
    styles.btn,
    styles[`btn_${variant}`],
    fullWidth ? styles.fullWidth : '',
  ].join(' ');
  return (
    <button className={cls} onClick={onClick} disabled={disabled} type={type} style={style}>
      {children}
    </button>
  );
}

/* ─── Card ─── */
export function Card({ children, style, accentColor }) {
  return (
    <div
      className={styles.card}
      style={{
        borderLeft: accentColor ? `3px solid ${accentColor}` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Alert ─── */
export function Alert({ variant = 'info', children }) {
  return <div className={`${styles.alert} ${styles[`alert_${variant}`]}`}>{children}</div>;
}

/* ─── Section Header ─── */
export function SectionHeader({ tag, title, highlight, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      {tag && <div className={styles.secTag}>{tag}</div>}
      <h2 className={styles.secTitle}>
        {title} {highlight && <span className={styles.secHighlight}>{highlight}</span>}
      </h2>
      {subtitle && <p className={styles.secSub}>{subtitle}</p>}
    </div>
  );
}

/* ─── Stat Box ─── */
export function StatBox({ value, label, delta, deltaUp }) {
  return (
    <div className={styles.statBox}>
      <div className={styles.statValue}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
      {delta && (
        <div className={styles.statDelta} style={{ color: deltaUp ? 'var(--danger)' : 'var(--accent3)' }}>
          {delta}
        </div>
      )}
    </div>
  );
}

/* ─── Risk Bar ─── */
export function RiskBar({ percent, color }) {
  return (
    <div className={styles.riskTrack}>
      <div
        className={styles.riskFill}
        style={{ width: `${percent}%`, background: color || 'var(--accent)' }}
      />
    </div>
  );
}

/* ─── Form Elements ─── */
export function FormGroup({ label, children }) {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.formLabel}>{label}</label>}
      {children}
    </div>
  );
}

export function Input({ ...props }) {
  return <input className={styles.formInput} {...props} />;
}

export function Select({ children, ...props }) {
  return (
    <select className={styles.formSelect} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ ...props }) {
  return <textarea className={styles.formTextarea} {...props} />;
}

/* ─── Divider ─── */
export function Divider() {
  return <div className={styles.divider} />;
}
