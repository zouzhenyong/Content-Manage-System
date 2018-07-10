<template>
    <div class="login_container">
        <img class="logo" src="../../assets/img/logo_s.png" alt="">
        <div class="page-container">
            <h1>Login Backstage</h1>
            <p v-if="!loginFlag" class="loginError">用户名或密码错误！</p>
            <form id="form" action="/login" method="POST">
                <input v-model="admin" type="text" name="admin" class="username" placeholder="Admin">
                <input v-model="pwd" type="password" name="pwd" class="password" placeholder="Password">
                <button @click="clickLogin" type="button">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

const IP = "http://192.168.0.121:3223";

export default {
  data() {
    return {
      admin: "",
      pwd: "",
      loginFlag: true
    };
  },
  methods: {
    clickLogin() {
      axios
        .post(IP + "/login", { admin: this.admin, pwd: this.pwd })
        .then(res => {
          if (res.data) {
            this.$router.push("/main");
            // 存用户数据
            console.log(res.data)
            let adminArr = {
              admin: res.data[0].admin,
              id: res.data[0]._id
            };
            sessionStorage.admins = JSON.stringify(adminArr);
            let getadmins = sessionStorage.admins;
            JSON.parse(getadmins);
          } else {
            this.loginFlag = false;
          }
        });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.login_container {
  width: 100%;
  height: 727px;
  background: url("../../assets/img/backgrounds/1.jpg");
  font-family: "PT Sans", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.loginError {
  color: #ef4300;
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: -25px;
}
.logo {
  position: absolute;
  left: 80px;
  top: 40px;
  width: 160px;
}
.page-container {
  margin: 160px auto 0 auto;
}

h1 {
  font-size: 30px;
  font-weight: 700;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

form {
  position: relative;
  width: 305px;
  margin: 15px auto 0 auto;
  text-align: center;
}

input {
  width: 270px;
  height: 42px;
  margin-top: 35px;
  padding: 0 15px;
  background: #2d2d2d; /* browsers that don't support rgba */
  background: rgba(45, 45, 45, 0.15);
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #3d3d3d; /* browsers that don't support rgba */
  border: 1px solid rgba(255, 255, 255, 0.15);
  -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  font-family: "PT Sans", Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -o-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -ms-transition: all 0.2s;
}

input:-moz-placeholder {
  color: #fff;
}
input:-ms-input-placeholder {
  color: #fff;
}
input::-webkit-input-placeholder {
  color: #fff;
}

input:focus {
  outline: none;
  -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
}

button {
  cursor: pointer;
  width: 300px;
  height: 44px;
  margin-top: 25px;
  padding: 0;
  background: #ef4300;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #ff730e;
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  font-family: "PT Sans", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -o-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -ms-transition: all 0.2s;
}

button:hover {
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
}

button:active {
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1) inset,
    0 1px 4px 0 rgba(0, 0, 0, 0.1);

  border: 0px solid #ef4300;
}

.error {
  display: none;
  position: absolute;
  top: 27px;
  right: -55px;
  width: 40px;
  height: 40px;
  background: #2d2d2d; /* browsers that don't support rgba */
  background: rgba(45, 45, 45, 0.25);
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
}

.error span {
  display: inline-block;
  margin-left: 2px;
  font-size: 40px;
  font-weight: 700;
  line-height: 40px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -o-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
}

.connect {
  width: 305px;
  margin: 35px auto 0 auto;
  font-size: 18px;
  font-weight: 700;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.connect a {
  display: inline-block;
  width: 32px;
  height: 35px;
  margin-top: 15px;
  -o-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -ms-transition: all 0.2s;
}
</style>
