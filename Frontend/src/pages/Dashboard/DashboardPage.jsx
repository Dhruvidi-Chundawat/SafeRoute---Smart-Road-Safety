import React from 'react';
import { SectionHeader, StatBox, Badge } from '../../components/UI';
import KPIRow from './components/KPIRow';
import AccidentBarChart from './components/AccidentBarChart';
import CausesChart from './components/CausesChart';
import HotspotsTable from './components/HotspotsTable';
import TableauEmbed from './components/TableauEmbed';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <SectionHeader
              tag="📊 Analytics & Intelligence Dashboard"
              title="Road Safety"
              highlight="Analytics"
            />
            <p className={styles.subtext}>Real-time accident data, hotspot analysis, and trend monitoring</p>
          </div>
          <div className={styles.liveWrap}>
            <Badge variant="green"><span className="pulse">●</span> LIVE DATA</Badge>
            <span className={styles.timestamp}>
              Updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        <KPIRow />

        {/* Charts Row */}
        <div className={styles.chartsRow}>
          <AccidentBarChart />
          <CausesChart />
        </div>

        {/* Bottom Row */}
        <div className={styles.bottomRow}>
          <HotspotsTable />
          <TableauEmbed />
        </div>
      </div>
    </div>
  );
}
