<template>
  <button class="whppt-button" @click="$emit('click')" @mouseover="$emit('mouseover')">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'WhpptButton',
};
</script>
<style>
.whppt-button {
  display: inline-block;
  color: white;
  padding: 0.75rem 1rem;
  background-color: black;
  font-size: 1em;
  border-radius: 25px;
  margin: 0 3px;
  cursor: pointer;
}

.whppt-button:hover {
  background-color: #eee;
  color: black;
}
</style>
