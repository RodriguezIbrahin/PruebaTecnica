import React from 'react';
import {
	Button, Grid, FormControl, InputLabel, OutlinedInput,
	FormHelperText, Typography, Avatar, TextField
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { Validate, Doctor, Especialidades } from "../statics/Validate";
import { DoctorCollection } from '../../api/Doctors';
import CustomizedSnackbars from "./Alerts";
import { format } from 'rut.js'

interface StateAlerts {
    success?: boolean,
    error?: boolean,
};

const InitialState: Doctor ={
	name: null,
	maternal_surname: null,
	paternal_surname: null,
	rut: null,
	especialidad: null
}

const useStyles = makeStyles((theme: Theme) => createStyles ({

    root: {
		marginTop: "1.5rem",
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},

}));

export default function AddDr() {

	const classes = useStyles();

	const [Dr, setDr] = React.useState<Doctor>(InitialState);
	
 	const [errors, setErrors] = React.useState<Doctor>(InitialState); 

    const [alerts, setAlerts] = React.useState<StateAlerts>({success: false, error: false});

	const handleChange = ( prop : string) => (e : any) : void => {

 		setErrors(Validate({
			...Dr,
			[prop]: e.target.value
		}));
		
	    setDr({
			...Dr,
			[prop]: e.target.value
		}); 	
	};

	const handleReset = () : void => {
		setDr({
            name: "",
            maternal_surname: "",
            paternal_surname: "",
            rut: "",
            especialidad: ""
        });
		setErrors(InitialState);
	};

	const handleSumit = () : void => {

        if(!errors.name && !errors.maternal_surname && !errors.paternal_surname && !errors.rut && !errors.especialidad 
            && Dr.name && Dr.maternal_surname && Dr.paternal_surname && Dr.rut && Dr.especialidad
        ){
            DoctorCollection.insert({...Dr, rut: format(Dr.rut) });
            setAlerts({success: true, error: false});
            setDr({
                name: "",
                maternal_surname: "",
                paternal_surname: "",
                rut: "",
                especialidad: ""
            });
            setErrors(InitialState);  
        }
        else setAlerts({success: false, error: true})

	};

    const handleCloseAlert = () : void => {
        setAlerts({success: false, error: false});
	};
	
	return (

		<Grid container direction="row" justify="center" alignItems="center"  className={classes.root}>

			<Grid item container direction="column" justify="center" alignItems="center">

				<Avatar className={classes.avatar}>

                    <AddIcon fontSize="large"/>

                </Avatar>

                <Typography component="h1" variant="h5">

                    Crear Medico
                
                </Typography>

			</Grid>
			
			<Grid item xs={10} md={7}>
            
                <FormControl fullWidth className={classes.margin} variant="outlined">

                    <InputLabel htmlFor="name">Nombre</InputLabel>

                    <OutlinedInput
                       id="name"
                       value={Dr.name}
                       onChange={handleChange("name")}
                       labelWidth={60}
					   required
					   error={errors.name ? true : false}
                    />

					<FormHelperText 
					   id="name"
					   error
					>
						{errors.name ? errors.name : " "}
					</FormHelperText>

                </FormControl>

            </Grid>

			<Grid item xs={10} md={7}>
            
                <FormControl fullWidth className={classes.margin} variant="outlined">

                    <InputLabel htmlFor="maternal_surname">Apellido Materno</InputLabel>

                    <OutlinedInput
                       id="maternal_surname"
                       value={Dr.maternal_surname}
                       onChange={handleChange("maternal_surname")}
                       labelWidth={123}
					   required
					   error={errors.maternal_surname ? true : false}
                    />

					<FormHelperText 
					   id="maternal_surname"
					   error
					>
						{errors.maternal_surname ? errors.maternal_surname : " "}
					</FormHelperText>

                </FormControl>

            </Grid>

			<Grid item xs={10} md={7}>
            
                <FormControl fullWidth className={classes.margin} variant="outlined">

                    <InputLabel htmlFor="paternal_surname">Apellido Paterno</InputLabel>

                    <OutlinedInput
                       id="paternal_surname"
                       value={Dr.paternal_surname}
                       onChange={handleChange("paternal_surname")}
                       labelWidth={123}
					   required
					   error={errors.paternal_surname ? true : false}
                    />

					<FormHelperText 
					   id="paternal_surname"
					   error
					>
						{errors.paternal_surname ? errors.paternal_surname : " "}
					</FormHelperText>

                </FormControl>

            </Grid>

			<Grid item xs={10} md={7}>
            
                <FormControl fullWidth className={classes.margin} variant="outlined">

                    <InputLabel htmlFor="rut">RUT</InputLabel>

                    <OutlinedInput
                       id="rut"
                       value={Dr.rut}
                       onChange={handleChange("rut")}
                       labelWidth={30}
					   required
					   error={errors.rut ? true : false}
                    />

					<FormHelperText 
					   id="rut"
					   error
					>
						{errors.rut ? errors.rut : " "}
					</FormHelperText>

                </FormControl>

            </Grid>

			<Grid item xs={10} md={7}>

			 	<TextField
				  className={classes.margin}
				  id="especialidad"
                  select
                  label="Especialidad"
                  value={Dr.especialidad}
                  onChange={handleChange("especialidad")}
                    SelectProps={{
                       native: true,
                    }}
				  error={errors.especialidad ? true : false}
                  variant="outlined"
                  fullWidth
                >
					{Especialidades.map((Especialidad) => (
						<option key={Especialidad._id} value={Especialidad.nombre}>
                           {Especialidad.nombre}
                        </option>
                    ))}

                </TextField>

				<FormHelperText 
					id="especialidad"
					error
				>
					{errors.especialidad ? errors.especialidad : " "}
				</FormHelperText>

            </Grid>

			<Grid item container direction="row" justify="space-between" alignItems="center"  className={classes.root} xs={12}>
            
                <Grid item container direction="row" justify="center" alignItems="center" xs={6} >

                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<AddIcon />}
                      onClick={handleSumit}
                    >
                        Agregar

                    </Button>

                </Grid>

                <Grid item container direction="row" justify="center" alignItems="center" xs={6} >

                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<ClearIcon />}
                      onClick={handleReset}
                    >
                        Reset

                    </Button>

                </Grid>

            </Grid>

            <Grid onClick={handleCloseAlert}>

                <CustomizedSnackbars success={alerts.success} error ={alerts.error}/>
            
            </Grid>

        </Grid>

    );

}
