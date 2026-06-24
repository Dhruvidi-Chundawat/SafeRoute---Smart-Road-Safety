import React, { useState } from 'react';
import { SectionHeader, Alert } from '../../components/UI';
import Icon from '../../components/UI/Icon';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import styles from './MLPage.module.css';
import axios from "axios";
import Navbar from '../../components/Navbar/Navbar';



export default function MLPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  
const handlePredict = async (formData) => {

  setLoading(true);
  setResult(null);

  try {

    const response = await axios.post(
      "https://saferoute-backend-x5b6.onrender.com/predict",
      formData
    );

    setResult({
      prediction: response.data.prediction
    });

  } catch (error) {

    console.log(error);

    setResult({
      prediction: "Error"
    });

  } finally {

    setLoading(false);

  }

};

return (
  <>
    <Navbar />

    <div className={`${styles.page} page-enter`}>
      <div className={styles.container}>

        <SectionHeader
          tag="🤖 Machine Learning Engine"
          title="AI Risk"
          highlight="Prediction"
          subtitle="Enter road and environmental conditions to predict accident probability using our trained ML model."
        />

        <div className={styles.grid}>
          <PredictionForm
            onPredict={handlePredict}
            loading={loading}
          />

          <PredictionResult
            result={result}
            loading={loading}
          />
        </div>

      </div>
    </div>
  </>
)};