<template>
  <el-container class="enterprise-signin-page">
    <el-main class="main">
      <div class="enterprise-signin-page-content-container">
        <div class="page-title">
          <!-- 项目名字 -->
          <div class="name">前端项目通用模板</div>
        </div>

        <div class="signin-form-container">
          <div class="title">
            <div>
              <img src="/static/images/logo-icon.png" alt />
            </div>
          </div>
          <el-form class="signin-form" :model="form" :rules="formRules" :inline-message="true" ref="signinForm">
            <div class="account-input">
              <el-form-item prop="account">
                <el-input placeholder="请输入账号" id="accountNumber" v-model="form.account">
                  <template slot="prepend">
                    <img src="@/assets/icons/user.png" class="account-input-prefix" />
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="form.password" type="password" @keyup.enter.native="makeLogin">
                  <template slot="prepend">
                    <img src="@/assets/icons/secret.png" class="password-input-prefix" />
                  </template>
                </el-input>
              </el-form-item>
            </div>

            <el-form-item class="login-button-wrapper">
              <div>
                <el-button type="primary" :loading="submiting" class="login-button" @click.stop.prevent="makeLogin">登录</el-button>
              </div>
            </el-form-item>
            <div class="login-bottom">
              <el-checkbox style="color:#666;" v-model="form.remember">记住密码</el-checkbox>
            </div>
          </el-form>
        </div>
      </div>
    </el-main>

    <el-footer class="footer" height="80px">
      <div class="browser">
        <img src="@/assets/icons/chrome.png" />
        建议使用谷歌浏览器
        <a href="http://www.chromeliulanqi.com/" target="_blank">点击下载</a>
      </div>
      <div class="copyright">Copyright&copy;2020 &nbsp;&nbsp; Development By Code_J &nbsp;&nbsp; Thanks For Your Use!</div>
    </el-footer>
  </el-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import storage from '@/modules/storage'
  import { signIn, updateSession } from '@/modules/authentication'

  export default {
    name: 'Signin',

    data () {
      const rememberedAccount = storage.get('remembered-account')
        ? storage.get('remembered-account')
        : storage.getLocal('remembered-account')

      return {
        submiting: false,
        submitingCarousel: false,

        form: {
          account: rememberedAccount ? rememberedAccount.account : null,
          password: rememberedAccount ? rememberedAccount.password : null,
          remember: !!rememberedAccount
        },

        formRules: {
          account: { required: true, message: '请输入账号', trigger: 'blur' },
          password: { required: true, message: '请输入密码', trigger: 'blur' }
        }
      }
    },

    computed: {
      ...mapState('account', { user: 'model', sysName: 'sysName' })
    },

    async created () {
      this.getConfigPath({ url: window.location.origin })
    },

    methods: {
      ...mapActions('account', {
        loadAccount: 'loadData',
        getConfigPath: 'getConfigPath'
      }),

      async makeLogin () {
        try {
          const valid = await this.$refs.signinForm.validate()
          if (valid) {
            this.submiting = true
            const signined = await signIn(this.form)
            if (signined) {
              await this.loadAccount()
              storage.set('isCarousel', false)
              if (this.form.remember) {
                storage.set('remembered-account', this.form)
              } else storage.remove('remembered-account')
              updateSession({ user: this.user })
              this.$router.push({ path: '/' })
            }

            this.submiting = false
          }
        } catch (error) {
          this.submiting = false
        }
      },

      async makeCarousel () {
        try {
          const valid = await this.$refs.signinForm.validate()
          if (valid) {
            this.submitingCarousel = true
            const signined = await signIn(this.form, '/screen')

            if (signined) {
              await this.loadAccount()
              storage.set('isCarousel', true)
              // 是否记住密码
              if (this.form.remember) {
                storage.set('remembered-account', this.form)
                storage.setLocal('remembered-account', this.form)
              } else {
                storage.remove('remembered-account')
                storage.removeLocal('remembered-account', this.form)
              }
              updateSession({ user: this.user })
              this.$router.push({ name: 'carousel' })
            }

            this.submitingCarousel = false
          }
        } catch (error) {
          this.submitingCarousel = false
        }
      }
    }
  }
</script>

<style lang="scss">
  @media screen and (min-aspect-ratio: 12/5) {
    .enterprise-signin-page {
      .enterprise-signin-page-content-container {
        .signin-form-container {
          position: absolute;
          bottom: 20%;
          right: 17% !important;
          height: 65%;
          width: 35% !important;
          border-radius: 3px;
        }
      }
    }
  }
  @media screen and (max-width: 1550px) {
    .enterprise-signin-page {
      .enterprise-signin-page-content-container {
        .signin-form-container {
          position: absolute;
          bottom: 20%;
          right: 9% !important;
          height: 65%;
          width: 40% !important;
          border-radius: 3px;
        }
      }
    }
  }
  .enterprise-signin-page {
    // background: url('../../assets/images/e-login-bg.png') no-repeat;
    background-image: url('/static/images/beijing-bottom.png');
    background-repeat: no-repeat;
    background-position: center top;
    height: 100%;
    position: relative;
    min-width: 1000px;
    min-height: 600px;
    .enterprise-signin-page-content-container {
      position: relative;
      width: 60%;
      min-width: 900px;
      height: 85%;
      min-height: 550px;
      background-image: url('/static/images/beijing-top.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center top;
      position: absolute;
      top: 53%;
      left: 50%;
      transform: translate(-50%, -50%);
      .page-title {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        height: 10%;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        .logo {
          width: 64px;
          height: 64px;
          margin-right: 16px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .name {
          font-size: 36px;
          font-weight: 500;
          color: #fff;
        }
      }

      .signin-form-container {
        position: absolute;
        bottom: 20%;
        right: 9%;
        height: 65%;
        width: 40%;
        border-radius: 3px;
        // background: rgba(255, 255, 255, 1);

        .title {
          // background: #fff;
          // opacity: 0.17;
          height: 25%;
          line-height: 110px;
          text-align: center;
          color: #333;
          font-size: 20px;
          // margin: 42px 0 21px;
          display: flex;
          justify-content: center;
          align-items: center;
          > div:first-child {
            display: table-cell;
            > img {
              width: 76px;
              vertical-align: middle;
              margin-right: 9px;
            }
          }
          > div:nth-child(2) {
            font-size: 32px;
          }
        }

        // .footer {
        //   height: 38px;
        //   background: rgba(32, 53, 128, 0.01);
        //   box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.07);
        // }

        .signin-form {
          height: 75%;
          min-height: 300px;
          // padding: 20px 15px;
          border-radius: 0 0 5px 5px;
          // background: #fff;
          // opacity: 0.17;
          .account-input {
            height: 50%;
            min-height: 180px;
            padding-top: 10px;
            box-sizing: border-box;
          }
          .account-input-prefix {
            width: 20px;
            height: 20px;
          }

          .password-input-prefix {
            width: 16px;
            height: 20px;
            margin: 0 2px;
          }

          .el-form-item {
            width: 100%;
            margin: 0 auto 25px;

            &.is-error {
              .el-input__inner,
              .el-input-group__prepend {
                border: 0;
              }

              .el-input-group {
                border: 1px solid #f56c6c;
                border-radius: 4px;
              }
            }

            &.is-success {
              .el-input__inner,
              .el-input-group__prepend {
                border: 0;
              }
              .el-input {
                height: 44px !important;
                border: 1px solid rgba(210, 210, 210, 1) !important;
                border-radius: 22px !important;
                overflow: hidden !important;
              }
              .el-input-group {
              }
            }
            .el-form-item__content {
              .el-input {
                height: 44px !important;
                border: 1px solid rgba(210, 210, 210, 1) !important;
                border-radius: 22px !important;
                overflow: hidden !important;
                .el-input-group__prepend {
                  border: 0;
                }
                .el-input__inner {
                  border: 0;
                  background: transparent;
                }
                .el-input__inner::-webkit-input-placeholder {
                  background-color: transparent;
                }
              }
            }
          }

          .el-form-item:not(.is-error) {
            .el-input__inner:hover,
            .el-input__inner:focus {
              // border-color: #dcdfe6;
            }
          }
          .el-checkbox__inner {
            // background-color: transparent !important;
          }
          .el-input__inner {
            background-color: transparent !important;
            color: #666;
          }

          input {
            height: 50px;
            border-left: 0;
          }

          .el-form-item__content {
            line-height: normal;

            .el-input-group__prepend {
              background: transparent;
              padding-right: 0;
            }
          }

          .login-button-wrapper {
            margin-bottom: 0 !important;
            .el-form-item__content {
              display: flex;
              justify-content: space-between;
              width: 100%;
              > div {
                width: 100%;
                text-align: center;
              }
              > div:first-child {
                margin-bottom: 10px;
              }
            }

            .login-button {
              width: 100%;
              height: 50px;
              background: linear-gradient(
                305deg,
                rgba(0, 126, 229, 1) 0%,
                rgba(5, 179, 255, 1) 100%,
                rgba(85, 51, 255, 1) 100%
              );
              border-radius: 14px;
              // border: 1px solid rgba(32, 53, 128, 0.16);
              font-size: 24px;
              color: #fff;
            }
          }
          .login-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            .carousel-button {
              // width: 20%;
              // height: 50px;
              color: #2784e8;
              font-size: 18px;
              background: transparent;
              border: 0;
              // padding: 12px 14px;
              > span {
                display: flex;
                justify-content: center;
                > i {
                  margin-right: 10px;
                }
              }
              .carousel-button-warpper {
              }
            }
          }
        }
      }
    }
    .android-app-qrcode {
      position: absolute;
      bottom: 15px;
      right: 15px;
      width: 120px;
      color: #333;
      font-size: 14px;
      text-align: center;
      color: #fff;

      img {
        width: 100%;
        height: auto;
        vertical-align: top;
        margin-top: 10px;
      }
    }

    .main {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    > .footer {
      text-align: center;
      color: #626262;
      font-size: 12px;
      color: #fff;

      .browser {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;

        img {
          width: 15px;
          height: 15px;
          margin-right: 6px;
        }

        a {
          color: #37a9fa;
          text-decoration: none;
          margin-left: 6px;
        }
      }

      .copyright p {
        margin-top: 5px;
      }
    }
  }
</style>
