import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TakeAssessment = () => {
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [timer, setTimer] = useState(480); // 8 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasTakenAssessment, setHasTakenAssessment] = useState(false); 
  const { id } = useParams();
  const email1 = localStorage.getItem('email');

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        // Check if the user has already submitted the assessment
        const previousSubmission = await axios.get(
          `http://localhost:5000/api/assesment/hasTakenAssessment/${id}?email=${email1}`
        );

        // if (previousSubmission.data.hasTakenAssessment) {
        //   setHasTakenAssessment(true);
        //   return;
        // }

        // Fetch assessment if the user hasn't taken it yet
        const response = await axios.get(`http://localhost:5000/api/assesment/assessments/${id}/${email1}`);
        setAssessment(response.data.assessment);
        setTimer(response.data.submission[0].timeRemaining);
        setAnswers(response.data.submission[0].answers);
        setHasTakenAssessment(response.data.submission[0].isSubmit);
        // if (response.data.submission!=null && response.data.submission.length > 0) {
        //   setTimer(response.data.submission[0].timeRemaining);
        //   setAnswers(response.data.submission[0].answers);
        // }
      } catch (error) {
        console.error('Error fetching assessment or checking previous submission:', error);
      }
    };

    fetchAssessment();
  }, [id, email1]);
  
  
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      handleSubmit();
    }
    
    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  // useEffect(() => {
  //   const handleupdate=async()=>{
  //     await axios.put(`http://localhost:5000/api/assesment/assessments/${id}/${email1}`, {answers, timer});
  //   };
    
  //   handleupdate();
    
  // }, [timer])
  
  
  useEffect(() => {
    // Handle automatic submission on tab close or refresh
    const handleBeforeUnload = async (event) => {
      event.preventDefault();
      // Prepare submission data
      const submissionData = {
        answers,
        timer,
      };
      
      // Call your update function to submit data
      await handleUpdate(submissionData);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [answers, timer]);

  const handleUpdate = async (submissionData) => {
    try {
      await axios.put(`http://localhost:5000/api/assesment/assessments/${id}/${email1}`, submissionData);
    } catch (error) {
      console.error('Error updating assessment:', error);
    }
  };
  
  if (hasTakenAssessment) {
    return (
      <div className="container mx-auto mt-4">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-semibold mb-6">Assessment Already Taken</h1>
          <p className="text-gray-700 text-lg mb-2">You have already submitted this assessment.</p>
          {/* Display additional information or options if needed */}
        </div>
      </div>
    );
  }

  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleClearResponse = (questionId) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      delete updatedAnswers[questionId];
      return updatedAnswers;
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/api/assesment/assessments/submit/${id}`, { answers, email1, timer });
      setSubmitted(true);

      const resultsResponse = await axios.get(`http://localhost:5000/api/assesment/evaluate/${id}?email=${email1}`);
      setResults(resultsResponse.data);
    } catch (error) {
      console.error('Error submitting or fetching assessment:', error);
    }
  };

  const handleQuestionNavigation = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => Math.min(prevQuestion + 1, assessment.questions.length - 1));
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
  };

  if (!assessment) {
    return <div className="container mx-auto mt-8">Loading assessment...</div>;
  }

  if (submitted) {
    return (
      <div className="container mx-auto mt-8">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-semibold mb-6">Assessment Submitted</h1>
          <p className="text-gray-700 text-lg mb-2">Thank you for completing the assessment!</p>

          {results && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Results</h2>
              <p>Total Questions: {results.totalQuestions}</p>
              <p>Correct Answers: {results.totalCorrectAnswers}</p>
              <p>Score: {results.overallScore}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQuestionData = assessment.questions[currentQuestion];

  return (
    <div className="container mx-auto max-h-screen overflow-y-auto">
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white">
            <h1 className="text-2xl font-semibold">{assessment.name}</h1>
          </div>
          <div className="text-white text-sm flex items-center space-x-6">
            <p>Date: {assessment.date}</p>
            <p>Time: {assessment.time} minutes</p>
            <div className="flex items-center">
              <span className="text-lg pr-1">Time Remaining:</span>
              <span className="text-lg text-red-300">
                {Math.floor(timer / 60)}:{(timer % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex justify-between mt-4">
        <div className="w-1/4 p-4 rounded shadow-md overflow-y-scroll " style={{ maxHeight: 'calc(100vh - 90px)'}}>
          <h2 className="text-xl font-semibold mb-4">Question List</h2>
          <ul className="overflow-y">
            {assessment.questions.map((question, index) => (
              <li key={question._id} className="mb-2">
                <div
                  className={`p-2 border ${index === currentQuestion ? 'border-blue-500' : 'border-gray-300'} rounded hover:shadow-md`}
                >
                  <button
                    className={`text-blue-500 hover:underline ${index === currentQuestion && 'font-semibold'}`}
                    onClick={() => handleQuestionNavigation(index)}
                  >
                    Question {index + 1}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-semibold mb-6">Take Assessment</h1>

          {/* <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 block">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded mt-2"
              value={email}
              onChange={handleEmailChange}
            />
          </div> */}

          <div className="mb-4">
            <span className="text-blue-600 text-lg font-semibold mb-4">
              Question {currentQuestion + 1}:
            </span>
            <span> </span>
            <span className="text-gray-700 text-lg mb-2">
              { currentQuestionData.text}
            </span>

            <div className="ml-4">
              {currentQuestionData.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`option_${optIndex}`}
                    name={`question_${currentQuestionData._id}`}
                    checked={answers[currentQuestionData._id] === optIndex}
                    onChange={() => handleOptionChange(currentQuestionData._id, optIndex)}
                  />
                  <label htmlFor={`option_${optIndex}`} className="ml-2">
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className='pb-3'>
            <button
              className="bg-red-500 text-white px-3.5 py-1.5 rounded hover:bg-red-600"
              onClick={() => handleClearResponse(currentQuestionData._id)}
            >
              Clear Response
            </button>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleNextQuestion}
              disabled={currentQuestion === assessment.questions.length - 1}
            >
              Next
            </button>
          </div>

          <div className="mt-8">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600"
              onClick={handleSubmit}
            >
              Submit Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeAssessment;