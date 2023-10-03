import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LogoutIcon from '@mui/icons-material/Logout';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <RouterLink color="inherit" href="https://mui.com/">
        Your Website
      </RouterLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Home = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <LocalGroceryStoreIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            GreenMart
          </Typography>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Button component={RouterLink} to="/" color="inherit" style={{textDecoration: 'none'}}>
              <Typography variant="h6" color="inherit" noWrap sx={{ textTransform: 'none', mr: 1 }}>
                Logout
              </Typography>
              <LogoutIcon />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <main>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={6} className="addPromotionButton">
          <Button component={RouterLink} to="/promotion/create" sx={{ textTransform: 'none', bgcolor: "primary.main" }}>
            <Typography variant="h6" color="black" noWrap sx={{ textTransform: 'none', fontSize: "14px" }}>
              Add Promotion
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={6} className="addProductButton">
          <Button component={RouterLink} to="/product/create" sx={{ textTransform: 'none', bgcolor: "primary.main" }}>
            <Typography variant="h6" color="black" noWrap sx={{ textTransform: 'none', fontSize: "14px" }}>
              Add Product
            </Typography>
          </Button>
        </Grid>
      </Grid>
        <Container sx={{ py: 3 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
      </>
  );
}

export default Home