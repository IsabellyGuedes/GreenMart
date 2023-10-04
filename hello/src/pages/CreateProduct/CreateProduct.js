import React, { useState } from 'react'
import { Avatar, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import './createProductStyle.css';

const CreateProduct = () => {
  const [price, setPrice] = useState('');

  const handleRegisterProduct = (e) => {

  }

  const handlePriceChange = (event) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[^0-9.]/g, '');

    const decimalCount = (inputValue.split('.')[1] || []).length;
    if (decimalCount > 2) {
      inputValue = parseFloat(inputValue).toFixed(2);
    }

    setPrice(inputValue);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Button component={Link} to="/home" color="inherit" style={{textDecoration: 'none'}}>
            <ArrowBackIosNewIcon sx={{ mr: 2 }}/>
          </Button>
          <Typography variant="h6" color="inherit" noWrap style={{ margin: 'auto' }}>
            GreenMart
          </Typography>
        </Toolbar>
      </AppBar>

    <Container component="main">
        <Box component="form" display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
          <Avatar sx={{bgcolor: "secondary.main"}}><AddShoppingCartIcon/></Avatar>
          <Typography variant="h5"> Create Product</Typography>
          <Box sx={{mt: 2}} component="form" onSubmit={handleRegisterProduct} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <TextField required fullWidth margin="normal" name='productName' label="Product Name"/>
            <TextField required fullWidth margin="normal" name="productCategory" label="Product Category"/>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField 
                  required
                  fullWidth
                  margin="normal"
                  name="price"
                  label="Price"
                  type='text'
                  value={price}
                  onChange={handlePriceChange}
                  inputProps={{ step: 0.01 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField required fullWidth margin="normal" name="productCode" label="Product Code"/>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth sx={{bgcolor: "secondary.main", mt: 2}} variant='contained'> Send </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default CreateProduct