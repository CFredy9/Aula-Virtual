from django.db import models


class Evento(models.Model):

    
    detalle_curso = models.ForeignKey('Detalle_Curso', 
                                    on_delete=models.CASCADE, 
                                    related_name="detalle_curso_evento")
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    fecha = models.DateTimeField(blank=True, null=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True