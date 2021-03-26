from django.db import models


class Detalle_Curso(models.Model):

    
    curso_asignado = models.OneToOneField('Asignacion_Curso', 
                                    on_delete=models.CASCADE, 
                                    related_name="curso_asignado_detalle")
    portada = models.ImageField(upload_to='Portadas_Curso', null=True, blank=True)
    descripcion = models.CharField(max_length=500, null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True