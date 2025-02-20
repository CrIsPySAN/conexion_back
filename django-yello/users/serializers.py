from rest_framework import serializers
from .models import Usuario, Experiencia, Actividad, Destino, Transporte

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'email', 'password', 'rol', 'fecha_registro']
        extra_kwargs = {
            'password': {'write_only': True},
            'fecha_registro': {'read_only': True}
        }

    def create(self, validated_data):
        return Usuario.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super().update(instance, validated_data)

class ExperienciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiencia
        fields = ['id', 'nombre']

class ActividadSerializer(serializers.ModelSerializer):
    experiencias = ExperienciaSerializer(many=True, read_only=True) 
    experiencias_ids = serializers.PrimaryKeyRelatedField( 
        queryset=Experiencia.objects.all(),
        many=True,
        write_only=True,
        source='experiencias'
    )

    class Meta:
        model = Actividad
        fields = ['id', 'titulo', 'descripcion', 'ubicacion', 'fecha_publicacion', 'administrador', 'experiencias', 'experiencias_ids']
        read_only_fields = ['fecha_publicacion', 'administrador']

    def create(self, validated_data):
        validated_data['administrador'] = self.context['request'].user
        return super().create(validated_data)

class DestinoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destino
        fields = ['id', 'nombre', 'descripcion', 'ubicacion']  

class TransporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transporte
        fields = ['id', 'nombre'] 
        
class ChatMessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)