import dbConnect from '../../../lib/dbConnect';
import Technology from '../../../models/technology'

export default async function handler(req, res) {
    
    const { method } = req;

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                
                const technologyDB = await Technology.find();
                res.status( 200 ).json({
                    ok: true,
                    results: technologyDB
                })

            } catch (err) {
                console.log(err);
                res.status(500).json({
                    ok: true,
                    msg: "Server error"
                })
            }
    
        default:
            res.status( 400 ).json({
                ok: false
            })
            break;
    }

  }
  