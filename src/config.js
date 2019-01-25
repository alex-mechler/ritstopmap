export default {
    tracking_id: process.env.VUE_APP_GA_ID,
    environment: process.env.NODE_ENV,
    api_root: process.env.VUE_APP_API_ROOT || '',
    login_base: process.env.VUE_APP_LOGIN_BASE || ''
}
