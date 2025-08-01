import React, { useState, useEffect } from 'react';

const GpaCalculator = ({ resetTrigger }) => {
  const [courses, setCourses] = useState([{ grade: '', credits: '' }]);
  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setCourses([{ grade: '', credits: '' }]);
    setGpa(null);
    setError('');
  }, [resetTrigger]);

  const handleCourseChange = (index, field, value) => {
    const updated = [...courses];
    updated[index][field] = value;
    setCourses(updated);
  };

  const addCourse = () => {
    if (courses.length < 15) {
      setCourses([...courses, { grade: '', credits: '' }]);
      setError('');
    } else {
      setError('Maximum of 15 courses can be added.');
    }
  };

  const removeCourse = (index) => {
    const updated = courses.filter((_, i) => i !== index);
    setCourses(updated);
    setError('');
  };

  const calculateGPA = () => {
    const gradePoints = {
      S: 10,
      A: 9,
      B: 8,
      C: 6,
      D: 4,
      E: 2,
      N: 0,
    };

    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
      const grade = course.grade.toUpperCase();
      const credits = parseFloat(course.credits);

      if (gradePoints.hasOwnProperty(grade) && !isNaN(credits)) {
        totalPoints += gradePoints[grade] * credits;
        totalCredits += credits;
      }
    }

    const result = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    setGpa(result);
  };

  return (
    <div className="container">
      <div className="container-header">
        <div className="result-text">Your GPA: {gpa !== null ? gpa : ''}</div>
        <button className="add-button top-right" onClick={addCourse}>
          + Add Course
        </button>
      </div>

      {courses.map((course, i) => (
        <div className="course-row" key={i}>
          <select
            value={course.grade}
            onChange={(e) => handleCourseChange(i, 'grade', e.target.value)}
          >
            <option value="">Grade</option>
            <option value="S">S</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="N">N</option>
          </select>
          <input
            type="number"
            placeholder="Credits"
            value={course.credits}
            onChange={(e) => handleCourseChange(i, 'credits', e.target.value)}
            min="0"
            max="220"
            step="1"
          />
          <button onClick={() => removeCourse(i)}>Remove</button>
        </div>
      ))}

      {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}

      <div className="center-button-wrapper">
        <button className="calc-button" onClick={calculateGPA}>
          Calculate
        </button>
      </div>
    </div>
  );
};

export default GpaCalculator;
