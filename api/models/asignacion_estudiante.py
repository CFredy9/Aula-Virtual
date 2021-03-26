from django.db import models


class Asignacion_Estudiante(models.Model):

    
    estudiante = models.ForeignKey('Estudiante', 
                                    on_delete=models.CASCADE, 
                                    related_name="estudiante",
                                    null=True, blank=True)
    curso_asignado = models.ForeignKey('Asignacion_Curso', 
                                    on_delete=models.CASCADE, 
                                    related_name="curso_asignado_estudiante")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True