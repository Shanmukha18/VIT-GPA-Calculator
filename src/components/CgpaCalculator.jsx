import React, { useState, useEffect } from 'react';

const CgpaCalculator = ({ resetTrigger }) => {
  const [semesters, setSemesters] = useState([{ gpa: '', credits: '' }]);
  const [cgpa, setCgpa] = useState(null);
  const [error, setError] = useState('');

    useEffect(() => {
      setSemesters([{ gpa: '', credits: '' }]);
      setCgpa(null);
      setError('');
    }, [resetTrigger]);

  const handleSemesterChange = (index, field, value) => {
    const updated = [...semesters];
    let val = value;

    if (field === 'gpa') {
      if (parseFloat(val) > 10) val = '10.00';
      else if (parseFloat(val) < 0) val = '0.00';
    }

    if (field === 'credits') {
      if (parseInt(val) > 220) val = '220';
      else if (parseInt(val) < 0) val = '0';
    }

    updated[index][field] = val;
    setSemesters(updated);
  };

  const addSemester = () => {
    if (semesters.length < 10) {
      setSemesters([...semesters, { gpa: '', credits: '' }]);
      setError('');
    } else {
      setError('Maximum of 10 semesters can be added.');
    }
  };

  const removeSemester = (index) => {
    const updated = semesters.filter((_, i) => i !== index);
    setSemesters(updated);
    setError('');
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const sem of semesters) {
      const gpa = parseFloat(sem.gpa);
      const credits = parseFloat(sem.credits);

      if (!isNaN(gpa) && !isNaN(credits)) {
        totalPoints += gpa * credits;
        totalCredits += credits;
      }
    }

    const result = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    setCgpa(result);
  };

  return (
    <div className="container">
      <div className="container-header">
        <div className="result-text">
          Your CGPA: {cgpa !== null ? cgpa : ''}
        </div>
        <button className="add-button top-right" onClick={addSemester}>
          + Add Semester
        </button>
      </div>

      {semesters.map((sem, i) => (
        <div className="course-row" key={i}>
          <input
            type="number"
            placeholder="Sem GPA"
            value={sem.gpa}
            onChange={(e) => handleSemesterChange(i, 'gpa', e.target.value)}
            min="0"
            max="10"
            step="0.01"
          />
          <input
            type="number"
            placeholder="Credits"
            value={sem.credits}
            onChange={(e) => handleSemesterChange(i, 'credits', e.target.value)}
            min="0"
            max="220"
            step="1"
          />
          <button onClick={() => removeSemester(i)}>Remove</button>
        </div>
      ))}

      {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}

      <div className="center-button-wrapper">
        <button className="calc-button" onClick={calculateCGPA}>
          Calculate
        </button>
      </div>
    </div>
  );
};

export default CgpaCalculator;
