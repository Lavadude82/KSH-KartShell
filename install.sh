#!/bin/bash
clear
echo "installing KSH"
sudo cp ./src/commands.js /bin/KSH/commands.js
sudo cp ./src/main.kart.js /bin/KSH/main.kart.js
sudo cp ./src/config.json /bin/KSH/config.json
sudo cp ./src/pacakge.json /bin/KSH/package.json
sudo cp ./src/pacakge-lock.json /bin/KSH/package-lock.json
sudo cp ./src/ksh /bin/ksh
cd /bin/KSH
echo "installing required Node Modules"
npm install


