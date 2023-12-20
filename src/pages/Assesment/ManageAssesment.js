import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const ManageAssessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const headers = {
    'Content-Type': 'application/json',
    'auth-token': localStorage.getItem('token'),
  };

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/assesment/assessments', { headers });
        setAssessments(response.data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, []);

  const deleteAssessment = async (id) => {
    try {
      // Assuming you have an API endpoint to delete an assessment by ID
      await axios.delete(`http://localhost:5000/api/assesment/assessments/${id}`, { headers });

      // Update the local state after deletion
      setAssessments((prevAssessments) => prevAssessments.filter((assessment) => assessment._id !== id));

      // Clear the selected assessment if it was deleted
      setSelectedAssessment(null);
    } catch (error) {
      console.error('Error deleting assessment:', error);
    }
  };

  const editAssessment = (assessment) => {
    // Set the selected assessment for editing
    setSelectedAssessment(assessment);
  };

  const saveEditedAssessment = async () => {
    try {
      // Assuming you have an API endpoint to update an assessment by ID
      await axios.put(`http://localhost:5000/api/assesment/assessments/${selectedAssessment._id}`, selectedAssessment, { headers });

      // Update the local state after editing
      setAssessments((prevAssessments) =>
        prevAssessments.map((assessment) =>
          assessment._id === selectedAssessment._id ? selectedAssessment : assessment
        )
      );

      // Clear the selected assessment after saving edits
      setSelectedAssessment(null);
    } catch (error) {
      console.error('Error editing assessment:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAssessment((prevAssessment) => ({ ...prevAssessment, [name]: value }));
  };

  const handleQuestionTextChange = (index, value) => {
    setSelectedAssessment((prevAssessment) => {
      const updatedQuestions = [...prevAssessment.questions];
      updatedQuestions[index].text = value;
      return { ...prevAssessment, questions: updatedQuestions };
    });
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    setSelectedAssessment((prevAssessment) => {
      const updatedQuestions = [...prevAssessment.questions];
      updatedQuestions[questionIndex].correctAnswer = value;
      return { ...prevAssessment, questions: updatedQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setSelectedAssessment((prevAssessment) => {
      const updatedQuestions = [...prevAssessment.questions];
      const questionToUpdate = updatedQuestions[questionIndex];

      // Ensure that options field is initialized as an array
      questionToUpdate.options = questionToUpdate.options || [];
      questionToUpdate.options[optionIndex] = { text: value };

      return { ...prevAssessment, questions: updatedQuestions };
    });
  };

  const addNewQuestion = () => {
    setSelectedAssessment((prevAssessment) => {
      const updatedQuestions = [...prevAssessment.questions, createEmptyQuestion()];
      return { ...prevAssessment, questions: updatedQuestions };
    });
  };

  const deleteQuestion = (questionIndex) => {
    setSelectedAssessment((prevAssessment) => {
      const updatedQuestions = [...prevAssessment.questions];
      updatedQuestions.splice(questionIndex, 1);
      return { ...prevAssessment, questions: updatedQuestions };
    });
  };

  const createEmptyQuestion = () => {
    return {
      text: '',
      options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
      correctAnswer: 0,
    };
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Manage Assessments</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* List of Assessments */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Assessments List</h2>
          {assessments.map((assessment) => (
            <div key={assessment._id} className="bg-white p-4 rounded shadow-md mb-4">
              <p className="text-gray-700">Assessment Name: {assessment.name}</p>
              <p className="text-gray-500 text-sm">Date: {assessment.date}, Time: {assessment.time}</p>
              <div className="mt-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => editAssessment(assessment)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => deleteAssessment(assessment._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View/Edit Form */}
        {selectedAssessment && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Assessment Details</h2>
            <div className="bg-white p-4 rounded shadow-md mb-4">
              <div className="mb-4">
                <label htmlFor="editAssessmentName" className="text-gray-700 block">
                  Assessment Name
                </label>
                <input
                  type="text"
                  id="editAssessmentName"
                  className="w-full p-2 border rounded mt-2"
                  name="name"
                  value={selectedAssessment.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="editAssessmentDate" className="text-gray-700 block">
                    Date
                  </label>
                  <input
                    type="date"
                    id="editAssessmentDate"
                    className="w-full p-2 border rounded mt-2"
                    name="date"
                    value={selectedAssessment.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="editAssessmentTime" className="text-gray-700 block">
                    Time
                  </label>
                  <input
                    type="time"
                    id="editAssessmentTime"
                    className="w-full p-2 border rounded mt-2"
                    name="time"
                    value={selectedAssessment.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Questions Section */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Questions</h2>
                {selectedAssessment.questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <label htmlFor={`editQuestion${index + 1}`} className="text-gray-700 block">
                      Question {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`editQuestion${index + 1}`}
                      className="w-full p-2 border rounded mt-2"
                      placeholder={`Enter question text`}
                      value={question.text}
                      onChange={(e) => handleQuestionTextChange(index, e.target.value)}
                    />
                    {/* Options Section */}
                    <div className="mb-4">
                      <label className="text-gray-700 block">Options</label>
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex}>
                          <input
                            type="text"
                            className="w-full p-2 border rounded mb-2"
                            placeholder={`Option ${optIndex + 1}`}
                            value={option.text}
                            onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    {/* Correct Answer Section */}
                    <div>
                      <label className="text-gray-700 block">Correct Answer</label>
                      <select
                        className="w-full p-2 border rounded"
                        value={question.correctAnswer}
                        onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                      >
                        {question.options.map((_, optIndex) => (
                          <option key={optIndex} value={optIndex}>
                            Option {optIndex + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Delete Question Button */}
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
                      onClick={() => deleteQuestion(index)}
                    >
                      Delete Question
                    </button>
                  </div>
                ))}
                {/* Add New Question Button */}
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
                  onClick={addNewQuestion}
                >
                  Add New Question
                </button>
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex items-center justify-end mt-6">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                onClick={saveEditedAssessment}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setSelectedAssessment(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect()(ManageAssessment);

