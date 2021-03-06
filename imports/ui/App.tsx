import React from 'react';
import BarApp from "./components/BarApp";
import AddDr from "./components/AddDr";
import ViewAll from "./components/ViewAll";

export function App() {

	const [Section, setSection] = React.useState<string>("Home");

	const changeSection = (value: string) : void=> {
        setSection(value);
    };

    return (

		<div>

			<BarApp onclick={changeSection}/>

			{  
			  Section === "addDr" ? <AddDr/> 

			  : Section === "View" ? <ViewAll/> 
			  
			  : <div>
				   <AddDr/>
				   <ViewAll/>
				</div>
			}

		</div>
    )
}