# Bike Shop

Dynamically loading web page using Javascript language, Fetch API and ES6 features such as promises, async/await & classes.

## UI screen

![App UI](https://raw.githubusercontent.com/MindaugasJasiunas/async-js/main/app-ui.png)

## Run project

To run our project we need to use [live-server](https://www.npmjs.com/package/live-server). In unix command line:

```bash
live-server
```

## Backend (JSON data)

Web server and JSON responses is mocked using standalone [WireMock](https://wiremock.org/).

### Mocking web server responses using Wiremock

To run mocked web server:
Download [standalone WireMock JAR file](https://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-jre8-standalone/), copy it to project folder and start. In unix command line:

```bash
java -jar wiremock-jre8-standalone.jar
```

To test if WireMock is properly running - use Postman or curl in unix:

```bash
curl http://localhost:8080/shopinfo
```

## Frontend

Web page view was created by modifying free Bootstrap template ["Shop Homepage"](https://startbootstrap.com/template/shop-homepage).

## Other

Royalty free images by [Unsplash](https://unsplash.com).
