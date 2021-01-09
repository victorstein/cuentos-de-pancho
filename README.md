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

* Crea un archivo .env con la siguiente configuracion.

| KEY | DESCRIPTION | REQUIRED | DEFAULT
| ------ | ------ | ------ | --------- |
PORT| Puerto en el que corre la aplicacion | FALSE | 3002
NODE_ENV| Ambiente de entorno | FALSE | development
ALLOWED_ORIGINS | Origines permitidos para usar el API, separados por coma. | FALSE | *
CHANNEL_ID | Id del canal de youtube para obtener los adios | TRUE | 
GOOGLE_API_KEY | Llave secreta para usar el API de Youtube | TRUE |
SENTRY_DSN | DSN to connecto Sentry | FALSE |
SENTRY_SERVER_NAME | Sentry Server name | FALSE |

* Para empezar el desarrollo puedes usar el comando ```npm run dev```. Para transpilar a JS puedes usar ```npm run build``` o ```npm start``` (una vez transpilado) para inciar el servidor desde la carpeta dist.

## Como contribuir

Pueden enviar sus Pull Request para mejorar cualquier aspecto de la habilidad, me tomare el tiempo para revisarlo, aprobar or requerir cambios. Se agradece cualquier contribucion.

## Autor

<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://victorstein.github.io"><img src="https://avatars3.githubusercontent.com/u/11080740?v=3" width="100px;" /><br /><sub><b>Alfonso Gomez</b></sub></a><br /><a href="#question" title="Answering Questions">💬</a> <a href="#" title="Documentation">📖</a><a href="#tool" title="Tools">🔧</a> <a href="#review" title="Reviewed Pull Requests">👀</a> <a href="#maintenance" title="Maintenance">😎</a></td></table>

# Motivacion

Esta habilidad fue creada en memoria de dos grandes fanaticos de Pancho Madrigal y con la unica motivacion de entretener a la gente tanto como los cuentos de Pancho Madrigal entretenian a mis queridos abuelos.

<div style="width: 100%; display: flex; justify-content: center; margin: 5% 0px;">
  <img style="width: 50%; height: auto;" src="https://lh3.googleusercontent.com/pw/ACtC-3d40TgKZbNKJDf7I0Tu4GPshJO1SNEgIqs_ZEVshGmUjLBwYRQmwhG4g_3YdeG_8N47fd2SwNM6NMlA6AKvWY_pX4RA34vZBDc6HEw6D05koN7I8RxK7Oap_Ai_XosTY-xz99RxpyNtCROTnQWg-Ov9=w1280-h960-no?authuser=0" />
</div>

> Emilio Alfonso Selva Maldonado (13 de Diciembre 1937 - 26 de Mayo 2020)<br>
> Ana del Socorro Melendez Quiroz (13 de Enero 1937 - 17 de Mayo 2007)