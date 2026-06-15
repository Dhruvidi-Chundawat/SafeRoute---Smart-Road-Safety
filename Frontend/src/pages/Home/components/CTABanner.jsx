import React from 'react';
import Icon from '../../../components/UI/Icon';
import styles from './CTABanner.module.css';

export default function CTABanner({ onNavigate }) {
  return (
    <div className={styles.banner}>
      <div>
        <h3 className={styles.title}>Start predicting road risks with AI today</h3>
        <p className={styles.sub}>Sign in to access full ML-powered risk prediction, personalised alerts, and emergency response tools.</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.btnWhite} onClick={() => onNavigate('/login')}>
          <Icon name="lock" size={15} color="var(--navy)" /> Get Started Free
        </button>
        <button className={styles.btnOutline} onClick={() => onNavigate('/dashboard')}>
          <Icon name="chart" size={15} color="#fff" /> View Analytics
        </button>
      </div>
    </div>
  );
}