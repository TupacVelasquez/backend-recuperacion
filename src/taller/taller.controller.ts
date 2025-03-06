import { Controller, Delete, Get, Param, Post, Put, Body, ParseIntPipe } from "@nestjs/common";
import { TallerService } from "./taller.service";
import { Taller } from "./taller.entity";

@Controller('talleres')
export class TallerController {
    constructor(private readonly tallerService: TallerService) {}

    // Método para obtener todos los talleres
    @Get()
    async findAll(): Promise<Taller[]> {
        return await this.tallerService.findAll();
    }

    // Método para obtener un taller por ID
    @Get(':id')
    findBy(@Param('id', ParseIntPipe) id: number): Promise<Taller | null> {
        return this.tallerService.findOne(id);
    }

    // Método para crear un nuevo taller
    @Post()
    create(@Body() taller: Partial<Taller>): Promise<Taller> {
        return this.tallerService.create(taller);
    }

    // Método para actualizar un taller
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() taller: Partial<Taller>): Promise<Taller | null> {
        return this.tallerService.update(id, taller);
    }

    // Método para eliminar un taller
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tallerService.delete(id);
    }
}