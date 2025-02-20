import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePatient } from '../context/PatientContext';

const PrimaryConcerns = () => {
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const { patientId } = usePatient();

  useEffect(() => {
    const fetchConcerns = async () => {
      try {
        const response = await axios.get(`/api/bloodwork/${patientId}/concerns`);
        setConcerns(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching concerns:', error);
        setLoading(false);
      }
    };

    fetchConcerns();
  }, [patientId]);

  const handleVoicePrompt = async () => {
    try {
      const response = await axios.post('/api/summarize-concerns', concerns);
      setSummary(response.data.summary);
      
      // ElevenLabs text-to-speech
      setIsPlaying(true);
      const audioResponse = await axios.post('/api/text-to-speech', response.data.summary, {
        responseType: 'blob'
      });
      const audioBlob = new Blob([audioResponse.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.play();
    } catch (error) {
      console.error('Error getting summary:', error);
      setIsPlaying(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Primary Concerns</h2>
      <button
        onClick={handleVoicePrompt}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={isPlaying}
      >
        {isPlaying ? 'Playing...' : 'Listen to Summary'}
      </button>
      
      {summary && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="font-bold mb-2">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}

      <div className="grid gap-4">
        {concerns.map((concern) => (
          <div key={concern.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{concern.metric_name}</h3>
            <p>Value: {concern.value} {concern.unit}</p>
            <p>Reference Range: {concern.reference_low} - {concern.reference_high}</p>
            <p className="text-red-500">
              {concern.value < concern.reference_low ? "Below Normal Range" :
               concern.value > concern.reference_high ? "Above Normal Range" : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrimaryConcerns; 