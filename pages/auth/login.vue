<template>
  <section class="container-auth md:w-[800px] w-full text-center px-5">
    <div>
      <img src="../../assets/image/shinchan login.gif" alt="" class="m-auto" />
      <h1>Login</h1>
    </div>
    <div>
      <form
        class="flex flex-col gap-3 text-start md:w-2/3 w-full m-auto"
        action="/"
      >
        <label for="username">Username :</label>
        <input
          type="text"
          class="px-5 h-10 w-full rounded-3xl border border-black bg-[#d9d9d9]"
        />
        <label for="username">Password :</label>
        <input
          type="password"
          class="px-5 h-10 w-full rounded-3xl border border-black bg-[#d9d9d9]"
        />
        <br />
        <button
          class="h-10 w-48 m-auto rounded-2xl border-2 border-black px-4 bg-white cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</template>
