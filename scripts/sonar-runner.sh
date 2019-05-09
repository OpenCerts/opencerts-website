#!/bin/bash

if ! [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    sonar-scanner \
        -Dsonar.scanner.skip=false \
        -Dsonar.projectKey=OpenCerts_opencerts-website \
        -Dsonar.organization=opencerts \
        -Dsonar.sources=. \
        -Dsonar.host.url=https://sonarcloud.io \
        -Dsonar.login=${SONAR_LOGIN} \
        -Dsonar.pullrequest.key=${TRAVIS_PULL_REQUEST} \
        -Dsonar.pullrequest.branch=${TRAVIS_PULL_REQUEST_BRANCH}
elif [ "${TRAVIS_BRANCH}" = "master" ]; then
    sonar-scanner \
        -Dsonar.scanner.skip=false \
        -Dsonar.projectKey=OpenCerts_opencerts-website \
        -Dsonar.organization=opencerts \
        -Dsonar.sources=. \
        -Dsonar.host.url=https://sonarcloud.io \
        -Dsonar.login=${SONAR_LOGIN}
fi;
