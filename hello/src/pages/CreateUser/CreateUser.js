import React, { useState } from 'react'
import { Avatar, Button, Container, Grid, TextField, Typography, InputAdornment, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper'
import httpService from '../../services/httpService'
import './style.css';
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  const handleRegisterUser = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = {}
    for(const [key, value] of formData) {
        data[key] = value
    }

    try {
        const response = await httpService.createUser(data)
        const result = await response.json()

      if (result.success) {
        toast.success("Cadastro realizado com sucesso!");
        navigate('/')
      } else {
        // Simulando um erro ao cadastrar um email que já existe
        toast("E-mail já cadastrado.");
        }
    } catch (error) {
      toast.error(error.message);
      this.setState({ isEmailTaken: true });
    }
  }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };

  return (
    <Paper elevation={3} className="paper-container">
      <Container component="main">
        <Box component="form" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Avatar sx={{bgcolor: "secondary.main"}}><PersonIcon/></Avatar>
          <Typography variant="h5"> Sign Up</Typography>
          <Box sx={{mt: 2}} component="form" onSubmit={handleRegisterUser} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField required fullWidth margin="normal" name="firstName" label="First Name" id="firstName"/>
              </Grid>
              <Grid item xs={6}>
                <TextField required fullWidth margin="normal" name="lastName" label="Last Name" id="lastName"/>
              </Grid>
            </Grid>
            <TextField required fullWidth margin="normal" name="email" type="email" label="Email"/>
            <TextField
                required
                fullWidth
                margin="normal"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
            />
            <Button type="submit" fullWidth sx={{bgcolor: "secondary.main", mt: 2}} variant='contained'> Send </Button>
            <Grid sx={{mt: 2}}>
              <Link to='/'> Already have an account? Log in</Link> 
            </Grid>
          </Box>
        </Box>
      </Container>
    </Paper>
  )
}

export default CreateUser