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
- [ ] Responsive Design
- [ ] No fixed-size raster images as part of certificate layout
- [ ] No images of persons' signatures inside of code repository

### Pre-merge checks

- [ ] Ensure that your code has been [rebased](https://www.digitalocean.com/community/tutorials/how-to-rebase-and-update-a-pull-request) on top of latest OpenCerts master
- [ ] Linter issues resolved (Run `npm run lint:fix` to see issues)
- [ ] `npm run test` passes
- [ ] [Travis Build passes](https://docs.travis-ci.com/user/for-beginners/)
