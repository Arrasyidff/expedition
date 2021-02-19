const axios = require("axios")

class UserController {
    static checkExpedition(req, res, next) {
        // console.log(req.body)
        const {
            dest_address,
            dest_lat,
            dest_lng,
            dest_postal_code,
            src_address,
            src_lat,
            src_lng,
            src_postal_code,
            weight
        } = req.body
        axios({
            method: "POST",
            url: "https://sandbox.keyta.id/api/v1/costs/",
            headers: {
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMSwiZXhwIjoxNjQ1MjM5MDQ4fQ.tlPC96qm9kmKulkjvO77MySrE49r75bztchW09Uo-ng"
            },
            data: {
                dest_address,
                dest_lat,
                dest_lng,
                dest_postal_code,
                src_address,
                src_lat,
                src_lng,
                src_postal_code,
                weight
            }
        })
            .then(({data}) => {
                let results = []
                let sample = ['GOJEK', 'GrabExpress', 'JNE', 'SiCepat', 'Paxel', 'AnterAja', 'Deliveree']
                for (let i = 0; i < sample.length; i++) {
                    for (let j = 0; j < data.results.length; j++) {
                        if ( sample[i] === data.results[j].name) {
                            results.push(data.results[j])
                        }
                    }
                }
                res.status(200).json({results})

            })
            .catch(err => {
                res.json(err)
            })
    }

}

module.exports = UserController