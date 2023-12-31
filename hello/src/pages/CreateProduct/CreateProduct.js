import React, { useState, useEffect } from 'react'
import { Avatar, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import './createProductStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import httpService from '../../services/httpService'

const CreateProduct = () => {
  const {state} = useLocation();
  const productData = (state && state.product) ? state.product : {}
  const [isEditing] = useState(false);
  const navigate = useNavigate()
  const [isLoginDisabled, setIsLoginDisabled] = useState(false)
  const [loginDisabledTimeout, setLoginDisabledTimeout] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    id: '',
  });

  useEffect(() => {
    if (state && state.product) {
      setFormData(state.product);
    }
  }, [state]);

  useEffect(() => {
    return () => {
        if (loginDisabledTimeout) { 
            clearTimeout(loginDisabledTimeout)
        }
    };
}, [loginDisabledTimeout])

  const handleRegisterProduct = async (e) => {
    e.preventDefault();
    if (isLoginDisabled) {
      return;
    }

    setIsLoginDisabled(true)
    setLoginDisabledTimeout(setTimeout(() => setIsLoginDisabled(false), 8000))
    
    try{
      const response = await httpService.createProduct(formData)
      if (response.status === 201) {
        const result = await response.json();
        toast.success("Produto cadastrado com sucesso!")
        setTimeout(() => {
          navigate('/home');
        }, 6000);
      } else if (response.status === 409) {
        const result = await response.json()
        if (result.message) {
          await toast.error(result.message)
        }
      } else {
        const result = await response.json();
        toast(result.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar o produto!");
      }
  }

  const handleInputChange = (e) => {
    console.log(formData)
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Button component={Link} to="/home" color="inherit" className="text">
            <ArrowBackIosNewIcon className='spacing'/>
          </Button>
          <Typography variant="h6" color="inherit" noWrap style={{ margin: 'auto' }}>
            GreenMart
          </Typography>
        </Toolbar>
      </AppBar>

    <Container component="main">
        <Box className='container'>
          <Avatar sx={{bgcolor: "secondary.main"}}><AddShoppingCartIcon/></Avatar>
          <Typography variant="h5"> {isEditing ? 'Edit Product' : 'Create Product'}</Typography>
          <Box component= "form" onSubmit={handleRegisterProduct} className='form-container'>
            <TextField required fullWidth margin="normal" name='name' value={formData.name} onChange={handleInputChange} label="Product Name"/>
            <TextField required fullWidth margin="normal" name="category" value={formData.category} onChange={handleInputChange} label="Product Category"/>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField 
                  required
                  fullWidth
                  margin="normal"
                  name="price"
                  label="Price"
                  type='text'
                  value={formData.price}
                  onChange={handleInputChange}
                  inputProps={{ step: 0.01}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField required fullWidth margin="normal" name="id" label="Product Code" value={formData.id} onChange={handleInputChange}inputProps={{ pattern: "[0-9]{1,3}", title: "Product Code deve ser um número de 3 dígitos"}}/>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth sx={{bgcolor: "secondary.main", mt: 2}} variant='contained'> Send </Button>
          </Box>
        </Box>
        <ToastContainer/>
      </Container> 
    </>
  )
}

export default CreateProduct