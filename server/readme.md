Requirements

1. Download and install java JDK 17
   - https://www.oracle.com/java/technologies/downloads/#jdk17-windows

- test if java installed open terminal
  - `java -version`
  - should be similar to this -![img.png](./readme_images/img.png)
  - if not then you can optionaly update Path JAVA_HOME environment variable to location you installed the java JDK17 package

1. build project using graddle wrapper and run

   - `cd server/`
   - `./gradlew build`
   - `./gradlew bootrun`
   - default port will be 8000
     - example url `http://localhost:8000/api/parts`

1. create credentials file server/credentials.json
   - add firestore credentials info inside

# Java project configuration

### Port mapping

port mapping can be changed in the `src/main/resources/application.properties` file

- change `server.port=8000` to desired port number

# Docker container build commands for LOCAL TEST ONLY

build image

```
  docker build -t REPO_NAME/IMAGE_NAME .

//example
  docker build -t jesusdozarepo/server-java .
```

push image to repo if needed OPTIONAL

```
docker push REPO_NAME/IMAGE_NAME

//example
docker push jesusdozarepo/server-java
```

create container on local machine

```
docker container create --name java-server jesusdozarepo/server-java
```

copy credentials into container

```
 docker container cp ./credentials.json java-server:/etc/secrets
```

start container

```
docker container start -i java-server
```
