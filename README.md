# atcampus-components
A component library using the atcampus styleguide

## Usage:
* Make sure you install a recent Node.js version (Tested with v16.13.1)
* Run `npm install`
* Run the project with 
  * `npm run dev`
* Access the site at [http://localhost:9001](http://localhost:9001)

## How the component library is setup:

* [Next.js](https://nextjs.org) with React, is used for all our frontend projects.
* [TailwindCSS](https://tailwindcss.com) used for almost all our CSS styling.


## Errors:

### SWC Failed to Load
[SWC Failed to Load](https://nextjs.org/docs/messages/failed-loading-swc)

If you're having this error, disable swc by doing any of the following lines:
* Open `next.config.js` and add `swcMinify: false`.
* **Or** you can add the following text to `.babelrc`: 
```
{
  "presets": ["next/babel"]
}
```
