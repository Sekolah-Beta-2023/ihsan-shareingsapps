<template>
  <div
    class="container-auth text-center border-black border-2 b-radius rounded-3xl"
  >
    <div>
      <h1>Masuk</h1>
      <br /><br />
    </div>
    <div>
      <form class="flex flex-col text-start gap-3" action="#">
        <label for="username">Username :</label>
        <input
          type="text"
          class="h-10 rounded-2xl border-2 border-black px-4"
        />
        <label for="username">Password :</label>
        <input
          type="password"
          class="h-10 rounded-2xl border-2 border-black px-4"
        />
        <br /><br />
        <button
          class="h-10 w-48 m-auto rounded-2xl border-2 border-black px-4 bg-white cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
