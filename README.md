# sails-generate-sails-stripe

A `sails-stripe` generator for use with the Sails command-line interface.

Sails-stripe auto generates Models and Controllers for use with the stripe-node api to work with Waterline. It also generates a Stripe Controller with a route for Stripe webhooks [/api/stripe/webhook](/api/stripe/webhook). It auto checks each webook event to see if it is newer so your DB is in sync with what you have on Stripe.com, niffty eh?

### Installation

```sh
$ npm install sails-stripe --save
```

### 1. configure sailsrc

```json
{
  "generators": {
    "modules": {
      "sails-stripe": "sails-stripe"
    }
  }
}
```

### 2. run generator

```sh
$ sails generate sails-stripe
```

### 3. update configs

#### config/routes.js

```js
module.exports.routes = {
  ...
  'post /api/stripe/webhook': 'StripeController.webhook',
}
```

### 4. configure Stripe.com to point to your webhook

#### Account-> webhooks-> +Add endpoint-> https://{yourdomain}/api/stripe/webhook

### Development

To get started quickly and see this generator in action, ...

Also see `CONTRIBUTING.md` for more information on overriding/enhancing existing generators.

### Questions?

See `FAQ.md`.

### Change Log

#### v0.0.5 - Update to handle Stripe customer.source CRUD operations;

### More Resources

- [Stackoverflow](http://stackoverflow.com/questions/tagged/sails.js)
- [#sailsjs on Freenode](http://webchat.freenode.net/) (IRC channel)
- [Twitter](https://twitter.com/sailsjs)
- [Professional/enterprise](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#are-there-professional-support-options)
- [Tutorials](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#where-do-i-get-help)
- <a href="http://sailsjs.org" target="_blank" title="Node.js framework for building realtime APIs."><img src="https://github-camo.global.ssl.fastly.net/9e49073459ed4e0e2687b80eaf515d87b0da4a6b/687474703a2f2f62616c64657264617368792e6769746875622e696f2f7361696c732f696d616765732f6c6f676f2e706e67" width=60 alt="Sails.js logo (small)"/></a>

### License

**[MIT](./LICENSE)**
&copy; 2015 [Scott Wyatt](http://github.com/scott-wyatt) & contributors

As for [Sails](http://sailsjs.org)?  It's free and open-source under the [MIT License](http://sails.mit-license.org/).

![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)
