export default {
    captchaSolver: {
        enabled: true, // if captcha solving is enabled
        service: '2captcha', // specify one. can be "2captcha" or "capmonster"
        apiKey: '959c8127ee32c2ab282981ef7f429a4d' // the API key for captcha access
    },

    invite: 'blacket', // the server invite code, example is 'HGfFFUQ7F7', can be vanity

    useProxies: false, // if to use proxies from proxies.txt to join
    
    joinDelay: 1000, // how fast to join in milliseconds (too fast = ratelimit!)
};