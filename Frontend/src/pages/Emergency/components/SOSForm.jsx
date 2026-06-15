import React, { useState } from 'react';
import { Card, Alert, Button, FormGroup, Input, Select, Textarea } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './SOSForm.module.css';

export default function SOSForm({ onGenerate, onSend, sending, sent }) {
  const [form, setForm] = useState({ name:'', location:'', injury:'minor', contacts:'', extra:'' });
  const set = k => e => setForm({ ...form, [k]: e.target.value });

  return (
    <Card>
      <div className={styles.header}>
        <Icon name="phone" color="var(--danger)" size={20} />
        <span className={styles.title}>Generate Emergency Message</span>
      </div>
      {sent && (
        <Alert variant="success">
          <Icon name="check" size={16} color="var(--success)" /> Emergency alert sent! Help is on the way.
        </Alert>
      )}
      <FormGroup label="Your Name">
        <Input placeholder="Enter your full name" value={form.name} onChange={set('name')} />
      </FormGroup>
      <FormGroup label="Accident Location">
        <Input placeholder="Road name, landmark, city..." value={form.location} onChange={set('location')} />
      </FormGroup>
      <FormGroup label="Injury Severity">
        <Select value={form.injury} onChange={set('injury')}>
          <option value="minor">Minor Injuries</option>
          <option value="moderate">Moderate Injuries</option>
          <option value="severe">Severe / Critical</option>
          <option value="unconscious">Unconscious Victim</option>
          <option value="multiple">Multiple Casualties</option>
        </Select>
      </FormGroup>
      <FormGroup label="Emergency Contacts (comma separated)">
        <Input placeholder="+91 9876543210, +91 9123456789" value={form.contacts} onChange={set('contacts')} />
      </FormGroup>
      <FormGroup label="Additional Info">
        <Textarea placeholder="Vehicle details, number of people, medical conditions..." value={form.extra} onChange={set('extra')} />
      </FormGroup>
      <div className={styles.actions}>
        <Button variant="ghost" onClick={() => onGenerate(form)}>
          <Icon name="refresh" size={15} /> Preview
        </Button>
        <Button variant="danger" onClick={onSend} disabled={sending}>
          {sending ? <><span className="pulse">●</span> Sending…</> : <><Icon name="send" size={15} /> Send SOS</>}
        </Button>
      </div>
    </Card>
  );
}