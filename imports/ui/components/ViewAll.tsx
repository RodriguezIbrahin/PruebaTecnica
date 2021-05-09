import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { DoctorCollection } from '../../api/Doctors';
import View from "./View";
import { Grid, Avatar, Typography } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme: Theme) => createStyles ({

    root: {
		marginTop: "5vh",
        marginBottom: "3vh",
        display: 'flex',
        flexWrap: 'wrap',
    },
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},

}));

const ViewAll = () => {

    const classes = useStyles();
	
	const Alldoctor = useTracker(() => {
        return DoctorCollection.find().fetch();
    });

    return (

		<Grid className={classes.root} container direction="row" justify="center" alignItems="center">

            <Grid item container direction="column" justify="center" alignItems="center">

				<Avatar className={classes.avatar}>

                    <GroupIcon fontSize="large"/>

                </Avatar>

                <Typography component="h1" variant="h5">

                    Todos los Medicos
                
                </Typography>

			</Grid>

            {Alldoctor.map(doctor => 
                <View
                   _id={doctor._id} 
                   name={doctor.name} 
                   maternal_surname={doctor.maternal_surname} 
                   paternal_surname={doctor.paternal_surname} 
                   rut={doctor.rut}
                   especialidad={doctor.especialidad}
               />
            )}

        </Grid>
    );
};

export default ViewAll;