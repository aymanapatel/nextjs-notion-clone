# Production Grade Next.js course


[Curriculum](https://production-grade-nextjs.vercel.app)


## Run

`npm run dev` or `yarn dev`


## `[...<route>]`

This is catch all route.


## `[[...<route>]]`

This optional catch route.
 

## Functions




> `getStaticProps` and `getStaticPaths` are executed at build time before React component. What this means  is that you can use State management within `getStaticPath` to insert or load data from Flux store.


## Order of execution

`getStaticPath` (Fetches path) -> `getStaticProp` (Passes path data to prop) -> Render the React Component


# Preview and Cookies


Next Provie


## API TS


1. `preview.ts`: Set Cookie and Preview Mode
```javascript
export default (req, res: NextApiResponse) => {
    // set Cookie for Preview Mode
    res.setPreviewData({}) // Add TTL for cookie TTL

    // Redirect user back to Preview Page
    res.redirect(req.query.route)
}
```

2. `clear-preview.ts`: Clear Cookie

```javascript
export default (req, res: NextApiResponse) => {
    res.clearPreviewData()
    res.end('Preview Mode Disabled')
}
```

## Use in Blog

`index.tsx`

Root blog has `ctx` (context) which has preview variable

`[slug].tsx`

Has Preview Variable


## APIs

`API GET /api/preview?route=<path>`: Set the Path as Preview Mode
`API GET /api/clear-preview`: Clear Cookie for all paths

## AuthN/AuthZ


> Using [NextAuth](https://next-auth.js.org/) library





# Questions

## Why no state-management?

- API State: React Hooks + (SWR || React Query)
- Application State: Use `useReducer` + Context API