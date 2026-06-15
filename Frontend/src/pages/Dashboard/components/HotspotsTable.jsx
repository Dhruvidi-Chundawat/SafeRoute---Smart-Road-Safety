import React from 'react';
import { Card, Badge } from '../../../components/UI';
import styles from './HotspotsTable.module.css';

const HOTSPOTS = [
  { zone:'NH48 — Delhi–Jaipur',    count:234, risk:'CRITICAL', change:'+12%' },
  { zone:'NH44 — Delhi–Mumbai',    count:198, risk:'HIGH',     change:'+8%'  },
  { zone:'NH16 — Kolkata–Chennai', count:167, risk:'HIGH',     change:'-3%'  },
  { zone:'NH8  — Mumbai–Pune',     count:143, risk:'MEDIUM',   change:'+5%'  },
  { zone:'Ring Road — Delhi',      count:112, risk:'MEDIUM',   change:'-7%'  },
];

export default function HotspotsTable() {
  return (
    <Card>
      <div className={styles.title}>🔥 Accident Hotspots</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Zone</th>
            <th>Accidents</th>
            <th>Risk Level</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {HOTSPOTS.map((h, i) => (
            <tr key={i}>
              <td className={styles.zone}>{h.zone}</td>
              <td className={styles.count}>{h.count}</td>
              <td>
                <Badge variant={h.risk === 'CRITICAL' ? 'red' : h.risk === 'HIGH' ? 'orange' : 'yellow'}>
                  {h.risk}
                </Badge>
              </td>
              <td className={styles.change}
                style={{ color: h.change.startsWith('+') ? 'var(--danger)' : 'var(--success)' }}>
                {h.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}