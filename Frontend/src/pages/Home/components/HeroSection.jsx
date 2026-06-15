import React from 'react';
import { Button } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './HeroSection.module.css';

export default function HeroSection({ onNavigate }) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroAccentBar} />
      <div className={styles.tag}>
        <span className={styles.tagDot} />
        Road Safety Intelligence Platform
      </div>
      <h1 className={styles.heading}>
        Every Journey. Every Life.<br />
        <span className={styles.line2}>Protected by AI.</span>
      </h1>
      <p className={styles.sub}>
        Real-time accident prediction, emergency response coordination, and
        data-driven road safety insights for safer highways across India.
      </p>
      <div className={styles.actions}>
        <Button variant="danger" onClick={() => onNavigate('/emergency')}>
          <Icon name="alert" size={16} /> SOS Emergency
        </Button>
        <Button variant="navy" onClick={() => onNavigate('/predict')}>
          <Icon name="brain" size={16} /> AI Risk Prediction
        </Button>
        <Button variant="outline" onClick={() => onNavigate('/dashboard')}>
          <Icon name="chart" size={16} /> View Analytics
        </Button>
      </div>
      <div className={styles.trustRow}>
        {[
          { icon:'check', text:'MoRTH Aligned'       },
          { icon:'shield',text:'ISO 39001 Safety'    },
          { icon:'map',   text:'Pan-India Coverage'  },
          { icon:'brain', text:'ML-Powered Insights' },
        ].map((t,i)=>(
          <div key={i} className={styles.trustItem}>
            <span className={styles.trustIcon}><Icon name={t.icon} size={14} color="var(--accent3)"/></span>
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}
