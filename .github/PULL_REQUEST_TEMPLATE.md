---
name: Certificate Template Addition
about: This is the workflow for requesting new certificate templates to be added to
  the OpenCerts repository
title: "[New Template]"
labels: new template
assignees: ''

---

# Pull Request Guidelines for Adding Certificate Templates
This document is a work in progress but here are some basic checks. As these are only basic guidelines, meeting the below doesn't indicate there will be no issues with your pull request.

### Pre-merge checks

- [ ] Did not modify any files outside of your organisation's template folder (e.g package-lock.json or anything else)
- [ ] Ensure that your code has been [rebased](https://www.digitalocean.com/community/tutorials/how-to-rebase-and-update-a-pull-request) on top of latest OpenCerts master
- [ ] Linter issues resolved (Run `npm run lint:fix` to see issues)
- [ ] `npm run test` passes
- [ ] `npm run test:integration` passes
- [ ] [Travis Build passes](https://docs.travis-ci.com/user/for-beginners/)

### Certificate Template 
- [ ] No more than 5 templates or 25 added/modified files in the pull request
- [ ] Ensure that your .opencert file's data complies with the intentions of the OpenCerts' schema - e.g recipient related information is inside the `recipient` object, etc.
- [ ] Integration test for each template that checks that the correct rendering is done given a sample certificate
- [ ] Sample certificate file included for each template, located alongside the integration test for each template
- [ ] Sample certificates must obviously be a sample certificate
  - [ ] Obviously fictitious name
  - [ ] Obviously sample signatory images
- [ ] No fixed-size raster images as part of certificate layout
- [ ] Mobile responsive design
- [ ] Date parsing should be localised to template author's timezone
- [ ] Webpack chunking code is correct
  - [ ] Has chunking code
  - [ ] Same chunking code as the other certificates belonging to that institute
- [ ] Certificate Store Addresses have been updated
  - [ ] Template Whitelist
  - [ ] Registry
- [ ] Template should not be using resources(images etc.) on the website outside of their own folder (e.g institute logo shouldn't be used from /static because there's no guarantee it will not change)
