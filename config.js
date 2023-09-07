module.exports = {
    captchaSolver: {
        enabled: false, // if captcha solving is enabled
        service: '', // specify one. can be "2captcha" or "capmonster"
        apiKey: '' // the API key for captcha access
    },

    invite: '', // the server invite code, example is 'HGfFFUQ7F7', can be vanity

    useProxies: false, // if to use proxies from proxies.txt to join
    
    joinDelay: 1000, // how fast to join in milliseconds (too fast = ratelimit!)
    
    boost: {
        enabled: false, // if to boost any server
        delay: 2000, // the delay to boost in millseconds (too fast = ratelimit!)
        serverId: '' // the ID of the server to boost, the accounts must be in the server
    }
}
