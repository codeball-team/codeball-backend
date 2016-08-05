set -xe
cd ..
cd src/frontend
mkdir -p build
npm install rimraf
npm install
npm rebuild node-sass
npm run clean:build
npm run build
cd ../..
./gradlew clean build
