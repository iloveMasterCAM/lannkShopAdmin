<template>
  <div class="main">
    <div class="main-content">
      <div class="container-fluid">
        <h3 class="page-title">商家活动</h3>
            <div class="list">
              <ul>
                <li>
                    <div class="left">

                    </div>
                    <div class="right">
                        <p>满减送</p>
                        <span>设置订单满指定金额享受优惠</span>
                    </div>
                </li>
                <li>

                </li>
              </ul>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
    export default {
      data(){
        return{

        }
      }
    }
</script>

<style scoped>
  li{
    list-style: none;
  }
  .page-title{
    font-size:16px;
    color:#647787;
    margin-bottom:40px;
    margin-left:28px;
  }
  .container-fluid{
    background-color:#fff;
    padding:40px;
    margin-left: 12px;
    position:relative;
  }
</style>
