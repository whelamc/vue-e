<template>
    <div id="index">
      <div class="index-bg">
        <img src="static/img/index.png">
      </div>
      <div class="index-btn-group">
        <ul>
          <li v-for="item in types">
            <a :class="item.cl" :key="item.id" @click="popopen(item.ea)"><i class="el-icon-" :style="{backgroundImage: 'url(' + item.bg + ')'}"></i><p>{{item.ia}}</p></a>
          </li>
        </ul>
      </div>
      <div class="clearfix"></div>
      <div class="index-wrapper">
        <ul>
　　　　　　<li v-for="(value,key) in list" >
              <i v-if=" value === 'in_gh' " :style="{backgroundImage: 'url(static/img/i26.png)'}"></i>
              <i v-if=" value === 'in_ghth' " :style="{backgroundImage: 'url(static/img/i26.png)'}"></i>
              <i v-if=" value === 'damage' " :style="{backgroundImage: 'url(static/img/i31.png)'}"></i>
              <i v-if=" value === 'used' " :style="{backgroundImage: 'url(static/img/i29.png)'}"></i>
              <i v-if=" value === 'in_room_other' " :style="{backgroundImage: 'url(static/img/i33.png)'}"></i>
              <i v-if=" value === 'take_stock' " :style="{backgroundImage: 'url(static/img/i29.png)'}"></i>
              <i v-else :style="{backgroundImage: 'url(static/img/i31.png)'}"></i>
              <span v-if=" value === 'in_gh' " @click="selectS(value,key)">物资入库：{{key}}未保存确认点击进入</span>
              <span v-if=" value === 'in_ghth' " @click="selectS(value,key)">入库退货：{{key}}未保存确认点击进入</span>
              <span v-if=" value === 'damage' " @click="selectS(value,key)">物资报损：{{key}}未保存确认点击进入</span>
              <span v-if=" value === 'used' " @click="selectS(value,key)">领用物资：{{key}}未保存确认点击进入</span>
              <span v-if=" value === 'in_room_other' " @click="selectS(value,key)">领用退回：{{key}}未保存确认点击进入</span>
              <span v-if=" value === 'take_stock' " @click="selectS(value,key)">物资盘点：{{key}}未保存确认点击进入</span>
              <span v-else @click="selectS(value,key)">{{key}}</span>
              <span class="index-del" @click="delclick(key)">X</span>
            </li>
        </ul>
      </div>
      <div class="index-foo">
        <router-link class="index-foo-a" to="/">首页</router-link>
        <a class="index-foo-a scan" @click="scantype"><i class='el-icon-' :style="{backgroundImage: 'url(static/img/i36.png)'}"></i>快速扫描</a>
        <router-link class="index-foo-a" to="/user">个人中心</router-link>
      </div>
<mt-popup
  class="index-pop"
  v-model="popupIndex"
  position="bottom">
  <button type="button" @click="popclick1">浏览单据</button>
  <button type="button" @click="popclick2">填写单据</button>
  <div class="popclear"></div>
  <button type="button" @click="popdiss">取消</button>
</mt-popup>
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'index',
    data () {
      return {
        msg: 'Welcome to whelamc',
　　　　active: false,
        list: '',
        click: '',
        popupIndex: false,
        users: {"545":"in","3315645634564564564564564564564564564564564564564564564":"in","1321":"out"},
        test: [{type: "in_gh", name: "入库"}, {type: "in_ghth", name: "入库退货"}, {type: "damage", name: "物资报损"}, {type: "used", name: "领用物资"}, {type: "in_room_other", name: "领用退回"}, {type: "take_stock", name: "物资盘点"}],
        types: [
　　　　　　{ia:'物资入库', ea: 0, cl: 'ifirst', bg: 'static/img/i03.png'},
　　　　　　{ia:'入库退货', ea: 1, cl: 'isecond', bg: 'static/img/i06.png'},
　　　　　　{ia:'物资报损', ea: 2, cl: 'ithird', bg: 'static/img/i08.png'},
　　　　　　{ia:'领用物资', ea: 3, cl: 'ifourth', bg: 'static/img/i14.png'},
　　　　　　{ia:'领用退回', ea: 4, cl: 'ififth', bg: 'static/img/i17.png'},
　　　　　　{ia:'物资盘点', ea: 5, cl: 'isixth', bg: 'static/img/i20.png'}
        ]
      }
    },
    created() {
      var n = window.localStorage.getItem('userData')
      var list = window.localStorage.getItem(n)
      var l = JSON.parse(list)
      if(!list){console.log("没有数据")}else{this.list = l}
    },
    methods: {
　　　　selectS (item,index) {
            console.log(index)
            setTimeout(
              ()=>this.$router.push({
              'path':'/coms',
              'query': {"formnums": index, "formType": item, 'formFrom': 0},
            }),10)
　　　　},
        popopen(index){
          this.popupIndex = true
          this.click = index
        },
        popdiss(){
          this.popupIndex = false
        },
        popclick1(){
          setTimeout(
            ()=>this.$router.push({
            'path':'/comf',
            'query': {"type": this.click},
          }),100)
        },
        popclick2(){
          setTimeout(
            ()=>this.$router.push({
            'path':'/coms',
            'query': {"type": this.click, 'formFrom': 0},
          }),100)
        },
        delclick(a) {
          MessageBox.confirm('确定执行此操作?').then(action => {
              var n = window.localStorage.getItem('userData')
              var list = window.localStorage.getItem(n)
              var lp = JSON.parse(list)
              delete(lp[a])
              var ls = JSON.stringify(lp)
              window.localStorage.setItem(n,ls)
              this.list = lp
          }, (err) =>{console.log('取消删除！')}
          )
        },
        scantype(){
            window.broadcaster.addEventListener( "didShow", function(e){  
                //log: return js received! userInfo: {"data":"test"}  
                console.log( "return js received! userInfo: " + JSON.stringify(e))
            })
        }
    }
  }

</script>

<style scoped>
  .index-pop {
    width: 100%;
    min-height: 3.875rem 
  }
  .index-pop > button {
    width: 100%;
    border: 0;
    font-size: 20px;
    color: #666;
    height: 1.25rem;
    text-align: center;
    line-height: 1.25rem;
  }
  .index-pop > button:first-child {
    border-bottom: 1px solid #c9c9c9
  }
  .popclear {
    background-color: #c9c9c9;
    width: 100%;
    clear: both;
    height: 0.25rem;
    overflow: hidden;
  }
  .clearfix {
    background-color: #f0f0f0;
    width: 100%;
    clear:both;
    height: 0.25rem;
    overflow:hidden
  }
  .index-bg {
    width: 100%; 
    margin: 0 auto;
    height: 100%;
  }
  .index-bg img {
    width: 100%;
  }
  .index-btn-group {
    padding-top: 0.125rem;
    padding-bottom: 0.375rem;
  }
  .index-btn-group ul{
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Chrome */
    display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-justify-content: center;
    -moz-justify-content: center;
    -ms-justify-content: center;
    -o-justify-content: center;
    justify-content: center;
    list-style-type: none;
    width: 100%;
    margin: 0 auto;
  }
  .index-btn-group > ul > li{
    width: 2.8rem;
    text-align: center;
    padding: .1rem
  }
  .index-btn-group > ul > li > a{
    color: #fff;
    display: block;
    border-radius: 10px;
    width: 2.8rem;
    height: 2.1rem;
    font-size: 16px;
    text-decoration: none
  }
  .index-btn-group > ul > li a.ifirst{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#158cfa,endcolorstr=#2bdcff,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#158cfa,endcolorstr=#2bdcff,gradientType=0); 
    background:#158cfa; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(top, #158cfa, rgba(43, 220, 255, 1));  
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#158cfa), to(rgba(43, 220, 255, 1))); 
  }
  .index-btn-group > ul > li a.isecond{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#34b702,endcolorstr=#65df38,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#34b702,endcolorstr=#65df38,gradientType=0); 
    background:#34b702; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(top, #34b702, rgba(101, 223, 56, 1));  
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#34b702), to(rgba(101, 223, 56, 1))); 
  }
  .index-btn-group > ul > li a.ithird{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#f66a53,endcolorstr=#ff993f,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#f66a53,endcolorstr=#ff993f,gradientType=0); 
    background:#f66a53; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(top, #f66a53, rgba(225, 153, 63, 1));  
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#f66a53), to(rgba(225, 153, 63, 1))); 
  }
  .index-btn-group > ul > li a.ifourth{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#c45bfd,endcolorstr=#fb7fe4,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#c45bfd,endcolorstr=#fb7fe4,gradientType=0); 
    background:#c45bfd; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(top, #c45bfd, rgba(251, 127, 228, 1));  
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#c45bfd), to(rgba(251, 127, 228, 1))); 
  }
  .index-btn-group > ul > li a.ififth{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#f9b103,endcolorstr=#fed71c,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#f9b103,endcolorstr=#fed71c,gradientType=0); 
    background:#f9b103; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(top, #f9b103, rgba(254, 215, 28, 1));  
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#f9b103), to(rgba(254, 215, 28, 1))); 
  }
  .index-btn-group > ul > li a.isixth{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#0bd3ca,endcolorstr=#47e7bf,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=75) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#0bd3ca,endcolorstr=#47e7bf,gradientType=0); 
    background:#0bd3ca; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(top, #0bd3ca, rgba(71, 231, 191, 1));  
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#0bd3ca), to(rgba(71, 231, 191, 1))); 
  }
  .index-btn-group > ul > li a > i {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .index-btn-group > ul > li > a > i {
    margin-top: 0.3rem;
    margin-bottom: 0.225rem;
    width: 0.825rem;
    height: 0.825rem;
  }
  .index-wrapper {
    border-top: 1px solid #eee;
    height: 100%;
  }
  .index-wrapper > ul {
    padding: 0 0.5rem;
    list-style-type: none;
    height: 3rem;
    overflow-y: scroll
  }
  .index-wrapper > ul > li{
    border-bottom: 1px solid #f1f1f1;

    color: #666;
    font-size: 14px;
    padding: 0.325rem 0;
    position: relative;
  }
  .index-wrapper i {
    height: 0.55rem;
    width: 0.55rem;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: middle;
    display: inline-block;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .index-wrapper span {
    font-size: 13.3px;
    color: #666;
    line-height: 1;
    margin-left: 0.3rem;
    display: inline-block;
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    white-space:nowrap;/* 不换行 */
    vertical-align: middle;
    width: 7rem
  }
  .index-wrapper span.index-del {
    background-color:red; 
    width:0.5rem;
    height:0.5rem;
    border-radius:0.25rem;
    text-align:center;
    vertical-align: top;
    line-height: 0.5rem;
    color: #fff;
    font-size: 12px;
    position:absolute;
    right: 0;
    margin-left: 0
  }
  .index-list-tips {
    text-align: center;
    font-size: 14px;
    margin-top: 0.5rem
  }
  .index-foo {
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
    display: flex;
    text-align: center;
    border-top: 1px solid #eee;
    background-color: #fff
  }
  .index-foo > a.scan {
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=275,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#1bbbf3,endcolorstr=#24abf3,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=275,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#1bbbf3,endcolorstr=#24abf3,gradientType=0); 
    background:#24abf3; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(left, #1bbbf3, rgba(36, 171, 243, 1));  
    background:-webkit-gradient(linear, 0 0, 0 right, from(#1bbbf3), to(rgba(36, 171, 243, 1)));  
    border-radius: 4px;
    color: #fff;
  }
  .index-foo > a.scan > i {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 0.65rem;
    height: 0.65rem;
    margin-right: 0.2rem;
    vertical-align: middle
  }
  .index-foo-a {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-decoration: none;
    color: #999;
    font-size: 16px;
    height: 1.25rem;
    line-height: 1.25rem
  }
</style>
