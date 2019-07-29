#!/bin/bash

PROJECT_KEY="TradeTrust_tradetrust-website"
ORGANISATION_KEY="tradetrust"

if ! [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    sonar-scanner \
        -Dsonar.scanner.skip=false \
        -Dsonar.projectKey=$PROJECT_KEY \
        -Dsonar.organization=$ORGANISATION_KEY \
        -Dsonar.sources=. \
        -Dsonar.host.url=https://sonarcloud.io \
        -Dsonar.login=${SONAR_LOGIN} \
        -Dsonar.pullrequest.key=${TRAVIS_PULL_REQUEST} \
        -Dsonar.pullrequest.branch=${TRAVIS_PULL_REQUEST_BRANCH}
elif [ "${TRAVIS_BRANCH}" = "master" ]; then
    sonar-scanner \
        -Dsonar.scanner.skip=false \
        -Dsonar.projectKey=$PROJECT_KEY \
        -Dsonar.organization=$ORGANISATION_KEY \
        -Dsonar.sources=. \
        -Dsonar.host.url=https://sonarcloud.io \
        -Dsonar.login=${SONAR_LOGIN}
fi;
