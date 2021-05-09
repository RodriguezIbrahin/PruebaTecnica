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
	name: string | null;
	maternal_surname: string | null;
	paternal_surname: string | null;
	rut: string | null;
	especialidad: string | null;
};

export const Validate = (value : Doctor ) : Doctor => {

	let err: Doctor ={
		name: null,
		maternal_surname: null,
		paternal_surname: null,
		rut: null,
		especialidad: null
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