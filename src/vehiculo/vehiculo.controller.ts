import { Controller, Delete, Get, Param, Post, Put, Body, ParseIntPipe } from "@nestjs/common";
import { VehiculoService } from "./vehiculo.service";
import { Vehiculo } from "./vehiculo.entity";

@Controller('vehiculos')
export class VehiculoController {
    constructor(private readonly vehiculoService: VehiculoService) {}

    // Método para obtener todos los vehículos
    @Get()
    async findAll(): Promise<Vehiculo[]> {
        return await this.vehiculoService.findAll();
    }

    // Método para obtener un vehículo por ID
    @Get(':id')
    findBy(@Param('id') id: number): Promise<Vehiculo | null> {
        return this.vehiculoService.findOne(id);
    }

    // Método para crear un nuevo vehículo
    @Post()
    create(@Body() vehiculo: Partial<Vehiculo>): Promise<Vehiculo> {
        return this.vehiculoService.create(vehiculo);
    }

    // Método para actualizar un vehículo
    @Put(':id')
    update(@Param('id') id: number, @Body() vehiculo: Partial<Vehiculo>): Promise<Vehiculo | null> {
        return this.vehiculoService.update(id, vehiculo);
    }

    // Método para eliminar un vehículo
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.vehiculoService.delete(id);
    }
}