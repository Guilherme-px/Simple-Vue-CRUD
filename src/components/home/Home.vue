<template>
    <div class="content">
        <h1>
            <span class="typed-text">{{ typeValue }}</span>
            <span class="cursor" :class="{ typing: typeStatus }">&shy;</span>
        </h1>
    </div>
</template>

<script>
export default {
data: () => {
    return {
      typeValue: "",
      typeStatus: false,
      typeArray: [
        "Welcome to my simple CRUD example :)",
      ],
      typeSpeed: 60,
      erasingSpeed: 25,
      newTextDelay: 2000,
      typeArrayIndex: 0,
      charIndex: 0,
    };
  },
  methods: {
    typeText() {
      if (this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(
          this.charIndex
        );
        this.charIndex += 1;
        setTimeout(this.typeText, this.typeSpeed);
      } else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.typeArray[this.typeArrayIndex].substring(
          0,
          this.charIndex - 1
        );
        this.charIndex -= 1;
        setTimeout(this.eraseText, this.erasingSpeed);
      } else {
        this.typeStatus = false;
        this.typeArrayIndex += 1;
        if (this.typeArrayIndex >= this.typeArray.length)
          this.typeArrayIndex = 0;
        setTimeout(this.typeText, this.typeSpeed + 1000);
      }
    },
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
  },
}
</script>

<style lang="scss">
.content {
    display: flex;
    justify-content: center;
    align-items: center;
}

h1 {
  span.typed-text {
    font-size: 1.8rem;
    font-weight: normal;
  }

  span.cursor {
    display: inline-block;
    margin-left: 3px;
    width: 1px;
    background-color: #000;
    animation: cursorBlink 1s infinite;
  }

  span.cursor.typing {
    animation: none;
  }
}

@keyframes cursorBlink {
  49% {
    background-color: #000;
  }
  50% {
    background-color: transparent;
  }
  99% {
    background-color: transparent;
  }
}
</style>