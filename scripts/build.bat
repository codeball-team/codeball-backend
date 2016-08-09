cd ..
cd src/frontend
CALL MKDIR build
CALL npm install rimraf
CALL npm install
CALL npm rebuild node-sass
CALL npm run clean:build
CALL npm run build:windows
cd ../..
CALL gradlew clean build
PAUSE