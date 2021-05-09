import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles =  makeStyles((theme: Theme) =>  createStyles({
	appbar: {
		marginTop: "-0.2rem",
		marginLeft: "-0.1rem"
	},
	button: {
	  fontSize: "1.2rem",
	  marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		textAlign: "center",
	},
	buttonTitle: {
		fontSize: "2.2rem",
	}
}));

export default function BarApp({ onclick }: { onclick: any }) {

	const classes = useStyles();
	
	return (

		<AppBar className={classes.appbar} position="static">

			<Toolbar>

				<Button className={classes.button} color="inherit" onClick={() => onclick("addDr")}>
					Add Doctor
				</Button>

			    <div className={classes.title}>
				    <Button className={classes.buttonTitle} color="inherit" onClick={() => onclick("Home")}>
					    Home
				    </Button>
			    </div>

			    <Button className={classes.button} color="inherit" onClick={() => onclick("View")}>
					View All
				</Button>

			</Toolbar>
			
	    </AppBar>

    );

}
