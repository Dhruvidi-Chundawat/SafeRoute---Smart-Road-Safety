
import React, { useState } from 'react';
import { Card, Button, FormGroup, Input } from '../../../components/UI';
import Icon from '../../../components/UI/Icon';

export default function PredictionForm({ onPredict, loading }) {

  const [form, setForm] = useState({
    temperature: 70,
    humidity: 80,
    pressure: 29.5,
    visibility: 10,
    wind_speed: 5,
    weather_condition: 2,
    amenity: false,
    crossing: false,
    junction: false,
    railway: false,
    stop: false,
    traffic_signal: false,
    sunrise_sunset: 1,
    civil_twilight: 1
  });

  const set = (k) => (e) =>
    setForm({
      ...form,
      [k]:
        e.target.type === "checkbox"
          ? e.target.checked
          : Number(e.target.value)
    });

  return (
    <Card>

      <h3>
        <Icon name="brain" size={18} color="var(--accent)" />
        {" "}Input Parameters
      </h3>

      <FormGroup label="Temperature (F)">
        <Input
          type="number"
          value={form.temperature}
          onChange={set("temperature")}
        />
      </FormGroup>

      <FormGroup label="Humidity (%)">
        <Input
          type="number"
          value={form.humidity}
          onChange={set("humidity")}
        />
      </FormGroup>

      <FormGroup label="Pressure">
        <Input
          type="number"
          value={form.pressure}
          onChange={set("pressure")}
        />
      </FormGroup>

      <FormGroup label="Visibility">
        <Input
          type="number"
          value={form.visibility}
          onChange={set("visibility")}
        />
      </FormGroup>

      <FormGroup label="Wind Speed">
        <Input
          type="number"
          value={form.wind_speed}
          onChange={set("wind_speed")}
        />
      </FormGroup>

      <FormGroup label="Weather Condition">
        <Input
          type="number"
          value={form.weather_condition}
          onChange={set("weather_condition")}
        />
      </FormGroup>

      <Button
        variant="navy"
        fullWidth
        onClick={() => onPredict(form)}
        disabled={loading}
      >
        {loading
          ? "Analysing..."
          : "Run Prediction"}
      </Button>

    </Card>
  );
}

