import { Controller, Delete, Get, Param, Post, Put, Body, ParseIntPipe } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./usuario.entity";

@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    // Método para obtener todos los usuarios
    @Get()
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioService.findAll();
    }

    // Método para obtener un usuario por ID
    @Get(':id')
    findBy(@Param('id') id: number): Promise<Usuario | null> {
        return this.usuarioService.findOne(id);
    }

    // Método para crear un nuevo usuario
    @Post()
    create(@Body() usuario: Partial<Usuario>): Promise<Usuario> {
        return this.usuarioService.create(usuario);
    }

    // Método para actualizar un usuario
    @Put(':id')
    update(@Param('id') id: number, @Body() usuario: Partial<Usuario>): Promise<Usuario | null> {
        return this.usuarioService.update(id, usuario);
    }

    // Método para eliminar un usuario
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.usuarioService.delete(id);
    }

    // Método para asignar un rol a un usuario
    @Post(':idUsuario/roles/:idRol')
    async asignarRol(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Param('idRol', ParseIntPipe) idRol: number): Promise<Usuario> {
        return await this.usuarioService.asignarRol(idUsuario, idRol);
    }

    // Método para eliminar un rol de un usuario
    @Delete(':idUsuario/roles/:idRol')
    async eliminarRol(@Param('idUsuario', ParseIntPipe) idUsuario: number, @Param('idRol', ParseIntPipe) idRol: number): Promise<Usuario> {
        return await this.usuarioService.removerRol(idUsuario, idRol);
    }
}