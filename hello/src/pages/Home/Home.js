import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import httpService from '../../services/httpService'
import './homeStyle.css'

const Home = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState(null)

  const handleRemoveProduct = async () => {
    try {
      await httpService.deleteProduct(productIdToDelete);
      
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productIdToDelete));
  
      handleClose();
    } catch (error) {
      console.error('Erro ao remover o produto:', error);
    }
  }

  const handleClickOpen = (productId) => {
    setProductIdToDelete(productId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token")
  }

  const goTo = (path, params) => {
    return () => {
      navigate(path, {state: {product: params}})
    }
    
  }

  const EmptyProducts = ()=> {
    return (
      <Container sx={{ py: 3 }} maxWidth="md">Nenhum produto cadastrado</Container>
    )
  }
  
  const ListProducts = () =>{
    return (
  
      <Container sx={{ py: 3 }} maxWidth="md">
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      
                      image="https://img.freepik.com/premium-vector/grocery-set-meat-fish-salad-bread-milk_169241-692.jpg"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography>
                        R$ {product.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Button size="small" variant="outlined" onClick={() => handleClickOpen(product.id)} sx={{ border: 'none', '&:hover': { border: 'none' } }}>
                            <ClearIcon/>
                            <Typography color="inherit" noWrap className='custom-element'>
                              Remove
                            </Typography>
                          </Button>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            sx={{ background: '#ffffff' }}
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Delete product?"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete the product.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>No</Button>
                              <Button onClick={handleRemoveProduct} autoFocus>
                                Yes
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Grid>
                        <Grid item xs={6}>
                          <Button onClick={goTo("/product/create", product)} size="small">
                          <EditIcon/>
                            <Typography color="inherit" noWrap className='custom-element'>
                              Edit
                            </Typography>
                          </Button>                         
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
    )
  }


  useEffect(() => {
    async function fetchProducts() {
      try{
        const response = await httpService.getProducts()
        const products = await response.json()
        setProducts(products)
        //setLoading(false)
      } catch (error) {
        console.error("Erro")
        //setLoading(false)
      }
    }
    fetchProducts()
  }, [])

    return (
      <>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <LocalGroceryStoreIcon className='spacing' />
            <Typography variant="h6" color="inherit" noWrap>
              GreenMart
            </Typography>
  
            <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <Button onClick={handleSignOut} component={RouterLink} to="/" color="inherit" style={{textDecoration: 'none'}}>
                <Typography variant="h6" color="inherit" noWrap sx={{ textTransform: 'none', mr: 1 }}>
                  Logout
                </Typography>
                <LogoutIcon />
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <main>
        <Box className='element'>
            <Button component={RouterLink} onClick={goTo("/product/create")} sx={{ textTransform: 'none', bgcolor: "primary.main"}}>
              <Typography variant="h6" color="black" noWrap className='custom-text'>
                Add Product
              </Typography>
            </Button>
        </Box>
        {products.length !== 0 ?<ListProducts/> :  <EmptyProducts/>}
          
        </main>
        </>
    );

}



export default Home