import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rol } from '../rol/rol.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'nombre_completo' })
  nombreCompleto: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'telefono' })
  telefono: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'ultima_conexion' })
  ultimaConexion: Date;

  // Campo para la contraseña cifrada
  @Column({ name: 'password', nullable: false })
  password: string;

  // Relación con la tabla intermedia usuario_rol
  @ManyToMany(() => Rol, (roles) => roles.usuarios)
  roles: Rol[];
}
