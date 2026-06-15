import React, { useEffect, useState } from 'react';
import { SectionHeader } from '../../components/UI';
import HospitalFilters from './components/HospitalFilters';
import HospitalList from './components/HospitalList';
import HospitalMap from './components/HospitalMap';
import FirstResponseGuide from './components/FirstResponseGuide';
import styles from './HospitalsPage.module.css';


export default function HospitalsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [hospitals, setHospitals] = useState([]);


  useEffect(() => {

  navigator.geolocation.getCurrentPosition(async (position) => {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const query = `
    [out:json];
    (
      node["amenity"="hospital"](around:10000,${lat},${lon});
    );
    out;
    `;

    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        body: query
      }
    );

    const data = await response.json();

    const hospitalData = data.elements.map((h) => ({
      name: h.tags.name || "Unnamed Hospital",
      address: h.tags["addr:full"] || "Address unavailable",
      phone: h.tags.phone || "",
      type: "hospital",
      emergency: true,
      rating: "N/A",
      dist: "Nearby"
    }));

    setHospitals(hospitalData);

  });

}, []);

  const filtered = hospitals.filter(
    (h) =>
      (filter === 'all' || h.type === filter) &&
      h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.container}>
        <SectionHeader
          tag="🏥 Real-Time Hospital Locator"
          title="Nearby"
          highlight="Hospitals"
          subtitle="Find emergency medical facilities nearest to the accident site with real-time bed availability."
        />

        <HospitalFilters
          search={search}
          filter={filter}
          onSearch={setSearch}
          onFilter={setFilter}
        />

        <div className={styles.grid}>
          <HospitalList hospitals={filtered} />
          <div className={styles.sidebar}>
            <HospitalMap />
            <FirstResponseGuide />
          </div>
        </div>
      </div>
    </div>
  );
}
