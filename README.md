# Team3

![SPECS](https://raw.githubusercontent.com/ucsd-cse112/team3/master/logo.png?token=AGLD5CNAALYDOZCKXNB7GHK475PVW)

[![Build Status](https://travis-ci.com/ucsd-cse112/team3.svg?token=N7quhPzu2SUwxwSC1Q4R&branch=master)](https://travis-ci.com/ucsd-cse112/team3)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

# Our Team
- Alex Zhou `Lead`
- Ishankumar Patel `Co-Lead`
- Gabriel Ruiz `Coder`
- Moxuan Yang `Coder`
- Rix Lai `Coder`
- Zihan Yi `Coder`
- Brayden Crosta `DevOps`
- Kaiwen Chen `DevOps`
- Alex Mao `Tools & Utility`
- Vince Li `Tools & Utility`
- Yootak Jin `Quality Assurance` 


## Setup
To setup after cloning the repo:
```
npm install
```

## Run linting tests
```
npm run htmlhint
npm run csslint
npm run eslint
```

## Run automatic linting fix
\*Note that some errors cannot be fixed automatically
```
npm run csslint_fix
npm run eslint_fix
```

## Run test cases
```
npm run test
```

## To start fresh again
```
# USE WITH CAUTION
rm -rf ./node_modules
git checkout -- .
git clean -dfx
```

[Documentation](https://ucsd-cse112.github.io/team3/)
