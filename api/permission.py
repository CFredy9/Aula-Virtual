from rest_framework.permissions import BasePermission

class IsCatedratico(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.user.profile.rol_id == 1:
                return True
            else:
                return False
        else:
            return False

class IsEstudiante(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.user.profile.rol_id == 2:
                return True
            else:
                return False
        else:
            return False

class IsStaff(BasePermission):
    def has_permission(self, request, view):
        if request.user:
            if request.user.is_staff == 1:
                return True
            else:
                return False
        else:
            return False