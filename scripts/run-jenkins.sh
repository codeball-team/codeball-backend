/bin/sh
USER_HOME="$(echo -n $(bash -c "cd ~${USER} && pwd"))"
nohup java -jar $USER_HOME/Codeball.jar > $USER_HOME/logs/codeball.log &