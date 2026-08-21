const axios = require('axios');

module.exports = async (req, res) => {
    // CORS configuration
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-authorization'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Target API endpoint (Aap URL query se bhi ?endpoint=getPlanInfo bhej sakte hain)
    const endpoint = req.query.endpoint || 'recordDetails';
    const TARGET_API = `https://01k3.com/api/game/plan/${endpoint}`;

    // Fresh Tokens from cURL
    const AUTH_TOKEN = "bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MS05MzAxOTM4NDc3Iiwib3RoZXIiOm51bGwsImlkIjoxMTYzMzcsInR5cGUiOjIsImV4cCI6MTc4NzQwMTk1MywiaWF0IjoxNzg3MzE1NTUzLCJhdXRob3JpdGllcyI6W10sImp0aSI6ImZlNWJkYzY1LWI1MWEtNDRmYy04MmQ0LTM1NjNhZDcyZmJlNyJ9.QdC11ZXvO5RxgBwvEq8o2iuzwJVGsV646hVy2FfjJY-6eyuss4AzYZfrYD7Cqq_4ZZ8PwYWWPFcfsUfBmq4r_RBByVOpPtgwoyvTVTAd8yE85W-0qKV-eBVO5L6dT9zvbnYyjvFV5ZupPKwmbKghKtasOVIUlZ5AORmOzZoqWhI";
    const X_AUTH_TOKEN = "bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MS05MzAxOTM4NDc3Iiwib3RoZXIiOm51bGwsImlkIjoxMTYzMzcsInR5cGUiOjIsImV4cCI6MTc4NzkyMDM1MywiaWF0IjoxNzg3MzE1NTUzLCJhdXRob3JpdGllcyI6W10sImp0aSI6IjM0ZDFkODQxLTNlNjktNGM1MS04ODA2LWE2ODBhNzk0NjIyZiJ9.INdktR96c419BFM2i2HwVrVV9aZ64x5cYLaLk4rXbZQAYaLDny4nspXIuZcPpPQ5a1Xp4FdWW4NrY8IzdrpSd6IVfRxpFUwltVl6Pa41L-zswSYMwhrAzaVp-rdtNbmPs6lcKM7iz8xRR-w-saELJL76qKmmeGgOixdyFazucb8";

    // Request Payload
    const payload = req.body && Object.keys(req.body).length > 0 
        ? req.body 
        : {
            "pageIndex": 1,
            "pageSize": 10,
            "optionId": "123"
        };

    try {
        const response = await axios.post(TARGET_API, payload, {
            headers: {
                'authority': '01k3.com',
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en',
                'content-type': 'application/json;charset=UTF-8',
                'authorization': req.headers['authorization'] || AUTH_TOKEN,
                'x-authorization': req.headers['x-authorization'] || X_AUTH_TOKEN,
                'origin': 'https://01k3.com',
                'referer': 'https://01k3.com/',
                'sec-ch-ua': '"Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
            },
            timeout: 10000
        });

        return res.status(200).json(response.data);
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(500).json({ error: "Proxy Error", message: error.message });
    }
};
