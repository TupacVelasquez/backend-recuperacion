import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Rol } from "../rol/rol.entity";

@Injectable()
export class UsuarioService {
    
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>
    ) {}

    // Metodo para obtener todos los usuarios
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({relations: ['roles']});
    }

    // Metodo para obtener un usuario por id
    async findOne(idUsuario: number): Promise<Usuario> {
        const tempUser = await this.usuarioRepository.findOne({ where: { idUsuario }, relations: ['roles'] });
        if (!tempUser) {
            throw new NotFoundException (`Usuario con id ${idUsuario} no encontrado`);
        }
        return tempUser;
    }

    // Metodo para crear un usuario
    create(usuario: Partial<Usuario>): Promise<Usuario> {
        const newUsuario = this.usuarioRepository.create(usuario);
        return this.usuarioRepository.save(newUsuario);
    }

    // Metodo para actualizar un usuario
    async update(idUsuario: number, usuario: Partial<Usuario>): Promise<Usuario | null> {
        await this.usuarioRepository.update({idUsuario}, usuario);
        return this.findOne(idUsuario);
    }

    // Metodo para eliminar un usuario
    async delete(id: number): Promise<void> {
        await this.usuarioRepository.delete(id);
    }

    // Metodo para asignar un rol al usuario
    async asignarRol(idUsuario: number, idRol: number): Promise<Usuario> {
        const usuario = await this.findOne(idUsuario);

        const rol = await this.rolRepository.findOne({where: {idRol:idRol}});
        if(!rol){
            throw new NotFoundException(`Rol con id ${idRol} no encontrado`);
        }

        if(usuario.roles.find((r) => r.idRol === idRol)){
            return usuario;
        }

        usuario.roles.push(rol);
        return await this.usuarioRepository.save(usuario);
    }

    // Metodo para remover un rol al usuario
    async removerRol(idUsuario: number, idRol: number): Promise<Usuario> {
        const usuario = await this.findOne(idUsuario);

        const rol = await this.rolRepository.findOne({where: {idRol:idRol}});
        if(!rol){
            throw new NotFoundException(`Rol con id ${idRol} no encontrado`);
        }

        if (!usuario.roles.find((r) => r.idRol === idRol)) {
            throw new NotFoundException(`El usuario no tiene el rol con id ${idRol}`);
        }        

        usuario.roles = usuario.roles.filter((r) => r.idRol !== idRol);
        return await this.usuarioRepository.save(usuario);
    }
}