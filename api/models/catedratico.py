from django.db import models


class Catedratico(models.Model):

    
    profile = models.OneToOneField('Profile', 
                                on_delete=models.CASCADE,
                                related_name="persona_catedratico")
    profesion = models.ForeignKey('Profesion', 
                                on_delete=models.CASCADE,
                                related_name="profesion")
    #inicio_sesion = models.BooleanField(default=False)                   

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True