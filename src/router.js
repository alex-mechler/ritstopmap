import Vue from 'vue'
import Router from 'vue-router'
import Home2 from './views/Home2'
import Leaderboard from './views/Leaderboard'
import RaidCardCreator from './views/RaidCardCreator'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home2
        },
        {
            path: '/leaderboards',
            name: 'leaderboard',
            component: Leaderboard
        },
        {
            path: '/raid_card_creator',
            name: 'raid_card_creator',
            component: RaidCardCreator
        }
    ]
})
