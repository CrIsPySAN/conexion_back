from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'experiencias', views.ExperienciaViewSet)
router.register(r'actividades', views.ActividadViewSet)
router.register(r'destinos', views.DestinoViewSet)
router.register(r'transportes', views.TransporteViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('chat/', views.ChatAPIView.as_view(), name='chat'),
<<<<<<< Updated upstream
    path('verify-email/', views.UsuarioViewSet.as_view({'post': 'verify_email'}), 
         name='verify-email'),
=======
    path('generar-itinerario/', views.generar_itinerario, name='generar-itinerario'),
    path('verify-email/', views.UsuarioViewSet.as_view({'post': 'verify_email'}), name='verify-email'),
    # JWT Token endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('test-connection/', views.test_connection, name='test-connection'),
    path('test-email/', views.test_email, name='test-email'),
>>>>>>> Stashed changes
]