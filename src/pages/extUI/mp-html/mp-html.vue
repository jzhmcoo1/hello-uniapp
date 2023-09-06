<template>
  <view>
    <mp-html :content="html" />
    <mp-html :content="html2" />
  </view>
</template>
<script>
  import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'
  export default {
    // 不可省略
    components: {
      mpHtml
    },
    data () {
      return {
        html: `
          <div>
            <h1>mp-html 小程序富文本组件</h1>
            <img src="https://img.yzcdn.cn/vant/cat.jpeg" />  
          </div>
        `,
        html2: `
          <h1>h1标题</h1>
          <h2>h2标题</h2>
          <h3>h3标题</h3>
          <h4>h4标题</h4>
          <h5>h5标题</h5>
          <h6>h6标题</h6>
          <hr />
          <i>斜体</i>
          <br />
          <img alt="alt" src="http://www.3xiayou.com/upload/upload/1528174589.jpg" width="100px" height="100px" />
          <br />
          <p>这是一个段落p标签</p>
          <br />
          <q>引号标签</q>
          <br />
          <span>span标签</span>
          <br />
          <strong>strong标签</strong>
          <br />
          <sub>sub标签</sub>
          <br />
          <sup>sup标签</sup>
          <br />
        `
      }
    }
  }
</script>