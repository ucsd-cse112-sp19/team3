# Commands

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
