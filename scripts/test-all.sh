#!/bin/sh

if [ "$1" != "--skip-build" ]; then
  echo "[TEST ALL] dist"
  npm run dist

  echo "[TEST ALL] compile"
  npm run compile
else
  echo "Skip build..."
fi

echo "[TEST ALL] check-commit"
npm run check-commit

echo "[TEST ALL] lint"
npm run lint

echo "[TEST ALL] dekko dist"
node ./tests/dekko/dist.test.js

echo "[TEST ALL] dist test"
LIB_DIR=dist npm test

echo "[TEST ALL] dekko lib"

echo "[TEST ALL] test es"
LIB_DIR=es npm test

echo "[TEST ALL] test lib"
LIB_DIR=lib npm test

echo "[TEST ALL] test"
npm test

echo "[TEST ALL] test node"
npm run test-node
