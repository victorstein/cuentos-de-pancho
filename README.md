# Cuentos de Pancho Madrigal

Habilidad de Alexa para escuchar cuentos de Pancho Madrigal.

## Documentation

Esta habilidad de Alexa esta hecha con [Voxa]('https://github.com/VoxaAI/voxa') para controlar los estados y express para correr el servidor que responde a Alexa.

Tecnologias usadas:
- Typescript
- Google Youtube API V3
- Axios
- PM2
- Express
- Entre otros...

## Desarrollo

* Clona el repositorio
	```git clone https://github.com/victorstein/covid-backend.git```

* Accede al folder donde clonaste el repositorio
	```cd covid-backend```

* Instala dependencias
	```npm install```

* Create a .env file with the following set up. (examples in parentheses)

| KEY | DESCRIPTION | REQUIRED | DEFAULT
| ------ | ------ | ------ | --------- |
PORT| Puerto en el que corre la aplicacion | FALSE | 3002
NODE_ENV| Ambiente de entorno | FALSE | development
ALLOWED_ORIGINS | Origines permitidos para usar el API, separados por coma. | FALSE | *
CHANNEL_ID | Id del canal de youtube para obtener los adios | TRUE | 
GOOGLE_API_KEY | Llave secreta para usar el API de Youtube | TRUE |

* Finally, just run ```npm run dev``` for development, ```npm run build``` for webpack, or ```npm start``` (once built) to run from the dist folder

## Contributing

Feel free to submit your PRs for review. There's currently no template for contribution. As the project grows we will look into further implementation of this.

## Autor

<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://victorstein.github.io"><img src="https://avatars3.githubusercontent.com/u/11080740?v=3" width="100px;" /><br /><sub><b>Alfonso Gomez</b></sub></a><br /><a href="#question" title="Answering Questions">💬</a> <a href="#" title="Documentation">📖</a><a href="#tool" title="Tools">🔧</a> <a href="#review" title="Reviewed Pull Requests">👀</a> <a href="#maintenance" title="Maintenance">😎</a></td></table>

