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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

const isLogin = ref(false);

</script>

<template>
  <header class="sticky top-0 bg-green-50 w-full z-50">
    <div class="container flex items-center py-2">
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
              <div v-if="isLogin">
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
            <Dialog>
              <DialogTrigger>
                <nuxt-link
                  v-if="isLogin"
                  to="/"
                  :class="cn(
                    'transition-colors ease-in duration-200 px-3 py-2',
                    'flex items-center text-slate-700 hover:bg-slate-200 rounded',
                  )"
                >
                  <Icon name="tabler:door-exit" size="20" />
                  <span class="font-semibold ml-3">Log out</span>
                </nuxt-link>

                <nuxt-link
                  v-else
                  to="/"
                  :class="cn(
                    'transition-colors ease-in duration-200 px-3 py-2',
                    'flex items-center text-slate-700 hover:bg-slate-200 rounded',
                  )"
                >
                  <Icon name="tabler:door-enter" size="20" />
                  <span class="font-semibold ml-3">Log in</span>
                </nuxt-link>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader class="items-center">
                  <DialogTitle class="text-2xl font-semibold text-green2-800">Log In</DialogTitle>
                  <DialogDescription class="text-slate-500">
                    Nice to see you again!
                  </DialogDescription>
                </DialogHeader>

                <div class="py-5 flex flex-col gap-3">
                  <div class="grid w-full items-center gap-1">
                    <Label for="email-or-username" class="font-normal text-xs text-slate-500">
                      Email or Username
                    </Label>
                    <div class="relative w-full items-center">
                      <Input id="email-or-username" type="text" placeholder="username@mail.com" class="pl-8" />
                      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <Icon name="tabler:user" size="20" class="text-slate-500" />
                      </span>
                    </div>
                  </div>

                  <div class="grid w-full items-center gap-1">
                    <Label for="password" class="font-normal text-xs text-slate-500">
                      Password
                    </Label>
                    <div class="relative w-full items-center">
                      <Input id="password" type="password" placeholder="Password" class="pl-8" />
                      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <Icon name="tabler:user" size="20" class="text-slate-500" />
                      </span>
                    </div>
                  </div>
                </div>

                <DialogFooter class="mt-5">
                  <Button variant="green" class="w-full" >
                    <Icon name="tabler:door-enter" size="20" />
                    <span class="ml-2">Log in</span>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
