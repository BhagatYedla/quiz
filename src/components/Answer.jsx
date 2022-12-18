import { Button, CardActions, CardContent, TextField } from "@mui/material";
import { useState } from "react";

export default function Answer({ question, answer, handleSubmit }) {
  const [ans, setAns] = useState("");

  return (
    <>
    <CardContent>
      <TextField size="small" sx={{width: '50%'}}  placeholder="Answer" onChange={(e) => setAns(e.target.value)}/>
    </CardContent>
    <CardActions>
      <Button size="small" variant="contained" onClick={() => handleSubmit(question, answer, ans)}>
        Submit
      </Button>
    </CardActions>
    </>  
    
  );
}
