import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Servicio } from "./servicio.entity";
import { Taller } from "../taller/taller.entity";
import { Vehiculo } from "../vehiculo/vehiculo.entity";

@Injectable()
export class ServicioService {
    
    constructor(
        @InjectRepository(Servicio)
        private readonly servicioRepository: Repository<Servicio>,
        
        @InjectRepository(Taller)
        private readonly tallerRepository: Repository<Taller>,
        
        @InjectRepository(Vehiculo)
        private readonly vehiculoRepository: Repository<Vehiculo>
    ) {}

    // Obtener todos los servicios con relaciones
    async findAll(): Promise<Servicio[]> {
        return this.servicioRepository.find({ relations: ['talleres', 'vehiculos'] });
    }

    // Obtener un servicio por ID con relaciones
    async findOne(idServicio: number): Promise<Servicio> {
        const servicio = await this.servicioRepository.findOne({ 
            where: { idServicio }, 
            relations: ['talleres', 'vehiculos'] 
        });

        if (!servicio) {
            throw new NotFoundException(`Servicio con id ${idServicio} no encontrado`);
        }
        return servicio;
    }

    // Crear un servicio con Taller y Vehiculo
    async create(servicioData: Partial<Servicio>, idTaller: number, idVehiculo: number): Promise<Servicio> {
        // Buscar el taller y el vehículo en paralelo para mejorar rendimiento
        const [taller, vehiculo] = await Promise.all([
            this.tallerRepository.findOne({ where: { idTaller } }),
            this.vehiculoRepository.findOne({ where: { idVehiculo } })
        ]);

        if (!taller) throw new NotFoundException(`Taller con id ${idTaller} no encontrado`);
        if (!vehiculo) throw new NotFoundException(`Vehiculo con id ${idVehiculo} no encontrado`);

        // Verificar si ya existe un servicio para este Taller y Vehiculo (opcional)
        const existingService = await this.servicioRepository.findOne({
            where: { talleres: taller, vehiculos: vehiculo }
        });

        if (existingService) {
            throw new ConflictException(`Ya existe un servicio para este taller y vehículo.`);
        }

        // Crear el nuevo servicio con relaciones
        const newServicio = this.servicioRepository.create({
            ...servicioData,
            talleres: taller,   // Relación corregida
            vehiculos: vehiculo // Relación corregida
        });

        return this.servicioRepository.save(newServicio);
    }

    // Actualizar un servicio
    async update(idServicio: number, servicioData: Partial<Servicio>): Promise<Servicio> {
        await this.servicioRepository.update(idServicio, servicioData);
        return this.findOne(idServicio);
    }

    // Eliminar un servicio
    async delete(idServicio: number): Promise<void> {
        const servicio = await this.findOne(idServicio);
        await this.servicioRepository.remove(servicio);
    }
}
