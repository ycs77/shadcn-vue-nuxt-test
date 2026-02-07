<template>
  <div class="min-h-screen bg-[#FDFBF7] font-[Merriweather]">
    <!-- Navbar -->
    <nav class="border-b border-[#1A1A1A]/10">
      <div class="mx-auto flex max-w-2xl items-center justify-between px-6 py-6">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight text-[#1A1A1A]">
          Papyrus
        </NuxtLink>
        <NuxtLink to="/login" class="cursor-pointer text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]">
          Sign In
        </NuxtLink>
      </div>
    </nav>

    <!-- Article -->
    <article v-if="post" class="mx-auto max-w-2xl px-6 py-12 lg:py-16">
      <!-- Header -->
      <header>
        <NuxtLink to="/" class="inline-flex cursor-pointer items-center gap-1 text-xs text-[#6B7280] transition-colors hover:text-[#1A1A1A]">
          <ArrowLeft class="size-3" />
          Back to essays
        </NuxtLink>
        <h1 class="mt-8 text-2xl font-bold leading-tight text-[#1A1A1A] lg:text-4xl">
          {{ post.title }}
        </h1>
        <div class="mt-4 flex items-center gap-2 text-xs text-[#6B7280]">
          <span>By {{ post.author }}</span>
          <span>&middot;</span>
          <time>{{ post.date }}</time>
          <span>&middot;</span>
          <span>{{ post.readTime }}</span>
        </div>
      </header>

      <Separator class="my-8 bg-[#1A1A1A]/10" />

      <!-- Body -->
      <div class="prose-papyrus">
        <p>{{ post.excerpt }}</p>
        <p v-for="(paragraph, index) in post.body" :key="index">
          {{ paragraph }}
        </p>
      </div>

      <Separator class="my-8 bg-[#1A1A1A]/10" />

      <!-- Author -->
      <div class="flex items-start gap-4">
        <div class="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A]/5 text-lg font-bold text-[#1A1A1A]/40">
          {{ post.author[0] }}
        </div>
        <div>
          <p class="text-sm font-bold text-[#1A1A1A]">{{ post.author }}</p>
          <p class="mt-1 text-xs leading-relaxed text-[#6B7280]">{{ post.authorBio }}</p>
        </div>
      </div>
    </article>

    <!-- Not Found -->
    <div v-else class="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 class="text-2xl font-bold text-[#1A1A1A]">Essay not found</h1>
      <p class="mt-3 text-sm text-[#6B7280]">The essay you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="mt-6 inline-block cursor-pointer text-sm text-[#6B7280] transition-colors hover:text-[#1A1A1A]">
        Back to home
      </NuxtLink>
    </div>

    <!-- More Essays -->
    <section v-if="post && relatedPosts.length > 0" class="border-t border-[#1A1A1A]/10">
      <div class="mx-auto max-w-2xl px-6 py-12">
        <h2 class="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[#6B7280]">
          Continue Reading
        </h2>
        <div class="flex flex-col">
          <NuxtLink
            v-for="(related, index) in relatedPosts"
            :key="related.id"
            :to="`/posts/${related.id}`"
            class="group cursor-pointer"
          >
            <div class="py-6">
              <time class="text-xs text-[#6B7280]">{{ related.date }}</time>
              <h3 class="mt-2 text-lg font-bold leading-snug text-[#1A1A1A] transition-colors group-hover:text-[#6B7280]">
                {{ related.title }}
              </h3>
              <p class="mt-2 text-xs text-[#6B7280]/60">
                By {{ related.author }} &middot; {{ related.readTime }}
              </p>
            </div>
            <Separator v-if="index < relatedPosts.length - 1" class="bg-[#1A1A1A]/10" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-[#1A1A1A]/10">
      <div class="mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p class="text-xs text-[#6B7280]">
          &copy; {{ new Date().getFullYear() }} Papyrus
        </p>
        <div class="flex gap-6">
          <a href="#" class="cursor-pointer text-xs text-[#6B7280] hover:text-[#1A1A1A]">Privacy</a>
          <a href="#" class="cursor-pointer text-xs text-[#6B7280] hover:text-[#1A1A1A]">RSS</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { computed } from 'vue'
import { Separator } from '@/components/ui/separator'

const route = useRoute()

const posts = [
  {
    id: 1,
    title: 'The Slow Disappearance of Silence',
    excerpt: 'In a world that never stops talking, silence has become the rarest luxury. This essay traces our relationship with quiet from monastery libraries to noise-cancelling headphones, and asks: what have we lost?',
    date: 'January 15, 2026',
    author: 'Clara Whitfield',
    authorBio: 'Clara is the founder of Papyrus and writes about culture, attention, and the things we overlook in the rush of modern life.',
    readTime: '12 min read',
    body: [
      'There was a time when silence was ordinary. It filled the spaces between conversations, settled over towns after dark, and accompanied the long hours of solitary work. It was not something people sought out, because it was simply there — a baseline, a given, the canvas on which the sounds of life were painted.',
      'That world is gone. Today, silence is a commodity. We pay for noise-cancelling headphones, book silent retreats, and download apps that simulate the sound of nothing. The very fact that we need technology to access quiet tells us something profound about what we have built.',
      'The shift did not happen overnight. It began with the industrial revolution, accelerated through the twentieth century, and reached its crescendo with the smartphone — a device that ensures we are never truly alone, never truly still, never truly silent.',
      'In monastery libraries of medieval Europe, silence was not merely the absence of sound. It was a practice, a discipline, a form of attention. The monks understood something we have forgotten: that silence is not empty. It is full of listening.',
      'Neuroscience is beginning to confirm what contemplatives have known for centuries. Studies show that periods of silence promote the growth of new cells in the hippocampus, the brain region associated with memory and learning. Silence, it turns out, is not just peaceful — it is productive.',
      'Yet we resist it. We fill every pause with podcasts, every commute with music, every meal with screens. The question is not whether we can reclaim silence — it is whether we still want to.',
    ],
  },
  {
    id: 2,
    title: 'Letters to No One: The Lost Art of Correspondence',
    excerpt: 'Before email, before texts, there were letters. Real letters, written with care, sealed with intention. A meditation on what the death of letter-writing says about how we value connection.',
    date: 'January 8, 2026',
    author: 'Thomas Hale',
    authorBio: 'Thomas writes about language, tradition, and the quiet ways we communicate across time and distance.',
    readTime: '9 min read',
    body: [
      'The last handwritten letter I received arrived six years ago. It was from my grandmother, written in her careful, slanting script on pale blue stationery. She wrote about the weather, the garden, a book she was reading. Ordinary things, made extraordinary by the effort of committing them to paper.',
      'Letter-writing was once the primary technology of intimacy. Lovers separated by war, friends divided by oceans, children away at school — all relied on the slow, deliberate exchange of words on paper to maintain the bonds that mattered most.',
      'The letter demanded something that modern communication does not: patience. You wrote knowing that your words would not arrive for days, perhaps weeks. You chose them carefully, because you could not unsend them, could not edit them, could not delete them with a tap.',
      'There is a materiality to letters that no digital message can replicate. The weight of the paper, the colour of the ink, the pressure of the pen — all these carry meaning beyond the words themselves. A letter is a physical object that has travelled through space to reach you, handled by strangers, weathered by the journey.',
      'We have gained speed and lost ceremony. We can now reach anyone instantly, but we rarely say anything that warrants the effort of a stamp. The question is not whether we should return to letter-writing — that ship has sailed. The question is what we might carry forward: the deliberateness, the care, the willingness to sit with our thoughts before sharing them.',
    ],
  },
  {
    id: 3,
    title: 'The Cartography of Memory',
    excerpt: 'We navigate our pasts like travelers without maps. A neuroscientist and a poet walk us through the landscapes of recollection, forgetting, and the stories we tell ourselves to fill the gaps.',
    date: 'January 2, 2026',
    author: 'Mira Fontaine',
    authorBio: 'Mira explores the intersection of science and the humanities, with a particular interest in how we construct meaning from experience.',
    readTime: '15 min read',
    body: [
      'Memory is not a recording. This is the first thing any neuroscientist will tell you, and it is the hardest thing for most of us to accept. We experience our memories as faithful reproductions of the past — vivid, detailed, true. They are none of these things.',
      'Every time we recall an event, we reconstruct it. The brain does not retrieve a stored file; it reassembles fragments — a smell here, an emotion there, a visual detail borrowed from a photograph we saw years later. The result feels seamless, but it is a collage.',
      'This is not a flaw. It is a feature. Our memories are not designed to be accurate; they are designed to be useful. They help us navigate the present by offering edited, interpreted versions of the past — versions that emphasize what mattered and discard what did not.',
      'The poet knows this intuitively. Poetry has always been the art of selective remembering, of finding the precise detail that unlocks a whole world of feeling. A good poem does what memory does: it compresses experience into something small enough to carry, but rich enough to unfold again and again.',
      'Forgetting, too, is an active process. The brain is constantly pruning, discarding, letting go. This is not loss — it is maintenance. Without forgetting, we would be buried under the weight of every moment we have ever lived. Forgetting is what allows us to move forward.',
      'Between the neuroscientist and the poet, a picture emerges: memory is not a place we visit but a story we tell. And like all stories, it changes with each telling — not because we are dishonest, but because we are alive.',
    ],
  },
  {
    id: 4,
    title: 'On Walking Without Purpose',
    excerpt: 'The flaneur walks not to arrive but to observe. In the tradition of Baudelaire and Benjamin, we make a case for purposeless wandering as a radical act in an efficiency-obsessed culture.',
    date: 'December 26, 2025',
    author: 'Elliot Marsh',
    authorBio: 'Elliot writes about philosophy, urban life, and the art of paying attention to what others pass by.',
    readTime: '8 min read',
    body: [
      'To walk without a destination is, in our culture, a minor act of rebellion. We are a people of purposes, of step-counts and optimized routes, of walking meetings and power walks. The idea of simply walking — with no goal, no podcast, no fitness tracker — strikes many as wasteful.',
      'But the flaneur, that great figure of nineteenth-century Paris, understood something essential: that walking without purpose is its own reward. The flaneur walks to see, to think, to be surprised. The flaneur walks because the city reveals itself only to those who are not in a hurry.',
      'Baudelaire called the flaneur "a passionate spectator," and there is a precision to that phrase. Spectatorship, done well, is not passive. It is an active engagement with the world, a decision to receive rather than to produce, to notice rather than to accomplish.',
      'Walter Benjamin, writing a century later, saw in the flaneur a critique of capitalism itself. In a world that values productivity above all else, the person who simply walks and looks is an outsider, a refusenik, a quiet revolutionary.',
      'Today, the flaneur is more necessary than ever. Our cities are designed for speed, our devices for distraction. To walk slowly, to look up, to follow a side street because it looks interesting — these are radical acts of presence in a world that rewards absence.',
    ],
  },
  {
    id: 5,
    title: 'What Trees Know That We Have Forgotten',
    excerpt: 'Beneath the forest floor, a vast network of roots and fungi connects trees in a web of mutual aid. What can this "wood wide web" teach us about community, patience, and survival?',
    date: 'December 19, 2025',
    author: 'Clara Whitfield',
    authorBio: 'Clara is the founder of Papyrus and writes about culture, attention, and the things we overlook in the rush of modern life.',
    readTime: '11 min read',
    body: [
      'Beneath every forest is a hidden world. A vast network of fungal threads — mycorrhizae — connects the roots of trees in a web so complex that scientists have taken to calling it the "wood wide web." Through this network, trees share nutrients, send chemical warnings about pests, and even nurture their young.',
      'The oldest trees, the ones foresters call "mother trees," are the most connected. They sit at the centre of the network, linked to hundreds of neighbours, channelling resources to seedlings that struggle in the shade. When a mother tree is felled, the network weakens. Sometimes it collapses entirely.',
      'This is not altruism in the human sense. Trees do not make moral choices. But the patterns are striking: cooperation, resource-sharing, care for the vulnerable. The forest, it turns out, is less a collection of individuals competing for light and more a community working to sustain itself.',
      'We have built our economies on a different metaphor: the market, where individuals compete for scarce resources and the fittest survive. It is a powerful model, but it is not the only one nature offers. The forest suggests that survival often depends not on competition but on connection.',
      'There is something humbling about standing in an old-growth forest and knowing that beneath your feet, a conversation is taking place — slow, chemical, ancient. The trees are talking. They have been talking for millions of years. We are only just learning to listen.',
    ],
  },
  {
    id: 6,
    title: 'The Bookshop at the Edge of the World',
    excerpt: 'On a wind-battered Scottish island, a second-hand bookshop defies every rule of modern retail. Its owner shares what three decades of selling books to strangers has taught him about human nature.',
    date: 'December 12, 2025',
    author: 'Thomas Hale',
    authorBio: 'Thomas writes about language, tradition, and the quiet ways we communicate across time and distance.',
    readTime: '14 min read',
    body: [
      'The bookshop sits at the end of a single-track road on an island where the population is outnumbered by sheep. It has no website, no social media presence, and no particular reason to exist — except that it has existed for thirty years, and people keep coming.',
      'Its owner, a man who left London in his twenties with a van full of books and a vague idea, will tell you that running a bookshop is the worst possible business decision a person can make. He will tell you this while making you a cup of tea and recommending a novel he thinks you need to read.',
      'The shop is organised by a system that makes sense only to him. Poetry is next to cookbooks. Philosophy shares a shelf with crime fiction. He believes that the best discoveries happen when you are not looking for anything in particular, and he has arranged his shop accordingly.',
      'People come from all over the world. They arrive by ferry, by bus, on foot. Some stay for an hour. Some stay for a week. A surprising number come back, year after year, as if the shop were a place they need to return to — a kind of pilgrimage.',
      'What he has learned, he says, is that people do not come to a bookshop to buy books. They come to be in a place where books are. They come for the quiet, the smell, the permission to browse without purpose. They come because a room full of books is one of the last places where it is acceptable to simply stand and think.',
      'The economics should not work. But they do, barely, because the shop offers something that cannot be replicated online: the experience of being a physical body in a space full of physical objects, each one a door to somewhere else.',
    ],
  },
]

const post = computed(() => {
  const id = Number(route.params.id)
  return posts.find(p => p.id === id)
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  return posts
    .filter(p => p.id !== post.value!.id)
    .slice(0, 3)
})

useSeoMeta({
  title: () => post.value ? `${post.value.title} - Papyrus` : 'Essay Not Found - Papyrus',
  description: () => post.value?.excerpt ?? '',
})
</script>

<style scoped>
.prose-papyrus p {
  margin-bottom: 1.5em;
  font-size: 1rem;
  line-height: 1.85;
  color: #1A1A1A;
}

@media (min-width: 1024px) {
  .prose-papyrus p {
    font-size: 1.0625rem;
  }
}
</style>
