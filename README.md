# mojogroove

## Project setup
```
yarn install
```

Note, was encountering heap out of memory errors so bumped the size as per [vue-cli issues](https://github.com/vuejs/vue-cli/issues/1453#issuecomment-395120163) in package.json

Also, added ./dist to .eslintignore to avoid unnecessary processing

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files
```
yarn lint
```
### Deploying to github pages
  By default, Vue CLI assumes your app will be deployed at the root of a domain, e.g. https://www.my-app.com/ 

  Vue CLI default hrefs are absolute paths see: [](https://cli.vuejs.org/config/#publicpath)

  Configure vue-cli in vue.config.js
    publicPath: ''

  On Github, configure project to use gh-pages branch

  After successful update and push also push the dist directory subtree as gh-pages branch

  git subtree push --prefix dist origin gh-pages

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
