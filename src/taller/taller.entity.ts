import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Servicio } from '../servicio/servicio.entity';

@Entity()
export class Taller {
    @PrimaryGeneratedColumn()
    idTaller: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 200 })
    direccion: string;

    @Column({ length: 10 })
    telefono: string;

    @Column({ length: 100 })
    correoContacto?: string;

    @Column({ length: 100 })
    horariosAtencion?: string;

    @Column('simple-array')
    especialidades?: string[];

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;
    
    @UpdateDateColumn({ name: 'ultima_actualizacion' })
    ultimaActualizacion: Date;

    // Relacion con servicios
    @OneToMany(() => Servicio, servicios => servicios.talleres)
    servicios: Servicio[];
}