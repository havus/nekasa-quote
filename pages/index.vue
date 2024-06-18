<script setup lang="ts">
import { ref } from 'vue';
import { convertDate } from '@/lib/utils';
import { useClipboard } from '@vueuse/core';
import { Input } from '@/components/ui/input';
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Toaster from '@/components/ui/toast/Toaster.vue';

import { useToast } from '@/components/ui/toast/use-toast';
const { toast } = useToast();

const source = ref('');
const { copy, copied } = useClipboard({ source });

const modelValue = ref([]);
const searchValue = ref("");

const quotesData = reactive([
  {
    id: 1,
    text: "Di dunia ini ada banyak yg lebih sulit, tapi tidak seberisik dirimu",
    author: "Unknown",
    created_at: new Date(),
    is_liked: true,
    full_url: 'https://nekasa.com',
  }
]);

const copyAndToast = (content: string) => {
  copy(content);

  toast({
    description: 'Copied!',
    class: 'border bg-green-100/50 text-green2-800 dark:bg-slate-950 dark:text-slate-50',
  });
}

</script>

<template>
  <div>
    <Toaster />

    <div id="jumbotron" class="bg-green-50">
      <div class="container flex flex-col items-center py-16">
        <div class="flex flex-col items-center gap-2">
          <h3 class="text-2xl font-bold text-green2-800">Search Quotes Around the World</h3>
          <h5 class="text-green2-800">Discover Wisdom from Every Corner of the Globe</h5>
        </div>

        <div class="flex flex-col w-full max-w-[600px] mt-10">
          <div class="relative w-full items-center mt-5">
            <Input
              id="search"
              v-model="searchValue"
              type="text"
              placeholder="Search..."
              class="pl-10 bg-white focus-visible:ring-green-700 text-green2-800 font-medium"
            />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Icon name="material-symbols:match-word-rounded" class="size-6 text-green2-800/80" />
            </span>
          </div>
    
          <TagsInput v-model="modelValue" class="mt-1 relative pl-10">
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Icon name="heroicons:hashtag-16-solid" class="size-6 text-green2-800/80" />
            </span>
            <TagsInputItem
              v-for="item in modelValue"
              :key="item"
              :value="item"
              class="text-green2-800 font-medium data-[state=active]:ring-green2-800/70"
            >
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>
    
            <TagsInputInput placeholder="Enter to add tags..." class="text-green2-800 font-medium"/>
          </TagsInput>
        </div>
      </div>
    </div>

    <div id="contents" class="bg-white">
      <div class="container flex flex-col items-center py-16">
        <Card
          v-for="(quote, quoteIdx) in quotesData"
          :key="`card-quote-${quoteIdx}`"
          :id="`card-quote-${quoteIdx}`"
          class="w-full max-w-[600px]"
        >
          <CardHeader>
            <CardTitle class="text-slate-700 text-lg">
              {{ quote.text }}
            </CardTitle>
            <CardDescription>
              ~ {{ quote.author }}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-slate-500">
              {{ convertDate(quote.created_at) }}
            </p>
          </CardContent>
          <CardFooter class="gap-2">
            <div
              id="like-1"
              class="hover:cursor-pointer"
              @click="() => quote.is_liked = !quote.is_liked"
            >
              <Icon
                v-if="quote.is_liked"
                name="tabler:heart-filled"
                class="text-red-500/90 hover:text-red-500/70"
                size="24"
              />
              <Icon
                v-else
                name="tabler:heart"
                class="text-slate-700 hover:text-red-500/70"
                size="24"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div class="hover:cursor-pointer text-slate-700 hover:text-slate-500">
                  <Icon
                    name="ph:paper-plane-tilt"
                    size="24"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem @click="copyAndToast(quote.text)">Copy Text</DropdownMenuItem>
                <DropdownMenuItem @click="copyAndToast(quote.full_url)">Copy URL</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>
