import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Taller } from "./taller.entity";

@Injectable()
export class TallerService {
    
    constructor(
        @InjectRepository(Taller)
        private readonly tallerRepository: Repository<Taller>
    ) {}

    // Metodo para obtener todos los talleres
    async findAll(): Promise<Taller[]> {
        return await this.tallerRepository.find();
    }

    // Metodo para obtener un taller por id
    async findOne(idTaller: number): Promise<Taller> {
        const tempTaller = await this.tallerRepository.findOne({ where: { idTaller } });
        if (!tempTaller) {
            throw new NotFoundException(`Taller con id ${idTaller} no encontrado`);
        }
        return tempTaller;
    }

    // Metodo para crear un taller
    create(taller: Partial<Taller>): Promise<Taller> {
        const newTaller = this.tallerRepository.create(taller);
        return this.tallerRepository.save(newTaller);
    }

    // Metodo para actualizar un taller
    async update(idTaller: number, taller: Partial<Taller>): Promise<Taller | null> {
        await this.tallerRepository.update({ idTaller }, taller);
        return this.findOne(idTaller);
    }

    // Metodo para eliminar un taller
    async delete(id: number): Promise<void> {
        await this.tallerRepository.delete(id);
    }
}