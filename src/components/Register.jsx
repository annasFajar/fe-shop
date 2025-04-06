import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import * as yup from 'yup';


export default function RegisterPage() {

  const [showPassword, setShowPassword] = useState(false)
  
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    initialValues:{
      username:'',
      email:'',
      password:''
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch('http://localhost:2000/users/register/new', {
          method: 'POST',
          headers:  {
            'Content-Type': 'application/json' // Memberitahu server bahwa kita mengirim JSON
          },
          body: JSON.stringify({
            username: values.username,
            email: values.email,
            password: values.password
          })
        })

        const data = await res.json()
        console.log(data)
        
        if (!res.ok) {
          alert(data.error);
          // throw Error(data.message || 'gagal regis')
        }
        else {
          alert('registrasi berhasil');
        }


        // TODO: Kirim data ke backend untuk menyimpan user baru
      } catch (error) {
        throw Error('salah url')  
      }
    },
    validationSchema: yup.object({
      username: yup.string().min(4).max(20).required("Please Enter a username'"),
      email: yup.string().email().required("Please Enter your Email"),
      password: yup.string().required("Please Enter your password").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      })
  
  })
  

  return (
    <Container maxWidth="sm" sx={{width:'100%', minHeight:'100vh', display:'flex', alignItems:'center',justifyContent:'center'}}> 
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label='Username'
            name='username'
            type='text'
            value={formik.values.username}
            onChange={formik.handleChange}
            margin='normal'
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            // onInvalid={formik.errors.username}
            
            // error={formik.errors}
            required/>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            // error={formik.errors}
            required

            />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text':'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={()=>{handleShowPassword()}}>
                      {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
}