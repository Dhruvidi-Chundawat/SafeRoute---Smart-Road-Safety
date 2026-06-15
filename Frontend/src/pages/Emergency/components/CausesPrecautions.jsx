import React from 'react';
import { Card } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './CausesPrecautions.module.css';

const ITEMS = [
  { cause:'Over-speeding',       precaution:'Maintain speed limits; reduce speed in rain/fog'  },
  { cause:'Drunk Driving',       precaution:'Never drive under influence; designate a driver'  },
  { cause:'Mobile Phone Use',    precaution:'Use hands-free; pull over to take calls'          },
  { cause:'Overloading',         precaution:'Follow vehicle load capacity rules strictly'       },
  { cause:'Wrong Side Driving',  precaution:'Follow lane discipline and road signs always'      },
];

export default function CausesPrecautions() {
  return (
    <Card>
      <div className={styles.header}>
        <Icon name="warning" size={16} color="var(--warn)" /> Accident Causes &amp; Precautions
      </div>
      {ITEMS.map((item, i) => (
        <div key={i} className={styles.row} style={{ borderBottom: i < ITEMS.length - 1 ? '1px solid var(--border)' : 'none' }}>
          <div className={styles.cause}>✕ {item.cause}</div>
          <div className={styles.action}>✓ {item.precaution}</div>
        </div>
      ))}
    </Card>
  );
}