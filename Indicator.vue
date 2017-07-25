<template>
  <div class="ui-indicator">
    <div class="progress">
      <div class="bar"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  @keyframes Progress {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }

  .ui-indicator {

    progress {
      width: 100%;
      height: 5px;

      .bar {
        height: 100%;
        background: linear-gradient(270deg, #ffffff, #66de99);
        background-size: 400% 400%;
        animation: Progress 3s ease infinite;
      }
    }
  }
</style>
