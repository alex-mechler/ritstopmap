export default {
    tracking_id: process.env.VUE_APP_GA_ID || false,
    bugsnag_id: process.env.VUE_APP_BUGSNAG_KEY || false,
    environment: process.env.NODE_ENV,
    api_root: process.env.VUE_APP_API_ROOT || '',
    login_base: process.env.VUE_APP_LOGIN_BASE || '',
    version: '2.3.1',
    community_day_start: process.env.VUE_APP_COMMUNITY_DAY_START || 100,
    community_day_end: process.env.VUE_APP_COMMUNITY_DAY_END || 200,
    community_day_enabled: !!process.env.VUE_APP_COMMUNITY_DAY_ENABLED
}
