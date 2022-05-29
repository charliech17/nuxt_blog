<template>
  <div>
    <section class="first_section">
      <button
        v-for="(text, index) in buttonText"
        :key="index.toString()+'_common'"
        @click="handleButtons(buttonCommand[index])"
      >
        {{ buttonText[index] }}
      </button>
      <button
        v-for="(text, index) in buttonAlignText"
        :key="index.toString()+'_alignText'"
        @click="handleButtons(buttonAlignCommand[index])"
      >
        {{ buttonAlignText[index] }}
      </button>
    </section>
    <section class="second_section">
      <button
        v-for="(text, index) in buttonColorText"
        :key="index.toString()+'_colorText'"
        :style="{ backgroundColor: buttonColorCommand[index] }"
        @click="handleColors(buttonColorCommand[index])"
      >
        {{ buttonColorText[index] }}
      </button>
      <button
        v-for="(text, index) in fontSizeCommand"
        :key="index.toString()+'_fontSize'"
        @click="handleFontSize(fontSizeCommand[index])"
      >
        {{ fontSizeText[index] }}
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonText: ['黑體', '斜體', '底線', '刪除線'],
      buttonCommand: ['bold', 'italic', 'underline', 'strikethrough'],
      buttonAlignText: ['置左', '置中', '置右'],
      buttonAlignCommand: ['justifyleft', 'justifycenter', 'justifyright'],
      buttonColorText: ['紅', '澄', '黃', '綠', '藍', '紫', '黑', '白'],
      buttonColorCommand: [
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'black',
        'white',
      ],
      fontSizeText: ['文字小', '文字大'],
      fontSizeCommand: ['5', '6'],
    }
  },
  methods: {
    handleButtons(command) {
      document.execCommand(command)
    },
    handleColors(command) {
      document.execCommand('ForeColor', false, command)
    },
    handleFontSize(command) {
      document.execCommand('fontSize', false, command)
    },
  },
}
</script>

<style scoped>
.first_section,
.second_section {
  text-align: center;
  margin-top: .5rem;
}
</style>