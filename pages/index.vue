<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { convertDate, intersectionArray } from '@/lib/utils';
import { useClipboard } from '@vueuse/core';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

const source = ref<string>('');
const { copy } = useClipboard({ source });

const searchTags = reactive<string[]>([]);
const searchText = ref<string>("");

type Quote = {
  id: number,
  text: string,
  author: string,
  created_at: Date,
  is_liked: boolean,
  full_url: string,
  tags: string[],
};

const quotesData = reactive<Quote[]>([
  {
    id: 1,
    text: "Work hard in silence, let success make the noise.",
    author: "Unknown",
    created_at: new Date(),
    is_liked: false,
    full_url: 'https://nekasa.com',
    tags: ['ambition'],
  },
  {
    id: 2,
    text: "When you build in silence, people don't know what to attack.",
    author: "Unknown",
    created_at: new Date(),
    is_liked: false,
    full_url: 'https://nekasa.com',
    tags: ['ambition'],
  },
  {
    id: 3,
    text: "Di dunia ini ada banyak yg lebih sulit, tapi tidak seberisik dirimu.",
    author: "Unknown",
    created_at: new Date(),
    is_liked: false,
    full_url: 'https://nekasa.com',
    tags: ['noise'],
  },
  {
    id: 4,
    text: "Dia masih muda, dia bukan gila kerja, tapi dia memang termotivasi karena harus membangun tahtanya tanpa sponsor orang tua.",
    author: "Unknown",
    created_at: new Date(),
    is_liked: false,
    full_url: 'https://nekasa.com',
    tags: ['ambition', 'onfire'],
  },
  {
    id: 5,
    text: "No rich guy is ugly.",
    author: "Unknown",
    created_at: new Date(),
    is_liked: false,
    full_url: 'https://nekasa.com',
    tags: ['fashion'],
  },
  {
    id: 6,
    text: "Kamu bukan adonan donat yg didiemin bisa berkembang sendiri.",
    author: "Unknown",
    created_at: new Date(),
    is_liked: false,
    full_url: 'https://nekasa.com',
    tags: ['funny'],
  },
]);

const copyAndToast = (content: string) => {
  copy(content);

  toast({
    description: 'Copied!',
    class: 'border bg-green-100/50 text-green2-800 dark:bg-slate-950 dark:text-slate-50',
  });
};

const filteredQuotes = computed((): Quote[] => {
  return quotesData.filter(data => {
    if (searchText.value.length === 0 && searchTags.length === 0) return true;

    let textIncluded = searchText.value.length > 0
      && data.text.toLocaleLowerCase().includes(searchText.value.toLocaleLowerCase());

    if (textIncluded) return true;
    return searchTags.length > 0 && intersectionArray(searchTags, data.tags);;
  });
});
</script>

<template>
  <div>
    <Toaster />

    <div id="jumbotron" class="bg-green-50">
      <div class="container flex flex-col items-center py-12">
        <div class="flex flex-col items-center gap-2">
          <h3 class="text-2xl font-bold text-green2-800">Search Quotes Around the World</h3>
          <h5 class="text-green2-800">Discover Wisdom from Every Corner of the Globe</h5>
        </div>

        <div class="flex flex-col w-full max-w-[600px] mt-10">
          <div class="relative w-full items-center mt-5">
            <Input
              id="search"
              v-model="searchText"
              type="text"
              placeholder="Search..."
              class="pl-10 bg-white focus-visible:ring-green-700 text-green2-800 font-medium"
            />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Icon name="material-symbols:match-word-rounded" class="size-6 text-green2-800/80" />
            </span>
          </div>
    
          <TagsInput v-model="searchTags" class="mt-1 relative pl-10">
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Icon name="heroicons:hashtag-16-solid" class="size-6 text-green2-800/80" />
            </span>
            <TagsInputItem
              v-for="item in searchTags"
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
      <div class="container flex flex-col items-center pt-8 pb-16">
        <Card
          v-for="(quote, quoteIdx) in filteredQuotes"
          :key="`card-quote-${quoteIdx}`"
          :id="`card-quote-${quoteIdx}`"
          class="w-full max-w-[600px] mt-3"
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
            <div v-if="(quote.tags?.length || 0) > 0" class="flex gap-1 flex-wrap mb-2">
              <Badge
                v-for="(tag, tagIdx) in quote.tags"
                :key="`tag-${quote.id}-${tagIdx}`"
                variant="secondary"
              >
                #{{ tag }}
              </Badge>
            </div>
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
