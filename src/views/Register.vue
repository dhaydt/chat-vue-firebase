<template>
  <div class="register">
    <Row type="flex" justify="center">
      <Col>
        <Card style="width: 350px">
          <h3>Register</h3>
          <Form
            @submit.prevent="login"
            ref="formInline"
            :model="formInline"
            :rules="ruleInline"
          >
            <FormItem prop="name">
              <Input type="text" v-model="formInline.name" placeholder="Name">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="email">
              <Input
                type="email"
                v-model="formInline.email"
                placeholder="Email address"
              >
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input
                type="password"
                v-model="formInline.password"
                placeholder="Password"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <div class="upload">
                <v-container class="d-flex align-items-center p-0">
                  <!-- <v-layout> -->
                  <!-- <v-flex class="text-left pl-1 font-weight-black"> -->
                  <div class="iconUpload">
                    <v-icon style="font-size: 18px; color: #adb2ba"
                      >mdi-account-box-multiple</v-icon
                    >
                  </div>
                  <!-- </v-flex> -->
                  <!-- </v-layout> -->

                  <v-layout row>
                    <v-flex md6 offset-sm3>
                      <div class="imgUpload">
                        <div class="avatar" v-if="imageData != null">
                          <v-btn :loading="loadingImg" icon large>
                            <v-avatar
                              size="80"
                              style="margin-top: -20px; margin-bottom: -20px"
                            >
                              <img
                                :src="img1"
                                class="preview"
                                :loading="loadingImg"
                                height="268"
                                width="268"
                                alt=""
                              />
                              <span v-if="!loadingImg"></span>
                              <span v-else></span>
                            </v-avatar>
                          </v-btn>
                          <br />
                        </div>
                        <div class="btnUpload" v-else>
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
                            required
                            style="display: none"
                            @change="previewImage"
                            accept="image/"
                          />
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                :loading="loading"
                @click="handleSubmit('formInline')"
              >
                <span v-if="!loading">Register</span>
                <span v-else>wait...</span>
              </Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import firebase from "../fb";
import db from "../fs";

export default {
  data() {
    return {
      img1: "",
      imageData: null,
      loading: false,
      loadingImg: true,
      formInline: {
        email: "",
        name: "",
        password: "",
      },
      ruleInline: {
        email: [
          {
            required: true,
            message: "Please fill in the user email",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur",
            type: "string",
          },
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur",
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    click1() {
      this.$refs.input1.click();
    },

    previewImage(event) {
      this.loadingImg = true;
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },

    onUpload() {
      this.img1 = null;
      const storageRef = firebase
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
            this.loadingImg = false;
            console.log(this.img1);
          });
        }
      );
    },

    handleSubmit(email) {
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.formInline.email,
          this.formInline.password
        )
        .then((cred) => {
          return db.collection("users").doc(cred.user.uid).set({
            email: this.formInline.email,
            name: this.formInline.name,
            id: cred.user.uid,
            passwrod: this.formInline.password,
            URL: this.img1,
            desc: "",
          });
        })
        .then(() => {
          this.$Notice.success({
            title: "Successfully registered as " + this.formInline.name,
            desc: "Please login to continue",
          });
          // alert("Successfully registered! Please login.");
          this.$router.push("/");
        })
        .catch((error) => {
          this.$Notice.error({
            title: "Failed ",
            desc: error.message,
          });
          this.loading = false;
          // alert(error.message);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.upload {
  border: solid 1px #dcdee2;
  display: flex;
}

.imgUpload {
  display: flex;
  margin: 15px 0 15px 0;
  justify-content: space-evenly;
}

.iconUpload {
  background-color: #f8f8f9;
  border: solid 1px #dcdee2;
  padding: 5px;
}
.avatar {
  margin: 15px 0 15px 0;
}
</style>