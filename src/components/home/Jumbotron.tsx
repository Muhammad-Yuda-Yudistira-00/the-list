import { useRouter } from "next/router";
import { rubikVinyl, robotoMono, cherryCreamSoda } from "@/libs/googleFonts/fontsStyle"

export default function Jumbotron() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      if (!API_KEY) {
        throw new Error("API key is missing");
      }

      // Panggil API untuk membuat checklist baru
      const res = await fetch(`${API_URL}/checklist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ title: "New Checklist" }),
      });

      const result = await res.json();

      if (result.status && result.statusCode === 201) {
        console.info("Checklist created successfully:", result.message);
        const checklistCode = result.data.code;

        // Redirect ke halaman todolist dengan code checklist
        router.push(`/todolist/${checklistCode}`);
      } else {
        console.error("Failed to create checklist:", result.message);
      }
    } catch (error) {
      console.error("Error creating checklist:", error);
    }
  };

    return(
        <section className="bg-gradient-to-b from-blue-400 to-blue-700/90 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 className={`mb-4 text-4xl font-extrabold tracking-tight leading-none text-red-900 md:text-5xl lg:text-6xl dark:text-white ${rubikVinyl.className}`}>Create a simple todolist and fast</h1>
                <p className={`mb-8 text-lg font-normal text-logoColor lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400 ${robotoMono.className}`}>Here at The List we focus on pretty looks, simple, easy and fast to use.</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <button onClick={handleGetStarted} className={`inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-lime-800/50 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-900 ${cherryCreamSoda.className}`}>
                        Get started
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </button>
                   {/* <a href="#" className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Learn more
                    </a> */} 
                </div>
            </div>
        </section>
        )
}