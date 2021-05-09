import { validate } from 'rut.js';
import EspecialidadesMedicas from "./EspecialidadesMedicas.json";

export interface Especialidad {
	nombre: string;
	_id?: string;
	_rev?: string;
	estado?: string;
	clasificacion?: string;
	db?: string;
	prestaciones?: any
};

export const Especialidades: Especialidad[] = EspecialidadesMedicas;

export interface Doctor {
	_id?: string;
	name: string;
	maternal_surname: string;
	paternal_surname: string;
	rut: string;
	especialidad: string;
};

export const Validate = (value : Doctor ) : Doctor => {

	let err: Doctor ={
		name: "",
		maternal_surname: "",
		paternal_surname: "",
		rut: "",
		especialidad: ""
	};

	if (!value.name) {
		err.name = 'Nombre Requerido';
	}
	else if (!/^[a-zA-Z]{3,16}$/.test(value.name)) {
		err.name = 'Nombre Invalido';
	}
	if (!value.maternal_surname) {
		err.maternal_surname = 'Apellido Materno Requerido';
	}
	else if (!/^[a-zA-Z]{3,16}$/.test(value.maternal_surname)) {
		err.maternal_surname = 'Apellido Materno Invalido';
	}
	if (!value.paternal_surname) {
		err.paternal_surname = 'Apellido Paterno Requerido';
	}
	else if (!/^[a-zA-Z]{3,16}$/.test(value.paternal_surname)) {
		err.paternal_surname = 'Apellido Paterno Invalido';
	}
	if (!value.rut) {
		err.rut = 'RUT Requerido';
	}
	else if (!validate(value.rut)) {
		err.rut = 'RUT Invalido';
	}
	if (!value.especialidad) {
		err.especialidad = 'Especialidad Requerido';
	}
	else if (!/\S/.test(value.especialidad)) {
		err.especialidad = 'Especialidad Invalido';
	}

	return err;
};