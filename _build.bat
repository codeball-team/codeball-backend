cd src/frontend
CALL MKDIR build
CALL npm install rimraf
CALL npm install
npm rebuild node-sass
CALL npm run clean:build
CALL npm run build
cd ../..
CALL gradlew clean build
PAUSE