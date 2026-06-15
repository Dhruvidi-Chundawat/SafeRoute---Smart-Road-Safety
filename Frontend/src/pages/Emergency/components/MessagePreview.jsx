
import React from 'react';
import { Card, Button } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './MessagePreview.module.css';

export default function MessagePreview({ message }) {

  const copyMessage = () => {
    navigator.clipboard.writeText(message);
    alert("Message copied successfully!");
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`
    );
  };

  const openMaps = () => {

    const match = message.match(
      /https:\/\/maps\.google\.com\/\?q=[^\s]+/
    );

    if (match) {
      window.open(match[0]);
    }
  };

  return (
    <Card>

      <div className={styles.label}>
        Message Preview
      </div>

      {
        message ?

          <>
            <pre className={styles.text}>
              {message}
            </pre>

            <div className={styles.actions}>

              <Button
                variant="ghost"
                onClick={copyMessage}
              >
                <Icon name="copy" size={15}/>
                Copy
              </Button>

              <Button
                variant="success"
                onClick={shareWhatsApp}
              >
                <Icon name="send" size={15}/>
                WhatsApp
              </Button>

              <Button
                variant="navy"
                onClick={openMaps}
              >
                <Icon name="map" size={15}/>
                Maps
              </Button>

            </div>

          </>

        :

          <div className={styles.empty}>
            Fill the form and click Preview to generate your emergency message.
          </div>

      }

    </Card>
  );
}

