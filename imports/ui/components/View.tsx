import React, { FC } from 'react';
import { Doctor, Validate } from "../statics/Validate";
import { TextField, Grid, IconButton } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { DoctorCollection } from '../../api/Doctors';
import EspecialidadesMedicas from "../statics/EspecialidadesMedicas.json";
import CustomizedSnackbars from "./Alerts";

interface StateAlerts {
    success?: boolean,
    error?: boolean,
};

let Especialidades: any[] = EspecialidadesMedicas;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
           marginTop: theme.spacing(2),
           border: "#e0e0e0 solid 2px",
           borderRadius: "0.5rem"
        },
    }),
);

const View: FC<Doctor> = ({_id, name, maternal_surname, paternal_surname, rut, especialidad }) => {

    const classes = useStyles();

    const [thisDoctor, setThisDoctor] = React.useState<Doctor>({_id, name, maternal_surname, paternal_surname, rut, especialidad});
    
    const [errors, setErrors] = React.useState<Doctor>({name: null, maternal_surname: null, paternal_surname: null, rut: null,especialidad: null});
    
    const [editing, setEditing] = React.useState<boolean>(true);

    const [alerts, setAlerts] = React.useState<StateAlerts>({success: false, error: false});

    const handleDelete = () : void => {
        DoctorCollection.remove({_id});
        setAlerts({success: true, error: false});
	};

    const handleEdit = () : void => {
        
        if(editing){ 
            setEditing(false);
        }
        if(!editing){

            if(
                !errors._id && !errors.especialidad && !errors.maternal_surname && 
                !errors.paternal_surname && !errors.name && !errors.rut
            ){
               
                DoctorCollection.update({_id}, {
                    $set: {
                        name: thisDoctor.name,
                        maternal_surname: thisDoctor.maternal_surname,
                        paternal_surname: thisDoctor.paternal_surname,
                        especialidad: thisDoctor.especialidad,
                        rut: thisDoctor.rut,
                    }
                });

                setEditing(true);
                setAlerts({success: true, error: false});

            }else setAlerts({success: false, error: true});

        }

	};

    const handleCloseAlert = () : void => {
        setAlerts({success: false, error: false});
	};

    const handleChange = ( prop : string) => (e : any) : void => {

        setErrors(Validate({
           ...thisDoctor,
           [prop]: e.target.value
        })); 
       
        setThisDoctor({
            ...thisDoctor,
            [prop]: e.target.value
       }); 	
   };

	return (

        <Grid className={classes.root} container direction="row" justify="space-evenly" alignItems="center" xs={8}>
            
            <Grid item xs={1}>

                <TextField
                    id={thisDoctor._id}
                    label="Doctor"
                    value={thisDoctor.name}
                    margin="normal"
                    fullWidth
                    disabled={editing}
                    error={errors.name ? true : false}
                    helperText={errors.name}
                    onChange={handleChange("name")}
                />

            </Grid>

            <Grid item xs={1}>

                <TextField
                    id={thisDoctor._id}
                    label=" "
                    value={thisDoctor.maternal_surname}
                    margin="normal"
                    fullWidth
                    disabled={editing}
                    error={errors.maternal_surname ? true : false}
                    helperText={errors.maternal_surname}
                    onChange={handleChange("maternal_surname")}
                />

            </Grid>

            <Grid item xs={1}>

                <TextField
                    id={thisDoctor._id} 
                    label=" "
                    value={thisDoctor.paternal_surname}
                    margin="normal"
                    fullWidth
                    disabled={editing}
                    error={errors.paternal_surname ? true : false}
                    helperText={errors.paternal_surname}
                    onChange={handleChange("paternal_surname")}
                />

            </Grid>

            <Grid item xs={4}>

                <TextField
				    id="especialidad"
                    select
                    margin="normal"
                    label="Especialidad"
                    disabled={editing}
                    fullWidth
                    value={thisDoctor.especialidad}
                    onChange={handleChange("especialidad")}
                    SelectProps={{
                       native: true,
                    }}
				    error={errors.especialidad ? true : false}
                    helperText={errors.especialidad}
                >
					{Especialidades.map((Especialidad) => (
						<option key={Especialidad._id} value={Especialidad.nombre}>
                           {Especialidad.nombre}
                        </option>
                    ))}

                </TextField>

            </Grid>

            <Grid item xs={2}>

                <TextField
                    id={thisDoctor._id}
                    label="RUT"
                    value={thisDoctor.rut}
                    margin="normal"
                    disabled={editing}
                    fullWidth
                    onChange={handleChange("rut")}
                    error={errors.rut ? true : false}
                    helperText={errors.rut}
                />

            </Grid>

            <Grid item container direction="row" justify="space-around" alignItems="center" xs={1}>

                <Grid item>

                    <IconButton 
                       color={editing ? "secondary" : "primary" }
                       aria-label="Editar Doctor"
                       onClick={handleEdit}
                    >
                        {editing ? <BorderColorIcon/> : <SaveIcon/>}

                    </IconButton>
                    
                </Grid>

                <Grid item>

                    <IconButton 
                       color="secondary" 
                       aria-label="Borrar Doctor"
                       onClick={handleDelete}
                    >
                        <DeleteIcon />

                    </IconButton>

                </Grid>

            </Grid >

            <Grid onClick={handleCloseAlert}>

                <CustomizedSnackbars success={alerts.success} error ={alerts.error}/>
            
            </Grid>

        </Grid>

    );

};

export default View;