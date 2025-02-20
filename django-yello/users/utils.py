from django.core.mail import send_mail
from django.conf import settings
from django.utils.timezone import now
from datetime import timedelta
<<<<<<< Updated upstream
=======
from .models import Respuesta
from django.utils import timezone
import requests
import secrets
>>>>>>> Stashed changes

def send_verification_email(user):
    """
    Envía un correo de verificación al usuario registrado
    """
    # Generar token de verificación
    token = secrets.token_urlsafe(32)
    user.verification_token = token
    user.token_created_at = timezone.now()
    user.save()

    # Construir el enlace de verificación
    verification_url = f"{settings.FRONTEND_URL}/verify-email?token={token}"

    # Enviar el correo
    subject = 'Verifica tu correo electrónico - KANKUN'
    message = f'''
    Hola {user.nombre},

    Gracias por registrarte en KANKUN. Para completar tu registro, por favor verifica tu correo electrónico haciendo clic en el siguiente enlace:

    {verification_url}

    Este enlace expirará en {settings.TOKEN_EXPIRY_HOURS} horas.

    Si no creaste esta cuenta, puedes ignorar este correo.

    Saludos,
    El equipo de KANKUN
    '''

    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )

def is_token_valid(user):
    """
    Verifica si el token de verificación aún es válido
    """
    if not user.token_created_at:
        return False
    
    expiry_time = user.token_created_at + timedelta(hours=settings.TOKEN_EXPIRY_HOURS)
    return timezone.now() <= expiry_time

