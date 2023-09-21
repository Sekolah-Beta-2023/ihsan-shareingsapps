<template>
  <section
    class="md:w-[800px] w-auto text-center border-black border-2 b-radius rounded-3xl md:py-10 md:px-20 py-5 px-3"
  >
    <form action="#" class="flex flex-col gap-5">
      <div class="text-center">
        <h2>Apa yang ingin kamu sampaikan</h2>
        <br />
        <p>Sampaikan disini</p>
      </div>
      <div class="relative w-full min-w-[200px]">
        <textarea
          class="p-5 h-full min-h-[150px] w-full rounded-3xl border border-black bg-[#d9d9d9]"
          placeholder=" "
        ></textarea>
      </div>
      <div class="w-72 m-auto">
        <div class="relative h-10 w-full min-w-[200px]">
          <input
            class="px-5 h-full w-full rounded-3xl border border-black bg-[#d9d9d9]"
            placeholder="Sampaikan Kepada"
          />
        </div>
      </div>
      <button
        type="submit"
        class="w-72 h-10 m-auto bg-[#d9d9d9] border border-black rounded-3xl"
      >
        submit
      </button>
    </form>
  </section>
</template>
