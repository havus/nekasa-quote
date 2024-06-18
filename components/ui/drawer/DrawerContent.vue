<script lang="ts" setup>
import { DrawerContent, DrawerPortal } from 'vaul-vue'
import type { DialogContentEmits, DialogContentProps } from 'radix-vue'
import { useForwardPropsEmits } from 'radix-vue'
import type { HtmlHTMLAttributes } from 'vue'
import DrawerOverlay from './DrawerOverlay.vue'
import { cn } from '@/lib/utils'

const props = defineProps<DialogContentProps & { class?: HtmlHTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="forwarded" :class="cn(
        'fixed inset-y-0 left-0 z-50 flex h-auto flex-col bg-white dark:bg-slate-950',
        props.class,
      )"
    >
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
