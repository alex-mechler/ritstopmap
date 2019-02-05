export default {
    tracking_id: process.env.VUE_APP_GA_ID || false,
    bugsnag_id: process.env.VUE_APP_BUGSNAG_KEY || false,
    environment: process.env.NODE_ENV,
    api_root: process.env.VUE_APP_API_ROOT || '',
    login_base: process.env.VUE_APP_LOGIN_BASE || '',
    version: '2.1.1'
}
