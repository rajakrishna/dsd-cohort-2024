Requirements

- java JDK 17
    - https://www.oracle.com/java/technologies/downloads/#jdk17-windows
- Update Path JAVA_HOME to location you installed above package
- build project using graddle wrapper and run
    - `cd server/`
    - `./gradlew build`
    - `./gradlew run`

# Port mapping

port mapping can be changed in the ``src/main/resources/application.properties`` file

- change ``server.port=8000`` to desired port number