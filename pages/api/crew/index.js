import dbConnect from '../../../lib/dbConnect';
import Crew from '../../../models/crew'

export default async function handler(req, res) {
    
    const { method } = req;

    await dbConnect()

    switch (method) {
        case "GET":
            try {
                
                const crewDB = await Crew.find();
                res.status( 200 ).json({
                    ok: true,
                    results: crewDB
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
  