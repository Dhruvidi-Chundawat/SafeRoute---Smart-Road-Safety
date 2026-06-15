import React from 'react';
import { Badge } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './HospitalList.module.css';

export default function HospitalList({ hospitals }) {
  if (!hospitals.length) return (
    <div className={styles.empty}>
      <Icon name="hospital" size={40} color="var(--text4)" />
      <p>No hospitals match your filters.</p>
    </div>
  );
  return (
    <div className={styles.list}>
      {hospitals.map((h, i) => <HospitalCard key={i} hospital={h} />)}
    </div>
  );
}

function HospitalCard({ hospital: h }) {
  const bedColor = h.beds > 10 ? 'var(--success)' : h.beds > 4 ? 'var(--warn)' : 'var(--danger)';
  return (
    <div className={styles.card} style={{ borderLeft:`4px solid ${h.emergency ? 'var(--danger)' : 'var(--border)'}` }}>
      <div className={styles.icon}><Icon name="hospital" size={22} color="var(--accent)" /></div>
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{h.name}</span>
          {h.emergency && <Badge variant="red">24/7 ER</Badge>}
          <Badge variant={h.type === 'trauma' ? 'orange' : h.type === 'private' ? 'blue' : 'green'}>{h.type}</Badge>
        </div>
        <div className={styles.address}>{h.address}</div>
        <div className={styles.meta}>
          <span style={{ color:'var(--accent)' }}>📍 {h.dist || "Unknown"}</span>
          <span style={{ color:'var(--text3)' }}>⭐ {h.rating || "N/A"}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <a href={`tel:${h.phone}`} className={styles.callBtn}>CALL</a>
        <a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name)}`}
  target="_blank"
  rel="noreferrer"
  className={styles.navBtn}
>
  NAV
</a>
      </div>
    </div>
  );
}