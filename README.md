# Team 3 Web Components

We are Team SPECS! This is a library of customizable web components.

<div style="text-align: center">
<img src="https://raw.githubusercontent.com/ucsd-cse112/team3/master/logo.png?token=AGLD5CNAALYDOZCKXNB7GHK475PVW"/>
</div>

[![Build Status](https://travis-ci.com/ucsd-cse112/team3.svg?token=N7quhPzu2SUwxwSC1Q4R&branch=master)](https://travis-ci.com/ucsd-cse112/team3)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

[![Maintainability](https://api.codeclimate.com/v1/badges/4283a999f4e2067553a5/maintainability)](https://codeclimate.com/repos/5cc0c5e65014ac306c010505/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/4283a999f4e2067553a5/test_coverage)](https://codeclimate.com/repos/5cc0c5e65014ac306c010505/test_coverage)

## User Installation
  [**Download the components with this link**](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/ucsd-cse112/team3/tree/master/Components). Unzip the directory to a location of your choice.  <br/> <br/>
Alternatively, you can **download individual components here**:
| Component | 
|:--------------|
| [CoreHello](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/ucsd-cse112/team3/tree/master/Components/CoreHello) |
| [CustomButton](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/ucsd-cse112/team3/tree/master/Components/CustomButton) |
| [CustomPopover](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/ucsd-cse112/team3/tree/master/Components/CustomPopover) |
| [CustomSlider](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/ucsd-cse112/team3/tree/master/Components/CustomSlider) |

## Using Components

Include any of the following scripts in your HTML file for the web component of your choosing, replacing the ../team3/ prefix with the absolute path to the location of your Component folder. Then you will be able to use that web component like any other HTML element, as described in the documentation below. **For developer installation instructions, see the next section.**
```
<script src="team3/Components/CustomButton/CustomButton.js"></script>
<script src="team3/Components/CustomPopover/CustomPopover.js"></script>
<script src="team3/Components/CustomSlider/CustomSlider.js"></script>
<script src="team3/Components/CoreHello/CoreHello.js"></script>
```

## Documentation

| Component | Documentation | Examples |
|:--------------|:------------------|:----------------|
| CoreHello | [Docs](https://ucsd-cse112.github.io/team3/CoreHello.html) | [Examples](https://ucsd-cse112.github.io/team3/demo_components/CoreHello/CoreHello.html) |
| CustomButton | [Docs](https://ucsd-cse112.github.io/team3/CustomButton.html) |    [Examples](https://ucsd-cse112.github.io/team3/demo_components/CustomButton/CustomButton.html) |
| CustomPopover | [Docs](https://ucsd-cse112.github.io/team3/CustomPopover.html) |    [Examples](https://ucsd-cse112.github.io/team3/demo_components/CustomPopover/CustomPopover.html) |
| CustomSlider | [Docs](https://ucsd-cse112.github.io/team3/CustomSlider.html) |    [Examples](https://ucsd-cse112.github.io/team3/demo_components/CustomSlider/CustomSlider.html) |

[**API Documentation Home**](https://ucsd-cse112.github.io/team3/) <br/>
[**Developer Wiki**](https://github.com/ucsd-cse112/team3/wiki)

## Developer Installation & Testing

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

[For more information see the **Developer Wiki**](https://github.com/ucsd-cse112/team3/wiki)

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


### Changelog

- 2019-06-09    Removed themes from button
- 2019-06-06    Improved README readability
- 2019-06-05    Rework core-hello to match the rest of the components
- 2019-06-04    Changed from ESDoc to JSDoc and added Popover Documentation
- 2019-06-03    New component: Popover
- 2019-05-21    Update button visuals
- 2019-05-20    New component: Button, complete with bootstrap support
- 2019-05-16    New component: Slider
- 2019-04-30    Improved README with links to newly used ESDocs
- 2019-04-29    New component: CoreHello, Pipeline finalized
