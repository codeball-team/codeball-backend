cd ..
cd src/frontend
CALL MKDIR build
CALL npm install rimraf
CALL npm install
CALL npm rebuild node-sass
CALL npm run clean:build
CALL npm run build:windows
CALL npm run build:html
cd ../..
CALL gradlew clean build
PAUSE