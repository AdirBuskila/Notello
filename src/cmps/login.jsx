import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const theme = createTheme();
// console.log('theme', theme);

class _MyLogin extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const credentials = {
        username: data.get('user'),
        password: data.get('password'),
      };
      // const user = await this.props.login(credentials);
      console.log('logged in!');
    } catch (err) {
      console.log('cannot login', err);
    }
    // console.log({
    //   username: data.get('user'),
    //   password: data.get('password'),
    // });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs' className='login-container'>
          <CssBaseline />
          <Box
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '3px',
            padding: '25px',
            boxShadow: 'rgb(0 0 0 / 10%) 0 0 10px',
          }}
        >
            <Typography component='h2' variant='h5'>
              Log In to Notello
            </Typography>
            <Box
              component='form'
              onSubmit={this.handleSubmit}
              noValidate
              style={{ marginTop: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='user'
                label='User Name'
                name='user'
                autoComplete='user'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='success'
                style={{ marginTop: 3, marginBottom: 2 }}
              >
                Login
              </Button>
            </Box>
            <hr
          style={{
            color: 'grey',
            marginTop: '30px',
            marginBottom: '10px',
            backgroundColor: 'grey',
            width: '300px'
          }}
          />
            <Link className='clean-link blue-link' to='/signup' >
            Not a Member?
      </Link>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = {};

export const MyLogin = connect(mapStateToProps, mapDispatchToProps)(_MyLogin);
