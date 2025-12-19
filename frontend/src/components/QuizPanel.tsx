import React, { useState } from 'react';

interface QuizPanelProps {
  treeType: string;
}

export default function QuizPanel({ treeType }: QuizPanelProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const quizzes: Record<string, any[]> = {
    bst: [
      {
        question: 'In a Binary Search Tree, where should you insert a value smaller than the root?',
        options: ['Left subtree', 'Right subtree', 'Anywhere', 'At the root'],
        correct: 0,
      },
      {
        question: 'What is the time complexity of BST search in the average case?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correct: 1,
      },
      {
        question: 'A BST is balanced when?',
        options: ['All leaves are at the same level', 'Height of left and right subtrees differ by at most 1', 'It has an odd number of nodes', 'The root is the median'],
        correct: 1,
      },
    ],
    avl: [
      {
        question: 'What is the balance factor in an AVL tree?',
        options: ['Height of left - Height of right', 'Height of right - Height of left', 'Number of left nodes - right nodes', 'Color of the node'],
        correct: 0,
      },
      {
        question: 'What is a single right rotation?',
        options: ['Moving a node up one level', 'Rotating around unbalanced node', 'Swapping colors', 'Reversing the tree'],
        correct: 1,
      },
    ],
    rbt: [
      {
        question: 'Which color must the root of a Red-Black tree always be?',
        options: ['Red', 'Black', 'Purple', 'Green'],
        correct: 1,
      },
      {
        question: 'In a Red-Black tree, can a red node have a red child?',
        options: ['Yes', 'No', 'Only if it\'s the root', 'Only on the left'],
        correct: 1,
      },
    ],
  };

  const questions = quizzes[treeType] || [];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    }
  };

  if (questions.length === 0) {
    return <div className="quiz-panel">No quiz available for this tree type yet.</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-panel">
      <h2>🎯 Quiz: {treeType.toUpperCase()}</h2>
      
      <div className="quiz-header">
        <p className="score">Score: {score}/{questions.length}</p>
        <p className="progress">Question {currentQuestion + 1} of {questions.length}</p>
      </div>

      <div className="quiz-content">
        <h3>{question.question}</h3>
        
        <div className="options">
          {question.options.map((option: string, index: number) => (
            <button
              key={index}
              className={`option ${
                showAnswer
                  ? index === question.correct
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => !showAnswer && handleAnswer(index)}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>

        {showAnswer && (
          <div className="answer-feedback">
            {currentQuestion < questions.length - 1 ? (
              <button onClick={nextQuestion} className="next-btn">
                Next Question
              </button>
            ) : (
              <div className="quiz-complete">
                <h3>🎉 Quiz Complete!</h3>
                <p>Final Score: {score}/{questions.length}</p>
                <p>Percentage: {Math.round((score / questions.length) * 100)}%</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
