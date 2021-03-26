from django.db import models


class Calificacion_Tarea(models.Model):

    
    estudiante = models.ForeignKey('Estudiante', 
                                on_delete=models.CASCADE, 
                                related_name="estudiante_asignado")
    tarea = models.ForeignKey('Tarea', 
                                on_delete=models.CASCADE, 
                                related_name="tarea")
    descripcion = models.CharField(max_length=2000, null=True, blank=True)
    documento = models.FileField(upload_to='documentos_tarea', null=True, blank=True)
    nota = models.IntegerField()

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True