import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehiculo } from "./vehiculo.entity";

@Injectable()
export class VehiculoService {
    
    constructor(
        @InjectRepository(Vehiculo)
        private readonly vehiculoRepository: Repository<Vehiculo>
    ) {}

    // Metodo para obtener todos los vehiculos
    async findAll(): Promise<Vehiculo[]> {
        return await this.vehiculoRepository.find();
    }

    // Metodo para obtener un vehiculo por id
    async findOne(idVehiculo: number): Promise<Vehiculo> {
        const tempVehiculo = await this.vehiculoRepository.findOne({ where: { idVehiculo } });
        if (!tempVehiculo) {
            throw new NotFoundException(`Vehiculo con id ${idVehiculo} no encontrado`);
        }
        return tempVehiculo;
    }

    // Metodo para crear un vehiculo
    create(vehiculo: Partial<Vehiculo>): Promise<Vehiculo> {
        const newVehiculo = this.vehiculoRepository.create(vehiculo);
        return this.vehiculoRepository.save(newVehiculo);
    }

    // Metodo para actualizar un vehiculo
    async update(idVehiculo: number, vehiculo: Partial<Vehiculo>): Promise<Vehiculo | null> {
        await this.vehiculoRepository.update({ idVehiculo }, vehiculo);
        return this.findOne(idVehiculo);
    }

    // Metodo para eliminar un vehiculo
    async delete(id: number): Promise<void> {
        await this.vehiculoRepository.delete(id);
    }
}