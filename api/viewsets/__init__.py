from .user import UserViewset
from .profesion import ProfesionViewset
from .curso import CursoViewset
from .ciclo_escolar import Ciclo_EscolarViewset
from .catedratico import CatedraticoViewset
from .estudiante import EstudianteViewset
from .nivel import NivelViewset
from .seccion import SeccionViewset
from .rol import RolViewset
from .grado import GradoViewset
from .asignacion_curso import AsignacionCursoViewset, MisCursos
from .asignacion_estudiante import AsignacionEstudianteViewset, MisCursosEst
from .detalle_curso import DetalleCursoViewset
from .tarea import TareaViewset
from .evento import EventoViewset
from .calificacion_tarea import (CalificacionTareaViewset, Calificadas, 
                                Pendientes, Pendientes_Curso,
                                CalificadasTareas, CalificadasTareas_Curso)
