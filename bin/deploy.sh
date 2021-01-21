#!/bin/sh
aws s3 sync dist/ s3://caketionary-static/square-space/ --region ap-southeast-1