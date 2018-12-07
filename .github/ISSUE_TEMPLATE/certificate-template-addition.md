---
name: Certificate Template Addition
about: This is the workflow for requesting new certificate templates to be added to
  the OpenCerts repository
title: "[New Template]"
labels: new template
assignees: ''

---

# Pull Request Guidelines for Adding Certificate Templates
This document is a work in progress but here are some basic checks. As this is a work in progress, meeting the below doesn't indicate there are will be no issues with your pull request.

### Certificate Template 
- [] Responsive Design
- [] No fixed-size raster images as part of certificate layout

### Pre-merge checks

- [] Tip of your branch is at parity with latest OpenCerts master
- [] Linter issues resolved (Run `yarn lint:fix` to see issues)
- [] `yarn test` passes
- [] Travis Build passes
