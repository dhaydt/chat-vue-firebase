<template>
  <div class="login">
    <Row type="flex" justify="center">
      <Col>
        <Card style="width:350px">
          <h3>Login</h3>
          <Form
            @submit.prevent="login"
            ref="formInline"
            :model="formInline"
            :rules="ruleInline"
          >
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
              <Button
                type="primary"
                :loading="loading"
                @click="handleSubmit('formInline')"
              >
                <span v-if="!loading">Login</span>
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

export default {
  data() {
    return {
      loading: false,
      isLoggedIn: false,
      formInline: {
        email: "",
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
  mounted() {
    if (this.isLoggedIn == true) {
      console.log(this.isLoggedIn);
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleSubmit(email) {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.formInline.email,
          this.formInline.password
        )
        .then(async (res) => {
          console.log("res", res);
          if (res.user) {
            await firebase
              .firestore()
              .collection("users")
              .where("id", "==", res.user.uid)
              .get()
              .then((querySnapshot) => {
                console.log("query", querySnapshot);
                querySnapshot.forEach((doc) => {
                  let userData = doc.data();
                  // console.log(userData.id);
                  localStorage.setItem("id", userData.id);
                  localStorage.setItem("name", userData.name);
                  localStorage.setItem("email", userData.email);
                  localStorage.setItem("password", userData.password);
                  localStorage.setItem("photoURL", userData.URL);
                  localStorage.setItem("desc", userData.desc);
                  localStorage.setItem("FirebaseDocumentId", doc.id);
                });
              });
          }
        })
        .then(() => {
          this.isLoggedIn = true;
          this.$emit("authCheck", this.isLoggedIn);
          console.log(this.isLoggedIn);
          this.$router.push("/dashboard");
          // this.$Notice.success({
          //   title: "Successfully logged in",
          //   desc: "You logged in as " + this.formInline.email,
          // });
          this.$Message.success("Successfully logged in");
        })
        .catch((error) => {
          this.$Notice.error({
            title: this.formInline.email + " not found",
            desc: error.message,
          });
          this.loading = false;
          // this.$Message.error(error.message);
        });
    },
  },
};
</script>
