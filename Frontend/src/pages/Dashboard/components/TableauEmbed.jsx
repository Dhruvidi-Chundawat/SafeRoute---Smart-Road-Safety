
import React from 'react';
import { Card } from '../../../components/UI';
import styles from './TableauEmbed.module.css';

export default function TableauEmbed() {
  return (
    <Card>

      <div className={styles.title}>
        📊 Road Accident Analytics Dashboard
      </div>

      <div className={styles.sub}>
        Interactive Tableau Dashboard
      </div>

      <div className={styles.box}>

        <iframe
          title="Tableau Dashboard"
          src="https://public.tableau.com/views/IndiaRoadAccidentRegulatoryAnalysis/Dashboard1?:showVizHome=no"
          width="100%"
          height="850"
          frameBorder="0"
          allowFullScreen
        />

      </div>

    </Card>
  );
}

