from django.db import models


class Asignacion_Curso(models.Model):

    
    curso = models.ForeignKey('Curso', 
                            on_delete=models.CASCADE, 
                            related_name="curso")
    seccion = models.ForeignKey('Seccion', 
                            on_delete=models.CASCADE, 
                            related_name="seccion")
    grado = models.ForeignKey('Grado', 
                            on_delete=models.CASCADE, 
                            related_name="grado")
    catedratico = models.ForeignKey('Catedratico', 
                            on_delete=models.CASCADE, 
                            related_name="catedratico")
    ciclo_escolar = models.ForeignKey('Ciclo_Escolar', 
                                    on_delete=models.CASCADE,
                                    related_name="ciclo_escolar")

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True