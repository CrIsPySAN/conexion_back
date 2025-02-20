import requests

def generar_itinerario(prompt):
    url = "http://localhost:11434/"
    headers = {"Content-Type": "application/json"}
    data = {
        "model": "llama3.2",
        "prompt": prompt
    }
    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        return response.json().get("response", "Error al generar el itinerario.")
    except requests.RequestException as e:
        return f"Error al conectarse con Ollama: {e}"
