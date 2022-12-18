import { Button, CardActions, CardContent, TextField } from "@mui/material";
import { useState } from "react";

export default function Answer({ question, handleSubmit }) {
  const [ans, setAns] = useState("");

  return (
    <>
    <CardContent>
      <TextField size="small" sx={{width: '50%'}} value={ans}  placeholder="Answer" onChange={(e) => setAns(e.target.value)}/>
    </CardContent>
    <CardActions>
      <Button size="small" variant="contained" onClick={() => {
        handleSubmit(question, ans)
        setAns('');
        }}>
        Submit
      </Button>
    </CardActions>
    </>  
    
  );
}
