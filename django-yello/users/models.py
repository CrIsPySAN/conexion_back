from datetime import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, nombre, password=None, **extra_fields):
        if not email:
            raise ValueError('El Email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, nombre=nombre, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nombre, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('rol', 'administrador')
        return self.create_user(email, nombre, password, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    ROL_CHOICES = (
        ('cliente', 'Cliente'),
        ('administrador', 'Administrador'),
    )
    
    nombre = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    rol = models.CharField(max_length=13, choices=ROL_CHOICES)
    fecha_registro = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    email_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=100, null=True, blank=True)
    token_created_at = models.DateTimeField(null=True, blank=True)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nombre', 'rol']




def create_verification_token(self):
        import secrets
        self.verification_token = secrets.token_urlsafe(32)
        self.token_created_at = timezone.now()
        self.save()

    

class Experiencia(models.Model):
    nombre = models.CharField(max_length=255, unique=True, default="sin nombre") 

    def __str__(self):
        return self.nombre

class Actividad(models.Model):
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    ubicacion = models.CharField(max_length=255)
    fecha_publicacion = models.DateField(auto_now_add=True)
    administrador = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='actividades')
    experiencias = models.ManyToManyField(Experiencia, related_name='actividades')  # Relación muchos a muchos

    def __str__(self):
        return self.titulo
    
class Destino(models.Model):
    nombre = models.CharField(max_length=255, unique=True)
    descripcion = models.TextField()
    ubicacion = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

class Transporte(models.Model):
    nombre = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.nombre