#!/bin/bash
if [ ! -d "orient-express" ]
then
  echo "npm install" > install-orient-express
  git clone https://github.com/lesfieres/orient-express.git