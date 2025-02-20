from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import RedirectView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Configuración de Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="API de Experiencias",
        default_version='v1',
        description="API para gestionar experiencias culturales, de relajación, aventura, etc.",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,), 
)

urlpatterns = [
<<<<<<< Updated upstream
    #
    path('', RedirectView.as_view(url='/api/users/', permanent=False)),
    
    # Rutas existentes
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    
    # Rutas de autenticación JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Rutas de Swagger
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
=======
   path('admin/', admin.site.urls),
   path('api/', include('users.urls')),
   path('api-auth/', include('rest_framework.urls')),  # Añadido para autenticación DRF
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
   path('accounts/login/', LoginView.as_view(), name='login'),
   path('accounts/logout/', LogoutView.as_view(), name='logout'),  # Añadido para logout
>>>>>>> Stashed changes
]