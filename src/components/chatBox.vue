<template>
  <div class="chatView">
    <div class="chat">
      <div class="chat__header justify-content-around">
        <md-avatar class="md-large">
          <!-- https://avatars.githubusercontent.com/u/32813584?s=60&v=4 -->
          <img v-if="authPeer" :src="getAvatar(authPeer.URL)" />
          <!-- <img else src="logo.png" /> -->
        </md-avatar>
        <div class="chat__headerInfo">
          <h3>{{ authPeer ? authPeer.name : "Gazwah Chat" }}</h3>
          <p>{{ authPeer ? 'Last seen at ...' : 'Select Contact'}}</p>
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
        <div v-for="chat in listMessage" :key="chat.id">
          <p
            :class="
              chat.idFrom === currentUserId
                ? 'chat__message'
                : 'chat__message chat__reciever'
            "
          >
            {{ chat.content }}
          </p>
        </div>
      </div>
      <div class="chat__footer">
        <md-icon class="mr-2">insert_emoticon</md-icon>
        <form v-on:submit.prevent="sendMessage(inputValue)">
          <md-field>
            <label>Type here!</label>
            <md-input v-model="inputValue"></md-input>
          </md-field>
          <button type="submit">send a message</button>
        </form>
        <md-icon class="ml-2">mic</md-icon>
      </div>
    </div>
    <!-- <div class="" v-else>select contact</div> -->
  </div>
</template>

<script>
import fb from "../fb";
import moment from "moment";
export default {
  props: ["authPeer"],
  data() {
    return {
      currentUserName: localStorage.getItem("name"),
      currentUserId: localStorage.getItem("id"),
      currentUserPhoto: localStorage.getItem("photoURL"),
      inputValue: "",
      photoURL: localStorage.getItem("photoURL"),
      listMessage: [],
      groupChatId: null,
    };
  },

  methods: {
    getAvatar(value) {
      if(value == ""){
        return 'images/profile.png';
      } else { 
        return value;
      }
    },
    sendMessage(content) {
      if (content.trim() == "") {
        return;
      }
      const timestamp = moment().valueOf().toString();
      const message = {
        id: timestamp,
        idFrom: this.currentUserId,
        idTo: this.authPeer.id,
        timestamp: timestamp,
        content: content.trim(),
      };
      fb.firestore()
        .collection("Messages")
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .doc(timestamp)
        .set(message)
        .then(() => {
          this.inputValue = "";
        });
      console.log("mess", message);
    },

    getMessages() {
      console.log("call coming");
      this.listMessage = [];
      // here we are creating a room
      let groupChatId = `${this.authPeer.id} + ${this.currentUserId}`;
      fb.firestore()
        .collection("Messages")
        .doc(groupChatId)
        .collection(groupChatId)
        .onSnapshot((Snapshot) => {
          if (Snapshot.docChanges().length > 0) {
            this.groupChatId = groupChatId;
            Snapshot.docChanges().forEach((res) => {
              this.listMessage.push(res.doc.data());
            });
          } else {
            console.log("call cmng 1");
            this.groupChatId = `${this.currentUserId} + ${this.authPeer.id}`;
            fb.firestore()
              .collection("Messages")
              .doc(this.groupChatId)
              .collection(this.groupChatId)
              .onSnapshot((Snapshot) => {
                Snapshot.docChanges().forEach((res) => {
                  console.log("res", res);
                  if (res.type === "added") {
                    this.listMessage.push(res.doc.data());
                  }
                });
              });
          }
        });
    },
  },

  watch: {
    authPeer: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getMessages();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// chatView
.chatView {
  width: 75%;
}
.chat {
  flex: 0.7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chat__header {
  padding: 8px;
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
  margin: 3px;
  padding: 0 15px;
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
</style>
