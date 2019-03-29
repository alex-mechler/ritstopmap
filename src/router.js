import Vue from 'vue'
import Router from 'vue-router'
import Home2 from './views/Home2'
import Leaderboard from './views/Leaderboard'
import LeaderboardInner from './views/LeaderboardInner'
import RaidCardCreator from './views/RaidCardCreator'
import IconTester from './views/IconTester'

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
            component: Leaderboard,
            children: [
                {
                    path: '',
                    name: 'leaderboard.seasonal',
                    component: LeaderboardInner,
                    props: {
                        endpoint: 'leaderboard/seasonal'
                    }
                },
                {
                    path: 'overall',
                    name: 'leaderboard.overall',
                    component: LeaderboardInner,
                    props: {
                        endpoint: 'leaderboard'
                    }
                }
            ]
        },
        {
            path: '/raid_card_creator',
            name: 'raid_card_creator',
            component: RaidCardCreator
        },
        {
            path: '/icons',
            name: 'icons',
            component: IconTester
        }
    ]
})
