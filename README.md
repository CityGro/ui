@citygro/ui
-----------

this library is designed to integrate with your webpack build. you may need to
adapt the following to make it work with your project.

feel free to ask questions and files issues on [gitlab]

[gitlab]: https://gitlab.com/citygro/ui/issues

## install

```sh
$ yarn add @citygro/ui
```

## configure

> our main assumption here is that your project is based on the `vue-cli`
> template for `webpack` 2.

`@citygro/ui` is *not* bundled for you! our goal is to provide hooks so that the
library can be integrated into your build process. this method allows for deep
customization and enabled you to produce an efficient app bundle.

`webpack` needs to be configured to load the `/\.(vue|js)$/` files correctly.

```
...
  module: {
    rules: [
      ...
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // add this
        include: [
          resolve('node_modules/@citygro/ui')
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // add this
        include: [
          resolve('node_modules/@citygro/ui')
        ]
      }
      ...
    ]
  }
...
```

### style options

we provide two options for including global styles in your applications.

#### sass build

this method creates a custom build that can be configured by using a custom
`_variables.scss` file.

```
config.sassResources = [
  resolve('node_modules/@citygro/ui/style/_variables.scss')
]
```

```
import style from '@citygro/ui/style'
```

#### stock css

this method is quite a bit faster, but cannot produce a custom look.

```
config.sassResources = [
  resolve('node_modules/@citygro/ui/style/_variables.scss')
]
```

```
import style from '@citygro/ui/dist/style.css'
```
