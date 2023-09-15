# Consulta de IP

Esta aplicação web permite que os usuários insiram um endereço IP e obtenham informações sobre esse IP, como cidade, região, país e provedor. Além disso, a aplicação também detecta automaticamente o IP do usuário ao carregar.

## APIs utilizadas

1. **ipapi**: 
   - Utilizada para obter detalhes sobre um endereço IP específico.
   - [Documentação ipapi](https://ipapi.co/documentation/)
   - Endpoint de exemplo: `https://ipapi.co/{IP}/json/`

2. **ipify** (suposição):
   - Utilizada para detectar o IP público do usuário.
   - [Documentação ipify](https://www.ipify.org/)
   - Endpoint de exemplo: `https://api.ipify.org?format=json`

## Tecnologias utilizadas:
- React (framework JavaScript)
- Axios (para requisições HTTP)
- CSS (para estilização)
