# Bike Shop

Dynamically loading web page using Javascript language, Fetch API and ES6 features such as promises, async/await & classes.

## UI screen

![App UI](https://raw.githubusercontent.com/MindaugasJasiunas/async-js/main/app-ui.png)

## Run project

To run the project first you need to start mocked web server with WireMock, second you need to start web page using Live Server.

### Mocking web server responses using Wiremock

Web server and REST API as JSON responses is mocked using standalone [WireMock](https://wiremock.org/).

To run mocked web server -  
download [standalone WireMock JAR file](https://repo1.maven.org/maven2/com/github/tomakehurst/wiremock-jre8-standalone/), copy it to the project's folder and start. In unix command line:

```bash
java -jar wiremock-jre8-standalone.jar
```

To test if WireMock is properly running - use [Postman](https://www.postman.com/) or curl in unix:

```bash
curl http://localhost:8080/shopinfo
```

### Run web page using live-server

To run the project with live-server, we need to download [live-server](https://www.npmjs.com/package/live-server) using NPM or use it as [plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in Visual Studio Code editor.
In projects folder unix command line:

```bash
live-server
```

## Web page

Web page view was created using Grid & Flexbox layouts & pure CSS.

## Images

Royalty free images by [Unsplash](https://unsplash.com).
