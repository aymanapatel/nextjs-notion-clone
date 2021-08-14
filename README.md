# Production Grade Next.js course


[Curriculum](https://production-grade-nextjs.vercel.app)


## Run

`npm run dev` or `yarn dev`



## Functions




> `getStaticProps` and `getStaticPaths` are executed at build time before React component. What this means  is that you can use State management within `getStaticPath` to insert or load data from Flux store.


## Order of execution

`getStaticPath` (Fetches path) -> `getStaticProp` (Passes path data to prop) -> Render the React Component
