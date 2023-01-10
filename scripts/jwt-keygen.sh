#!/bin/bash
set -e

key=jwt/accessToken/id_rsa

while true; do
  echo "#############  JWT Keygen #############"

  if [ -f "$key" ]; then

    read -p " Keys already exists. Overwrite? [y/N] " yn
    # default value to no
    yn=${yn:-N}

    case $yn in
    [yY])
      rm -rf jwt
      break
      ;;
    [nN])
      clear
      echo "#############  Escape JWT Keygen #############"
      echo ""
      exit
      ;;
    *) ;;

    esac
  else
    break
  fi
done

# User agree to proceed
echo "#############  Keys generation in progress... #############"
mkdir -p jwt/accessToken
mkdir jwt/refreshToken

ssh-keygen -t rsa -b 2048 -m PEM -f jwt/accessToken/id_rsa -P ''
openssl rsa -in jwt/accessToken/id_rsa -pubout -outform PEM -out jwt/accessToken/id_rsa.pub

ssh-keygen -t rsa -b 2048 -m PEM -f jwt/refreshToken/id_rsa -P ''
openssl rsa -in jwt/refreshToken/id_rsa -pubout -outform PEM -out jwt/refreshToken/id_rsa.pub

clear
echo "#############  Keys generation done #############"
echo ""
