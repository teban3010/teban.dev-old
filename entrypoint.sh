#!/bin/sh

echo "Hello $1"
ls
cd linkPreviewer && npm install && npm start
time=$(date)
echo "::set-output name=time::$time"
