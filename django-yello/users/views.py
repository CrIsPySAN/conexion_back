from django.http import JsonResponse
import requests
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.request import Request
from typing import Any
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Destino, Transporte, Usuario, Experiencia, Actividad
from .serializers import ChatMessageSerializer, DestinoSerializer, TransporteSerializer, UsuarioSerializer, ExperienciaSerializer, ActividadSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
<<<<<<< Updated upstream
from django.utils import timezone
from .utils import send_verification_email, is_token_valid
from rest_framework.decorators import action, api_view, permission_classes
=======
from django.core.mail import send_mail, BadHeaderError, get_connection, EmailMessage
from django.conf import settings
import ssl
import certifi
import socket
import os
import logging
from smtplib import SMTPException
from rest_framework.views import APIView
import requests
from .utils import obtener_respuestas_usuario, generar_itinerario_con_ollama
>>>>>>> Stashed changes

logger = logging.getLogger(__name__)

class UsuarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar usuarios del sistema.
    """
    @swagger_auto_schema(
        operation_summary="Listar usuarios",
        operation_description="Obtiene la lista de todos los usuarios registrados.",
        responses={
            200: openapi.Response(
                description="Lista de usuarios obtenida exitosamente",
                schema=UsuarioSerializer(many=True)
            ),
            401: "No autorizado - Token inválido o expirado",
            403: "Prohibido - No tiene permisos suficientes"
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Crear usuario",
        operation_description="Registra un nuevo usuario en el sistema.",
        request_body=UsuarioSerializer,
        responses={
            201: openapi.Response(
                description="Usuario creado exitosamente",
                schema=UsuarioSerializer
            ),
            400: "Datos inválidos - Verifique los campos requeridos",
            409: "Conflicto - El email ya está registrado"
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create', 'verify_email']:
            return [AllowAny()]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            send_verification_email(user)
            return Response({
                'message': 'Usuario creado. Por favor verifica tu correo electrónico.',
                'user': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def verify_email(self, request):
        token = request.data.get('token')
        if not token:
            return Response({'error': 'Token no proporcionado'}, 
                          status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Usuario.objects.get(verification_token=token)
            if is_token_valid(user):
                user.email_verified = True
                user.verification_token = None
                user.token_created_at = None
                user.save()
                return Response({'message': 'Email verificado correctamente'})
            return Response({'error': 'Token expirado'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        except Usuario.DoesNotExist:
            return Response({'error': 'Token inválido'}, 
                          status=status.HTTP_400_BAD_REQUEST)

class ExperienciaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar experiencias turísticas.
    """
    @swagger_auto_schema(
        operation_summary="Listar experiencias",
        operation_description="Obtiene todas las experiencias turísticas disponibles.",
        responses={
            200: openapi.Response(
                description="Lista de experiencias obtenida exitosamente",
                schema=ExperienciaSerializer(many=True)
            ),
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Crear experiencia",
        operation_description="Crea una nueva experiencia turística.",
        request_body=ExperienciaSerializer,
        responses={
            201: openapi.Response(
                description="Experiencia creada exitosamente",
                schema=ExperienciaSerializer
            ),
            400: "Datos inválidos - Verifique los campos requeridos",
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    queryset = Experiencia.objects.all()
    serializer_class = ExperienciaSerializer
    permission_classes = [IsAuthenticated]

class ActividadViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar actividades turísticas.
    """
    @swagger_auto_schema(
        operation_summary="Listar actividades",
        operation_description="Obtiene todas las actividades turísticas disponibles.",
        responses={
            200: openapi.Response(
                description="Lista de actividades obtenida exitosamente",
                schema=ActividadSerializer(many=True)
            ),
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Crear actividad",
        operation_description="Crea una nueva actividad turística. El usuario autenticado será asignado como administrador.",
        request_body=ActividadSerializer,
        responses={
            201: openapi.Response(
                description="Actividad creada exitosamente",
                schema=ActividadSerializer
            ),
            400: "Datos inválidos - Verifique los campos requeridos",
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(administrador=self.request.user)
        
class DestinoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar destinos turísticos.
    """
    @swagger_auto_schema(
        operation_summary="Listar destinos",
        operation_description="Obtiene todos los destinos turísticos disponibles.",
        responses={
            200: openapi.Response(
                description="Lista de destinos obtenida exitosamente",
                schema=DestinoSerializer(many=True)
            ),
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Crear destino",
        operation_description="Crea un nuevo destino turístico.",
        request_body=DestinoSerializer,
        responses={
            201: openapi.Response(
                description="Destino creado exitosamente",
                schema=DestinoSerializer
            ),
            400: "Datos inválidos - Verifique los campos requeridos",
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    queryset = Destino.objects.all()
    serializer_class = DestinoSerializer
    permission_classes = [IsAuthenticated]

class TransporteViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar medios de transporte.
    """
    @swagger_auto_schema(
        operation_summary="Listar transportes",
        operation_description="Obtiene todos los medios de transporte disponibles.",
        responses={
            200: openapi.Response(
                description="Lista de transportes obtenida exitosamente",
                schema=TransporteSerializer(many=True)
            ),
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

<<<<<<< Updated upstream
# views.py
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    user = authenticate(email=email, password=password)
    
    if user:
        if not user.email_verified:
            return Response({
                'error': 'Por favor verifica tu correo electrónico antes de iniciar sesión'
            }, status=status.HTTP_401_UNAUTHORIZED)
            
        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UsuarioSerializer(user).data
        })
    return Response({'error': 'Credenciales inválidas'}, 
                status=status.HTTP_401_UNAUTHORIZED)

=======
    @swagger_auto_schema(
        operation_summary="Crear transporte",
        operation_description="Crea un nuevo medio de transporte.",
        request_body=TransporteSerializer,
        responses={
            201: openapi.Response(
                description="Transporte creado exitosamente",
                schema=TransporteSerializer
            ),
            400: "Datos inválidos - Verifique los campos requeridos",
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    queryset = Transporte.objects.all()
    serializer_class = TransporteSerializer
    permission_classes = [IsAuthenticated]
>>>>>>> Stashed changes

class ChatAPIView(APIView):
    @swagger_auto_schema(
        operation_summary="Chat con IA",
        operation_description="Envía un mensaje al chatbot y recibe una respuesta basada en los datos disponibles.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['message'],
            properties={
                'message': openapi.Schema(type=openapi.TYPE_STRING, description='Mensaje para el chatbot'),
            }
        ),
        responses={
            200: openapi.Response(
                description="Respuesta exitosa del chatbot",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'response': openapi.Schema(type=openapi.TYPE_STRING, description='Respuesta del chatbot')
                    }
                )
            ),
            400: "Mensaje inválido o vacío",
            500: "Error al procesar la respuesta del chatbot"
        }
    )
    def post(self, request):
        serializer = ChatMessageSerializer(data=request.data)
        if serializer.is_valid():
            user_message = serializer.validated_data['message']

            # Obtener datos de la base de datos
            experiencias = Experiencia.objects.all()
            actividades = Actividad.objects.all()
            destinos = Destino.objects.all()
            transportes = Transporte.objects.all()

            # datos para la respuesta
            datos_db = {
                "experiencias": [exp.nombre for exp in experiencias],
                "actividades": [act.titulo for act in actividades],
                "destinos": [des.nombre for des in destinos],
                "transportes": [trans.nombre for trans in transportes],
            }
            prompt = f"""
            Eres KAI, un asistente virtual que responde preguntas basadas en los datos proporcionados.
            Los datos disponibles son:
            - Experiencias: {datos_db['experiencias']}
            - Actividades: {datos_db['actividades']}
            - Destinos: {datos_db['destinos']}
            - Transportes: {datos_db['transportes']}

            Responde la siguiente pregunta del usuario usando solo los datos proporcionados:
            Usuario: {user_message}
            KAI:
            """

            ollama_url = "http://localhost:11434/api/generate"
            data = {
                "model": "llama3.2",
                "prompt": prompt,
                "stream": False 
            }

            try:
                response = requests.post(ollama_url, json=data)
                response.raise_for_status()

                # Obtener la respuesta de Ollama según los datos almacenados
                ollama_response = response.json()
                ai_response = ollama_response.get('response', '')

                # Devolver la respuesta
                return Response({"response": ai_response}, status=status.HTTP_200_OK)

            except requests.exceptions.RequestException as e:

                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

<<<<<<< Updated upstream
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
=======
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EncuestaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar encuestas.
    """
    @swagger_auto_schema(
        operation_summary="Listar encuestas",
        operation_description="Obtiene todas las encuestas disponibles.",
        responses={
            200: openapi.Response(
                description="Lista de encuestas obtenida exitosamente",
                schema=EncuestaSerializer(many=True)
            ),
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Crear encuesta",
        operation_description="Crea una nueva encuesta. El usuario autenticado será asignado como creador.",
        request_body=EncuestaSerializer,
        responses={
            201: openapi.Response(
                description="Encuesta creada exitosamente",
                schema=EncuestaSerializer
            ),
            400: "Datos inválidos - Verifique los campos requeridos",
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    queryset = Encuesta.objects.all()
    serializer_class = EncuestaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creador=self.request.user)

class RespuestaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar respuestas de encuestas.
    """
    @swagger_auto_schema(
        operation_summary="Listar respuestas",
        operation_description="Obtiene todas las respuestas a encuestas.",
        responses={
            200: openapi.Response(
                description="Lista de respuestas obtenida exitosamente",
                schema=RespuestaSerializer(many=True)
            ),
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Crear respuesta",
        operation_description="Registra una nueva respuesta a una pregunta de encuesta.",
        request_body=RespuestaSerializer,
        responses={
            201: openapi.Response(
                description="Respuesta registrada exitosamente",
                schema=RespuestaSerializer
            ),
            400: "Datos inválidos - Verifique los campos requeridos",
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    queryset = Respuesta.objects.all()
    serializer_class = RespuestaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

@swagger_auto_schema(
    method='post',
    operation_summary="Generar itinerario",
    operation_description="Genera un itinerario personalizado basado en las respuestas de una encuesta.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['encuesta_id'],
        properties={
            'encuesta_id': openapi.Schema(
                type=openapi.TYPE_INTEGER,
                description='ID de la encuesta completada'
            ),
        }
    ),
    responses={
        200: openapi.Response(
            description="Itinerario generado exitosamente",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'itinerario_id': openapi.Schema(
                        type=openapi.TYPE_INTEGER,
                        description='ID del itinerario generado'
                    ),
                    'contenido': openapi.Schema(
                        type=openapi.TYPE_STRING,
                        description='Contenido detallado del itinerario'
                    ),
                }
            )
        ),
        400: "ID de encuesta inválido",
        401: "No autorizado - Token inválido o expirado",
        404: "Encuesta no encontrada",
        500: "Error al generar el itinerario"
    }
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generar_itinerario(request):
    encuesta_id = request.data.get('encuesta_id')
    try:
        encuesta = Encuesta.objects.get(id=encuesta_id)
    except Encuesta.DoesNotExist:
        return Response({'error': 'Encuesta no encontrada'}, status=404)

    respuestas_usuario = obtener_respuestas_usuario(request.user, encuesta)
    itinerario_texto = generar_itinerario_con_ollama(respuestas_usuario)

    itinerario = Itinerario.objects.create(
        usuario=request.user,
        encuesta=encuesta,
        contenido=itinerario_texto
    )

    return Response({
        'itinerario_id': itinerario.id,
        'contenido': itinerario_texto
    })

class ResenaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar reseñas de actividades.
    """
    @swagger_auto_schema(
        operation_summary="Listar reseñas",
        operation_description="Obtiene todas las reseñas de actividades.",
        responses={
            200: openapi.Response(
                description="Lista de reseñas obtenida exitosamente",
                schema=ResenaSerializer(many=True)
            ),
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Crear reseña",
        operation_description="Crea una nueva reseña para una actividad. El usuario autenticado será asignado como autor.",
        request_body=ResenaSerializer,
        responses={
            201: openapi.Response(
                description="Reseña creada exitosamente",
                schema=ResenaSerializer
            ),
            400: "Datos inválidos - Verifique los campos requeridos",
            401: "No autorizado - Token inválido o expirado"
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    queryset = Resena.objects.all()
    serializer_class = ResenaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class CustomTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        operation_summary="Iniciar sesión",
        operation_description="Permite a los usuarios iniciar sesión en el sistema.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='Email del usuario'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='Contraseña del usuario'),
            }
        ),
        responses={
            200: openapi.Response(
                description="Login exitoso",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'token': openapi.Schema(type=openapi.TYPE_STRING, description='Token de acceso JWT'),
                        'refresh': openapi.Schema(type=openapi.TYPE_STRING, description='Token de actualización JWT'),
                        'user': openapi.Schema(type=openapi.TYPE_OBJECT, description='Datos del usuario')
                    }
                )
            ),
            401: "Credenciales inválidas o email no verificado",
            400: "Datos inválidos"
        }
    )
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(request, email=email, password=password)
        
        if user:
            if not user.email_verified:
                return Response({
                    'error': 'Por favor verifica tu correo electrónico antes de iniciar sesión'
                }, status=status.HTTP_401_UNAUTHORIZED)
                
            response = super().post(request, *args, **kwargs)
            if response.status_code == status.HTTP_200_OK:
                return Response({
                    'token': response.data['access'],
                    'refresh': response.data['refresh'],
                    'user': UsuarioSerializer(user).data,
                    'message': 'Login exitoso'
                })
            return response
        return Response({
            'error': 'Credenciales inválidas'
        }, status=status.HTTP_401_UNAUTHORIZED)

@swagger_auto_schema(
    method='get',
    operation_summary="Probar conexión",
    operation_description="Endpoint para probar la conexión con el backend.",
    responses={
        200: openapi.Response(
            description="Conexión exitosa",
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(
                        type=openapi.TYPE_STRING,
                        description='Mensaje de confirmación'
                    ),
                    'status': openapi.Schema(
                        type=openapi.TYPE_STRING,
                        description='Estado de la conexión'
                    ),
                }
            )
        ),
    }
)
@api_view(['GET'])
@permission_classes([AllowAny])
def test_connection(request: Request) -> Response:
    return Response({
        "message": "Conexión exitosa con el backend!",
        "status": "ok"
    })
    
@api_view(['POST'])
@permission_classes([AllowAny])
def test_email(request):
    try:
        email = request.data.get('email')
        if not email:
            return Response({
                'error': 'El correo es requerido'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Enviar correo
            send_mail(
                subject='Prueba de correo - KANKUN',
                message='''
                Hola,

                Este es un correo de prueba del sistema KANKUN.
                Si recibes este mensaje, la configuración de correo está funcionando correctamente.

                Saludos,
                Sistema KANKUN
                ''',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )

            return Response({
                'message': 'Correo enviado exitosamente',
                'to': email,
                'from': settings.EMAIL_HOST_USER,
            })

        except Exception as e:
            import traceback
            return Response({
                'error': str(e),
                'traceback': traceback.format_exc()
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
>>>>>>> Stashed changes
