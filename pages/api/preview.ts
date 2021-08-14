import { NextApiResponse } from "next";


export default (req, res: NextApiResponse) => {
    // set Cookie for Preview Mode
    res.setPreviewData({}) // Add TTL for cookie TTL

    // Redirect user back to Preview Page
    console.log(`@@Error ${req.query.route}`)
    res.redirect(req.query.route)



}