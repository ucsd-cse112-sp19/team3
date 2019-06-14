# Team 3 Web Components

We are Team SPECS! This is a library of customizable web components.

<div style="text-align: center">
<img src="https://raw.githubusercontent.com/ucsd-cse112/team3/master/logo.png?token=AGLD5CNAALYDOZCKXNB7GHK475PVW"/>
</div>

[![Build Status](https://travis-ci.com/ucsd-cse112/team3.svg?token=N7quhPzu2SUwxwSC1Q4R&branch=master)](https://travis-ci.com/ucsd-cse112/team3)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

[![Maintainability](https://api.codeclimate.com/v1/badges/4283a999f4e2067553a5/maintainability)](https://codeclimate.com/repos/5cc0c5e65014ac306c010505/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/4283a999f4e2067553a5/test_coverage)](https://codeclimate.com/repos/5cc0c5e65014ac306c010505/test_coverage)

## Documentation

Include any of the following scripts in your HTML file for the web component of your choosing, replacing the ../team3/ prefix with the absolute path to the team3 directory where you installed our repo. Then you will be able to use that web component like any other HTML element, as described in the documentation below. For installation instructions, see below.
```
<script src="team3/Components/CustomButton/CustomButton.js"></script>
<script src="team3/Components/CustomPopover/CustomPopover.js"></script>
<script src="team3/Components/CustomSlider/CustomSlider.js"></script>
<script src="team3/Components/CoreHello/CoreHello.js"></script>
```
[**API Documentation**](https://ucsd-cse112.github.io/team3/) <br/>
[**Developer Wiki**](https://github.com/ucsd-cse112/team3/wiki)

## Installation & Testing

##### How to Install
Download the repository to local, and setup all the Node.js packages dependencies,
```
git clone https://github.com/ucsd-cse112/Team3.git
cd team3
npm install
```
If you decide to start fresh again,
```
rm -rf ./node_modules
git checkout -- .
git clean -dfx
```
> *Use with caution.

##### How to Test
```
npm run test
```

##### How to Run Linting Test
```
npm run htmlhint
npm run csslint
npm run eslint
```

##### How to Run Automatic Linting Fix
```
npm run csslint_fix
npm run eslint_fix
```
> *Note that some errors cannot be fixed automatically.

## Credit

Acknowledgement to all of our team members who have contributed to this project.

| Team Roles    | Name              |
|:--------------|:------------------|
| Team Lead     | Alex Zhou         |
| Co-Lead       | Ishankumar (Ish) Patel  |
| Coder         | Gabriel Ruiz      |
| Coder         | Moxuan Yang       |
| Coder         | Rix Lai           |
| Coder         | Zihan Yi          |
| DevOps        | Brayden Crosta    |
| DevOps        | Kaiwen Chen       |
| Tools & Utility   | Alex Mao      |
| Tools & Utility   | Vince Li      |
| Quality Assurance | Yootak Jin    |
> Names are sorted in alphabetic order within each category of team roles.
