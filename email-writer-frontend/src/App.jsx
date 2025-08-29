import { Box, Container, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material'
import axios from 'axios';
import { useState } from 'react'

function App() {
 const [emailContent, setEmailContent]=useState('');
 const [tone, setTone]=useState('');
 const [loading, setLoading] = useState(false);
  const [generatedReply, setGeneratedReply]=useState(''); 
 const handleSubmit= async()=>{
  setLoading(true);
try {
  const response =await axios.post("http://localhost:8080/api/email/generate",
    { emailContent,tone});
    setGeneratedReply(typeof response.data === 'string' ?  response.data :  JSON.stringify(response.data)
  );
} catch (error) {
  
}
finally{
setLoading(false);
}
 };

  return (
    <Container maxWidth="md" sx={{py:4}}>
<Typography variant="h3" component="h1" gutterBottom> 
  Email Reply Generator
</Typography>
 

 <Box sx={{mx:3}}> 
      <TextField fullWidth multiline rows={6} variant='outlined' label="Orignal Email Content" 
      value={emailContent || ''}
      onChange={(e) => setEmailContent(e.target.value)}
      sx={{mb:2}}
      />

  

  <FormControl fullWidth sx={{mb:2}}>
        <InputLabel>Tone(optional)</InputLabel>
        <Select
          value={tone || ''}
          label="Tone (optional)"
          onChange={(e)=> setTone(e.target.value)}
        >
           <MenuItem value="none">None</MenuItem>
          <MenuItem value="friendly">Friendly</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
          <MenuItem value="casual">Casual</MenuItem>
        </Select>
   </FormControl>
      <Button   sx={{mb:2}} variant='contained'
      onClick={handleSubmit}
      disabled={!emailContent||loading}>
        {loading ? <CircularProgress size={24}/> : "Generate Reply"}
        
        </Button>
    </Box>

 <Box sx={{mx:3}}> 
      <TextField fullWidth
       multiline rows={6} 
       variant='outlined'  
      value={generatedReply || ''}
     inputProps={{readOnly:true}}
      sx={{mb:2}}
      />
      <Button
      variant='outlined'
      onClick={() => navigator.clipboard.writeText(generatedReply)}
      >Copy to Clipboard</Button>

  </Box>


    </Container>


  )
}

export default App
