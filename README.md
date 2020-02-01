# mojogroove

## Project setup
```
yarn install
```

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
