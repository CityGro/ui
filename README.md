@citygro/ui
-----------

this library is designed to integrate with your webpack build. you may need to
adapt the following to make it work with your project.

feel free to ask questions and files issues on [gitlab]

[gitlab]: https://gitlab.com/citygro/ui/issues

```sh
$ yarn add @citygro/ui
$ vim config/webpack.config.js
```

```
...
  module: {
    rules: [
      ...
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [
          resolve('node_modules/@citygro/ui')
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('node_modules/@citygro/ui')
        ]
      }
      ...
    ]
  }
...
```

```
config.sassResources = {
  resolve('node_modules/@citygro/ui/style/_variables.scss')
}
```

```
import style from '@citygro/ui/dist.css'
```
