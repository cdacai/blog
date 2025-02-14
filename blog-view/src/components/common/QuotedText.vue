<template>
  <div class="quoted-text">
    <textarea
      :value="content"
      readonly
      :placeholder="placeholder"
      class="quoted-textarea">
    </textarea>
  </div>
</template>

<script>
export default {
  name: 'QuotedText',
  props: {
    content: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.quoted-textarea {
  width: 100%;
  min-height: 60px;
  padding: 10px 15px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #f8f8f8;
  color: #888;
  font-style: italic;
  font-family: "Times New Roman", Times, serif;
  resize: none;
  outline: none;
  line-height: 1.5;
}

.quoted-textarea:focus {
  border-color: #e4e7ed;
}

.quoted-textarea::placeholder {
  color: #c0c4cc;
}
</style> 