<template>
  <div>
    <h2>Dashboard</h2>
    <Button @click="getDataAuth">Auth Data</Button>
    <Button class="ms-2" @click="getUser">User</Button>
    <img :src="avatar" alt="" />
    <!-- <div class="upload">
      <v-container>
        <v-layout row>
          <v-flex class="text-center font-weight-black">
            <h4>Avatar</h4>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex md6 offset-sm3>
            <div class="imgUpload">
              <div class="" v-if="imageData != null">
                <v-avatar size="90">
                  <img
                    :src="img1"
                    class="preview"
                    height="268"
                    width="268"
                    alt=""
                  />
                </v-avatar>
                <br />
              </div>
              <div class="">
                <v-btn
                  @click="click1"
                  icon
                  large
                  style="background-color: #dadada"
                >
                  <v-icon>mdi-image-plus</v-icon>
                </v-btn>
                <input
                  type="file"
                  ref="input1"
                  style="display: none"
                  @change="previewImage"
                  accept="image/"
                />
              </div>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex class="text-center" md6 offset-sm3>
            <v-text-field
              solo
              v-model="caption"
              label="caption type"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex class="text-center">
            <v-btn color="pink" @click="create">upload</v-btn>
          </v-flex>
        </v-layout>
      </v-container> -->
    </div>
  </div>
</template>

<script>
import fire from "../fb";
import db from "../fs";
export default {
  name: "dashboard",
  data() {
    return {
      caption: "",
      img1: "",
      email: null,
      avatar: localStorage.getItem("photoURL"),
      imageData: null,
    };
  },
  mounted() {
    this.email = fire.auth().currentUser.email;
    console.log(this.email);
  },

  methods: {
    create() {
      console.log(this.caption);
      const post = {
        photo: this.img1,
        capton: this.caption,
      };

      fire
        .database()
        .ref("PhotoGallery")
        .push(post)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      this.imageData = null;
    },

    click1() {
      this.$refs.input1.click();
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },

    onUpload() {
      this.img1 = null;
      const storageRef = fire
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            console.log(this.img1);
          });
        }
      );
    },
    update() {
      const user = fire.auth().currentUser;
      user
        .updateProfile({
          displayName: "Jane Q. User",
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
        .then(() => {
          // Update successful
          alert("Successfully registered! Please login.");
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    },

    getUser() {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var user = {
              id: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              url: doc.data().URL,
            };
            // this.user = `${doc.id} => ${doc.data}`;
            console.log(user);
          });
        });
    },

    addData() {
      db.collection("users")
        .add({
          first: "Ada",
          last: "Lovelace",
          born: 1815,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },

    getDataAuth() {
      const user = fire.auth().currentUser;

      if (user !== null) {
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.name);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.URL);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.imgUpload {
  display: flex;
  align-items: center;
}
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons");
#app {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
}
.login {
  background: #fff;
  width: 40%;
  height: 50vh;
  margin: auto;
  padding-left: 20px;
  padding-right: 20px;
}
h3 {
  font-size: 30px;
  text-align: center;
}
input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  padding-left: 2px;
  padding-right: 2px;
}
.message-body {
  width: 40%;
  height: 80vh;
  margin: auto;
}
.message-text {
  min-width: 10%;
  border-radius: 4px;
}
.message {
  font-size: 14px;
}
.mg-text {
  color: rgb(0, 195, 255);
  font-weight: bolder;
}
.message-body input {
  width: 80%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  height: 6vh;
  padding-left: 2px;
  padding-right: 2px;
}
.card {
  width: 100%;
  height: 75vh;
  margin: auto;
}
.card-body {
  min-height: 50vh;
  overflow-x: scroll;
}
</style>
