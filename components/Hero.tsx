import Link from "next/link";

function Hero() {
  return (
    <section className="relative w-full  h-[500px] m-h-[500px] flex items-center justify-center text-center my-auto">
      <div className="px-4 md:px-6 max-w-[1500px] mx-auto w-[90%]">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
            Want to Take a Quick Memories Quiz?{" "}
          </h1>
          <p className="text-3xl"> Let&apos;s go!!</p>
        </div>
        <div className="mt-6">

          <Link href={'/quiz'} className="inline-flex items-center justify-center rounded-md bg-secondary px-8 py-4  text-sm font-medium text-gray-50 shadow transition-colors hover:bg-secondary/40 capitalise duration-700">
          Take the test.
          
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
