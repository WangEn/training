<template>
  <div class="container">
    <img class="bg" :src="bgImg" />
    <div class="lover">
      <div class="express">
        <h1>{{ title }}<span>💕</span></h1>
        <div class="wink">
          <img :src="winkImg" />
        </div>
        <p v-for="(text, index) in exhibitionText" :key="index">
          {{ text }}<span>💕</span>
        </p>
      </div>
      <div class="pray" v-show="!isDecisionShow" @click="onPray">
        <img :src="kelianImg" />
        <p>请告诉我Yes!</p>
        <span class="pray-close">×</span>
      </div>

      <div class="decision" v-show="isDecisionShow">
        <div class="decision-btn refuse" @click="onRefuse">
          No<span>💔</span>
        </div>
        <div class="decision-btn" @click="onAgree">Yes<span>❤️</span></div>
      </div>
      <div class="agree-wrapper" v-show="isAgreeShow">
        <div class="agree">
          <img :src="bixinImg" />
          <p>太好了，O(∩_∩)O哈哈~</p>
          <p>
            {{ agreeText
            }}<span class="agree-cursor" style="color: #f44336">❤</span>
          </p>
        </div>
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
import { ref, onMounted, onUnmounted } from "vue";
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
const getResourceUrl = (name, ext = "png") => {
  // juejin url
  // exp: https://zongzi.lovetime.top/juejin/girlfriend/petal/icon_petal_1.png
  // return `https://zongzi.lovetime.top/juejin/girlfriend/${name}.${ext}`

  return new URL(`./assets/${name}.${ext}`, import.meta.url).href;
};
const petalImgs = [
  "petal/icon_petal_1",
  "petal/icon_petal_2",
  "petal/icon_petal_3",
  "petal/icon_petal_4",
  "petal/icon_petal_5",
  "petal/icon_petal_6",
  "petal/icon_petal_7",
  "petal/icon_petal_8",
];
const winkImg = getResourceUrl("wink", "gif");
const bgImg = getResourceUrl("bg", "jpg");
const kelianImg = getResourceUrl("emoji_kelian", "jpg");
const bixinImg = getResourceUrl("emoji_bixin", "jpg");

const petalList = ref([]);
const visualWidth = window.innerWidth;
const visualHeight = window.innerHeight;
console.log(visualWidth, visualHeight);
const createPetalBox = () => {
  const currentPetal = getResourceUrl(petalImgs[Math.floor(Math.random() * 8)]);
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
const petalTimer = ref(null);
const petalHandler = () => {
  petalTimer.value = setInterval(createPetalBox, 500);
};

onMounted(() => {
  petalHandler();
});

onUnmounted(() => {
  clearInterval(petalTimer);
});
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
  max-width: 100%;
  width: 520px;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
}

.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  filter: blur(6px);
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
  max-width: 90%;
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
    z-index: 1;
  }
}
.lover {
  padding: 16px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  overflow-y: auto;
}
</style>
