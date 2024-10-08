
import { Body, Controller, Delete, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { Pelicula } from 'src/models/pelicula';
import { PeliculasService } from './peliculas.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Controller('peliculas')
export class PeliculasController {
    constructor(
        private readonly peliculasService: PeliculasService,
        private readonly usuarioService: UsuariosService,
      ) {}
    
      //3.1.1 Crear una nueva película
      @Post()
      crearPelicula(@Body() pelicula: Pelicula) {
        return this.peliculasService.crearPelicula(pelicula);
      }
    
      //3.1.2 Obtener una película según su id
      @Get(':id')
      obtenerPelicula(@Param('id') id: number, @Res() res: Response) {
        const pelicula = this.peliculasService.obtenerPelicula(id);
        if (pelicula) {
          res.status(200).send(pelicula);
        } else {
          res.status(404).send('pelicula no existe');
        }
      }
    
      //3.1.3 Obtener todas las película
      @Get()
      obtenerTodas(@Query('genero') genero: string) {
        return this.peliculasService.obtenerTodas(genero);
      }
    
      //3.1.4 Eliminar una película según su id
      @Delete(':id')
      eliminarPelicula(@Param('id') id: number, @Res() res: Response) {
        const eliminar = this.peliculasService.eliminarPelicula(id);
        if (eliminar) {
          res.status(200).send('pelicula eliminada');
        } else {
          res.status(404).send('pelicula no existe');
        }
      }
    
      @Get('usuarios/:idUsuario')
      sugerirPeliculas(@Param('idUsuario') idUsuario: number,@Res() res: Response,) {
        const usuario = this.usuarioService.obtenerUsuario(idUsuario);
        if (usuario) {
          res.status(200).send(this.peliculasService.sugerirPeliculas(usuario));
        } else {
          res.status(404).send('usuario no existe');
        }
      }


}
