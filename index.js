const axios = require('axios');

module.exports = async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const TARGET_API = 'https://01k3.com/api/game/plan/recordDetails';

    const PAYLOAD = {
        "pageIndex": 1,
        "pageSize": 50,
        "optionId": "123"
    };

    const AUTH_TOKEN = "bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MS05MzAxOTM4NDc3Iiwib3RoZXIiOm51bGwsImlkIjoxMTYzMzcsInR5cGUiOjIsImV4cCI6MTc4NzI5OTcxMCwiaWF0IjoxNzg3MjEzMzEwLCJhdXRob3JpdGllcyI6W10sImp0aSI6IjlmMDIwZTMwLTA2MzktNGQxMS05NmUyLWQ4MGUyNmM5OTY0NyJ9.BwBC94B7SgN7QWqq19AMXGJTS2lOTLE51ipAcgz0RDto4nvy_f7SP_BU_-vCm1dK2DRxgL2IrBiH8gVObPo0bvUFKx5K1kw6ysgnnmkEFIFIO1WrY7_5BEjp8Ee_iv0kOGO9tn8PxY_-pdJqyKwDferPha9PJ5JZf-iWmweAxPI";
    const X_AUTH_TOKEN = "bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI5MS05MzAxOTM4NDc3Iiwib3RoZXIiOm51bGwsImlkIjoxMTYzMzcsInR5cGUiOjIsImV4cCI6MTc3MjI4ODYzOCwiaWF0IjoxNzg3MjEzMzEwLCJhdXRob3JpdGllcyI6W10sImp0aSI6IjI1ODY3ZDc0LTUyMWEtNDljZS1iNDQ3LTE1Njc4ZTQ0NmJkOCJ9.F_D3xKV87eZMfii_uCnuga11uA4TaCI_yO55vhnjOZyXcJgyJxYUCu8MB9HSMIAelTk-HB1bCEnVO1Yhmefx1RVGYqnxvyFGsgMsPHMEh28vHHLIZA6SyPjLkcUYJHUWwTMJ7Iywd_zsF9h_OIFfULMNuviQMgKMaiZgBXqKLVE";

    try {
        const response = await axios.post(TARGET_API, PAYLOAD, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AUTH_TOKEN,
                'x-authorization': X_AUTH_TOKEN,
                'Origin': 'https://01k3.com',
                'Referer': 'https://01k3.com/',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
            },
            timeout: 8000
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Fetch Failed", details: error.message });
    }
};

