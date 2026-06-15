
import React from 'react';
import { Card } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './PredictionResult.module.css';

export default function PredictionResult({ result, loading }) {

  if (loading) {
    return (
      <Card>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <div className={styles.loadingText}>
            Running model inference...
          </div>
        </div>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card>
        <div className={styles.resultContainer}>
          <Icon name="brain" size={50} color="gray" />
          <h3>Awaiting Input</h3>
        </div>
      </Card>
    );
  }

  const highRisk = result.prediction === "High Risk";

  return (
    <Card accentTop={highRisk ? "#dc2626" : "#059669"}>
      <div className={styles.resultContainer}>
        <Icon
          name={highRisk ? "alert" : "shield"}
          size={60}
          color={highRisk ? "#dc2626" : "#059669"}
        />

        <h1 className={styles.resultTitle}>
          {result.prediction}
        </h1>

        <p className={styles.resultMessage}>
          ML model prediction completed successfully.
        </p>
      </div>
    </Card>
  );
}
