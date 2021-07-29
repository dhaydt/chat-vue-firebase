<template>
  <div>
    <div v-if="fetched" class="app">
      <div class="app__body">
        <div class="chatSidebar">
          <div class="sidebar">
            <div class="sidebar__header">
              <md-avatar />
              <div class="sidebar__headerRight">
                <md-button class="md-icon-button">
                  <md-icon>donut_large</md-icon>
                </md-button>
                <md-button class="md-icon-button">
                  <md-icon>chat</md-icon>
                </md-button>
                <md-button class="md-icon-button">
                  <md-icon>more_vert</md-icon>
                </md-button>
              </div>
            </div>
            <!-- <div class='sidebar__search'>
      <div class='sidebar__searchContainer'>
        <md-icon>search</md-icon>
        <input placeholder="start new chat"/>
      </div>c
    </div> -->
            <div class="sidebar__chat">
              <div>
                <div class="sideBarChatUserRow">
                  <div
                    class="sidebarChat"
                    v-if="!addNewChat"
                    @click="updateChatView()"
                  >
                    <md-avatar>
                      <img :src="room.user.picture" />
                    </md-avatar>
                    <div class="sidebarChat__info">
                      <h2>{{ room.user.email }}</h2>
                      <p>Last message...</p>
                    </div>
                  </div>

                  <div class="sidebarChat" v-else onClick="{createChat()}">
                    <h2>Add new chat</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chatView">
          <div class="chat">
            <div class="chat__header">
              <md-avatar class="md-large">
                <!-- https://avatars.githubusercontent.com/u/32813584?s=60&v=4 -->
                <img :src="avatar" />
              </md-avatar>
              <div class="chat__headerInfo">
                <h3>{{ friend.email }}</h3>
                <p>Last seen at ...</p>
              </div>

              <div class="chat__headerRight">
                <md-button class="md-icon-button">
                  <md-icon>search</md-icon>
                </md-button>
                <md-button class="md-icon-button">
                  <md-icon>attach_file</md-icon>
                </md-button>
                <md-button class="md-icon-button">
                  <md-icon>more_vert</md-icon>
                </md-button>
              </div>
            </div>
            <div class="chat__body" id="container">
              <div v-for="chat in chats" :key="chat.key">
                <p :class="`chat__message ${isMe(chat) && 'chat__reciever'}`">
                  {{ chat.message }}
                </p>
              </div>
            </div>
            <div class="chat__footer">
              <md-icon>insert_emoticon</md-icon>
              <form v-on:submit.prevent="onSubmit">
                <input type="text" id="inputMsg" />
                <button type="submit">send a message</button>
              </form>
              <md-icon>mic</md-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fetched: true,
			user: '',
			email: '',
    };
  },
  methods: {
		addNewChat(){},
		room(){},
		avatar(){},
		friend(){},
		chats() {},
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

// chatView

.chat {
  flex: 0.7;
  display: flex;
  flex-direction: column;
}
.chat__header {
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
}
.chat__headerInfo {
  flex: 1;
  padding-left: 20px;
}
.chat__headerInfo > h3 {
  margin-bottom: 3px;
  font-weight: 500;
}
.chat__headerInfo > p {
  color: gray;
}
.chat__headerRight {
  display: flex;
  justify-content: space-between;
  min-width: 100px;
}
.chat__body {
  flex: 1;
  background: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")
    repeat center;
  padding: 30px;
  overflow-y: auto;
}
.chat__message {
  position: relative;
  font-size: 16px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  width: fit-content;
  margin-bottom: 30px;
}
.chat__name {
  position: absolute;
  top: -15px;
  font-weight: 800;
  font-size: xx-small;
}
.chat__timestamp {
  margin-left: 10px;
  font-size: xx-small;
}
.chat__reciever {
  margin-left: auto;
  background-color: #b0ffb0;
}
.chat__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  border-top: 1px solid lightgray;
}
.chat__footer > form {
  flex: 1;
  display: flex;
}
.chat__footer > form > input {
  flex: 1;
  border-radius: 30px;
  padding: 10px;
  border: none;
}
.chat__footer > form > button {
  display: none;
}
.chat__footer > md-icon {
  padding: 10px;
  color: gray;
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
.sidebarChat__info > h2 {
  font-size: 16px;
  margin-bottom: 8px;
}
.sidebarChat__info {
  margin-left: 15px;
}

// chatSidebar
.sidebar {
  display: flex;
  flex-direction: column;
  flex: 0.3;
}
.sidebar__header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
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
