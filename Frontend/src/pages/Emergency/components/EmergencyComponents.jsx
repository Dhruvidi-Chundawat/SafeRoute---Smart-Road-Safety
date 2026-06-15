import React, { useState } from 'react';
import { Card, Alert, Button, FormGroup, Input, Select, Textarea } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './EmergencyComponents.module.css';

const CONTACTS = [
  { name:'National Emergency', number:'112',  type:'Police / Ambulance',  color:'#dc2626' },
  { name:'Ambulance',          number:'108',  type:'Medical Emergency',   color:'#ea580c' },
  { name:'Police Control',     number:'100',  type:'Law Enforcement',     color:'#1d5cf4' },
  { name:'Fire Brigade',       number:'101',  type:'Fire Emergency',      color:'#d97706' },
  { name:'Highway Patrol',     number:'1033', type:'Road Incidents',      color:'#0f2461' },
  { name:'Women Helpline',     number:'1091', type:'Women Safety',        color:'#7c3aed' },
];

export function EmergencyNumbers() {
  return (
    <div className={styles.numbersGrid}>
      {CONTACTS.map((c, i) => (
        <a key={i} href={`tel:${c.number}`} className={styles.numberCard}
          style={{ borderTop:`3px solid ${c.color}` }}>
          <div className={styles.numberValue} style={{ color:c.color }}>{c.number}</div>
          <div className={styles.numberName}>{c.name}</div>
          <div className={styles.numberType}>{c.type}</div>
        </a>
      ))}
    </div>
  );
}

export function SOSForm({ onGenerate, onSend, sending, sent }) {
  const [form, setForm] = useState({ name:'', location:'', injury:'minor', contacts:'', extra:'' });
  const set = k => e => setForm({ ...form, [k]: e.target.value });
  return (
    <Card>
      <div className={styles.formHeader}>
        <Icon name="phone" color="var(--danger)" size={20}/>
        <span className={styles.formTitle}>Generate Emergency Message</span>
      </div>
      {sent && <Alert variant="success"><Icon name="check" size={16} color="var(--success)"/>Emergency alert sent! Help is on the way.</Alert>}
      <FormGroup label="Your Name"><Input placeholder="Enter your full name" value={form.name} onChange={set('name')}/></FormGroup>
      <FormGroup label="Accident Location"><Input placeholder="Road name, landmark, city..." value={form.location} onChange={set('location')}/></FormGroup>
      <FormGroup label="Injury Severity">
        <Select value={form.injury} onChange={set('injury')}>
          <option value="minor">Minor Injuries</option>
          <option value="moderate">Moderate Injuries</option>
          <option value="severe">Severe / Critical</option>
          <option value="unconscious">Unconscious Victim</option>
          <option value="multiple">Multiple Casualties</option>
        </Select>
      </FormGroup>
      <FormGroup label="Emergency Contacts (comma separated)"><Input placeholder="+91 9876543210, +91 9123456789" value={form.contacts} onChange={set('contacts')}/></FormGroup>
      <FormGroup label="Additional Info"><Textarea placeholder="Vehicle details, number of people, medical conditions..." value={form.extra} onChange={set('extra')}/></FormGroup>
      <div className={styles.formActions}>
        <Button variant="ghost" onClick={() => onGenerate(form)}><Icon name="refresh" size={15}/> Preview</Button>
        <Button variant="danger" onClick={onSend} disabled={sending}>
          {sending ? <><span className="pulse">●</span> Sending…</> : <><Icon name="send" size={15}/> Send SOS</>}
        </Button>
      </div>
    </Card>
  );
}

export function MessagePreview({ message }) {
  return (
    <Card style={{ marginBottom:16 }}>
      <div className={styles.previewLabel}>Message Preview</div>
      {message
        ? <pre className={styles.previewText}>{message}</pre>
        : <div className={styles.previewEmpty}>Fill the form and click Preview to generate your emergency message</div>
      }
    </Card>
  );
}

const ITEMS = [
  { cause:'Over-speeding',      precaution:'Maintain speed limits; reduce speed in rain/fog'  },
  { cause:'Drunk Driving',      precaution:'Never drive under influence; designate a driver'  },
  { cause:'Mobile Phone Use',   precaution:'Use hands-free; pull over to take calls'          },
  { cause:'Overloading',        precaution:'Follow vehicle load capacity rules strictly'       },
  { cause:'Wrong Side Driving', precaution:'Follow lane discipline and road signs always'      },
];
export function CausesPrecautions() {
  return (
    <Card>
      <div className={styles.cpHeader}><Icon name="warning" size={16} color="var(--warn)"/> Accident Causes &amp; Precautions</div>
      {ITEMS.map((item, i) => (
        <div key={i} className={styles.cpRow} style={{ borderBottom:i<ITEMS.length-1?'1px solid var(--border)':'none' }}>
          <div className={styles.cpCause}>✕ {item.cause}</div>
          <div className={styles.cpAction}>✓ {item.precaution}</div>
        </div>
      ))}
    </Card>
  );
}
