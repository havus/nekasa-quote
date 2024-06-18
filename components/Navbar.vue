<script setup lang="ts">
import { ref, reactive } from "vue";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const navigations = reactive([
  {
    link: '/',
    icon: 'tabler:home',
    text: 'Home',
  },
  {
    link: '/about-us',
    icon: 'tabler:users-group',
    text: 'About us',
  },
]);

const open = ref(false);
const closeDrawer = () => open.value = false;

</script>

<template>
  <header class="sticky top-0 bg-green-50 w-full z-50">
    <div class="container flex items-center p-2">
      <Drawer direction="left" v-model:open="open">
        <DrawerTrigger class="h-[40px] w-[40px] z-10">
          <Avatar class="h-[40px] w-[40px]">
            <AvatarImage src="https://github.com/radix-vue.png" alt="ava-header" />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
        </DrawerTrigger>
        <DrawerContent class="text-sm min-w-[250px]">
          <DrawerHeader>
            <DrawerTitle class="p-4">
              <Avatar>
                <AvatarImage src="https://github.com/radix-vue.png" alt="ava-drawer" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div>
                <h4 class="text-lg font-bold text-green2-700">John Doe</h4>
                <p class="text-sm font-normal text-slate-500">@havus</p>
              </div>
            </DrawerTitle>
            <DrawerDescription>
              <ul>
                <li
                  v-for="(nav, navIdx) in navigations" :key="`nav-${navIdx}`"
                  class="px-2"
                >
                  <nuxt-link
                    @click.native="closeDrawer"
                    :to="nav.link"
                    :class="cn(
                      'transition-colors ease-in duration-200 px-3 py-2',
                      'flex items-center text-slate-700 hover:bg-slate-200 rounded',
                    )"
                  >
                    <Icon :name="nav.icon" size="20" />
                    <span class="font-semibold ml-3">{{ nav.text }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter class="flex flex-col px-2">
            <nuxt-link
              to="/"
              :class="cn(
                'transition-colors ease-in duration-200 px-3 py-2',
                'flex items-center text-slate-700 hover:bg-slate-200 rounded',
              )"
            >
              <Icon name="tabler:door-exit" size="20" />
              <span class="font-semibold ml-3">Log out</span>
            </nuxt-link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <div class="grow">
        <p class="text-center font-bold text-green2-800 -translate-x-[20px]">
          NeQu
        </p>
      </div>
    </div>
  </header>
</template>
