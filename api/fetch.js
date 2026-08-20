const axios = require('axios');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const TARGET_API = 'https://01k3.com/api/game/plan/recordDetails';

    const PAYLOAD = {
        "id": 308,
        "gameId": 208,
        "websiteId": 19,
        "gameCode": 0,
        "timeCode": 4,
        "pageNo": 1,
        "pageSize": 10
    };

    const AUTH_TOKEN = "bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MS05MzAxOTM4NDc3Iiwib3RoZXIiOm51bGwsImlkIjoxMTYzMzcsInR5cGUiOjIsImV4cCI6MTc4NjcxMDIzOCwiaWF0IjoxNzg2NjIzODM4LCJhdXRob3JpdGllcyI6W10sImp0aSI6IjQxZTdlZWE4LTM4ZjgtNGY4OS1hYWY1LTMxZTE0MzA4YmE5YSJ9.b84CVhLdwRtsVcNS_MQlyt7XjlFDMQ_UomTb-5PHoeovS9lmryf24okIcGqxEq_2wc66JD5elDnvXhxI05leNTZJDOGO4_xds90ThR6jks_c3ZkRcBF6AqjiTuzpynvetbuH4m7Pit4Wd0ScbBIuO00DyW8EXfqqZx_EuHe8Wuk";
    const X_AUTH_TOKEN = "bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MS05MzAxOTM4NDc3Iiwib3RoZXIiOm51bGwsImlkIjoxMTYzMzcsInR5cGUiOjIsImV4cCI6MTc3MjI4ODYzOCwiaWF0IjoxNzg2NjIzODM4LCJhdXRob3JpdGllcyI6W10sImp0aSI6ImQyY2QzMzUwLWY1MTMtNGNkOC1hY2FlLWRkYjVhOGMxZTdjNyJ9.DPPCmKs8hrun7dv_gMfiDgH9oSYWatK5S3dLckABjRcYaw7SoaFgALQeOIVIvnVn73GRa604j1CTZdJTXS-g1NvlK7AUbk_q8RNTnsjiFRyzOtwL3jdbf0adU2LFWEuQ5cFjNZ-A2g7Nvsci2kijxlTdO0JG47dHAdV6TxIY3kA";

    try {
        const response = await axios.post(TARGET_API, PAYLOAD, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AUTH_TOKEN,
                'x-authorization': X_AUTH_TOKEN,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
            },
            timeout: 8000
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Fetch Failed", details: error.message });
    }
};
  
