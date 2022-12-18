import { Box, Card, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Answer from "../components/Answer";
import Question from "../components/Question";
const sha1 = require("js-sha1");
const qaMap = new Map();

const currentQuestion = [
  {
    answerSha1: "5c8452354c261b52e6dcf7f94b80ea5a7bceb677",
    question:
      "What do people mean when type the letters 'SMH' in a message on the internet?"
  },
  {
    answerSha1: "088e4a2e6f0c20048cd3e53c639c7092bffb8524",
    question:
      "Which country's flag can be described as 'Green with a vertical white band on the left side. The green section contains a white crescent and star.'?"
  },
  {
    answerSha1: "b79445b10bd5bc34cbebf63355101dbdb420aa0e",
    question: "Which director directed Gangs of New York?"
  },
  {
    answerSha1: "fd26fb6ff5aa10eaddad0b2c832139dbe052c9d7",
    question:
      "Which philosopher famously said 'This is patently absurd; but whoever wishes to become a philosopher must learn not to be frightened by absurdities'?"
  },
  {
    answerSha1: "e8002c169040af08d8b4ed2f0d636b840f335f9b",
    question: "What is Xylology the study of?"
  }
];

export default function Quiz() {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(3);
  const [currentQuestions, setCurrentQuestions] = useState(currentQuestion);

  useEffect(() => {
    fetchQuestionAnswer();
  }, []);

  const fetchQuestionAnswer = () => {
    fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((data) => {
        if (data?.questions?.length) {
          data.questions.forEach((qa) => {
            if (!qaMap.has(qa.question)) {
              qaMap.put(qa.question, qa.answer);
              currentQuestions.push(qa.question);
            }
          });
        }
      });
  };

  const handleSubmit = (question, answerSha, answer) => {
    if (answer) {
      const current = answer.toLowerCase().trim();
      const shaAnswer = sha1(current);
      if (shaAnswer === answerSha) {
        setScore((prevState) => prevState + 1);
        const currentState = [...currentQuestion];
        currentState.pop();
        setCurrentQuestions(currentState);
      } else {
        if (attempts - 1 === 0) {
          console.log("Game end");
        } else {
          setAttempts((prevState) => prevState - 1);
        }
      }
    }
  };

  return (
    <>
    <Box>
      <Paper sx={{position: 'absolute',
    top: '10%',
    right: '2%', p: 1}} elevation={3}>
            <Typography sx={{color: 'green'}}>Current Score: {score || 0}</Typography>
            <Typography sx={{color: 'red'}}>Chances Left: {attempts}</Typography>
        </Paper>
    </Box>  
    <Box sx={{p : 4, mt: 16 }}>
    {currentQuestions.length > 0 && (
    <Card>
        <Question
        question={currentQuestions[currentQuestions.length - 1]?.question}
        />
        <Answer
        question={currentQuestions[currentQuestions.length - 1]?.question}
        answer={currentQuestions[currentQuestions.length - 1]?.answerSha1}
        handleSubmit={handleSubmit}
        />
    </Card>
    )}
    </Box>
    </>
  );
}
