<template>
    <div class="flex bg-black h-screen">
        <!-- sidebar -->
         <div class="bg-zinc-900 w-[516px] p-8 flex flex-col justify-center">
            <Logo />
            <h1 class="text-white font-bold text-lg mt-8">Sign up for a free account</h1>
            <p class="text-zinc-300 text-sm mt-0.5">Already registered? <span class="font-bold text-[#FFAC00] underline">Log in</span> to your account</p>
            
            <form @submit.prevent="submit">
                <div class="mt-8">
                    <label class="text-zinc-300 text-sm block mb-0.5"  for="">Email Address</label>
                    <input v-model="email" type="email" class="block w-full bg-[#27272A] border border-[#3F3F46] text-white px-4 py-2 placeholder:text-zinc-500 text-sm" placeholder="you@example.com">
                </div>

                <div class="mt-6">
                    <label class="text-zinc-300 text-sm block mb-0.5"  for="">Password</label>
                    <input v-model="password" type="password" class="block w-full bg-[#27272A] border border-[#3F3F46] text-white px-4 py-2 placeholder:text-zinc-500 text-sm" placeholder="**************">
                </div>

                <!-- signup button -->
                <div>
                    <button class="w-full mt-4 bg-[#FFAC00] rounded-full px-4 py-2 text-sm font-bold flex justify-center items-center space-x-2" >
                    <span> Sign Up </span><ArrowRight />
                    </button>
                </div>
                <!-- /signup button -->
            </form> 
         </div>
         <!-- /sidebar -->
    </div>
</template>

<script setup>
const email = ref('')
const password = ref('')

 async function submit() {
    try {
        const response = await $fetch('/api/user', {
        method: 'POST',
        body: {
            email   :   email.value,
            password:   password.value,
            }
        })

        console.log('response', response);
    } catch (error) {
        console.log("ERROR:");
        console.log(error.response?._data?.message);
        
    }

    
 }
</script>

