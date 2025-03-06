import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  findAll(): Promise<Rol[]> {
    return this.rolService.findAll();
  }

  @Get(':idRol')
  findOne(@Param('idRol') idRol: number): Promise<Rol | null> {
    return this.rolService.findOne(idRol);
  }

  @Post()
  create(@Body() rolData: Partial<Rol>): Promise<Rol> {
    return this.rolService.create(rolData);
  }

  //metodo para actualizar
  @Put(':idRol')
  update(@Param('idRol') idRol: number, @Body() rol: Partial<Rol>): Promise<Rol | null>{
      return this.rolService.update(idRol, rol);
  }

  //metodo para eliminar
  @Delete(':idRol')
  delete(@Param('idRol') idRol: number): Promise<void>{
      return this.rolService.delete(idRol);
  }
}