import React, { FC }from 'react';
import { Snackbar, Grid, IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
    success?: boolean,
    error?: boolean,
};

const CustomizedSnackbars: FC<Props> =({success, error}) => (

    <Grid style={{cursor: "pointer"}}>
        
        <Snackbar open={success}> 
           
            <Alert
              variant="filled" 
              severity="success"
              color="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            
            >
               Parece que todo salio bien
            </Alert>

        </Snackbar>

        <Snackbar open={error}>

            <Alert 
               variant="filled" 
               severity="error"
               action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
               Algo salio mal, revise el formulario
            </Alert>

        </Snackbar>

    </Grid>

);

export default CustomizedSnackbars;

