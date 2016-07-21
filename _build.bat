cd src/frontend
CALL MKDIR build
CALL npm install
CALL npm run clean:build
CALL npm run build
cd ../..
CALL gradlew clean build
PAUSE