import dbConnect from '../../../lib/dbConnect';
import Destination from '../../../models/destination'

export default async function handler(req, res) {
    
    const { method } = req;

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                
                const destinationDB = await Destination.find({});
                res.status( 200 ).json({
                    ok: true,
                    results: destinationDB
                })

            } catch (err) {
                console.log(err);
                res.status(500).json({
                    ok: true,
                    msg: "Server error"
                })
            }

            break;
    
        default:
            res.status( 400 ).json({
                ok: false
            })
            break;
    }

  }
  