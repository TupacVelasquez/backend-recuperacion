import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './servicio.entity';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { Taller } from '../taller/taller.entity';
import { Vehiculo } from '../vehiculo/vehiculo.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Servicio, Taller, Vehiculo])],
    providers: [ServicioService],
    controllers: [ServicioController],
    exports: [ServicioService],
})
export class ServicioModule {}