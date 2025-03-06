import {
Entity,
PrimaryGeneratedColumn,
Column,
CreateDateColumn,
UpdateDateColumn,
OneToMany
} from 'typeorm';

import { Servicio } from '../servicio/servicio.entity';

@Entity('vehiculo')
export class Vehiculo {
@PrimaryGeneratedColumn({ name: 'id_vehiculo' })
idVehiculo: number;

@Column({ name: 'marca' })
marca: string;

@Column({ name: 'modelo' })
modelo: string;

@Column({ name: 'anio' })
anio: number;

@Column({ name: 'numero_placa' })
numeroPlaca: string;

@Column({ name: 'color' })
color: string;

@Column({ name: 'tipo_combustible' })
tipoCombustible: string;

@Column({ name: 'tipo_vehiculo' })
tipoVehiculo: 'automóvil' | 'camión' | 'motocicleta';

@Column({ name: 'odometro' })
odometro: number;

@CreateDateColumn({ name: 'fecha_creacion' })
fechaCreacion: Date;

@UpdateDateColumn({ name: 'ultima_actualizacion' })
ultimaActualizacion: Date;

// Relacion con servicios
@OneToMany(() => Servicio, servicios => servicios.vehiculos)
servicios: Servicio[];
}