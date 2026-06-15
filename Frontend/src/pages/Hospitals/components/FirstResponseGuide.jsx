import React from 'react';
import { Card } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './FirstResponseGuide.module.css';

const RESPONSES = [
  { cause:'Head Injury',   action:'Do not move; immobilise cervical spine'        },
  { cause:'Chest Trauma',  action:'Semi-reclined position; monitor breathing'     },
  { cause:'Limb Fracture', action:'Splint limb; control bleeding with pressure'   },
  { cause:'Unconscious',   action:'Recovery position; check airway; call 108'     },
];

export default function FirstResponseGuide() {
  return (
    <Card>
      <div className={styles.title}><Icon name="hospital" size={16} color="var(--navy)" /> First Response Guide</div>
      {RESPONSES.map((r, i) => (
        <div key={i} className={styles.row} style={{ borderBottom: i < RESPONSES.length - 1 ? '1px solid var(--border)' : 'none' }}>
          <span className={styles.cause}>{r.cause}: </span>
          <span className={styles.action}>{r.action}</span>
        </div>
      ))}
    </Card>
  );
}