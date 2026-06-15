import React, { useState } from 'react';
import { Card, Button, RiskBar, FormGroup, Input, Select } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';
import styles from './MLComponents.module.css';

const DEFAULT = { road:'', weather:'clear', time:'day', speed:60, traffic:'medium', visibility:'good' };

export function PredictionForm({ onPredict, loading }) {
  const [form, setForm] = useState(DEFAULT);
  const set = k => e => setForm({...form,[k]:e.target.value});
  return (
    <Card>
      <div className={styles.formTitle}><Icon name="brain" size={18} color="var(--accent)"/> Input Parameters</div>
      <FormGroup label="Road / Highway Name"><Input placeholder="e.g. NH48, Ring Road, MG Road..." value={form.road} onChange={set('road')}/></FormGroup>
      <div className={styles.twoCol}>
        <FormGroup label="Weather Condition">
          <Select value={form.weather} onChange={set('weather')}>
            <option value="clear">Clear</option><option value="rain">Rainy</option>
            <option value="fog">Foggy</option><option value="snow">Snow</option>
          </Select>
        </FormGroup>
        <FormGroup label="Time of Day">
          <Select value={form.time} onChange={set('time')}>
            <option value="day">Daytime</option><option value="night">Night</option><option value="dawn">Dawn / Dusk</option>
          </Select>
        </FormGroup>
        <FormGroup label="Speed (km/h)"><Input type="number" min="0" max="200" value={form.speed} onChange={set('speed')}/></FormGroup>
        <FormGroup label="Traffic Density">
          <Select value={form.traffic} onChange={set('traffic')}>
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </Select>
        </FormGroup>
      </div>
      <FormGroup label="Visibility">
        <Select value={form.visibility} onChange={set('visibility')}>
          <option value="good">Good (&gt; 500 m)</option>
          <option value="moderate">Moderate (100–500 m)</option>
          <option value="poor">Poor (&lt; 100 m)</option>
        </Select>
      </FormGroup>
      <Button variant="navy" fullWidth onClick={()=>onPredict(form)} disabled={loading}>
        {loading?<><span className="pulse">●</span>&nbsp;Analysing…</>:<><Icon name="brain" size={16}/>Run Prediction</>}
      </Button>
    </Card>
  );
}

const RISK_COLORS={HIGH:'#dc2626',MEDIUM:'#d97706',LOW:'#059669'};
export function PredictionResult({ result, loading }) {
  if (loading) return (
    <Card style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:320}}>
      <div className={styles.loadingState}>
        <div className={styles.spinner}/>
        <div className={styles.loadingText}>Running model inference…</div>
      </div>
    </Card>
  );
  if (!result) return (
    <Card style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:320,flexDirection:'column',gap:14}}>
      <Icon name="brain" size={48} color="var(--border2)"/>
      <div style={{textAlign:'center'}}>
        <div style={{fontFamily:'var(--font-head)',fontSize:'1rem',fontWeight:700,color:'var(--text2)',marginBottom:5}}>Awaiting Input</div>
        <div style={{fontSize:'0.85rem',color:'var(--text3)'}}>Fill parameters and run prediction</div>
      </div>
    </Card>
  );
  const color=RISK_COLORS[result.level];
  return (
    <div className={styles.resultWrap}>
      <Card style={{borderTop:`4px solid ${color}`}}>
        <div className={styles.scoreSection}>
          <div className={styles.scoreLabel}>Accident Risk Score</div>
          <div className={styles.scoreValue} style={{color}}>{result.score}<span className={styles.pct}>%</span></div>
          <div className={styles.scoreBadgeRow}>
            <span className={`${styles.riskBadge} ${styles[`risk_${result.level.toLowerCase()}`]}`}>{result.level} RISK</span>
          </div>
          <div className={styles.confidence}>Model confidence: {result.confidence}%</div>
        </div>
        <RiskBar percent={result.score} color={color}/>
        <div className={styles.factors}>
          <div className={styles.factorsLabel}>Contributing Factors</div>
          {result.factors.map((f,i)=>(
            <div key={i} className={styles.factorRow} style={{borderBottom:i<result.factors.length-1?'1px solid var(--border)':'none'}}>
              <Icon name="alert" size={14} color={color}/><span>{f}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card style={{marginTop:14,background:'var(--bg3)'}}>
        <div className={styles.factorsLabel}>🔌 Model Integration Note</div>
        <p style={{fontSize:'0.85rem',color:'var(--text2)',lineHeight:1.6,marginTop:6}}>
          Replace the <code style={{background:'var(--bg4)',padding:'1px 6px',borderRadius:4,fontSize:'0.8rem'}}>setTimeout</code> block in <code style={{background:'var(--bg4)',padding:'1px 6px',borderRadius:4,fontSize:'0.8rem'}}>MLPage.jsx → handlePredict()</code> with your Flask / FastAPI endpoint or TF.js model.
        </p>
      </Card>
    </div>
  );
}
