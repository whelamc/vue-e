<template>
  <div id="comf">
    <topNav :title="title"></topNav>
    <div class="wrap">
      <div class="sl_type">
        <mt-picker :slots="slots" :visibleItemCount='1' @change="onValuesChange" value-key="name"></mt-picker>
      </div>
      <div class="sl_time">
        <div class="datinput">
          <input @focus="openPickerS" v-model="Sdate" disabled="disable">
          <span class="ChoosDate" @click="openPickerS"></span>
        </div>
        <span class="datiend">至</span>
        <div class="datinput">
          <input @focus="openPickerE" v-model="Edate" disabled="disable">
          <span class="ChoosDate" @click="openPickerE"></span>
        </div>
      </div>
      <mt-datetime-picker 
        ref="pickerS"
        v-model="pickerVisible"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirmS">
      </mt-datetime-picker>
      <mt-datetime-picker 
        ref="pickerE"
        v-model="pickerVisible"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirmE">
      </mt-datetime-picker>
      <div class="Winner_wrap">
        <div class="SL_N">
          <mt-picker :slots="slots2" :visibleItemCount='1' @change="onValuesChange2" value-key="name"></mt-picker>
        </div>
      </div>
      <div class="Winner_wrap">
        <div class="SL_N">
          <mt-picker :slots="slots3" :visibleItemCount='1' @change="onValuesChange3" value-key="name" v-show="showSup"></mt-picker>
        </div>
      </div>
    </div>


    <div class="cf-table">
      <table>
        <thead>
            <tr>
                <th>单号</th>
                <th>时间</th>
                <th>数量</th>
                <th>审核状态</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" @click="editPage(product)">
              <td>{{product.formnums}}</td>
              <td>{{product.time}}</td>
              <td>{{product.number}}</td>
              <td>{{product.statustext}}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>合计</td>
                <td></td>
                <td>{{totalNum}}</td>
                <td></td>
            </tr>
        </tfoot>
      </table>
    </div>

    <div class="cf-page">
      <button type="button" @click="changePage(pagenum*1-1)">上一页</button>
      <div class="page-tips">
        <span>共{{ pagecount }}页</span>
        <span>当前{{ pagenum }}页</span>
      </div>
      <button type="button" @click="changePage(pagenum*1+1)">下一页</button>
    </div>

    <div class="cf-btn">
      <button type="button" class="search" @click="getData">搜索</button>
      <button type="button" class="add" @click="changeAdd">添加</button>
    </div>
  </div>
</template>

<script>
  import topNav from '@/components/Top'
  export default {
    name: 'comf',
    data () {
      return {
        msg: 'Welcome to whelamc',
        title: '浏览单据',
        value: '',
        pickerVisible: '',
        Sdate: '',
        Edate: '',
        totalNum: '',
        pagecount: 0 ,
        pagenum: 0 ,
        products: [],
        updateForm: true,
        showSup: true,
        slots: [
          {
            values: [{type: "in_gh", name: "入库"}, {type: "in_ghth", name: "入库退货"}, {type: "damage", name: "物资报损"}, {type: "used", name: "领用物资"}, {type: "in_room_other", name: "领用退回"}, {type: "take_stock", name: "物资盘点"}],
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: this.$route.query.type
          }
        ], 
        slots2: [
          {
            values: [{}],
            className: 'slot2',
            textAlign: 'center',
          }
        ], 
        slots3: [
          {
            values: [{}],
            className: 'slot3',
            textAlign: 'center'
          }
        ],
        lists: [
          {'name': 'RK201701-01', 'time': '2017-01-01', 'number': '100', 'status': true},
          {'name': 'RK201701-01', 'time': '2017-01-01', 'number': '100', 'status': false},
          {'name': 'RK201701-01', 'time': '2017-01-01', 'number': '100', 'status': true}
        ]
      }
    },
    methods: {
      changePage(a) {
        if(a > 0 && a <= this.pagecount ){
          this.$http.post(APIURL+'form/search_form',{starttime: this.Sdate,starttime: this.Edate,gys_id: this.slSupplier,room_id: this.slWarehouse,pagenum: this.pagenum,type: this.slType}).then((response) => { 
          this.data = response.body
          this.products = this.data.data.list
          this.pagenum = this.data.data.pagenum
          }, (response) => {
            MessageBox.alert('提示', '操作失败')
          });
        }else{
          console.log("没有东西");
        }
      },
      openPickerS() {
        this.$refs.pickerS.open();
      },
      openPickerE() {
        this.$refs.pickerE.open();
      },
      handleConfirmS (value) {
        var y = value.getFullYear()
        var m = value.getMonth() + 1;
        var d = value.getDate();
        this.Sdate = y + '-' + m + '-' + d;
        this.products = [];
      },
      handleConfirmE (value) {
        var y = value.getFullYear()
        var m = value.getMonth() + 1;
        var d = value.getDate();
        this.Edate = y + '-' + m + '-' + d;
        this.products = [];
      },
      onValuesChange(picker, values) {
        this.slType = values[0].type;
        if (values[0].type != 'in_gh') {
          this.showSup = false
        } else {
          this.showSup = true
        }
        this.products = [];
      },
      onValuesChange2(picker, values) {
        this.slWarehouse = values[0].id;
        this.products = [];
      },
      onValuesChange3(picker, values) {
        this.slSupplier = values[0].id;
        this.products = [];
      },
      getData() {
        var slType = this.slType,
            Stdate = this.Sdate,
            Endate = this.Edate,
            slWarehouse = this.slWarehouse.toString(),
            slSupplier = this.slSupplier.toString(),
            Datajs = [{'type': slType, 'starttime': Stdate, 'endtime': Endate, 'room_id': slWarehouse, 'gys_id': slSupplier,}];
        this.$http.post('http://192.168.1.223/api/public/index.php/api/form/search_form', {'type': slType, 'starttime': Stdate, 'endtime': Endate, 'room_id': slWarehouse, 'gys_id': slSupplier}).then((response)=> {
          this.data = response.body;
          if (this.updateForm == true) {
            this.products = [];
            for (var i = 0; i < this.data.data.list.length; i++) {
              if (this.data.data.list[i].type == slType) {
                this.products.push(this.data.data.list[i])
                console.log(this.data.data.list.length);
              }
            }
            return this.updateForm = true;
          }
        })
      },
      changeAdd() {
        setTimeout(
          ()=>this.$router.push({
          'path':'/coms'
          }),100)
      },
      editPage(index) {
        setTimeout(
          ()=>this.$router.push({
          'path':'/coms',
          'query': {'formnums': index.formnums, 'formFrom': 1, 'formType':index.type}
          }),10)
      }
    },
    created() {
      this.$http.get('http://192.168.1.223/api/public/index.php/api/info/get_baseinfo').then((response)=> {
        this.data2 = response.body;
        this.slots2[0].values = this.data2.data.roomlist;
        this.slots3[0].values = this.data2.data.gyslist;
      })
    },

    updated() {
      var productsNum = this.products.length;
      var products = this.products;
      function updateNum(productsNum) {
        if (productsNum == 0) {
            return 0
          } else if(productsNum <= 1) {
            return products[0].number;
          } else {
            return products[productsNum - 1].number + updateNum(productsNum - 1)
          }
        }
      this.totalNum = updateNum(productsNum);
    },
    components: { topNav }
  }

</script>

<style scoped>
  .sl_type {
    width: 100%;
    height: 0.9rem;
    margin-bottom: 0.25rem
  }
  .sl_tp {
    height: 0.9rem;
    line-height: 0.9rem;
    vertical-align: top
  }
  .sl_time {
    width: 100%;
    margin-bottom: 0.25rem
  }
  .wrap {
    padding: 0.55rem 0.25rem;
    padding-bottom: 0.25rem;
    overflow: hidden;
    font-size: 16px
  }
  .wrap .Winner_wrap {
    width: 100%;
    margin-bottom: 0.25rem
  }
  .wrap .Winner_wrap > span {
    display: inline-block;
    height: 0.9rem;
    line-height: 0.9rem;
    vertical-align: top
  }
  .datiend {
    width: 7%;
    display: inline-block;
    text-align: center;
    color: #666
  }
  .ChoosDate {
    display: inline-block;
    height: 0.9rem;
    width: 100%;
    background: rgba(255, 255, 255, 0);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100
  }
  .datinput {
    position: relative;
    display: inline-block;
    width: 45%;
    height: 0.9rem
  }
  .datinput input {
    width: 90%;
    height: 100%;
    background: #fff;
    border: 1px solid #ccc;
    padding: 0 5%
  }
</style>
<style>
  .picker-item.picker-selected {
    color: #666!important;
  }
  
</style>
<style scoped>
  .cf-table {
    text-align: center;
    margin-bottom: 0.25rem;
    padding: 0 0.25rem
  }
  .cf-table > table > thead, .cf-table > table > tfoot {
    background-color: #e6e6e6;
    color: #666;
    font-size: 16px;
  }
  .cf-table > table > thead th {
    color: #666
  }
  .cf-table > table > thead th, .cf-table > table > tfoot tr {
    border: 0;
    text-align: center;
    height: 0.925rem;
    line-height: 0.925rem
  }
  .cf-table > table > tbody {
    border: 1px solid #eee;
    display: block;
    height: 8.125rem;
    overflow-y: auto;
  }
  .cf-table > table > tbody tr {
    height: 0.75rem;
    line-height: 0.75rem
  }
  .cf-table >  table thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .cf-table >  table tfoot {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .cf-table > table > tbody td {
    border: 0;
    text-align: center;
    font-size: 14px;
    color: #808080;
    word-wrap: break-word;
    color: #808080
  }
  .cf-btn {
    margin: 0 auto;
    text-align: center;
  }
  .cf-btn > button {
    font-size: inherit;
    border-color: transparent;
    background-color: transparent;
    color: #fff;
    border-top: 0;
    border-bottom: 0;
    display: inline-block;
    margin: -10px;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 0;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0 auto;
    padding: 10px 15px;
    font-size: 19px;
    border-radius: 5px;
    width: 4.275rem;
    height: 1.25rem;
    margin-bottom: 0.625rem
  }
  .cf-btn > button.search{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=171,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#25e0b4,endcolorstr=#08d3c8,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=171,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#25e0b4,endcolorstr=#08d3c8,gradientType=0); 
    background:#08d3c8; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(left, #25e0b4, rgba(8, 211, 200, 1));  
    background:-webkit-gradient(linear, 0 0, 0 right, from(#25e0b4), to(rgba(8, 211, 200, 1)));  
    margin-right: 0.425rem
  }
  .cf-btn > button.add{
    filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=171,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#ff6c6e,endcolorstr=#fe5b70,gradientType=0); 
    -ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=171,finishy=0) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#ff6c6e,endcolorstr=#fe5b70,gradientType=0); 
    background:#fe5b70; /* 一些不支持背景渐变的浏览器 */  
    background:-moz-linear-gradient(left, #ff6c6e, rgba(254, 91, 112, 1));  
    background:-webkit-gradient(linear, 0 0, 0 right, from(#ff6c6e), to(rgba(254, 91, 112, 1)));  
    margin-left: 0.425rem
  }
  .cf-page > button {
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
  .cf-page {
    overflow: hidden;
    padding: 0 0.25rem;
    margin-bottom: 0.25rem
  }
  .cf-page > button:first-child {
    float: left
  }
  .cf-page > button:last-child {
    float: right
  }
  .cf-page > .page-tips {
    float: left;
    width: 3.6rem;
    height: 1.25rem;
    margin: 0 0.4rem
  }
  .cf-page > .page-tips > span {
    font-size: 16px;
    color: #666;
    line-height: 1.25rem
  }
  .cf-page > .page-tips > span:first-child {
    float: left;
  }
  .cf-page > .page-tips > span:last-child {
    float: right;
  }
</style>
