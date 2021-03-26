from django.db import models


class Estudiante(models.Model):

    
    profile = models.OneToOneField('Profile', 
                                on_delete=models.CASCADE,
                                related_name="persona_estudiante")
    grado = models.ForeignKey('Grado', 
                                on_delete=models.CASCADE,
                                related_name="grado_estudiante",
                                null=True, blank=True)
    nombre_contacto = models.CharField(max_length=100, null=True, blank=True)
    telefono_contacto = models.CharField(max_length=15, null=True, blank=True)
    #inicio_sesion = models.BooleanField(default=False) 

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True