import React, { Component } from "react";
import quizData from "./quizData";
import "./Quiz.css"

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      score: 0,
      completed: false,
      selectedAnswer: null,
    };
  }

  handleAnswerClick(answer) {
    const { currentQuestion, score } = this.state;
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    if (answer === correctAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
    }

    if (currentQuestion < quizData.length - 1) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        selectedAnswer: null, // Reset selected answer
      }));
    } else {
      this.setState({
        completed: true,
      });
    }
  }

  handleRadioChange(answer) {
    this.setState({ selectedAnswer: answer });
  }

  render() {
    const { currentQuestion, score, completed, selectedAnswer } = this.state;
    const question = quizData[currentQuestion];

    return (
      <div className="quiz-container">
        {completed ? (
          <div>
            <h2>Quiz Completed!</h2>
            <p>
              Your score: {score} out of {quizData.length}
            </p>
          </div>
        ) : (
          <div>
            <h2>Question {currentQuestion + 1}:</h2>
            <p>{question.question}</p>
            <form>
              {question.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => this.handleRadioChange(option)}
                  />
                  {option}
                </label>
              ))}
            </form>
            <button
              onClick={() =>
                this.handleAnswerClick(
                  selectedAnswer // Use selected answer
                )
              }
              disabled={selectedAnswer === null}
            >
              Next
            </button>
            <p>Current Score: {score}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Quiz;
