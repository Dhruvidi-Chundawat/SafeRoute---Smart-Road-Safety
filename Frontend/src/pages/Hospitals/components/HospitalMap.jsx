
import React from 'react';
import Icon from '../../../components/UI/Icon';
import styles from './HospitalMap.module.css';

export default function HospitalMap() {
  return (
    <div className={styles.box}>
      <div className={styles.overlay}>
        <Icon
          name="map"
          size={40}
          color="var(--accent)"
        />

        <div
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            marginTop: "12px"
          }}
        >
          Live Hospital Locator
        </div>

        <div className={styles.sub}>
          Nearby hospitals are displayed using your current location.
        </div>
      </div>
    </div>
  );
}

