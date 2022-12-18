import { AppBar, Box, Typography } from '@mui/material';
import './App.css';
import Quiz from './containers/Quiz';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <AppBar component="nav" position="fixed" enableColorOnDark>
            <Typography
              variant="h4"
              component="div"
            >
              Quiz
            </Typography>
          </AppBar>
      </header>
      <section>
        <Box>
            <Quiz />
        </Box>
      </section>
    </div>
  );
}

export default App;
