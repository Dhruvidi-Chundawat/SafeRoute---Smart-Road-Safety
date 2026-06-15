import React from 'react';
import { Input } from '../../../components/UI';
import styles from './HospitalFilters.module.css';

const FILTERS = ['all', 'trauma', 'govt', 'private'];

export default function HospitalFilters({ search, filter, onSearch, onFilter }) {
  return (
    <div className={styles.wrap}>
      <Input placeholder="Search hospitals..." value={search} onChange={e => onSearch(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
      {FILTERS.map(f => (
        <button key={f} onClick={() => onFilter(f)}
          className={`${styles.btn} ${filter === f ? styles.active : ''}`}>
          {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}