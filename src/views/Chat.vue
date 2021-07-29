<template>
  <div class="chat">
    <div class="app">
      <div class="app__body">
        <div class="sidebar">
          <div class="sidebar__header" style="min-width: 200px">
            <md-avatar style="margin: 10px">
              <img :src="authPhoto ? authPhoto : 'images/profile.png'" alt="brken">
            </md-avatar>
            <div class="sidebarChat__info">
                    <h2 style="line-height: 2; margin-bottom: 0; text-align: center;">{{ authName }}</h2>
                    <p>Status...</p>
                  </div>
            <!-- <div class="sidebar__headerRight"> -->
              <!-- <md-button class="md-icon-button">
                <md-icon>chat</md-icon>
              </md-button> -->
            <!-- </div> -->
          </div>

          <div class="sidebar__chat">
            <div>
              <div class="sideBarChatUserRow">
                <div
                  class="sidebarChat"
                  v-for="item in contact"
                  :key="item.key"
                  v-show="item.id != authId"
                  @click="letsChat(item)"
                >
                  <md-avatar>
                    <img :src="getAvatar(item.URL)" />
                  </md-avatar>
                  <div class="sidebarChat__info">
                    <h2>{{ item.name }}</h2>
                    <p>Last message...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ChatBox :authPeer="authPeer"></ChatBox>
      </div>
    </div>
  </div>
</template>

<script>
import ChatBox from "../components/chatBox";
import fb from "../fb";
import db from "../fs";

export default {
  components: { ChatBox },
  name: "Chat",
  data() {
    return {
      authName: localStorage.getItem("name"),
      authPeer: null,
      authId: localStorage.getItem("id"),
      authPhoto: localStorage.getItem("photoURL"),
      contact: [],
      photoURL: localStorage.getItem("photoURL"),
      leftdrawer: false,
    };
  },

  created() {
    this.userList();
  },

  methods: {
    getAvatar(value) {
      if(value == ""){
        return 'images/profile.png';
      } else { 
        return value;
      }
    },
    onProfile() {},

    async userList() {
      const result = await db.collection("users").get();
      console.log("result", result);

      if (result.docs.length > 0) {
        let listUsers = [];
        listUsers = [...result.docs];
        listUsers.forEach((item, index) => {
          this.contact.push({
            key: index,
            documentKey: item.id,
            id: item.data().id,
            name: item.data().name,
            URL: item.data().URL,
            desc: item.data().desc,
          });
        });
      }
      console.log("contact", this.contact);
    },

    letsChat(item) {
      this.authPeer = item;
      console.log("chat", this.authPeer);
    },

    logout() {},
  },
};
</script>

<style lang="scss" scoped>
// app

.app {
  display: grid;
  place-items: center;
  background-color: #dadbd3;
  height: 100vh;
}
.app__body {
  display: flex;
  background-color: #ededed;
  height: 90vh;
  width: 90vw;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.75);
}
.md-progress-spinner {
  place-self: center;
}

// sidebarChat

.sidebarChat {
  display: flex;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;
}
.sidebarChat > .md-avatar {
  margin: unset;
}
.sidebarChat:hover {
  background-color: #ebebeb;
}
.sidebarChat__info {
  margin-left: 15px;
  h2 {
    text-transform: capitalize;
    font-size: 16px;
    margin-bottom: 8px;
    text-align: left;
    font-weight: 800;
  }
  p {
    font-size: 12px;
    color: #b2b2b2;
    margin-left: 5px;
    font-weight: 600;
  }
}

// chatSidebar
.sidebar {
  display: flex;
  flex-direction: column;
  flex: 0.3;
}
.sidebar__header {
  display: flex;
  justify-content: left;
  padding: 10px;
  border-right: 1px solid lightgrey;
}
.sidebar__headerRight {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 10vw;
}
.sidebar__headerRight > i {
  margin-right: 2vw;
  font-size: 24px !important;
}
.sidebar__search {
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  height: 30px;
  padding: 10px;
}
.sidebar__searchContainer {
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  border-radius: 20px;
}
.sidebar__searchContainer > input {
  border: none;
  margin-left: 10px;
}
.sidebar__searchContainer > .md-icon {
  margin: unset;
  color: gray;
}
.sidebar__chat {
  flex: 1;
  background-color: white;
  overflow-y: hidden;
}
.sidebar__chat:hover {
  overflow-y: auto;
}
</style>
