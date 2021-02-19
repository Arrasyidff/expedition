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
                        let services = []
                        if ( sample[i] === data.results[j].name) {
                            for(let k = 0; k < data.results[j].services.length; k++) {
                                let price = data.results[j].services[k].totalPrice
                                let markup = 0
                                let total_price = data.results[j].services[k].totalPrice

                                if (price >= 0 && price <= 17000) {
                                    markup = 1000
                                    total_price += 1000
                                } else if (price >= 17001 && price <= 30000) {
                                    markup = 2000
                                    total_price += 2000
                                } else if (price >= 30001 && price <= 40000) {
                                    markup = 3000
                                    total_price += 3000
                                } else if (price >= 40001 && price <= 129000) {
                                    markup = 5000
                                    total_price += 5000
                                } else if (price >= 129001) {
                                    markup = 7000
                                    total_price += 7000
                                }
                                services.push({
                                    name: data.results[j].services[k].name,
                                    cost_breakdown: {
                                        price,
                                        markup,
                                        total_price
                                    }
                                })
                            }
                            results.push({name: data.results[j].name, price: {
                                services
                            }})
                        }
                    }
                }

                res.status(200).json(results)
            })
            .catch(err => {
                res.json(err)
            })
    }

}

module.exports = UserController