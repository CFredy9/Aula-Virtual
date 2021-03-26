from django.db import models


class Tarea(models.Model):

    
    detalle_curso = models.ForeignKey('Detalle_Curso', 
                                    on_delete=models.CASCADE,
                                    related_name="detalle_curso_tarea")
    titulo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    valor_tarea = models.IntegerField()
    archivo = models.FileField(upload_to='archivos_tarea', null=True, blank=True)
    fecha = models.DateTimeField(blank=True, null=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True