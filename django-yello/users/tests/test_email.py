import requests
import json
import sys
import platform
import ssl
import os

def get_system_info():
    return {
        "python_version": sys.version,
        "platform": platform.platform(),
        "ssl_version": ssl.OPENSSL_VERSION,
        "os_name": os.name,
        "hostname": platform.node()
    }

def test_email_interactive():
    url = 'http://127.0.0.1:8000/api/test-email/'
    
    # Mostrar información del sistema
    system_info = get_system_info()
    print("\n=== Información del Sistema ===")
    for key, value in system_info.items():
        print(f"{key}: {value}")
    
    while True:
        print("\n=== Prueba de Envío de Correos KANKUN ===")
        email = input("Ingresa el correo de destino (o 'salir' para terminar): ")
        
        if email.lower() == 'salir':
            print("¡Hasta luego!")
            break
            
        try:
            print(f'\nEnviando correo a {email}...')
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            
            response = requests.post(
                url,
                json={'email': email},
                headers=headers,
                verify=False
            )
            
            print('\nDetalles de la respuesta:')
            print(f'Status Code: {response.status_code}')
            
            try:
                response_data = response.json()
                print('Response:')
                print(json.dumps(response_data, indent=2))
            except json.JSONDecodeError:
                print(f'Response (text): {response.text}')
            
            if response.status_code == 200:
                print(f'\n✅ Correo enviado exitosamente a {email}!')
            else:
                print(f'\n❌ Error al enviar el correo a {email}')
                
        except requests.exceptions.ConnectionError as e:
            print(f'❌ Error de conexión: {str(e)}')
        except Exception as e:
            print(f'❌ Error inesperado: {str(e)}')
        
        input("\nPresiona Enter para continuar...")

if __name__ == '__main__':
    test_email_interactive()