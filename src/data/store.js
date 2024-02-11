import { reactive } from 'vue';


export const store = reactive({
  apiUrlBase: 'https://flynn.boolean.careers/exercises/api/boolgram/',
  posts:[],
	onlineContacts:[],
	suggestedProfiles:[],
  currentUserImg: '/placeholder.png',
  currentUserName: 'Ugo De Ughi',
  currentUserSponsor: 0,
  daysElapsed: 0,
  remainingHours: 0,
  sponsor: ['Standard','Plus','Premium']
})