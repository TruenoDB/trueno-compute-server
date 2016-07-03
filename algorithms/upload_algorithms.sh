#!/bin/bash
# In God we trust

#Upload Algorithms into Job Server - OK = response
curl --data-binary @$job-server-truenoDB_2.10-0.7.0.jar localhost:8090/jars/algorithms

echo " -> Algorithms Uploaded"

