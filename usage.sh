# setup (once)
npm init --scope=@seyoungsong
npm install --save-dev typescript @types/node
npx tsc --init
npm login

# build and test
rm -rf dist && npm run build
# npm link
npm test

npm publish --access public

python3 print.py
