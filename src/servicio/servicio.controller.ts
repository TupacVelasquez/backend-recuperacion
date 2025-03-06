import { Controller, Delete, Get, Param, Post, Put, Body, ParseIntPipe, BadRequestException } from "@nestjs/common";
import { ServicioService } from "./servicio.service";
import { Servicio } from "./servicio.entity";

@Controller('servicios')
export class ServicioController {
    constructor(
        private readonly servicioService: ServicioService
    ) {}

    // Obtener todos los servicios
    @Get()
    async findAll(): Promise<Servicio[]> {
        return this.servicioService.findAll();
    }

    // Obtener un servicio por ID
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Servicio> {
        return this.servicioService.findOne(id);
    }

    // Crear un nuevo servicio
    @Post()
    async create(
        @Body() servicioData: Partial<Servicio>
    ): Promise<Servicio> {
        const { talleres, vehiculos } = servicioData;

        // Validar que los campos idTaller e idVehiculo están presentes
        if (!talleres || !vehiculos) {
            throw new BadRequestException('Los campos idTaller e idVehiculo son obligatorios');
        }

        return this.servicioService.create(servicioData, talleres.idTaller, vehiculos.idVehiculo);
    }


    // Actualizar un servicio
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() servicioData: Partial<Servicio>
    ): Promise<Servicio> {
        return this.servicioService.update(id, servicioData);
    }

    // Eliminar un servicio
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.servicioService.delete(id);
    }
}
