<script>

import axios from 'axios';
import {store} from '../data/store'

export default {
  name: "Main",
  created() {},
  data() {
    return {
      store
    };
  },
  props: {},
  methods: {
  getPosts() {
    axios.get(store.apiUrlBase + 'posts')
    .then(result => {
      result.data.forEach(object => {
        store.posts.push(object)
      })
      console.log(store.posts)
    })
  },
  getSuggestedUsers(){
    axios.get(store.apiUrlBase + 'profiles')
    .then(result => {
      result.data.forEach(object => {
        store.suggestedProfiles.push(object)
        store.onlineContacts.push(object)
      })
      console.log(store.suggestedProfiles)
    })
  },
  calculateHoursElapsed(startDate) {
      // Calcola le ore passate dalla data di partenza
      const startTime = new Date(startDate); // Converti la data di partenza in un oggetto Data
      const currentTime = new Date(); // Ottieni la data e l'ora correnti
      const timeDifference = currentTime.getTime() - startTime.getTime(); // Differenza di tempo in millisecondi
      const totalHoursElapsed = Math.floor(timeDifference / (1000 * 60 * 60)); // Converti millisecondi in ore
      
      // Calcola il numero di giorni passati e le ore rimanenti
      store.daysElapsed = Math.floor(totalHoursElapsed / 24); // Calcola il numero di giorni
      store.remainingHours = totalHoursElapsed % 24; // Calcola le ore rimanenti
      if (store.daysElapsed < 1){
        return store.remainingHours+' ore fa'
      } else if (store.daysElapsed == 1) {
        return store.daysElapsed+' giorno e '+store.remainingHours+' ore fa'
      }
      return store.daysElapsed+' e '+store.remainingHours+' ore fa'
    }
  },
  mounted() {
    this.getPosts();
    this.getSuggestedUsers();
    
  },
};
</script>

<template>
  <main>
    <div class="container">
      <div class="left-column">
        <div class="online-contacts">
          <!-- <div class="top-online-contacts"></div> -->
            <div 
            v-for="(onlineContact, index) in store.onlineContacts"
              :key="index"
              class="contact"
            >
              <img :src="onlineContact.profile_picture" alt="">
            </div>
            
          <div class="bottom-online-contacts">
          </div>
        </div>
        <div class="posts">
          <div 
            v-for="(post, index) in store.posts"
            :key="index"
            class="post"
          >
            <div class="post__header d-flex justify-content-between align-items-center">
              <div class="post-meta">                    
                <div class="post-meta__icon">
                  <img :src="post.profile_picture" alt="">
                </div>
                <div class="post-meta__author">{{post.profile_name}}</div>                    
              </div>
              <div class="post__text"><i class=" fa-solid fa-ellipsis"></i></div>
            </div>
            <div class="post__image">
              <img :src="post.post_image" alt="">
            </div>
           
            <div class="post__content">
              <div class="favorites__cta d-flex">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-regular fa-comment"></i>
              </div>
              <div class="post__likes">
                <div class="user_icon_likes">
                  <img :src="post.likes[0]['profile_picture']" alt="">
                </div>
                <p>piace a <strong>{{post.likes[0]['username']}}</strong> e <strong>{{post.likes.length}}</strong> altri</p>
              </div>
              <div class="post_text d-flex">
                <p><strong>{{post.profile_fullname}}</strong></p>
                <p class="text">{{post.post_text}}</p>
              </div>
              <div class="post_time_elapsed d-flex">
                <p><strong>{{this.calculateHoursElapsed(post.date.date)}}</strong></p>
              </div>
              <div class="post__comments">
                <p>Mostra tutti e <strong>{{post.comments.length}}</strong>{{ commenti }}</p>
                <div 
                  v-for="(comment, i) in post.comments"
                  :key="i"
                  class="comment d-flex"
                >
                  <p><strong>{{comment.username}}</strong></p>
                  <p class="text">{{comment.text}}</p>
                </div>
              </div>
              <div class="add__comment d-flex justify-content-between">
                <p>Aggiungi commento</p>
                <p>Pubblica</p>
              </div>
            </div>            
          </div>
        </div>
      </div>
      <div class="right-column">
        <div class="current_user mb-4 w-100 d-flex justify-content-between align-items-center">
          <div class="current_user_icon">
            <img :src="store.currentUserImg" alt="">
          </div>
          <div class="current_user_name h-100 d-flex flex-column justify-content-center">
            <h5><strong>{{store.currentUserName}}</strong></h5>
            <p>{{store.currentUserName}}</p>
          </div>
          <div class="current_user_sponsor">
            <a href="#">Passa a {{ store.sponsor[(store.currentUserSponsor + 1)] }}</a>
          </div>
        </div>
        <div class="suggestions">
          <div class="suggestions_top d-flex justify-content-between mb-2">
            <p>Suggerimenti per te</p>
            <p><strong>Mostra tutti</strong></p>
          </div>
          <div class="suggestions_bottom d-flex flex-column justify-content-between">
            <div 
              v-for="(suggestedProfile, index) in store.suggestedProfiles"
              :key="index"
              class="d-flex justify-content-between align-items-center"
            >
              <div class="suggested_user d-flex align-items-center">
                <div class="suggested_user_icon">
                  <img :src="suggestedProfile.profile_picture" alt="">
                </div>
                <div class="suggested_user_name">{{ suggestedProfile.profile_name }}</div>
              </div>
              <a href="#">Segui</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
  display: flex;
  .left-column {
    min-height: 100px; 
    width: 60%;
    .online-contacts {
      width: 100%;
      height: 150px;
      border: 2px solid var(--border-color);
      margin-bottom: 50px;
      display: flex;
      justify-content: space-evenly;
      
      
      align-items: center;
      .contact {
        width: 70px;
        height: 70px;
        margin: 0 auto;
        background-color: var(--background-color);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid green;
        object-fit: cover;
        overflow: hidden;
      }
    }
  }
  .right-column {
    // border: 1px solid var(--border-color);
    width: 40%;
    padding-left: 50px;
    min-height: 100px; 
    .current_user {
      height: 100px;
      // border: 1px solid var(--border-color);
      .current_user_icon{
        width: 60px;
        height: 60px;
        border: 1px solid var(--border-color);
        background-color: var(--background-color);
        border-radius: 50%;
        overflow: hidden;
      }
      .current_user_name{
        h5 {
          margin-bottom: 0 !important;
        }
      }
      .current_user_sponsor{}
    }
    .suggestions {
      // border: 1px solid var(--border-color);
      .suggested_user {
        margin-bottom: 10px;
      }
      .suggested_user_icon{
        width: 60px;
        height: 60px;
        border: 1px solid var(--border-color);
        border-radius: 50px;
        background-color: var(--background-color);
        margin-right: 20px;
        overflow: hidden;
      }

    }
  }
}
</style>