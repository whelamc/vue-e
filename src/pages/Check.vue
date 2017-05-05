<template>
  <div id="check">
      <topNav :title="title"></topNav>
      <div class="ch-wrap">
        <div class="ch-require">
          <div class="ch-pick">
          <button class="test" @click="showChange">{{ room_name }}</button>
          </div>
          <div class="ch-click">
          <mt-checklist class="fuck"
            v-model="clvalue"
            @change="oncChange"
            :options="options">
          </mt-checklist>
          <button type="button" class="search" @click="checkAjax"><i class="el-icon" :style="{backgroundImage: 'url(static/img/c03.png)'}"></i>查询</button>
          </div>
        </div>
        <div class="ch-table">
          <table>
            <thead>
                <tr>
                    <th>编码</th>
                    <th>名称</th>
                    <th>数量</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in datas">
                  <td>{{item.sp_id}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.number}}</td>
                </tr>
            </tbody>
          </table>
        </div>
        <div class="ch-page">
          <button type="button" @click="pageChange(pagenum*1-1)">上一页</button>
          <div class="page-tips">
            <span>共{{pagecount}}页</span>
            <span>当前{{pagenum}}页</span>
          </div>
          <button type="button" @click="pageChange(pagenum*1+1)">下一页</button>
        </div>
      </div>
<mt-popup
  style="width:100%"
  v-model="popupVisible"
  position="bottom">
<mt-picker :slots="stock" @change="onvChange" valueKey="name"></mt-picker>
</mt-popup>

  </div>
</template>

<script>
import topNav from '@/components/Top'

export default {
  name: 'check',
  data () {
    return {
      msg: 'Welcome to whelamc',
      title: '库存查询',
      options: ['仅查达预警线的商品'],
      clvalue: [],
      clvl: 0,
      ajaxData: [],
      clvalue: [],
      room_name: '仓库',
      room_id: 0,
      popupVisible: false,
      pagecount: 0 ,
      pagenum: 0 ,
      datas: [],
      stock: [
        {
          values: [{}],
          textAlign: 'center'
        }
      ], 
    }
  },
  created: function() {
        this.$http.get(APIURL+'info/get_baseinfo').then((response) => { 
        this.data = response.body
        this.stock[0].values = this.data.data.roomlist
        }, (response) => {
        });
  },
  methods: {
      onvChange(picker, values) {
        this.room_id = values[0].id;
        this.room_name = values[0].name;
      },
      oncChange(picker, values) {
        if(this.clvalue.length == 0){this.clvl = 1}else{this.clvl = 0}
      },
      showChange() {
        this.popupVisible = true
      },
      checkAjax() {
        this.$http.post(APIURL+'info/get_goodsnumber',{room_id: this.room_id,is_warning: this.clvl,pagenum: '',}).then((response) => { 
        this.data = response.body
        this.datas = this.data.data.list
        this.pagecount = this.data.data.pagecount
        this.pagenum = this.data.data.pagenum
        }, (response) => {
          MessageBox.alert('提示', '操作失败')
        });
      },
      pageChange(index) {
        console.log(index)
        if(index > 0 && index <= this.pagecount ){
          this.$http.post(APIURL+'info/get_goodsnumber',{room_id: this.room_id,is_warning: this.clvl,pagenum: this.pagenum}).then((response) => { 
          this.data = response.body
          this.datas = this.data.data.list
          this.pagenum = this.data.data.pagenum
          }, (response) => {
            MessageBox.alert('提示', '操作失败')
          });
        }else{
          console.log("没有东西");
        }
      }
  },
  components: { topNav }
}
</script>

<style > 
  .ch-pick > .test {
    width: 100%;
    border: 1px solid #eee;
    background: #fff;
    font-size: 16px;
    height: 0.9rem;
    line-height: 0.9rem
  }
  .ch-wrap {
    padding: 0 0.25rem
  }
  .ch-require {
    margin-top: 0.2rem;
    margin-bottom: 0.25rem
  }
  .ch-pick {
    margin-bottom: 0.25rem;
  }
  .ch-click {
    margin-bottom: 0.4rem;
    overflow: hidden
  }
  .ch-table {
    margin-bottom: 0.2rem
  }
  .ch-click > .fuck {
    float: left;
  }
  .ch-click > .fuck > a {
    background-image: inherit;
    min-height: inherit;
    text-decoration: none;
    color: #666;
    font-size: 16px;
    letter-spacing: 2px
  }
  .ch-click > .fuck > a > div {
    background-image: inherit;
    padding: 0
  }
  .ch-click > .fuck > a > div label {
    padding: 0
  }
  .ch-click > button{
    font-size: inherit;
    border-color: transparent;
    background-color: transparent;
    color: #fff;
    border-top: 0;
    border-bottom: 0;
    display: block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 0;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    padding: 5px;
    font-size: 18px;
    border-radius: 5px;
    width: 2.8rem;
    height: 0.925rem;
    float: right
  }
  .ch-click > button.search{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=171,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#25e0b4,endcolorstr=#08d3c8,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=171,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#25e0b4,endcolorstr=#08d3c8,gradientType=0); 
    background:#08d3c8; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(left, #25e0b4, rgba(8, 211, 200, 1));  
    background:-webkit-gradient(linear, 0 0, 0 right, from(#25e0b4), to(rgba(8, 211, 200, 1)));  
  }
  .ch-click > button.search > i{
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
    width: 0.45rem;
    height: 0.475rem;
    margin-right: 0.125rem;
    vertical-align: middle;  
  }
  .ch-table {
    text-align: center;
    margin-bottom: 0.2rem;
  }
  .ch-table > table > thead, .ch-table > table > tfoot {
    background-color: #e6e6e6;
    color: #666;
    font-size: 16px;
  }
  .ch-table > table > thead th, .ch-table > table > tfoot tr {
    border: 0;
    text-align: center;
    height: 0.925rem;
    line-height: 0.925rem
  }
  .ch-table > table > tbody {
    border: 1px solid #eee;
    display: block;
    height: 10.0rem;
    overflow-y: auto;
  }
  .ch-table > table > tbody tr {
    height: 0.75rem;
    line-height: 0.75rem
  }
  .ch-table >  table thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .ch-table >  table tfoot {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .ch-table > table > tfoot td {
    border: 0
  }
  .ch-table > table > tbody td {
    border: 0;
    text-align: center;
    font-size: 14px;
    color: #808080;
  }
  .ch-page > button {
    font-size: inherit;
    border-color: transparent;
    background-color: #26a2ff;
    color: #fff;
    border-top: 0;
    border-bottom: 0;
    display: block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 0;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    padding: 0;
    font-size: 18px;
    border-radius: 2px;
    width: 2.525rem;
    height: 1.25rem;
    color: #fff;
  }
  .ch-page {
    overflow: hidden;
  }
  .ch-page > button:first-child {
    float: left
  }
  .ch-page > button:last-child {
    float: right
  }
  .ch-page > .page-tips {
    float: left;
    width: 3.6rem;
    height: 1.25rem;
    margin: 0 0.4rem
  }
  .ch-page > .page-tips > span {
    font-size: 16px;
    color: #666;
    line-height: 1.25rem
  }
  .ch-page > .page-tips > span:first-child {
    float: left;
  }
  .ch-page > .page-tips > span:last-child {
    float: right;
  }
</style>
