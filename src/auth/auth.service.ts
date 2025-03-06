import { Usuario } from '../usuario/usuario.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async register(nombreCompleto: string, email: string, telefono: string, password: string) {
        // Verificar si ya existe un usuario con el mismo correo o teléfono
        const existingUser = await this.usuarioRepository.findOne({ where: [{ email }, { telefono }] });
        if (existingUser) {
            throw new Error('Correo o teléfono ya están en uso');
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario con la contraseña cifrada
        const usuario = this.usuarioRepository.create({
            nombreCompleto,
            email,
            telefono,
            password: hashedPassword,  // Guardamos la contraseña cifrada
            fechaCreacion: new Date(),
            ultimaConexion: new Date(),
        });

        // Guardamos el usuario en la base de datos
        await this.usuarioRepository.save(usuario);

        return { message: 'Usuario registrado con éxito' };
    }

    // Función de login
    async login(email: string, password: string) {
        // Verificar si existe un usuario con el email proporcionado
        const usuario = await this.usuarioRepository.findOne({ where: { email } });
        if (!usuario) {
            throw new Error('Correo o contraseña incorrectos');
        }

        // Validar si la contraseña ingresada coincide con la almacenada
        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            throw new Error('Correo o contraseña incorrectos');
        }

        // Si la contraseña es correcta, devolvemos un mensaje de éxito
        return { message: 'Inicio de sesión exitoso' };
    }

    // Función para obtener el perfil del usuario autenticado
    async getProfile(idUsuario: number) {
        // Buscamos el usuario por su ID
        const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: idUsuario } });

        // Si no se encontró el usuario, lanzamos un error
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Devolvemos los datos del usuario
        return usuario;
    }
}
