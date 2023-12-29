import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TakeAssessment = () => {
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [email, setEmail] = useState('');
  const [timer, setTimer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch assessment data
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/assesment/assessments/65800f158693f9c0df0b039d`);
        setAssessment(response.data);
        setTimer(response.data.duration * 60);
        setTimeLeft(response.data.duration * 60);
      } catch (error) {
        console.error('Error fetching assessment:', error);
      }
    };

    fetchAssessment();
  }, []);

  useEffect(() => {
    let timerId;

    if (timer > 0 && !submitted) {
      timerId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timer, submitted]);

  useEffect(() => {
    if (timer === 0 && !submitted) {
      handleSubmit();
    }
  }, [timer, submitted]);

  const handleOptionChange = (questionId, optionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionIndex,
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Simulate API call to submit answers and get results
      const response = await axios.post(`http://localhost:5000/api/assessment/submit/${assessment._id}`, {
        answers: selectedOptions,
        email,
      });

      setSubmitted(true);
      setResults(response.data);
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  const renderQuestions = () => {
    if (!assessment || !assessment.questions) {
        return <p>No questions available</p>;
      }
    return assessment.questions.map((question, index) => (
      <div key={question.id} className={`question ${index === currentQuestion ? '' : 'hidden'}`}>
        <p className="text-lg mb-2">{question.text}</p>
        <div className="ml-4">
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center mb-2">
              <input
                type="radio"
                id={`option_${optionIndex}`}
                name={`question_${question.id}`}
                checked={selectedOptions[question.id] === optionIndex}
                onChange={() => handleOptionChange(question.id, optionIndex)}
              />
              <label htmlFor={`option_${optionIndex}`} className="ml-2">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto mt-8">
      {assessment ? (
        <>
          <h1 className="text-3xl font-semibold mb-4">{assessment.name}</h1>

          <div className="mb-4">
            <p className="text-gray-700">Date: {assessment.date}</p>
            <p className="text-gray-700">Time: {assessment.time}</p>
          </div>

          <div className="mb-4 text-right">
            <p className="text-gray-700">
              Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </p>
          </div>

          {!submitted ? (
            <div className="bg-white p-6 rounded shadow-md mb-8">
              {renderQuestions()}
              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                >
                  Previous
                </button>
                {currentQuestion < assessment.questions.length - 1 && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  >
                    Next
                  </button>
                )}
                {currentQuestion === assessment.questions.length - 1 && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4">Assessment Submitted</h2>
              <p className="text-gray-700 text-lg mb-2">Thank you for completing the assessment!</p>
              {results && (
                <div className="bg-white p-6 rounded shadow-md mb-8">
                  <h2 className="text-xl font-semibold mb-4">Results</h2>
                  <p>Total Questions: {results.totalQuestions}</p>
                  <p>Correct Answers: {results.correctAnswers}</p>
                </div>
              )}
            </div>
          )}

          {!submitted && (
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-700 block">
                Enter Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded mt-2"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          )}

          {!submitted && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit Assessment
            </button>
          )}
        </>
      ) : (
        <div className="text-center">Loading assessment...</div>
      )}
    </div>
  );
};

export default TakeAssessment;
