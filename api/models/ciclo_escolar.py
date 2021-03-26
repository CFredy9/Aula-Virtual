from django.db import models


class Ciclo_Escolar(models.Model):

    nombre_ciclo_escolar = models.CharField(max_length=100)
    titular = models.BooleanField(default=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True