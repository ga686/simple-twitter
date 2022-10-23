"use strict";(self["webpackChunksimple_twitter"]=self["webpackChunksimple_twitter"]||[]).push([[159],{7159:function(e,a,t){t.r(a),t.d(a,{default:function(){return d}});var s=function(){var e=this,a=e._self._c;return a("div",{staticClass:"container"},[e._m(0),a("form",{on:{submit:function(a){return a.preventDefault(),a.stopPropagation(),e.handleSubmit.apply(null,arguments)}}},[a("div",{staticClass:"form-label-group",class:{accountDuplicated:e.accountDuplicated}},[a("label",{attrs:{for:"account"}},[e._v("帳號")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.account,expression:"account"}],attrs:{id:"account",name:"account",autofocus:"",type:"name",placeholder:"請輸入帳號",autocomplete:"account",required:""},domProps:{value:e.account},on:{input:function(a){a.target.composing||(e.account=a.target.value)}}})]),a("div",{staticClass:"form-label-group",class:{overLimit:e.overlimit}},[a("label",{attrs:{for:"name"}},[e._v("名稱")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{id:"name",name:"name",type:"name",placeholder:"請輸入使用者名稱",autocomplete:"name",maxlength:"50",required:""},domProps:{value:e.name},on:{blur:function(a){return e.checkName(e.name)},input:function(a){a.target.composing||(e.name=a.target.value)}}})]),a("div",{staticClass:"form-label-group",class:{emailDuplicated:e.emailDuplicated}},[a("label",{attrs:{for:"email"}},[e._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{id:"email",name:"email",type:"email",placeholder:"請輸入Email",autocomplete:"email",required:""},domProps:{value:e.email},on:{input:function(a){a.target.composing||(e.email=a.target.value)}}})]),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"password"}},[e._v("密碼")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{id:"password",name:"password",type:"password",placeholder:"請輸入密碼",autocomplete:"password",required:""},domProps:{value:e.password},on:{input:function(a){a.target.composing||(e.password=a.target.value)}}})]),a("div",{staticClass:"form-label-group",class:{errorPassword:e.errorPassword}},[a("label",{attrs:{for:"passwordCheck"}},[e._v("密碼確認")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordCheck,expression:"passwordCheck"}],attrs:{id:"passwordCheck",name:"passwordCheck",type:"password",placeholder:"請再次輸入密碼",autocomplete:"passwordCheck",required:""},domProps:{value:e.passwordCheck},on:{input:function(a){a.target.composing||(e.passwordCheck=a.target.value)}}})]),a("button",{staticClass:"btn"},[e._v("註冊")])]),a("div",{staticClass:"other-link d-flex justify-content-center"},[a("router-link",{attrs:{to:"/signIn"}},[a("div",{staticClass:"btn-cancel"},[a("u",[e._v("取消重填")])])])],1)])},r=[function(){var e=this,a=e._self._c;return a("div",{staticClass:"header"},[a("img",{staticClass:"logo",attrs:{src:t(6949),alt:""}}),a("h3",[e._v("建立你的帳號")])])}],o=(t(7658),t(7214)),i=t(3507),n={data(){return{account:"",email:"",name:"",password:"",passwordCheck:"",accountDuplicated:!1,emailDuplicated:!1,errorPassword:!1,overlimit:!1}},methods:{checkName(e){if(e.length>=50)return i.Z9.warning("字數超過上限50個字"),this.overlimit=!0,void(this.disable=!0)},async handleSubmit(){try{if(!this.account||!this.email||!this.name||!this.password||!this.passwordCheck)return void i.Z9.warning("請確認已填寫所有欄位");if(this.name.length>=50)return i.Z9.warning("字數超出上限！"),void(this.overlimit=!0);const{data:e}=await o.Z.signUp({account:this.account.toLowerCase(),name:this.name,email:this.email.toLowerCase(),password:this.password,checkPassword:this.passwordCheck});if("error"===e.status)throw new Error;i.Z9.success("註冊成功"),this.$router.push("/signin")}catch(e){const a=e.response.data.message;if("Error: Account already exists!"===a)return i.Z9.error("帳號已被註冊"),void(this.accountDuplicated=!0);if("Error: Email already exists!"===a)return i.Z9.error("信箱已被註冊"),void(this.emailDuplicated=!0);"Error: Passwords do not match!"===a&&(i.Z9.error("密碼輸入有誤"),this.errorPassword=!0)}}},watch:{account(){this.accountDuplicated=!1},name(){this.name.length>=50&&(this.overlimit=!0),this.overlimit=!1},email(){this.emailDuplicated=!1},passwordCheck(){this.errorPassword=!1}}},l=n,c=t(1001),u=(0,c.Z)(l,s,r,!1,null,"477800fe",null),d=u.exports}}]);
//# sourceMappingURL=159.a9803cbf.js.map