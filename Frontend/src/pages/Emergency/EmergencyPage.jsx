import React, { useState } from 'react';
import { SectionHeader } from '../../components/UI';
import EmergencyNumbers from './components/EmergencyNumbers';
import SOSForm from './components/SOSForm';
import MessagePreview from './components/MessagePreview';
import CausesPrecautions from './components/CausesPrecautions';
import styles from './EmergencyPage.module.css';

export default function EmergencyPage() {
     const [smsPreview, setSmsPreview] = useState('');
     const [sent, setSent] = useState(false);
     const [sending, setSending] = useState(false);
     const [location, setLocation] = useState('');



const handleGenerate = (form) => {

  navigator.geolocation.getCurrentPosition(
    (position) => {

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const mapLink =
        `https://maps.google.com/?q=${latitude},${longitude}`;

      const msg = `🚨 EMERGENCY ALERT 🚨

Name: ${form.name || "Unknown"}

Current Location:
${mapLink}

Injury Severity:
${form.injury.toUpperCase()}

Additional Information:
${form.extra || "None"}

Please send immediate help!

Time:
${new Date().toLocaleString()}

— SafeRoute Emergency System`;

      setSmsPreview(msg);
      setSent(false);

    },

    () => {

      const msg = `🚨 EMERGENCY ALERT 🚨

Name: ${form.name || "Unknown"}

Location:
${form.location || "GPS unavailable"}

Injury Severity:
${form.injury.toUpperCase()}

Additional Information:
${form.extra || "None"}

Please send immediate help!

— SafeRoute Emergency System`;

      setSmsPreview(msg);

    }
  );

};


const handleSend = () => {

  if (!smsPreview) return;

  window.open(
    `https://wa.me/?text=${encodeURIComponent(smsPreview)}`
  );

};


  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.container}>
        <SectionHeader
          tag="🚨 Emergency Response System"
          title="SOS"
          highlight="Emergency Alert"
          subtitle="Generate instant emergency messages and contact rescue services at the scene of an accident."
        />

        <EmergencyNumbers />

        <div className={styles.grid}>
          <SOSForm
            onGenerate={handleGenerate}
            onSend={handleSend}
            sending={sending}
            sent={sent}
          />

          <div className={styles.rightCol}>
            <MessagePreview message={smsPreview} />
            <CausesPrecautions />
          </div>
        </div>
      </div>
    </div>
  );
}
