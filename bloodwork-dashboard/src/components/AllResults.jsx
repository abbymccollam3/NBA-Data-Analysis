import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePatient } from '../context/PatientContext';

const AllResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { patientId } = usePatient();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`/api/bloodwork/${patientId}`);
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching results:', error);
        setLoading(false);
      }
    };

    fetchResults();
  }, [patientId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Blood Work Results</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Metric</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Unit</th>
              <th className="px-4 py-2">Reference Range</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td className="border px-4 py-2">{result.metric_name}</td>
                <td className="border px-4 py-2">{result.value}</td>
                <td className="border px-4 py-2">{result.unit}</td>
                <td className="border px-4 py-2">
                  {result.reference_low} - {result.reference_high}
                </td>
                <td className="border px-4 py-2">
                  {result.value < result.reference_low ? "Low" :
                   result.value > result.reference_high ? "High" : "Normal"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllResults; 