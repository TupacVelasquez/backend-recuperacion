import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Taller } from '../taller/taller.entity';
import { Vehiculo } from '../vehiculo/vehiculo.entity';

@Entity()
export class Servicio {
    @PrimaryGeneratedColumn()
    idServicio: number;

    @Column()
    fechaServicio: Date;

    @Column({ length: 500 })
    descripcion?: string;

    @Column('decimal')
    costo: number;

    @Column({ type: 'enum', enum: ['mantenimiento preventivo', 'reparación correctiva', 'revisión técnica'] })
    tipoServicio: string;

    @Column('int')
    kilometraje: number;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;
    
    @UpdateDateColumn({ name: 'ultima_actualizacion' })
    ultimaActualizacion: Date;

    //Relacion con vehiculo
    @ManyToOne(() => Vehiculo, vehiculos => vehiculos.servicios)
    vehiculos: Vehiculo;

    //Relacion con taller 
    @ManyToOne(() => Taller, talleres => talleres.servicios)
    talleres: Taller;
}