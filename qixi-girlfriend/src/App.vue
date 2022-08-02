<template>
  <div class="container">
    <div class="express">
      <!-- <div class="heart-box"></div> -->
      <!-- <h1>{{ title }}<span>💕</span></h1> -->
      <!-- <div class="wink">
        <img src="https://zongzi.lovetime.top/juejin/girlfriend/wink.gif" />
      </div> -->
      <p v-for="(text, index) in exhibitionText" :key="index">
        {{ text }}<span>💕</span>
      </p>
    </div>
    <div class="pray" v-show="!isDecisionShow" @click="onPray">
      <img
        src="https://zongzi.lovetime.top/juejin/girlfriend/emoji_kelian.jpg"
      />
      <p>请告诉我Yes!</p>
      <span class="pray-close">×</span>
    </div>

    <div class="decision" v-show="isDecisionShow">
      <div class="decision-btn refuse" @click="onRefuse">No<span>💔</span></div>
      <div class="decision-btn" @click="onAgree">Yes<span>❤️</span></div>
    </div>
    <div class="agree-wrapper" v-show="isAgreeShow">
      <div class="agree">
        <img
          src="https://zongzi.lovetime.top/juejin/girlfriend/emoji_bixin.jpg"
        />
        <p>太好了，O(∩_∩)O哈哈~</p>
        <p>
          {{ agreeText
          }}<span class="agree-cursor" style="color: #f44336">❤</span>
        </p>
      </div>
    </div>
    <div class="petal-box">
      <WePetal
        v-for="petal in petalList"
        :key="petal.id"
        :petal="petal"
        @remove="removeHandler"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import gsap from "gsap";
import WePetal from "@/components/WePetal.vue";

import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("abcdefghijklmn", 6);

const refuseNum = ref(0);
const isDecisionShow = ref(true);
const isAgreeShow = ref(false);
const title = ref("做我女朋友好不好");
const initText = ref(
  "承蒙你的出现，够我喜欢好多年，我希望，以后你能用我的名字拒绝所有人"
);
const benefitText = ref([
  "你是我拔掉氧气罐都想吻的人",
  "你是我跑完8000米还想拥抱的人",
  "你是我自罚三杯都不肯开口的秘密",
  "你是我赴汤蹈火都不肯放下的执着",
  "你是我电量只剩1%也想回信息的人",
  "你是我穷极一生不想醒来的梦",
]);
const resultText =
  "遇见你是我所有美好故事的开始，所以，请别放开我的手，也别缺席我的将来，因为一辈子和你在一起才叫将来";
const exhibitionText = ref([initText]);
const onRefuse = () => {
  console.log("onRefuse", refuseNum.value);
  if (refuseNum.value < benefitText.value.length) {
    exhibitionText.value.push(benefitText.value[refuseNum.value]);
    refuseNum.value++;
  } else {
    isDecisionShow.value = false;
  }
};

const onAgree = () => {
  isAgreeShow.value = true;
  onTyped();
};

const onPray = () => {
  isDecisionShow.value = true;
};

const agreeText = ref("");
const onTyped = () => {
  let index = 0;
  const typedTime = setInterval(() => {
    agreeText.value = resultText.substring(0, index++);
  }, 150);
  if (index >= resultText.length - 1) {
    clearInterval(typedTime);
  }
};

// petal
const getResourceUrl = (name) => {
  return new URL(`./assets/petal/${name}.png`, import.meta.url).href;
};
const petalImgs = [
  "https://zongzi.lovetime.top/juejin/girlfriend/petal/icon_petal_1.png",
  "https://zongzi.lovetime.top/juejin/girlfriend/petal/icon_petal_2.png",
  "https://zongzi.lovetime.top/juejin/girlfriend/petal/icon_petal_3.png",
  "https://zongzi.lovetime.top/juejin/girlfriend/petal/icon_petal_4.png",
  "https://zongzi.lovetime.top/juejin/girlfriend/petal/icon_petal_5.png",
  "https://zongzi.lovetime.top/juejin/girlfriend/petal/icon_petal_6.png",
  "https://zongzi.lovetime.top/juejin/girlfriend/petal/icon_petal_7.png",
  "https://zongzi.lovetime.top/juejin/girlfriend/petal/icon_petal_8.png",
];
const randomPetal = ref("");
const getRandomPetal = () => {
  randomPetal.value = getResourceUrl("icon_petal_1");
};
getRandomPetal();
const petalList = ref([]);
const visualWidth = window.innerWidth;
const visualHeight = window.innerHeight;
console.log(visualWidth, visualHeight);
const createPetalBox = () => {
  const currentPetal = petalImgs[Math.floor(Math.random() * 8)];
  const petalLeft = Math.random() * visualWidth;
  const randomOpacity = Math.random();
  const petalOpacity =
    randomOpacity < 0.5 ? randomOpacity + 0.5 : randomOpacity;
  const petalEndLeft = petalLeft - 100 + Math.random() * 500;
  const petalEndTop = visualHeight + 40;
  const duration = Math.floor(
    (visualHeight * 10 + Math.random() * 5000) / 1000
  );
  const currentStyle = {
    left: petalLeft,
    opacity: petalOpacity,
  };
  const petal = {
    id: nanoid(),
    url: currentPetal,
    style: currentStyle,
    end: {
      duration,
      left: petalEndLeft,
      top: petalEndTop,
    },
  };
  petalList.value.push(petal);
};
const removeHandler = (id) => {
  petalList.value.splice(
    petalList.value.findIndex((petal) => petal.id === id),
    1
  );
};
const petalHandler = () => {
  setInterval(createPetalBox, 500);
};
petalHandler();
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  width: 100%;
}

img {
  display: block;
  margin: 0;
  max-width: 100%;
  height: auto;
}

.container {
  margin: 0 auto;
  padding: 16px;
  max-width: 100%;
  width: 520px;
  height: 100vh;
  background: url("https://zongzi.lovetime.top/juejin/girlfriend/bg.jpg")
    no-repeat;
  box-sizing: border-box;
}

.express {
  margin: 0 auto;
  max-width: 400px;
  text-align: left;
  h1 {
    font-size: 20px;
  }

  p {
    font-size: 16px;
    font-weight: 400;
  }
}

.wink {
  margin: 0;
  width: 100%;
}

.pray,
.agree {
  margin: 0 auto;
  padding: 16px 32px;
  width: 400px;
  border-radius: 4px;
  background-color: #f7f7f7;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  &-close {
    font-size: 36px;
    font-weight: 600;
    color: #999;
    position: absolute;
    top: 16px;
    right: 32px;
  }
  img {
    margin: 0 auto;
    width: 200px;
  }
  p {
    margin-top: 8px;
    font-size: 16px;
    color: #666;
  }
}
.agree {
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  &-cursor {
    animation: cursorEffect 0.6s infinite steps(1, start);
  }
}

@keyframes cursorEffect {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

.decision {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 16px;
  color: #fff;

  &-btn {
    padding: 6px 16px;
    vertical-align: middle;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    cursor: pointer;

    span {
      margin-left: 4px;
    }

    &.refuse {
      span {
        -webkit-filter: grayscale(100%);
        -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
        -o-filter: grayscale(100%);

        filter: grayscale(100%);

        filter: gray;
      }
    }
  }
}
.petal {
  &-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }
}

.heart-box {
  width: 0.5rem;
  height: 0.5rem;
  background: radial-gradient(red 0.05rem, transparent 0.05rem) no-repeat 0.1rem
      0.1rem/0.1rem 0.1rem,
    radial-gradient(red 0.05rem, transparent 0.05rem) no-repeat 0.15rem 0.1rem/0.1rem
      0.1rem,
    linear-gradient(to bottom left, red 0.05rem, transparent 0.05rem) no-repeat
      0.8rem 0.17rem/0.1rem 0.1rem,
    linear-gradient(to bottom right, red 0.05rem, transparent 0.05rem) no-repeat
      0.18rem 0.17rem/0.1rem 0.1rem;
  // animation: heart 1s infinite 1s linear;
}

@keyframes heart {
  0% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes wind {
  0% {
    bottom: 100%;
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-90deg);
    bottom: -10%;
  }
}
//可添加不同速度
.speed1 {
  position: absolute;
  animation: wind 5s linear;
}
</style>
