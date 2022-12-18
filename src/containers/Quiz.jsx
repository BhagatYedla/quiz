import { Box, Card, Dialog, DialogContent, DialogTitle, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Answer from "../components/Answer";
import Question from "../components/Question";
const sha1 = require("js-sha1");
const qaMap = new Map();

export default function Quiz() {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(3);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchQuestionAnswer();
  }, []);

  const fetchQuestionAnswer = () => {
    fetch("https://eok9ha49itquif.m.pipedream.net")
      .then((res) => res.json())
      .then((data) => {
        if (data?.questions?.length) {
          const questionSet = [];
          data.questions.forEach((qa) => {
            if (!qaMap.has(qa.question)) {
              qaMap.set(qa.question, qa.answerSha1);
              questionSet.push(qa.question);
            }
          });
          setCurrentQuestions(questionSet);
        } else {
            setOpen(true);
        }
      });
  };

  const handleSubmit = (question, answer) => {
    if (answer) {
      const current = answer.toLowerCase().trim();
      const shaAnswer = sha1(current);
      if (shaAnswer === qaMap.get(question)) {
        setScore((prevState) => prevState + 1);
        const currentState = [...currentQuestions];
        currentState.pop();
        if(currentState.length <= 0){
            fetchQuestionAnswer();
        } else {
            setCurrentQuestions(currentState);
        }
      } else {
        if (attempts - 1 === 0) {
          setOpen(true);
        } 
        setAttempts((prevState) => prevState - 1);
      }
    }
  };

  return (
    <>
    <Box>
        <Paper sx={{
            position: 'absolute',
            top: '10%',
            right: '2%', 
            p: 1
        }} elevation={3}>
            <Typography sx={{color: 'green'}}>Current Score: {score || 0}</Typography>
            <Typography sx={{color: 'red'}}>Chances Left: {attempts}</Typography>
        </Paper>
    </Box>  
    <Box sx={{p : 4, mt: 16 }}>
    {currentQuestions.length > 0 && (
    <Card>
        <Question
        question={currentQuestions[currentQuestions.length - 1]}
        />
        <Answer
        question={currentQuestions[currentQuestions.length - 1]}
        handleSubmit={handleSubmit}
        />
    </Card>
    )}
    </Box>
    <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle>Quiz Completed</DialogTitle>
        <DialogContent sx={{textAlign: 'center'}}>
            <Typography variant="h5" sx={{color: 'green'}}>Current Score: {score || 0}</Typography>
            <Typography variant="caption">Please refresh the page to restart the quiz</Typography>
        </DialogContent>
    </Dialog>
    </>
  );
}
