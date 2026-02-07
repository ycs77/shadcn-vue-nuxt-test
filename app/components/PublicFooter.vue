<template>
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
</template>
