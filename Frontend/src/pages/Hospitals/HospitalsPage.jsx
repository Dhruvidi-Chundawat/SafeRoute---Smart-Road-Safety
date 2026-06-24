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

    try {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const response = await fetch(
        `https://saferoute-backend-x5b6.onrender.com/hospitals?lat=${lat}&lon=${lon}`
      );

      const data = await response.json();

      const hospitalData = (data.features || []).map((h) => {

        const hospitalName = (h.properties.name || "").toLowerCase();

        let type = "private";

        if (
          hospitalName.includes("government") ||
          hospitalName.includes("govt") ||
          hospitalName.includes("district hospital") ||
          hospitalName.includes("civil hospital") ||
          hospitalName.includes("aiims")
        ) {
          type = "government";
        }

        if (
          hospitalName.includes("trauma") ||
          hospitalName.includes("emergency") ||
          hospitalName.includes("trauma center")
        ) {
          type = "trauma";
        }

        return {
          name: h.properties.name || "Unnamed Hospital",
          address: h.properties.formatted || "Address unavailable",
          phone: h.properties.phone || "",
          type: type,
          emergency: true,
          rating: h.properties.rating || "N/A",
          dist: "Nearby"
        };
      });

      setHospitals(hospitalData);

    } catch (error) {
      console.error("Hospital fetch error:", error);
    }

  });

}, []);

const filtered = hospitals.filter(
  (h) =>
    (filter === "all" || h.type === filter) &&
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
