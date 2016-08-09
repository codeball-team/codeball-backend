/bin/sh
USER_HOME="$(echo -n $(bash -c "cd ~${USER} && pwd"))"
java -jar $USER_HOME/codeball.jar > $USER_HOME/codeball.log &