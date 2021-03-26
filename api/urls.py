from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets


router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'profesion', viewsets.ProfesionViewset)
router.register(r'curso', viewsets.CursoViewset)
router.register(r'ciclo_escolar', viewsets.Ciclo_EscolarViewset)
router.register(r'catedratico', viewsets.CatedraticoViewset)
router.register(r'estudiante', viewsets.EstudianteViewset)
router.register(r'nivel', viewsets.NivelViewset)
router.register(r'seccion', viewsets.SeccionViewset)
router.register(r'rol', viewsets.RolViewset)
router.register(r'grado', viewsets.GradoViewset)
router.register(r'asignacion_curso', viewsets.AsignacionCursoViewset)
router.register(r'asignacion_estudiante', viewsets.AsignacionEstudianteViewset)
router.register(r'detalle_curso', viewsets.DetalleCursoViewset)
router.register(r'tarea', viewsets.TareaViewset)
router.register(r'evento', viewsets.EventoViewset)
router.register(r'curso_personalizado', viewsets.MisCursos)
router.register(r'curso_est', viewsets.MisCursosEst)
router.register(r'calificacion_tarea', viewsets.CalificacionTareaViewset)
router.register(r'calificadas', viewsets.Calificadas)
router.register(r'pendientes', viewsets.Pendientes)
router.register(r'pendientes_curso', viewsets.Pendientes_Curso)
router.register(r'calificadastareas', viewsets.CalificadasTareas)
router.register(r'calificadastareas_curso', viewsets.CalificadasTareas_Curso)

urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
