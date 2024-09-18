import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAssessments, setAssessmentState, resetAssessmentState } from '../../Redux/reducer';
import { useDispatch, useSelector } from 'react-redux';

const CreateAssessment = ({ setAssessments, setAssessmentState, resetAssessmentState}) => {

  const dispatch = useDispatch();
  const assessmentState = useSelector((state) => state.user.assessmentState);
  useEffect(() => {
    // Save assessment state to Redux whenever it changes
    dispatch(setAssessmentState(assessmentState));
  }, [assessmentState, dispatch]);

  const [assessmentName, setAssessmentName] = useState(assessmentState.assessmentName || '');
  const [assessmentDate, setAssessmentDate] = useState(assessmentState.assessmentDate || '');
  const [assessmentTime, setAssessmentTime] = useState(assessmentState.assessmentTime || '');
  const [allowedEmails, setAllowedEmails] = useState(assessmentState.allowedEmails || '');
  const [questions, setQuestions] = useState(assessmentState.questions || []);
  const [newQuestion, setNewQuestion] = useState(assessmentState.newQuestion || {
    text: '',
    options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
    correctAnswer: 0,
  });

  // Function to add a new question to the list
  const addQuestion = () => {
    if (
      newQuestion.text.trim() !== '' &&
      newQuestion.options.every((opt) => opt.text.trim() !== '')
    ) {
      setQuestions([...questions, newQuestion]);
      dispatch(setAssessmentState({ ...assessmentState, questions: [...questions, newQuestion] }));
      setNewQuestion({
        text: '',
        options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
        correctAnswer: 0,
      });
    }

  };

  // Function to remove a question from the list
  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);

    // Dispatch the updated assessment state to Redux
    dispatch(setAssessmentState({ ...assessmentState, questions: updatedQuestions }));
  };

  // Function to submit the assessment
  const submitAssessment = async () => {
    try {
        // Validate required fields and questions
      const host= "http://localhost:5000"

      if (!assessmentName || !assessmentDate || !assessmentTime || questions.length === 0) {
        alert('Please fill in all required fields and add at least one question.');
        return;
      }

      // Prepare assessment data
      const assessmentData = {
        name: assessmentName,
        date: assessmentDate,
        time: assessmentTime,
        questions,
        allowedEmails: allowedEmails.split(',').map(email => email.trim()), // convert to array
      };

      const headers = {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'), // Add your authorization token if needed
        // Add any other headers you need
      };
      // Send POST request to create assessment
      await axios.post(`${host}/api/assesment/assessments`, assessmentData,{headers});
      setAssessments(assessmentData);

      // Optionally, you can redirect the user to a different page or show a success message
      alert('Assessment created successfully');

      dispatch(setAssessmentState({
        assessmentName: '',
        assessmentDate: '',
        assessmentTime: '',
        allowedEmails: '',
        questions: [],
        newQuestion: {
          text: '',
          options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
          correctAnswer: 0,
        },
      }));
      // Reset form fields
      setAssessmentName('');
      setAssessmentDate('');
      setAssessmentTime('');
      setQuestions([]);
      setNewQuestion({
        text: '',
        options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
        correctAnswer: 0,
      });

    } catch (error) {
      console.error('Error creating assessment:', error);
      // Handle error, show error message to the user, etc.
    }
  };


  // Dispatch functions for updating state
  const dispatchAssessmentName = (name) => {
    dispatch(setAssessmentState({ ...assessmentState, assessmentName: name }));
  };

  const dispatchAssessmentDate = (date) => {
    dispatch(setAssessmentState({ ...assessmentState, assessmentDate: date }));
  };

  const dispatchAssessmentTime = (time) => {
    dispatch(setAssessmentState({ ...assessmentState, assessmentTime: time }));
  };

  const dispatchAllowedEmails = (emails) => {
    dispatch(setAssessmentState({ ...assessmentState, allowedEmails: emails }));
  };

  const handleAssessmentNameChange = (e) => {
    const newName = e.target.value;
    setAssessmentName(newName);
    dispatchAssessmentName(newName);
  };

  const handleAssessmentDateChange = (e) => {
    const newDate = e.target.value;
    setAssessmentDate(newDate);
    dispatchAssessmentDate(newDate);
  };

  const handleAssessmentTimeChange = (e) => {
    const newTime = e.target.value;
    setAssessmentTime(newTime);
    dispatchAssessmentTime(newTime);
  };

  const handleAllowedEmailsChange = (e) => {
    const newEmails = e.target.value;
    setAllowedEmails(newEmails);
    dispatchAllowedEmails(newEmails);
  };

  const handleCancelClick = () => {
    // Reset assessment state to initial values when "Cancel" button is clicked
    resetAssessmentState();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Form to create assessment */}
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-4">Create Assessment</h1>
        <div className="bg-white p-6 rounded shadow-md">
          {/* Assessment Details Section */}
          <div className="mb-4">
            <label htmlFor="assessmentName" className="text-gray-700 block">
              Assessment Name
            </label>
            <input
              type="text"
              id="assessmentName"
              className="w-full p-2 border rounded mt-2"
              value={assessmentName}
              // onChange={(e) => setAssessmentName(e.target.value)}
              onChange={handleAssessmentNameChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="assessmentDate" className="text-gray-700 block">
                Date
              </label>
              <input
                type="date"
                id="assessmentDate"
                className="w-full p-2 border rounded mt-2"
                value={assessmentDate}
                // onChange={(e) => setAssessmentDate(e.target.value)}
                onChange={handleAssessmentDateChange} 
              />
            </div>
            <div>
              <label htmlFor="assessmentTime" className="text-gray-700 block">
                Time
              </label>
              <input
                type="time"
                id="assessmentTime"
                className="w-full p-2 border rounded mt-2"
                value={assessmentTime}
                // onChange={(e) => setAssessmentTime(e.target.value)}
                onChange={handleAssessmentTimeChange} 
              />
            </div>
          </div>

           {/* Allowed Emails Section */}
           <div className="mb-4">
            <label htmlFor="allowedEmails" className="text-gray-700 block">
              Allowed Emails (comma-separated)
            </label>
            <input
              type="text"
              id="allowedEmails"
              className="w-full p-2 border rounded mt-2"
              value={allowedEmails}
              // onChange={(e) => setAllowedEmails(e.target.value)}
              onChange={handleAllowedEmailsChange} 
            />
          </div>

          {/* Questions Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Questions</h2>
            <div className="mb-4">
              <label htmlFor="newQuestion" className="text-gray-700 block">
                New Question
              </label>
              <input
                type="text"
                id="newQuestion"
                className="w-full p-2 border rounded"
                placeholder="Enter question text"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
              />
            </div>

            {/* Options Section */}
            <div className="mb-4">
              <label className="text-gray-700 block">Options</label>
              {newQuestion.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  placeholder={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) => {
                    const updatedOptions = [...newQuestion.options];
                    updatedOptions[index] = { text: e.target.value };
                    setNewQuestion({ ...newQuestion, options: updatedOptions });
                  }}
                />
              ))}
            </div>

            {/* Correct Answer Section */}
            <div>
              <label className="text-gray-700 block">Correct Answer</label>
              <select
                className="w-full p-2 border rounded"
                value={newQuestion.correctAnswer}
                onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
              >
                {newQuestion.options.map((_, index) => (
                  <option key={index} value={index}>
                    Option {index + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Display questions list */}
            <ul className="list-disc pl-6 mt-4">
              {questions.map((question, index) => (
                <li key={index} className="text-gray-700 mb-2">
                  {question.text}
                  <ul className="list-disc pl-6">
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex}>{option.text}</li>
                    ))}
                  </ul>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeQuestion(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions Section */}
          <div className="flex items-center justify-end mt-6">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded mr-2 hover:bg-blue-600"
              onClick={addQuestion}
            >
              Add Question
            </button>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded mr-2 hover:bg-green-600"
              onClick={submitAssessment}
            >
              Create Assessment
            </button>
            <a href='/admindashboard'>
            <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400" onClick={handleCancelClick}>
              Cancel
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setAssessments, setAssessmentState, resetAssessmentState
};

export default connect(null, mapDispatchToProps)(CreateAssessment);