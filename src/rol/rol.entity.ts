import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn({ name: 'id_rol' })
  idRol: number;

  @Column({ name: 'nombre', length: 100 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  // Relación con la tabla intermedia usuario_rol
  @ManyToMany(() => Usuario, (usuarios) => usuarios.roles)
  @JoinTable({name: 'usuario_rol'})
  usuarios: Usuario[];

  
}