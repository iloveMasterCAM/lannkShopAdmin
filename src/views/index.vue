<template>
  <div class="main">
    index
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  beforeRouteEnter(to,from,next){
    var that = this;
   //  next('/login')
      next('/Authentication')
    //next()
    // this.axios.post("store/checkVerify", {}, function(r) {
    //   console.log(r);
    //     that.storeVerify = r.d.store.storeVerify;
    //     if(r.d.store.storeVerify == 1){
    //       that.isShow = true;
    //     }
    // });
  }
}
</script>

