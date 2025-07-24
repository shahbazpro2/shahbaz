const Introduction = () => {
  return (
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2  text-2xl font-medium lg:text-3xl'>
          <h1>Hi, I&apos;m Muhammad Shahbaz</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
            <li>
              Based in Pakistan <span className='ml-1'>🇵🇰</span>
            </li>
            <li>Full Stack Developer</li>
          </ul>
        </div>
      </div>

      <p className='mt-6 leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose'>
        Passionate Full Stack Developer specializing in JavaScript ecosystem. I
        work with React, Next.js, Node.js, and Nest.js to create modern,
        scalable web applications. I thrive on building efficient, user-friendly
        solutions and staying up-to-date with the latest web technologies.
      </p>
    </section>
  );
};

export default Introduction;
