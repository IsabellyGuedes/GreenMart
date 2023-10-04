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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

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
      <Box sx={{ position: 'relative', mt: 5, mr: -90 }}>
          <Button component={RouterLink} to="/product/create" sx={{ textTransform: 'none', bgcolor: "primary.main"}}>
            <Typography variant="h6" color="black" noWrap sx={{ textTransform: 'none', fontSize: "14px" }}>
              Add Product
            </Typography>
          </Button>
      </Box>
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
      </>
  );
}

export default Home