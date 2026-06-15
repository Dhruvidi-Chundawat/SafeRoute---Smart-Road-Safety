import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeader, StatBox } from '../../components/UI';
import Icon from '../../components/UI/Icon';
import HeroSection from './components/HeroSection';
import AwarenessTips from './components/AwarenessTips';
import LiveNews from './components/LiveNews';
import CTABanner from './components/CTABanner';
import styles from './HomePage.module.css';

const STATS = [
  { value: '1.35M',     label: 'Deaths Annually Worldwide' },
  { value: '50M',       label: 'Injuries Per Year'         },
  { value: '94%',       label: 'Caused by Human Error'     },
  { value: '₹1.47L Cr', label: 'Economic Loss in India'    },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.container}>

        <HeroSection onNavigate={navigate} />

        {/* Stats Row */}
        <div className={styles.statsGrid}>
          {STATS.map((s, i) => <StatBox key={i} value={s.value} label={s.label} />)}
        </div>

        <LiveNews />

        {/* Awareness Section */}
        <SectionHeader
          tag="📢 Road Safety Awareness"
          title="Prevention is the"
          highlight="Best Protection"
          subtitle="Understanding root causes and following safety protocols can prevent over 90% of road fatalities."
        />
        <AwarenessTips />

        <CTABanner onNavigate={navigate} />
      </div>
    </div>
  );
}
