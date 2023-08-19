#!/bin/bash
clear

echo "installing KSH"
sudo rm -rf /bin/KSH
sudo rm /bin/ksh
sudo mkdir /bin/KSH
sudo cp ./src/commands.js /bin/KSH/commands.js
sudo cp ./src/main.kart.js /bin/KSH/main.kart.js
sudo cp ./src/config.json /bin/KSH/config.json
sudo cp ./src/package.json /bin/KSH/package.json
sudo cp ./src/package-lock.json /bin/KSH/package-lock.json
sudo cp ./src/ksh /bin/ksh
sudo cp -r ./src/node_modules /bin/KSH/node_modules
echo "installed!"

