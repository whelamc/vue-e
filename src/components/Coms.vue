<template >
    <div id="coms">
<div class="wrap">
      <span class="sl_tp">出入库类型：</span>
      <div class="sl_type">
        <mt-picker :slots="slots" :visibleItemCount='1' @change="onValuesChange"></mt-picker>
      </div>
    </div>
    <div class="wrap">
     <mt-field label="单号：" v-model="oddNum">
      </mt-field>
    </div>
    <div class="wrap">
      <div class="doc_mark">
         <span>制单人：</span>
         <span>{{Odman}}</span>
      </div>
      <span class="sl_tp" v-show="showSup">供应商：</span>
      <div class="sl_type" v-show="showSup">
        <mt-picker :slots="slots2" :visibleItemCount='1' @change="onValuesChange2"></mt-picker>
      </div>
    </div>
    <div class="wrap">
      <span>单据日期：</span>
      <div class="datinput">
        <input v-model="ListDate" disabled="disable">
        <span class="ChoosDate" @click="openPickerS"></span>
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
    </div>
    <div class="wrap">
      <label>条码：</label>
      <input type="text" @keyup.enter="addNew" v-model="Nnumbers" class="cod_num" v-focus>
      <i></i>
      <div class="bt_group">
        <mt-button class='l_bt' size="small" type="default" @click="addNew">添加</mt-button>
        <mt-button class='l_bt' size="small"  type="default">扫描</mt-button>
      </div>
    </div>
    <div class="wrap">
      <mt-field label="备注：" >
      </mt-field>
    </div>
    <div class="wrap">
      <table class="produc" >
        <tr>
          <th>货号</th>
          <th>名称</th>
          <th>数量</th>
          <th>操作</th>
        </tr>
        <tr v-for="product in products">
          <td>{{product.numbers}}</td>
          <td>{{product.names}}</td>
          <td class="pro_num"><input type="text" v-model="product.nums"></td>
          <td><mt-button class="operation" @click='reMov(product)' type='danger' size="small">X</mt-button></td>
        </tr>
      </table>
    </div>
    <div class="wrap">
      <div class="bt_group f_right lg_bt">
        <mt-button type="default" size="small" @click="savProduct">暂存</mt-button>
        <mt-button type="default" size="small">保存</mt-button>
        <mt-button type="default" size="small">取消</mt-button>
      </div>
    </div>
    <Search></Search>
  </div>
</template>

<script>
  import Search from './Search.vue'

  var products = [
    { numbers: 'A', names: '物料1' , nums: 100 },
    { numbers: 'B', names: '物料2' , nums: 105 },
    { numbers: 'C', names: '物料3' , nums: 100 },
    { numbers: 'D', names: '物料4' , nums: 100 },
  ];
  export default {
    name: 'coms',
    components: {Search},
    data () {
      return {
        msg: 'Welcome to whelamc',
        value: '',
        pickerVisible: '',
        Nnumbers: '',
        Nnames: '',
        Nnums: '',
        products: products,
        focusStatus: true,
        ListDate: '',
        showSup: false,
        slType: '',
        spName: '',
        oddNum: '',
        Odman: '陈柏平',
        slots: [
          {
            values: ['入库', '出库', '暂存'],
            className: 'slot1',
            textAlign: 'center',
            itemHeight: 12
          }
        ],
        slots2: [
          {
            values: ['康泉农牧','供应商B','供应商C'],
            className: 'slot2',
            textAlign: 'center',
            itemHeight: 12,
          }
        ]
      }
    },
    methods: {
      onValuesChange(picker, values) {
        this.slType = picker.getValues(values);
        if(picker.getValues(values) == '入库') {
          this.showSup = true;
        } else {
          this.showSup = false;
        }
      },
      onValuesChange2(picker, values) {
        this.spName = picker.getValues(values);
      },
      openPickerS() {
        this.$refs.pickerS.open();
      },
      handleConfirmS (value) {
        var y = value.getFullYear()
        var m = value.getMonth() + 1;
        var d = value.getDate();
        this.ListDate = y + '-' + m + '-' + d
      },
      addNew(e) {
      e.preventDefault()
        if (!this.Nnumbers) return
          this.products.push({
            numbers: this.Nnumbers,
            names: this.Nnames,
            nums: this.Nnums,
          })
      },
      reMov(product) {
        this.products.splice(this.products.indexOf(product), 1);
        this.AllInfo();
        this.$http.get('http://192.168.1.82/api/public/index.php/api/info/goods_info',{code:'dkkdkd'}).then((response) => {
          console.log(213);
        })
      },
      savProduct() {
        localStorage.setItem('prodcts', JSON.stringify(products))//Json.stringify()，将传入的数组或对象装换为json字符串。
        console.log(localStorage.getItem('prodcts'));
      },
      AllInfo() {
        var slType = this.slType.toString();
        var spName = this.spName.toString();
        var allInfo = {'slType':slType, 'oddNum':this.oddNum, 'Odman':this.Odman, 'spName':spName, 'ListDate':this.ListDate, 'Nnumbers':this.Nnumbers};
        var tableInfo = allInfo + this.products
        console.log(JSON.stringify(tableInfo));
      }
    },
    updated: function () {
      document.onkeyup = function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 12) {
          alert('你触发了按键' + e.keyCode)
        }
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
        }
      }
    }
  }

</script>

<style scoped>
  @media (max-width: 320px) {
    #coms {
      font-size: 14px
    }
  }
  #coms {
      text-align: left;
  }
  .wrap {
    margin: 20px 0;
    overflow: hidden;
  }
  .sl_type {
    width: 25%;
    display: inline-block;
    height: 36px
  }
  .sl_tp {
    height: 36px;
    display: inline-block;
    line-height: 36px;
    vertical-align: top;
  }
  .picker-slot {
    font-size: 12px!important
  }
  .bt_group {
    display: inline-block;;
  }
  .cod_num {
    width: 40%;
  }
  .cod_num+i {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('../common/images/scan.png');
    background-size: 20px 20px;
    position: relative;
    right: 25px;
    top: 5px;
    z-index: 100
  }
  .datinput {
    width: 80px;
    display: inline-block;
    height: 26px;
    position: relative;
  }
  .datinput > input {
    width: 100%;
    background: #fff;
    border: 1px solid #ccc;
  }
  .ChoosDate {
    display: inline-block;
    width: 80px;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100
  }
  .bt_group .l_bt{
    height: 20px;
  }
  .f_right {
    float: right;
  }
  .lg_bt button {
    width: 65px;
    height: 48px;
  }

  table {
    text-align: center;
    border-collapse: collapse;
    width: 100%
  }
  table td,
  table th{
    border: 1px solid #ccc;
    max-width: 150px;
    word-wrap:break-word
  }
  .doc_mark{
    display: inline-block;
    margin-right: 2%;
    vertical-align: top;
  }
  .doc_mark>span{
    display: inline-block;
    height: 36px;
    line-height: 36px;
    vertical-align: bottom;
  }
  .operation {
    height: 20px;
    width: 20px;
    text-align: center;
    padding: 0;
  }

  .pro_num > input {
    padding: 0;
    border: 0;
    text-align: center;
    max-width: 55px;
    height: 100%;
  }
</style>
