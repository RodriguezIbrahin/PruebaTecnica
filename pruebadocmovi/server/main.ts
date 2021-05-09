import { Meteor } from 'meteor/meteor';
import { DoctorCollection } from '../imports/api/Doctors';


Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (DoctorCollection.find().count() === 0) {
    console.log("Serve starte")
  }
});
