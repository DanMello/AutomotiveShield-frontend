#!/bin/bash

echo "Seding files to server"
rsync -arv -v -e ssh /home/dan/Production/webapps/AutomotiveShield/front-end/dist/.  deploy@10.0.0.201:/home/deploy/mellocloud/automotiveshield